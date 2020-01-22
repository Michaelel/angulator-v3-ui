import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MenuComponent} from './pages/menu/menu.component';
import {GameComponent} from './pages/game/game.component';
import {StatsComponent} from './pages/stats/stats.component';
import {ResultComponent} from './pages/result/result.component';
import {AuthComponent} from './pages/auth/auth.component';
import {RoutesEnum} from './shared/enums/routes.enum';

const routes: Routes = [
  {
    path      : '',
    redirectTo: RoutesEnum.Menu,
    pathMatch : 'full',
  },
  {
    path      : RoutesEnum.Menu,
    component : MenuComponent,
  },
  {
    path      : RoutesEnum.Game,
    loadChildren: () => import('./pages/game/game.module').then(m => m.GameModule),
  },
  {
    path      : RoutesEnum.Stats,
    loadChildren: () => import('./pages/stats/stats.module').then(m => m.StatsModule),
  },
  {
    path      : RoutesEnum.Result,
    loadChildren: () => import('./pages/result/result.module').then(m => m.ResultModule),
  },
  {
    path       : RoutesEnum.Auth,
    component  : AuthComponent,
  },
  {
    path        : '**',
    redirectTo  : '404',
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRouting { }
