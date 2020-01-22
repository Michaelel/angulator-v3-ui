import {Component, OnInit} from '@angular/core';
import {GeneralDataService} from '../../services/general-data.service';
import {Router} from '@angular/router';
import {RoutesEnum} from '../../shared/enums/routes.enum';
import {ComponentState} from '../../shared/modules/component-state/component-state.enum';

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
  }

  apply(guess: boolean): void {
    this.state = ComponentState.Loading;
    this.dataService.finishGame(guess).subscribe(
      res => this.router.navigate([RoutesEnum.Menu]),
      e => {
        this.state = ComponentState.Success;
        alert('Произошла ошибка, попробуйте еще раз.');
      },
    );
  }

  finish(): void {
    this.router.navigate([RoutesEnum.Menu]);
  }

}
