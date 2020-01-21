import { Component, OnInit } from '@angular/core';
import {GeneralDataService} from '../../services/general-data.service';
import {ROUTES_WITH_BIG_ANGULATOR, ROUTES_WITHOUT_BACK_ARROW} from '../../shared/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor(
    public dataService: GeneralDataService,
  ) { }

  ngOnInit() {
  }

  get isAngulatorBigByRoute(): boolean {
    return !!ROUTES_WITH_BIG_ANGULATOR.find(route => window.location.href.includes(route));
  }

  get shouldHideArrowBack(): boolean {
    return !!ROUTES_WITHOUT_BACK_ARROW.find(route => window.location.href.includes(route));
  }

}
