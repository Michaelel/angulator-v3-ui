import {Component, OnInit} from '@angular/core';
import {GeneralDataService} from '../../services/general-data.service';
import {Router} from '@angular/router';
import {RoutesEnum} from '../../shared/enums/routes.enum';
import {ComponentState} from '../../shared/modules/component-state/component-state.enum';
import {AngulatorMoodEnum} from "../../shared/enums/angulator-mood.enum";

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.sass']
})
export class ResultComponent implements OnInit {

  state = ComponentState.Success;

  constructor(
    public dataService: GeneralDataService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.setResultAngulatorMood();
  }

  apply(guess: boolean): void {
    this.dataService.angulatorMood = AngulatorMoodEnum.Thinking;
    this.state = ComponentState.Loading;
    this.dataService.finishGame(guess).subscribe(
      res => {
        this.router.navigate([RoutesEnum.Menu]);
        this.setFinishAngulatorMood(guess);
      },
      e => {
        this.state = ComponentState.Success;
        this.dataService.angulatorMood = AngulatorMoodEnum.Default;
        alert('Произошла ошибка, попробуйте еще раз.');
      },
    );
  }

  setResultAngulatorMood(): void {
    this.dataService.angulatorMood = this.dataService.resultSong.source
      ? AngulatorMoodEnum.Default
      : AngulatorMoodEnum.Angry;
  }

  setFinishAngulatorMood(guess: boolean): void {
    this.dataService.angulatorMood = guess
      ? AngulatorMoodEnum.Happy
      : AngulatorMoodEnum.Congrats;
  }

  finish(): void {
    this.dataService.angulatorMood = AngulatorMoodEnum.Default;
    this.router.navigate([RoutesEnum.Menu]);
  }

}
