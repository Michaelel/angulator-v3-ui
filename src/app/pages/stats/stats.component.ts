import {Component, OnDestroy, OnInit} from '@angular/core';
import {GeneralDataService} from '../../services/general-data.service';
import {detailExpand} from '../../shared/animations';
import {GameTypeEnum} from '../../shared/enums/game-type.enum';
import {ComponentState} from '../../shared/modules/component-state/component-state.enum';
import {defineState} from '../../shared/constants';
import {AngulatorMoodEnum} from "../../shared/enums/angulator-mood.enum";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.sass'],
  animations: [ detailExpand ],
})
export class StatsComponent implements OnInit, OnDestroy {

  columnsToDisplay = ['id', 'isWin', 'date'];
  expandedElement: any  | null;
  score: string;

  gameTypeEnum = GameTypeEnum;
  state = ComponentState.Loading;

  constructor(
    public dataService: GeneralDataService,
  ) { }

  ngOnInit() {
    this.dataService.gamesResults && !this.dataService.shouldUpdateStats
      ? this.applyCurrentStats()
      : this.getStats();
  }

  ngOnDestroy(): void {
    this.dataService.angulatorMood = AngulatorMoodEnum.Default;
  }

  getStats = (): void => {
    this.dataService.angulatorMood = AngulatorMoodEnum.Thinking;
    this.dataService.getStats().subscribe(
      res => {
        this.dataService.gamesResults = res;
        this.applyCurrentStats();
        this.dataService.shouldUpdateStats = false;
      },
      e => {
        this.dataService.angulatorMood = AngulatorMoodEnum.Default;
        this.state = ComponentState.Error;
      },
    );
  }

  applyCurrentStats(): void {
    this.calculateScore();
    this.state = defineState(this.dataService.gamesResults);
  }

  calculateScore(): void {
    const userWinsCount = this.dataService.gamesResults.reduce((acc, item) => acc + +item.isWin, 0);
    const computerWinsCount = this.dataService.gamesResults.length - userWinsCount;
    this.score = `${userWinsCount} : ${computerWinsCount}`;
    this.dataService.angulatorMood = this.getStatsAngulatorMood(userWinsCount, computerWinsCount);
  }

  getStatsAngulatorMood(userWinsCount: number, computerWinsCount: number): AngulatorMoodEnum {
    if (userWinsCount > computerWinsCount) {
      return AngulatorMoodEnum.Congrats;
    } else if (userWinsCount < computerWinsCount) {
      return AngulatorMoodEnum.Happy;
    } else {
       return AngulatorMoodEnum.Default;
    }
  }

}
