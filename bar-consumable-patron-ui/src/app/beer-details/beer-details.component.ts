import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

import { BeersService, Beer, Bar, Patron, Transaction } from '../beers.service';

declare const Highcharts: any;

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
        transactionsList: Transaction[];

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
                                        { this.barsList = data; 
                                                const ibars = [];
                                                const iamounts = [];
                                                
                                                data.slice(0,20).forEach(bar => {
                                                        ibars.push(bar.barName);
                                                        iamounts.push(bar.amount);
                                                });
                                                this.renderBars(ibars, iamounts);
                                        },
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
                                        { this.patronsList = data; 
                                                const ipatrons = [];
                                                const iamounts = [];
                                                
                                                data.slice(0,20).forEach(patron => {
                                                        ipatrons.push(patron.name);
                                                        iamounts.push(patron.amount);
                                                });
                                                this.renderPatrons(ipatrons, iamounts);
                                        },
                                        (error: HttpResponse<any>) => {
                                                if(error.status === 404){
                                                        alert('No one bought this beer!');
                                                } else {
                                                        console.error(error.status + ' : ' + error.body);
                                                        alert('An error occurred!');
                                                }
                                        }
                                );
                                beerService.listTransactions(this.beerName).subscribe(
                                        data=>
                                        { this.transactionsList = data; },
                                        (error: HttpResponse<any>) => {
                                                if(error.status === 404){
                                                        alert('This beer is not in any transactions!');
                                                } else {
                                                        console.error(error.status + ':' + error.body);
                                                        alert('An error occurred!');
                                                }
                                        }
                                )
                });
        }

        ngOnInit() {
        }
        
        renderBars(bars: string[], counts: number[]){
                Highcharts.chart('bargraph', {
                        title: { text: 'Top Bars (by Amount Sold)' } ,
                        chart: { type: 'column' },
                        xAxis: { 
                                categories: bars, 
                                title: { text: 'Bar' } 
                        },
                        yAxis: {
                                min: 0,
                                title: { text: 'Amount Sold' },
                                labels: { overflow: 'justify' }
                        },
                        plotOptions: {
                                bar: { dataLabels: { enabled: true } }
                        },
                        legend: { enabled: false },
                        credits: { enabled: false },
                        series: [{ data: counts }]
                });
        }
        
        renderPatrons(patrons: string[], counts: number[]){
                Highcharts.chart('patrongraph', {
                        title: { text: 'Top Patrons (by Amount Purchased)' } ,
                        chart: { type: 'column' },
                        xAxis: { 
                                categories: patrons, 
                                title: { text: 'Patron' } 
                        },
                        yAxis: {
                                min: 0,
                                title: { text: 'Amount Bought' },
                                labels: { overflow: 'justify' }
                        },
                        plotOptions: {
                                bar: { dataLabels: { enabled: true } }
                        },
                        legend: { enabled: false },
                        credits: { enabled: false },
                        series: [{ data: counts }]
                });
        }

}
