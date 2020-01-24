import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as RecordRTC from 'recordrtc';
import { interval, Observable, of, Subscription, timer } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-record-audio-game',
  templateUrl: './record-audio-game.component.html',
  styleUrls: ['./record-audio-game.component.sass']
})
export class RecordAudioGameComponent implements OnInit {


  isRecordInProgress: boolean;

  timer$: Subscription;

  recordForm = this.fb.group({ source: ['', Validators.required ] })

  private record;
  private url;
  private error;

  @Input() formLink: FormGroup;
  constructor(
      private domSanitizer: DomSanitizer,
      private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.formLink.setParent(this.recordForm);
  }

  get sourceCtrl(): AbstractControl {
    return this.recordForm.get('source');
  }

  sanitize(url: string): SafeUrl {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }
  /**
   * Start recording.
   */
  initiateRecording() {
    this.sourceCtrl.setValue('');
    this.url = '';
    this.isRecordInProgress = true;
    const mediaConstraints = {
      video: false,
      audio: true
    };
    navigator.mediaDevices
        .getUserMedia(mediaConstraints)
        .then(this.successCallback.bind(this), this.errorCallback.bind(this));

    const maxTimeToRecord = 10;
    let leftTime = 10;
    this.timer$ = interval(1000).pipe(
        take(maxTimeToRecord + 1),
        tap(() => leftTime--),
    ).subscribe(() => leftTime + 1 === 0 && this.stopRecording());

  }
  /**
   * Will be called automatically.
   */
  successCallback(stream) {
    const options = {
      mimeType: 'audio/wav',
      numberOfAudioChannels: 1
    };

    const StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
  }
  /**
   * Stop recording.
   */
  stopRecording() {
    this.timer$.unsubscribe();
    this.isRecordInProgress = false;
    this.record.stop(this.processRecording.bind(this));
  }
  /**
   * processRecording Do what ever you want with blob
   * @param  {any} blob Blog
   */
  processRecording(blob) {
    this.url = URL.createObjectURL(blob);
    this.convertBlobToBase64(blob);
  }

  convertBlobToBase64(blob): void {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      this.sourceCtrl.setValue(reader.result);
      this.recordForm.markAsDirty();
    };
  }
  /**
   * Process Error.
   */
  errorCallback(error) {
    this.error = 'Can not play audio in your browser';
  }

}
