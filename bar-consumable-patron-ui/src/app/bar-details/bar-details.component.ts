import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { SelectItem } from 'primeng/components/common/selectitem';

import { BarsService, Bar, FoodItem } from '../bars.service';


@Component({
  selector: 'app-bar-details',
  templateUrl: './bar-details.component.html',
  styleUrls: ['./bar-details.component.css']
})
export class BarDetailsComponent implements OnInit {

        barLicense: string;
        barDetails: Bar;
        barFoods: FoodItem[];
        sortField: string;
        sortOrder: number;
        filterOptions : SelectItem[];

        constructor(private barService: BarsService, private route: ActivatedRoute) {
                route.paramMap.subscribe((paramMap) => {
                        this.barLicense = paramMap.get('bar');
                          
                        barService.getBar(this.barLicense).subscribe(
                                data => 
                                { this.barDetails = data; },
                                (error: HttpResponse<any>) => {
                                        if(error.status === 404){
                                                alert('Bar not found!');
                                        } else {
                                                console.error(error.status + ' : ' + error.body);
                                                alert('An error occurred!');
                                        }
                                }
                        );
                        barService.getFoodMenu(this.barLicense).subscribe(
                                data => 
                                { this.barFoods = data; },
                                (error: HttpResponse<any>) => {
                                        if(error.status === 404){
                                                alert('Bar doesn\'t sell any foods!');
                                        } else {
                                                console.error(error.status + ' : ' + error.body);
                                                alert('An error occurred!');
                                        }
                                }
                        );
                        this.filterOptions = [
                                {'label' : 'Lowest price first', 'value' : 'low price'},
                                {'label' : 'Highest price first', 'value' : 'high price'}
                        ];
                });
        }
        
        sortBy(selectedOption: string){
                if(selectedOption === 'low price'){
                        this.barFoods.sort((a,b) => {
                                return a.price - b.price;
                        });
                } else if (selectedOption === 'high price'){
                        this.barFoods.sort((a,b) => {
                                return b.price - a.price;
                        });
                }
        }

        
        ngOnInit() {
        }

}
