import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatronsService , Patron, Transaction} from '../patrons.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-patron-details',
  templateUrl: './patron-details.component.html',
  styleUrls: ['./patron-details.component.css']
})
export class PatronDetailsComponent implements OnInit {

  patronPhone: string;
  patronDetails: Patron;
  transactions: Transaction[];

  constructor(
    private patronService: PatronsService,
    private route: ActivatedRoute
  ) 
  { 
    this.route.paramMap.subscribe((paramMap) => {
        this.patronPhone = paramMap.get('patron');
        this.patronService.getPatronTrans(this.patronPhone).subscribe(
          data => {
            this.transactions = data;
          }
        ),
          (error: HttpResponse<any>) => {
            if (error.status === 404) {
              alert('Transactions not found');
            } else {
              console.error(error.status + ' - ' + error.body);
              alert('An error occurred on the server, check console');
            }
          }

        this.patronService.getPatron(this.patronPhone).subscribe(
          data => {
            this.patronDetails = data;
          },
            (error: HttpResponse<any>) => {
              if (error.status === 404) {
                alert('Patron not found');
              } else {
                console.error(error.status + ' - ' + error.body);
                alert('An error occurred on the server, check console');
              }
          }
        )
      }
    )
  }

  ngOnInit() {
  }

}