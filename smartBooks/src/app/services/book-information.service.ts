import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class BookInformationService {
  private _bookInfo = "http://localhost:3000/api/bookInformation"
  private _bookUpdate = "http://localhost:3000/api/bookUpdate"
  private _bookDelete ="http://localhost:3000/api/bookDelete"
  private _bookAdd ="http://localhost:3000/api/addBook"
  findBookById(bookid: {}){
    //const jsonUser = JSON.stringify(user)
    return this.http.get<any>(this._bookInfo+'/?_id='+bookid)
  }
  bookUpdate(bookid: {}){
    return this.http.post<any>(this._bookUpdate,bookid,{observe: 'response'})
  }
  bookDelete(bookid:{}){
    return this.http.post<any>(this._bookDelete,bookid,{observe: 'response'})

  }
  bookAdd(book:{}){
    return this.http.post<any>(this._bookAdd,book,{observe: 'response'})
    
  }
  constructor(private http: HttpClient) { }
}
