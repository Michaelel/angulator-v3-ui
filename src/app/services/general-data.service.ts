import { Injectable } from '@angular/core';
import {ApiService} from './api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GameStartRequestInterface} from '../shared/interfaces/game-start-request.interface';
import {GameStartResponseInterface} from '../shared/interfaces/game-start-response.interface';
import {RoutesEnum} from '../shared/enums/routes.enum';

@Injectable({
  providedIn: 'root'
})
export class GeneralDataService {

  gameStarted: boolean;

  isLoggedIn: boolean;
  email: string;

  showSmallAngulator: boolean;

  resultSong: GameStartResponseInterface;

  routeAfterAuth: string;

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

  findSong(request: GameStartRequestInterface): void {
    this.api.startGame(request).subscribe(
      res => {
        this.resultSong = res;
        this.gameStarted = true;
        this.router.navigate([RoutesEnum.Result]);
      },
      e => console.log(e),
    );
  }

  finishGame(guess: boolean): void {
    const req = {
      id: this.resultSong.id,
      isWin: !guess,
    };
    this.api.finishGame(req).subscribe(
      res => this.router.navigate([RoutesEnum.Menu]),
      e => console.log(e),
    );
  }
}
