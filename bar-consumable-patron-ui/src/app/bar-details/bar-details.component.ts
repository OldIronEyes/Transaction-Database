import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { SelectItem } from 'primeng/components/common/selectitem';

import { BarsService, Bar } from '../bars.service';


@Component({
  selector: 'app-bar-details',
  templateUrl: './bar-details.component.html',
  styleUrls: ['./bar-details.component.css']
})
export class BarDetailsComponent implements OnInit {

        barLicense: string;
        barDetails: Bar;
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
                        this.filterOptions = [
                                {'label' : 'Lowest price first', 'value' : 'low price'},
                                {'label' : 'Highest price first', 'value' : 'high price'}
                        ];
                });
        }
        
        ngOnInit() {
        }

}
