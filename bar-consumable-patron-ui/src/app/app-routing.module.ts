import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BarsSplashComponent } from './bars-splash/bars-splash.component';
import { BarDetailsComponent } from './bar-details/bar-details.component';
import { BeersSplashComponent } from './beers-splash/beers-splash.component';
import { BeerDetailsComponent } from './beer-details/beer-details.component';
import { PatronsSplashComponent } from './patrons-splash/patrons-splash.component';
import { PatronDetailsComponent } from './patron-details/patron-details.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ModificationComponent } from './modification/modification.component';


const routes: Routes = [
        {
                path : '',
                pathMatch : 'full',
                component: WelcomeComponent
        },
        {
                path: 'static',
                pathMatch: 'full',
                redirectTo: 'welcome'
        },
        {
                path: 'welcome',
                pathMatch: 'full',
                component: WelcomeComponent
        },
        {
                path : 'bars',
                pathMatch : 'full',
                component: BarsSplashComponent
        },
        {
                path: 'bars/:bar',
                pathMatch: 'full',
                component: BarDetailsComponent
        },
        {
                path : 'beers',
                pathMatch : 'full',
                component: BeersSplashComponent
        },
        {
                path: 'beers/:beer',
                pathMatch: 'full',
                component: BeerDetailsComponent
        },
        {
                path : 'patrons',
                pathMatch : 'full',
                component: PatronsSplashComponent
        },
        {
                path: 'patrons/:patron',
                pathMatch: 'full',
                component: PatronDetailsComponent
        },
        {
                path: 'modification',
                pathMatch: 'full',
                component: ModificationComponent
        }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
