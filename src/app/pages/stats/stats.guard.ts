// angular
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

// rxjs
import { Observable } from 'rxjs';
import {GeneralDataService} from '../../services/general-data.service';
import {RoutesEnum} from '../../shared/enums/routes.enum';

// TODO Добавить пермишн когда появится на беке
@Injectable()
export class StatsGuard implements CanActivate {
  public constructor(
    private router: Router,
    private dataService: GeneralDataService,
  ) { }

  public canActivate(route: ActivatedRouteSnapshot): boolean | Observable<boolean> {
    if (this.dataService.isLoggedIn) {
      return true;
    }

    this.dataService.routeAfterAuth = RoutesEnum.Stats;
    this.router.navigate([ RoutesEnum.Auth ]);
    return false;
  }
}

