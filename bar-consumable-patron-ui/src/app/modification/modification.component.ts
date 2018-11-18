import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modification',
  templateUrl: './modification.component.html',
  styleUrls: ['./modification.component.css']
})
export class ModificationComponent implements OnInit {
        log: string;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  heythere(value: string){
         if(value.toLowerCase().trim().substring(0,4) == 'drop'){
                 this.log = "please stop the drop";
         }else{
                  this.http.post('/api/modification', {query : value}, {responseType: "json"}).subscribe(
                          data => { 
                                  this.log = JSON.stringify(data); 
                                  alert(this.log);
                          },
                          (error: HttpErrorResponse) => {
                                  if(error.status != 200){
                                          this.log= JSON.stringify(error.error);
                                          alert(this.log);
                                  }
                          }
                  );
          }
  }
}
