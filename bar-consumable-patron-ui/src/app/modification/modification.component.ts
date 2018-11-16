import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ModificationService } from '../modification.service';

@Component({
  selector: 'app-modification',
  templateUrl: './modification.component.html',
  styleUrls: ['./modification.component.css']
})
export class ModificationComponent implements OnInit {
        log = ' ';
  constructor(private modService: ModificationService, private http: HttpClient) { }

  ngOnInit() {
  }

  heythere(value: string){
          var input = {"query" : value};
          var jstr = JSON.stringify(input);
          let body = JSON.parse(jstr);
          this.http.post('/api/modification', body).subscribe(
                  data => this.log = data;
          );
  }
}
