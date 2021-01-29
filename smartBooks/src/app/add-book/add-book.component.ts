import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../services/alertify.service';
import { BookInformationService } from '../services/book-information.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  book: any={};
  constructor(private _bookInfoService:BookInformationService,private alertify:AlertifyService,
    private _router: Router) { }

  ngOnInit(): void {
  }
  addBook(item:any){
    this.book=item
    this._bookInfoService.bookAdd(item).subscribe(  res=> {
      if(res.status===200){
        this.alertify.mySuccess("Başarıyla Güncellendi")
        this._router.navigate(["/userhomepage"])
      }else{
        this.alertify.myErr("")
      }
    },
    err => this.alertify.myErr(err)
    )
  }
}
