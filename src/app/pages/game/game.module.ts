import {NgModule} from '@angular/core';
import {GameGuard} from './game.guard';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {GameComponent} from './game.component';
import {LyricsGameComponent} from './components/lyrics-game/lyrics-game.component';
import {RecordAudioGameComponent} from './components/record-audio-game/record-audio-game.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../../shared/modules/material/material.module';
import {ComponentStateModule} from '../../shared/modules/component-state/component-state.module';
import {MatBasicAudioPlayerModule} from "../../shared/modules/mat-basic-audio-player/mat-basic-audio-player.module";

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
    ComponentStateModule,
    MaterialModule,
    ReactiveFormsModule,
    MatBasicAudioPlayerModule,
  ],
  providers: [ GameGuard ],
})
export class GameModule { }
