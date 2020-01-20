import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MenuComponent} from './pages/menu/menu.component';
import {GameComponent} from './pages/game/game.component';
import {StatsComponent} from './pages/stats/stats.component';
import {ResultComponent} from './pages/result/result.component';

const routes: Routes = [
  {
    path      : '',
    redirectTo: 'menu',
    pathMatch : 'full',
  },
  {
    path      : 'menu',
    component : MenuComponent,
  },
  {
    path      : 'game',
    component : GameComponent,
  },
  {
    path      : 'stats',
    component : StatsComponent,
  },
  {
    path      : 'result',
    component : ResultComponent,
  },
  {
    path        : 'auth',
    loadChildren: () => import('./shared/modules/auth/auth.module').then(m => m.AuthModule),
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
