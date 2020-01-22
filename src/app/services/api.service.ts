import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {StatInterface} from '../shared/interfaces/stat.interface';
import {environment} from '../../environments/environment';
import {GameStartResponseInterface} from '../shared/interfaces/game-start-response.interface';
import {GameStartRequestInterface} from '../shared/interfaces/game-start-request.interface';
import {GameFinishRequestInterface} from '../shared/interfaces/game-finish-request.interface';
import {GameTypeEnum} from '../shared/enums/game-type.enum';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  route = environment.backendRoute;

  constructor(
    private http: HttpClient,
  ) { }

  getStats(email: string): Observable<StatInterface[]> {
    // return of([
    //   {
    //     id: 1,
    //     isWin: true,
    //     date: '2020-01-20 12:34:00',
    //     gameType: GameTypeEnum.Lyrics,
    //     gameSource: 'Два типа людей',
    //     answerTitle: 'Max Cake. Two types of people',
    //     answerSource: 'assets/sound/cake.mp3',
    //   },
    //   {
    //     id: 2,
    //     isWin: false,
    //     date: '2020-01-22 14:00:00',
    //     gameType: GameTypeEnum.Lyrics,
    //     gameSource: 'До костей',
    //     answerTitle: 'Max Cake. Two types of people',
    //     answerSource: 'assets/sound/cake.mp3',
    //   }
    // ]);
    return this.http.get<StatInterface[]>(`${this.route}user/stats/get`, { params: { email } });
  }

  startGame(payload: GameStartRequestInterface): Observable<GameStartResponseInterface> {
    // return of({
    //   id: 1,
    //   title: 'Max Cake. Two types of people',
    //   source: 'assets/sound/cake.mp3',
    // });
    return this.http.post<GameStartResponseInterface>(`${this.route}game/start`, payload, { headers: {'content-type': 'application/json'} });
  }

  finishGame(payload: GameFinishRequestInterface): Observable<void> {
    // console.log(payload);
    // return of(null);
    return this.http.post<void>(`${this.route}game/finish`, payload);
  }
}
