import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GameStartRequestInterface} from '../shared/interfaces/game-start-request.interface';
import {GameStartResponseInterface} from '../shared/interfaces/game-start-response.interface';
import {RoutesEnum} from '../shared/enums/routes.enum';
import {StatInterface} from '../shared/interfaces/stat.interface';
import {Observable} from 'rxjs';
import {AngulatorMoodEnum} from '../shared/enums/angulator-mood.enum';

@Injectable({
  providedIn: 'root'
})
export class GeneralDataService {

  gameStarted: boolean;

  isLoggedIn: boolean;
  email: string;

  angulatorMood = AngulatorMoodEnum.Default;

  showSmallAngulator: boolean;

  resultSong: GameStartResponseInterface;

  routeAfterAuth: string;

  gamesResults: StatInterface[];

  shouldUpdateStats: boolean;

  constructor(
    private api: ApiService,
    private router: Router,
  ) {
    console.log(window.location.href);
    this.email = localStorage.getItem('email');
    this.isLoggedIn = !!this.email;
  }

  setEmail(email: string): void {
    localStorage.setItem('email', email);
    this.email = email;
    this.isLoggedIn = true;
  }

  findSong(request: GameStartRequestInterface): Observable<GameStartResponseInterface> {
    return this.api.startGame(request);
  }

  finishGame(guess: boolean): Observable<void> {
    const req = {
      id: this.resultSong.id,
      isWin: !guess,
    };
    return this.api.finishGame(req);
  }

  getStats(): Observable<StatInterface[]> {
    return this.api.getStats(this.email);
  }
}
