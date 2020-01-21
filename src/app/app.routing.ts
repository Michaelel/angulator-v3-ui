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
    component : GameComponent,
  },
  {
    path      : RoutesEnum.Stats,
    component : StatsComponent,
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
