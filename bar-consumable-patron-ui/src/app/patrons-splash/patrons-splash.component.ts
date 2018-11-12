import { Component, OnInit } from '@angular/core';
import { PatronService, Patron } from '../patrons.service';

@Component({
  selector: 'app-patrons-splash',
  templateUrl: './patrons-splash.component.html',
  styleUrls: ['./patrons-splash.component.css']
})
export class PatronsSplashComponent implements OnInit {

  patrons: Patron[];

  constructor(
    public patronService: PatronService
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