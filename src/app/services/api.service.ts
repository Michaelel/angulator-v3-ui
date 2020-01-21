import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {StatInterface} from '../shared/interfaces/stat.interface';
import {environment} from '../../environments/environment';
import {GameStartResponseInterface} from '../shared/interfaces/game-start-response.interface';
import {GameStartRequestInterface} from '../shared/interfaces/game-start-request.interface';
import {GameFinishRequestInterface} from '../shared/interfaces/game-finish-request.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  route = environment.backendRoute;

  constructor(
    private http: HttpClient,
  ) { }

  getStats(email: string): Observable<StatInterface[]> {
    return this.http.get<StatInterface[]>(`${this.route}user/stats/get`, { params: { email } });
  }

  startGame(payload: GameStartRequestInterface): Observable<GameStartResponseInterface> {
    return of({
      id: 1,
      title: 'Max Cake. Two types of people',
      source: 'assets/sound/cake.mp3',
    });
    return this.http.post<GameStartResponseInterface>(`${this.route}game/start`, payload);
  }

  finishGame(payload: GameFinishRequestInterface): Observable<void> {
    console.log(payload);
    return of(null);
    return this.http.post<void>(`${this.route}game/finish`, payload);
  }
}
