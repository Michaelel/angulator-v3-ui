import { Component, OnInit } from '@angular/core';
import {GeneralDataService} from '../../services/general-data.service';
import {RoutesEnum} from '../../shared/enums/routes.enum';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {

  constructor(
    private dataService: GeneralDataService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  startGame(): void {
    this.passAuthGuard(RoutesEnum.Game);
  }

  checkStats(): void {
    this.passAuthGuard(RoutesEnum.Stats);
  }

  passAuthGuard(route: string): void {
    if (!this.dataService.isLoggedIn) {
      this.dataService.routeAfterAuth = route;
    }

    this.router.navigate([this.dataService.isLoggedIn ? route : RoutesEnum.Auth]);
  }
}
