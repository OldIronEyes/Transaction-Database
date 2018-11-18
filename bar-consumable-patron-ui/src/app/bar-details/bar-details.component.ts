import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { SelectItem } from 'primeng/components/common/selectitem';
import { BarsService, Bar } from '../bars.service';

declare const Highcharts: any;

@Component({
  selector: 'app-bar-details',
  templateUrl: './bar-details.component.html',
  styleUrls: ['./bar-details.component.css']
})
export class BarDetailsComponent implements OnInit {

  barLicense: string;
  barDetails: Bar;

  constructor(
    private barService: BarsService,
    private route: ActivatedRoute
  ) {
    this.route.paramMap.subscribe((paramMap) => {
      this.barLicense = paramMap.get('bar');
      this.barService.getBar(this.barLicense).subscribe(
        data => {
          this.barDetails = data;
        }
      );
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
      this.barService.getTopBeers(this.barLicense).subscribe(
        data => {
          const itemNames = [];
          const Amount = [];

          data.forEach(item => {
            itemNames.push(item.Item);
            Amount.push(item.Amount);
          });

          this.renderTopBeers(itemNames, Amount);
        }
      );

      this.barService.getTopManf(this.barLicense).subscribe(
        data => {
          const manfNames = [];
          const Amount = [];

          data.forEach(manf => {
            manfNames.push(manf.Manf);
            Amount.push(manf.Amount);
          });

          this.renderTopManf(manfNames, Amount);
        }
      );

      this.barService.getSaleHours(this.barLicense).subscribe(
        data => {
          const hours = [];
          const Amount = [];

          data.forEach(hour => {
            hours.push(hour.tod);
            Amount.push(hour.Amount);
          });

        this.renderHourly(hours, Amount);
        }
      );

      this.barService.getSaleWeeks(this.barLicense).subscribe(
        data => {
          const weeks = [];
          const Amount = [];

          data.forEach(week => {
            weeks.push(week.tod);
            Amount.push(week.Amount);
          });

          this.renderWeekly(weeks, Amount);
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

  renderTopBeers(itemNames: string[], Amount: number[]) {
    Highcharts.chart('itemGraph', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Top Five Items Sold'
      },
      xAxis: {
        categories: itemNames,
        title: {
          text: 'Item Names'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Amount Sold'
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
        data: Amount
      }]
    });
  }

  renderTopManf(manfNames: string[], Amount: number[]) {
    Highcharts.chart('manfGraph', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Top Five Manufacturers'
      },
      xAxis: {
        categories: manfNames,
        title: {
          text: 'Manufacturers'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Amount Sold'
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
        data: Amount
      }]
    });
  }

  renderHourly(hours: string[], Amount: number[]) {
    Highcharts.chart('hoursGraph', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Hourly Sales'
      },
      xAxis: {
        categories: hours,
        title: {
          text: 'Time of Day'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Amount Sold'
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
        data: Amount
      }]
    });
  }

  renderWeekly(weeks: string[], Amount: number[]) {
    Highcharts.chart('weeksGraph', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Yearly Sales'
      },
      xAxis: {
        categories: weeks,
        title: {
          text: 'Week of Year'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Amount Sold'
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
        data: Amount
      }]
    });
  }
}
