import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './shared/modules/material/material.module';
import { MenuComponent } from './pages/menu/menu.component';
import { GameComponent } from './pages/game/game.component';
import { StatsComponent } from './pages/stats/stats.component';
import { TextGameComponent } from './pages/game/components/text-game/text-game.component';
import { RecordAudioGameComponent } from './pages/game/components/record-audio-game/record-audio-game.component';
import { ResultComponent } from './pages/result/result.component';
import {AppRouting} from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    GameComponent,
    StatsComponent,
    TextGameComponent,
    RecordAudioGameComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRouting,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
