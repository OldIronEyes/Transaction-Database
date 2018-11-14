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
                                        { this.transactionsList = data;
                                                var intervals = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];
                                                var amounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                                                data.forEach(transaction => {
                                                        amounts[transaction.time] = amounts[transaction.time] + transaction.amount;
                                                });
                                                this.renderTimePlot(intervals, amounts);
                                        },
                                        (error: HttpResponse<any>) => {
                                                if(error.status === 404){
                                                        alert('This beer is not in any transactions!');
                                                } else {
                                                        console.error(error.status + ':' + error.body);
                                                        alert('An error occurred!');
                                                }
                                        }
                                );
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
        
        renderTimePlot(hours: number[], counts: number[]){
                Highcharts.chart('timeplot', {
                        title: { text: 'Time Distribution of Transactions' } ,
                        chart: { type: 'column' },
                        xAxis: { 
                                categories: hours, 
                                title: { text: 'Hour' } 
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

