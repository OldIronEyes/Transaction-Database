import { Component, OnInit } from '@angular/core';

import { BeersService, Beer } from '../beers.service';

@Component({
  selector: 'app-beers-splash',
  templateUrl: './beers-splash.component.html',
  styleUrls: ['./beers-splash.component.css']
})
export class BeersSplashComponent implements OnInit {

        beers : Beer[];

        constructor(
                public beerService : BeersService
        ) { }

        ngOnInit() {
                this.getBeers();
        }

        getBeers(){
                this.beerService.getBeers().subscribe(
                        data => {
                                this.beers = data;
                        },
                        error => {
                                alert('Could not retrieve list of beers! :(');
                        }
                );
        }

}
