import { Component, OnInit } from '@angular/core';
import {GeneralDataService} from '../../services/general-data.service';
import {Router} from '@angular/router';
import {RoutesEnum} from '../../shared/enums/routes.enum';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.sass']
})
export class ResultComponent implements OnInit {

  constructor(
    public dataService: GeneralDataService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  apply(guess: boolean): void {
    this.dataService.finishGame(guess);
  }

  finish(): void {
    this.router.navigate([RoutesEnum.Menu]);
  }

}
