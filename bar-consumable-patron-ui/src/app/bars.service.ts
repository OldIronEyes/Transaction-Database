import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Bar {
        Name: string;
        License: string;
        City: string;
        State: string;
        Opening: string;
        Closing: string;
}

export interface Patron {
        Name: string;
        Spent: number;
}

export interface Item {
        Item: string;
        Amount: number;
}

@Injectable({
  providedIn: 'root'
})

export class BarsService {

  constructor(public http: HttpClient) { }

  getBars() {
          return this.http.get<Bar[]>('/api/bar');
  }

  getBar(bar: string) {
          return this.http.get<Bar>('/api/bar/' + bar);
  }

  getTopPatrons(bar: string) {
          return this.http.get<Patron[]>('/api/bar/' + bar + 'tf');
  }

  getTopItems(bar:string) {
          return this.http.get<Item[]>('/api/bar/' + bar + 'ti');
  }
}
