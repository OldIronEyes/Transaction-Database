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
export interface BeerItem {
        name: string;
        manf: string;
        type: string;
        price: number;
}
export interface FoodItem{
        name: string;
        price: number;
}
export interface SodaItem{
        name: string;
        flavor: string;
        price: number;
}

@Injectable({
  providedIn: 'root'
})

export class BarsService {

  constructor(public http: HttpClient) { }
  getBars(){
          return this.http.get<Bar[]>('/api/bar');
  }
  getBar(bar: string){
          return this.http.get<Bar>('/api/bar/' + bar);
  }
  getBeerMenu(bar: string){
          return this.http.get<BeerItem[]>('/api/menu/beer/' + bar);
  }
  getFoodMenu(bar: string){
          return this.http.get<FoodItem[]>('/api/menu/food/' + bar);
  }
  getSodaMenu(bar: string){
          return this.http.get<SodaItem[]>('/api/menu/soda/' + bar);
  }
}
