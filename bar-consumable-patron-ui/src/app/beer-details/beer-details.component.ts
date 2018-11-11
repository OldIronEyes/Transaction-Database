import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

import { BeersService, Beer } from '../beers.service';
//import { Bar } from '../bars.service';
//import { Patron } from '../patrons.service';

@Component({
  selector: 'app-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.css']
})
export class BeerDetailsComponent implements OnInit {

        beerName : string;
        beerDetails : Beer;
        //beerBars : Bar[];
        //beerPatrons : Patron[];

        constructor(private beerService: BeersService, private route: ActivatedRoute) { 
                route.paramMap.subscribe((paramMap) => {
                        this.beerName = paramMap.get('beer');
                          
                        beerService.getBeer(this.beerName).subscribe(
                                data =>
                                { this.beerDetails = data; },
                                (error: HttpResponse<any>) => {
                                        if(error.status === 404){
                                                alert('Beer not found!');
                                        } else {
                                                console.error(error.status + ' : ' + error.body);
                                                alert('An error occurred!');
                                        }
                                }
                        );
                }
        }

        ngOnInit() {
        }

}
