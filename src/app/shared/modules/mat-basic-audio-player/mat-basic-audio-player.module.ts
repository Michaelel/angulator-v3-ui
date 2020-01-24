import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatBasicAudioPlayerComponent} from './mat-basic-audio-player.component';
import {MaterialModule} from '../material/material.module';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatSliderModule} from "@angular/material/slider";
import {SecondsToMinutesPipe} from "./seconds-to-minutes.pipe";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {library} from "@fortawesome/fontawesome-svg-core";


@NgModule({
  declarations: [
    MatBasicAudioPlayerComponent,
    SecondsToMinutesPipe,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FontAwesomeModule,
    MatSliderModule,
  ],
  exports: [
    MatBasicAudioPlayerComponent,
  ],
})
export class MatBasicAudioPlayerModule {
  constructor() {
    library.add(fas);
  }
}
