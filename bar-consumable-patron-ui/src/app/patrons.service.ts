import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Patron {
  name: string;
  phone: string;
  city: string;
  state: string;
}

@Injectable({
  providedIn: 'root'
})
export class PatronService {

  constructor(
    public http: HttpClient
  ) { }

  getPatrons(){
    return this.http.get<Patron[]>('/api/patrons');
  }

  getPatron(patron: string){
    return this.http.get<Patron>('/api/patrons/' + patron)
  }
}
