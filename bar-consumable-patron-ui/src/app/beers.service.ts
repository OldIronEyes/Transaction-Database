import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Beer {
        name: string;
        manufacturer: string;
        type: string;
}
export interface Bar{
        license: string;
        barName: string;
        price: number;
        amount: number;
}
export interface Patron{
        name: string;
        phone: string;
        amount: number;
}
export interface Transaction{
        transid: string;
        time: number;
        amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class BeersService {

  constructor(public http: HttpClient) { }
  getBeers(){
          return this.http.get<Beer[]>('/api/beer');
  }
  getBeer(beer: string){
          return this.http.get<Beer>('/api/beer/' + beer);
  }
  listBars(beer: string){
          return this.http.get<Bar[]>('/api/beer/' + beer + '/listbars');
  }
  listPatrons(beer: string){
          return this.http.get<Patron[]>('/api/beer/' + beer + '/listpatrons');
  }
  listTransactions(beer: string){
          return this.http.get<Transaction[]>('api/beer/' + beer + '/listtransactions');
  }
}