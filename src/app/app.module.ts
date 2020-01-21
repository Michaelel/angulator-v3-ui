import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './shared/modules/material/material.module';
import { MenuComponent } from './pages/menu/menu.component';
import { GameComponent } from './pages/game/game.component';
import { StatsComponent } from './pages/stats/stats.component';
import { LyricsGameComponent } from './pages/game/components/lyrics-game/lyrics-game.component';
import { RecordAudioGameComponent } from './pages/game/components/record-audio-game/record-audio-game.component';
import { ResultComponent } from './pages/result/result.component';
import {AppRouting} from './app.routing';
import { HeaderComponent } from './components/header/header.component';
import {HttpClientModule} from '@angular/common/http';
import {AuthComponent} from './pages/auth/auth.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxAudioPlayerModule} from 'ngx-audio-player';
import {ResultModule} from './pages/result/result.module';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    GameComponent,
    StatsComponent,
    LyricsGameComponent,
    RecordAudioGameComponent,
    HeaderComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRouting,
    MaterialModule,
    ResultModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxAudioPlayerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
