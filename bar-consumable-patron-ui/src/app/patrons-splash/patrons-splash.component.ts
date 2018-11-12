import { Component, OnInit } from '@angular/core';
import { PatronsService, Patron } from '../patrons.service';

@Component({
  selector: 'app-patrons-splash',
  templateUrl: './patrons-splash.component.html',
  styleUrls: ['./patrons-splash.component.css']
})
export class PatronsSplashComponent implements OnInit {

  patrons: Patron[];

  constructor(
    public patronService: PatronsService
  ) { 
    this.getPatrons();
  }

  ngOnInit() {
  }

  getPatrons(){
    this.patronService.getPatrons().subscribe(
      data => {
        this.patrons = data;
      },
      error => {
        alert('Could not get list of Patrons');
      }
    );
  }
}