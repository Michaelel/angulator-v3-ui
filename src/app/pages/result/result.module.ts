import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule, NgxAudioPlayerModule} from 'ngx-audio-player';
import {ResultComponent} from './result.component';
import {ResultGuard} from './result.guard';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    ResultComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      canActivate: [ ResultGuard ],
      component: ResultComponent,
    }]),
    MaterialModule,
    NgxAudioPlayerModule,
  ],
  providers: [ ResultGuard ],
})
export class ResultModule { }
