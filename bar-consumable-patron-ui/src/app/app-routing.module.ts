import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { BarsSplashComponent } from './bars-splash/bars-splash.component';
import { BarDetailsComponent } from './bar-details/bar-details.component';

const routes: Routes = [
        {
                path : 'bars',
                pathMatch : 'full',
                component: BarsSplashComponent
        },
        {
                path: 'bars/:bar',
                pathMatch: 'full',
                component: BarDetailsComponent
        }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
