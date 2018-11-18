import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {TabViewModule} from 'primeng/tabview';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarsSplashComponent } from './bars-splash/bars-splash.component';
import { BarDetailsComponent } from './bar-details/bar-details.component';
import { BeerDetailsComponent } from './beer-details/beer-details.component';
import { PatronDetailsComponent } from './patron-details/patron-details.component';
import { PatronsSplashComponent } from './patrons-splash/patrons-splash.component';
import { BeersSplashComponent } from './beers-splash/beers-splash.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ModificationComponent } from './modification/modification.component';

@NgModule({
  declarations: [
    AppComponent,
    BarsSplashComponent,
    BarDetailsComponent,
    BeerDetailsComponent,
    PatronDetailsComponent,
    PatronsSplashComponent,
    BeersSplashComponent,
    WelcomeComponent,
    ModificationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TableModule,
    DropdownModule,
    BrowserAnimationsModule,
    TabViewModule
  ],
  providers: [ HttpClient ],
  bootstrap: [AppComponent]
})
export class AppModule { }
