import { Component, OnInit } from '@angular/core';
import { } from '../modification.service';

@Component({
  selector: 'app-modification',
  templateUrl: './modification.component.html',
  styleUrls: ['./modification.component.css']
})
export class ModificationComponent implements OnInit {
        log = ' ';

  constructor() { }

  ngOnInit() {
  }

  heythere(value: string){
          this.log = "Your query was: " + value;
          
  }
}
