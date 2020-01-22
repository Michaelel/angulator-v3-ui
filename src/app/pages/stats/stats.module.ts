import { NgModule } from '@angular/core';
import { NgxAudioPlayerModule} from 'ngx-audio-player';
import {StatsGuard} from './stats.guard';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../shared/modules/material/material.module';
import {StatsComponent} from './stats.component';
import {MomentPipe} from '../../shared/pipes/moment.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    StatsComponent,
    MomentPipe,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      canActivate: [ StatsGuard ],
      component: StatsComponent,
    }]),
    MaterialModule,
    NgxAudioPlayerModule,
  ],
  providers: [ StatsGuard ],
})
export class StatsModule { }
