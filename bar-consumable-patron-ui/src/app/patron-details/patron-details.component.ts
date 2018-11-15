import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatronsService , Patron, Transaction, Beer} from '../patrons.service';
import {ChartModule} from 'primeng/chart';


@Component({
  selector: 'app-patron-details',
  templateUrl: './patron-details.component.html',
  styleUrls: ['./patron-details.component.css']
})
export class PatronDetailsComponent implements OnInit {

  patronPhone: string;
  patronDetails: Patron;
  transactions: Transaction[];
  patronBeers: Beer[];


  constructor(
    private patronService: PatronsService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((paramMap) => {
        this.patronPhone = paramMap.get('patron');
        this.patronService.getPatronTrans(this.patronPhone).subscribe(
          data => {
            this.transactions = data;
          }
        ),
        this.patronService.getPatron(this.patronPhone).subscribe(
          data => {
            this.patronDetails = data;
          },
        );
        this.patronService.getPatronBeers(this.patronPhone).subscribe(
          data => {
            this.patronBeers = data;
          }
        );
      }
    );
  }

  ngOnInit() {
  }
}
