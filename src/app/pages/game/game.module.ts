import { NgModule } from '@angular/core';
import { NgxAudioPlayerModule} from 'ngx-audio-player';
import {GameGuard} from './game.guard';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {GameComponent} from './game.component';
import {LyricsGameComponent} from './components/lyrics-game/lyrics-game.component';
import {RecordAudioGameComponent} from './components/record-audio-game/record-audio-game.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../shared/modules/material/material.module';

@NgModule({
  declarations: [
    GameComponent,
    LyricsGameComponent,
    RecordAudioGameComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      canActivate: [ GameGuard ],
      component: GameComponent,
    }]),
    MaterialModule,
    ReactiveFormsModule,
    NgxAudioPlayerModule,
  ],
  providers: [ GameGuard ],
})
export class GameModule { }
