import {Component, OnInit} from '@angular/core';
import {GeneralDataService} from '../../services/general-data.service';
import {detailExpand} from '../../shared/animations';
import {GameTypeEnum} from '../../shared/enums/game-type.enum';
import {ComponentState} from '../../shared/modules/component-state/component-state.enum';
import {defineState} from '../../shared/constants';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.sass'],
  animations: [ detailExpand ],
})
export class StatsComponent implements OnInit {

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
      ? this.state = ComponentState.Success
      : this.getStats();
  }

  getStats = (): void => {
    this.dataService.getStats().subscribe(
      res => {
        this.dataService.gamesResults = res;
        this.calculateScore();
        this.dataService.shouldUpdateStats = false;
        this.state = defineState(res);
      },
      e => this.state = ComponentState.Error,
    );
  }

  calculateScore(): void {
    const userWinsCount = this.dataService.gamesResults.reduce((acc, item) => acc + +item.isWin, 0);
    const computerWinsCount = this.dataService.gamesResults.length - userWinsCount;
    this.score = `${userWinsCount} : ${computerWinsCount}`;
  }

}
