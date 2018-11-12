import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

import { BeersService, Beer, Bar, Patron } from '../beers.service';

@Component({
  selector: 'app-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.css']
})
export class BeerDetailsComponent implements OnInit {

        beerName : string;
        beerDetails : Beer;
        barsList : Bar[];
        patronsList: Patron[];
        //topBars : TopBar[];

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
                                beerService.listBars(this.beerName).subscribe(
                                        data => 
                                        { this.barsList = data; },
                                        (error: HttpResponse<any>) => {
                                                if(error.status === 404){
                                                        alert('This beer is not sold at  any bars!');
                                                } else {
                                                        console.error(error.status + ' : ' + error.body);
                                                        alert('An error occurred!');
                                                }
                                        }
                                );
                                beerService.listPatrons(this.beerName).subscribe(
                                        data => 
                                        { this.patronsList = data; },
                                        (error: HttpResponse<any>) => {
                                                if(error.status === 404){
                                                        alert('No one bought this beer!');
                                                } else {
                                                        console.error(error.status + ' : ' + error.body);
                                                        alert('An error occurred!');
                                                }
                                        }
                                );
                });
        }

        ngOnInit() {
        }

}
