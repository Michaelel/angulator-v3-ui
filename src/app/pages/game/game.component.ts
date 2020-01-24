import {Component, OnDestroy, OnInit} from '@angular/core';
import {GameTypeEnum} from '../../shared/enums/game-type.enum';
import {GeneralDataService} from '../../services/general-data.service';
import {FormGroup} from '@angular/forms';
import {fadeInOut} from '../../shared/animations';
import {ComponentState} from '../../shared/modules/component-state/component-state.enum';
import {RoutesEnum} from '../../shared/enums/routes.enum';
import {Router} from '@angular/router';
import {AngulatorMoodEnum} from "../../shared/enums/angulator-mood.enum";

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.sass'],
    animations: [fadeInOut],
})
export class GameComponent implements OnInit, OnDestroy {

    gameType: GameTypeEnum;
    gameTypeEnum = GameTypeEnum;

    formLink = new FormGroup({});

    state = ComponentState.Success;

    constructor(
        private dataService: GeneralDataService,
        private router: Router,
    ) {
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        this.dataService.showSmallAngulator = false;
    }

    changeGameType(gameType: GameTypeEnum): void {
        this.gameType = null;
        setTimeout(() => {
            this.gameType = gameType;
            this.dataService.showSmallAngulator = gameType !== GameTypeEnum.Lyrics;
        }, 0);
    }

    find(): void {
      this.state = ComponentState.Loading;
      this.dataService.angulatorMood = AngulatorMoodEnum.Thinking;
      const req = {
          email: this.dataService.email,
          gameType: this.gameType,
          ...this.formLink.root.value,
      };
      this.dataService.findSong(req).subscribe(
        res => {
          this.dataService.resultSong = res;
          this.dataService.gameStarted = true;
          this.dataService.shouldUpdateStats = true;
          this.router.navigate([RoutesEnum.Result]);
        },
        e => {
          this.state = ComponentState.Success;
          alert('Произошла ошибка, попробуйте еще раз.');
        },
      );
    }

}
