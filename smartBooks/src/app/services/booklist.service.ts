import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BooklistService {
  private _booklistUrl ="http://localhost:3000/api/booklist" 
  constructor(private http: HttpClient) { }
  getBookList(){
    return this.http.get<any>(this._booklistUrl)
  }
}
