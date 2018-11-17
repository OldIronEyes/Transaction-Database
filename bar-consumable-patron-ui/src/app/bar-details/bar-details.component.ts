import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { SelectItem } from 'primeng/components/common/selectitem';
import { BarsService, Bar, Patron } from '../bars.service';

declare const Highcharts: any;

@Component({
  selector: 'app-bar-details',
  templateUrl: './bar-details.component.html',
  styleUrls: ['./bar-details.component.css']
})
export class BarDetailsComponent implements OnInit {

  barLicense: string;
  topPatrons: Patron[];

  constructor(
    private barService: BarsService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((paramMap) => {
      this.barLicense = paramMap.get('bar');
      this.barService.getTopPatrons(this.barLicense).subscribe(
        data => {
          const patronNames = [];
          const spent = [];

          data.forEach(patron => {
            patronNames.push(patron.Name);
            spent.push(patron.Spent);
          });

          this.renderTopPatrons(patronNames, spent);
        }
      );
    }
  );
}

ngOnInit() {
}

  renderTopPatrons(patronNames: string[], spent: number[]) {
    Highcharts.chart('patronGraph', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Top Five Patrons'
      },
      xAxis: {
        categories: patronNames,
        title: {
          text: 'Patron Names'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Amount of money Spent'
        },
        labels: {
          overflow: 'justify'
        }
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      series: [{
        data: spent
      }]
    });
  }

}
