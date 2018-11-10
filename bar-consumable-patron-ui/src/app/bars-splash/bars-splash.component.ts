import { Component, OnInit } from '@angular/core';

import { BarsService, Bar } from '../bars.service';

@Component({
  selector: 'app-bars-splash',
  templateUrl: './bars-splash.component.html',
  styleUrls: ['./bars-splash.component.css']
})
export class BarsSplashComponent implements OnInit {

        bars : Bar[];

  constructor(
          public barService : BarsService
  ) { }

  ngOnInit() {
          this.getBars();
  }
  
  getBars(){
          this.barService.getBars().subscribe(
                  data => {
                          this.bars = data;
                  },
                  error => {
                          alert('Could not retrieve list of bars! :(');
                  }
          );
  }

}
