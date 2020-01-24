import { Component, OnDestroy, OnInit } from '@angular/core';
import { GeneralDataService } from '../../services/general-data.service';
import { RoutesEnum } from '../../shared/enums/routes.enum';
import { Router } from '@angular/router';
import { AngulatorMoodEnum } from '../../shared/enums/angulator-mood.enum';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit, OnDestroy {

  constructor(
    private dataService: GeneralDataService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.dataService.angulatorMood = AngulatorMoodEnum.Default;
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
