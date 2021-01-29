import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../modelClass/book.model';
import { Member } from '../modelClass/member.model';

@Injectable({
  providedIn: 'root'
})
export class RentbookService {
  private _rentbookUrl="http://localhost:3000/api/rentBook"
  private _booklistUrl ="http://localhost:3000/api/rentalbooklist"
  private _rentDelete ="http://localhost:3000/api/rentdelete"
  
  constructor(private http: HttpClient) { }
  rentBook(book:Book,memberTc:String,dateData:String){
    const rentInfo={
        _id: book._id,
        bookName: book.bookName,
        bookCategory: book.bookCategory,
        bookStock: book.bookStock,
        bookAuthor: book.bookAuthor,
        bookBarcode: book.bookBarcode,
        bookPublisherHouse: book.bookPublisherHouse, 
        //member tc konulabilir sadece 
        memberTcNo: memberTc,
        date : dateData
    }
    console.log(rentInfo)
    return this.http.post<any>(this._rentbookUrl,rentInfo,{observe: 'response'})
    
  }
  getBookList(){
    return this.http.get<any>(this._booklistUrl)
  }
  memberDelete(memberid:{}){
    return this.http.post<any>(this._rentDelete,memberid,{observe: 'response'})

  }
}
