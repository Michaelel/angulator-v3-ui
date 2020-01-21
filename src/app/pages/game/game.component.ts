import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameTypeEnum} from '../../shared/enums/game-type.enum';
import {GeneralDataService} from '../../services/general-data.service';
import {FormGroup} from '@angular/forms';
import {fadeInOut} from '../../shared/animations';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass'],
  animations: [ fadeInOut ],
})
export class GameComponent implements OnInit, OnDestroy {

  gameType: GameTypeEnum;
  gameTypeEnum = GameTypeEnum;

  formLink = new FormGroup({});

  constructor(
    private dataService: GeneralDataService,
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.dataService.showSmallAngulator = false;
  }

  changeGameType(gameType: GameTypeEnum): void {
    this.gameType = gameType;
    this.dataService.showSmallAngulator = true;
  }

  find(): void {
    const req = {
      email: this.dataService.email,
      gameType: this.gameType,
      source: this.formLink.root.value,
    };
    this.dataService.findSong(req);
  }

}
