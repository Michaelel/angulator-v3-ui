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

  url: string;


  isRecordInProgress: boolean;

  timer$: Subscription;

  recordForm = this.fb.group({ source: ['', Validators.required ] })

  private record;
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
  initiateRecording(): void {
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
  successCallback(stream: any): void {
    const options = {
      mimeType: 'audio/wav',
      numberOfAudioChannels: 1
    };

    const StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
  }


  stopRecording(): void {
    this.timer$.unsubscribe();
    this.isRecordInProgress = false;
    this.record.stop(this.processRecording.bind(this));
  }

  processRecording(blob: any): any {
    this.url = URL.createObjectURL(blob);
    this.convertBlobToBase64(blob);
  }

  convertBlobToBase64(blob: any): void {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      this.sourceCtrl.setValue(reader.result);
      this.recordForm.markAsDirty();
    };
  }

  errorCallback(error) {
    this.error = 'Can not play audio in your browser';
  }

}
