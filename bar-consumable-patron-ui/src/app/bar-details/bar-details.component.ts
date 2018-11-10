import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarsService, Bar } from '../bars.service';

@Component({
  selector: 'app-bar-details',
  templateUrl: './bar-details.component.html',
  styleUrls: ['./bar-details.component.css']
})
export class BarDetailsComponent implements OnInit {

        barLicense: string;

  constructor(private barService: BarsService, private route: ActivatedRoute) {
          route.paramMap.subscribe((paramMap) => {
                  this.barLicense = paramMap.get('bar');
                  
                  barService.getBar(this.barLicense)
          });
  }

  ngOnInit() {
  }

}
