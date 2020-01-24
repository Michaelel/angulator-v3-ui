import {Component, Input, OnInit} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import * as RecordRTC from 'recordrtc';
import {interval, Subscription} from 'rxjs';
import {take, tap} from 'rxjs/operators';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GeneralDataService} from "../../../../services/general-data.service";
import {AngulatorMoodEnum} from "../../../../shared/enums/angulator-mood.enum";

@Component({
  selector: 'app-record-audio-game',
  templateUrl: './record-audio-game.component.html',
  styleUrls: ['./record-audio-game.component.sass']
})
export class RecordAudioGameComponent implements OnInit {

  url: string;

  haveAccessToMicro = true;

  isRecordInProgress: boolean;

  timer$: Subscription;

  recordForm = this.fb.group({ source: ['', Validators.required ] })

  private record;
  private error;

  @Input() formLink: FormGroup;
  constructor(
      private domSanitizer: DomSanitizer,
      private fb: FormBuilder,
      private dataService: GeneralDataService,
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
    const mediaConstraints = {
      video: false,
      audio: true
    };

    navigator.mediaDevices
        .getUserMedia(mediaConstraints)
        .then(this.successCallback.bind(this), this.errorCallback.bind(this));

  }
  /**
   * Will be called automatically.
   */
  successCallback(stream: any): void {
    this.isRecordInProgress = true;
    const options = {
      type: 'audio',
      mimeType: 'audio/webm',
      bufferSize: 4096,
    };

    this.haveAccessToMicro = true;

    const maxTimeToRecord = 10;
    let leftTime = 10;
    this.dataService.angulatorMood = AngulatorMoodEnum.Listening;
    this.timer$ = interval(1000).pipe(
      take(maxTimeToRecord + 1),
      tap(() => leftTime--),
    ).subscribe(() => leftTime + 1 === 0 && this.stopRecording());

    const StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
  }


  stopRecording(): void {
    this.timer$.unsubscribe();
    this.isRecordInProgress = false;
    this.dataService.angulatorMood = AngulatorMoodEnum.Default;
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
    this.haveAccessToMicro = false;
  }

}
