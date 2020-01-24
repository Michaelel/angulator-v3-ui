import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatBasicAudioPlayerComponent} from './mat-basic-audio-player.component';
import {MaterialModule} from '../material/material.module';
import {MatSliderModule} from "@angular/material/slider";
import {SecondsToMinutesPipe} from "./seconds-to-minutes.pipe";


@NgModule({
  declarations: [
    MatBasicAudioPlayerComponent,
    SecondsToMinutesPipe,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MatSliderModule,
  ],
  exports: [
    MatBasicAudioPlayerComponent,
  ],
})
export class MatBasicAudioPlayerModule {
}
