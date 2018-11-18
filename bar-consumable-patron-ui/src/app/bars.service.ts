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

export interface Beer {
        Item: string;
        Amount: number;
}

export interface Manf {
        Manf: string;
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

  getTopBeers(bar: string) {
          return this.http.get<Beer[]>('/api/bar/' + bar + 'tb');
  }

  getTopManf(bar: string) {
          return this.http.get<Manf[]>('/api/bar/' + bar + 'tm');
  }
}
