import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './shared/modules/material/material.module';
import { MenuComponent } from './pages/menu/menu.component';
import {AppRouting} from './app.routing';
import { HeaderComponent } from './components/header/header.component';
import {HttpClientModule} from '@angular/common/http';
import {AuthComponent} from './pages/auth/auth.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxAudioPlayerModule} from 'ngx-audio-player';
import {MatBasicAudioPlayerComponent} from "./shared/modules/mat-basic-audio-player/mat-basic-audio-player.component";
import {MatBasicAudioPlayerModule} from "./shared/modules/mat-basic-audio-player/mat-basic-audio-player.module";

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HeaderComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRouting,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
