import { Component, OnInit } from '@angular/core';
import {StatInterface} from '../../shared/interfaces/stat.interface';
import {GeneralDataService} from '../../services/general-data.service';
import { detailExpand} from '../../shared/animations';
import {GameTypeEnum} from '../../shared/enums/game-type.enum';

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

  constructor(
    public dataService: GeneralDataService,
  ) { }

  ngOnInit() {
    this.dataService.gamesResults && !this.dataService.shouldUpdateStats
      ? console.log('nice')
      : this.getStats();
  }

  getStats(): void {
    this.dataService.getStats().subscribe(
      res => {
        console.log('success');
        this.dataService.gamesResults = res;
        this.calculateScore();
      },
      e => console.log(e),
    );
  }

  calculateScore(): void {
    const userWinsCount = this.dataService.gamesResults.reduce((acc, item) => acc + +item.isWin, 0);
    const computerWinsCount = this.dataService.gamesResults.length - userWinsCount;
    this.score = `${userWinsCount} : ${computerWinsCount}`;
  }

}
