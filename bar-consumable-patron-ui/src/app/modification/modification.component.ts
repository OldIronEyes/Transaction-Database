import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-modification',
  templateUrl: './modification.component.html',
  styleUrls: ['./modification.component.css']
})
export class ModificationComponent implements OnInit {
        log = ' ';
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  heythere(value: string){
          this.http.post('/api/modification', {query : value}, {responseType: "json"}).subscribe(
                  data => { this.log = JSON.stringify(data); alert(this.log);}, 
          );
  }
}
