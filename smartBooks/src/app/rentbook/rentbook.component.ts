import { getLocaleDayNames } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../modelClass/book.model';
import { AlertifyService } from '../services/alertify.service';
import { BookInformationService } from '../services/book-information.service';
import { RentbookService } from '../services/rentbook.service';
declare var $: any;
@Component({
  selector: 'app-rentbook',
  templateUrl: './rentbook.component.html',
  styleUrls: ['./rentbook.component.css']
})
export class RentbookComponent implements OnInit {
  book: Book = new Book;
  tcNo!: string;
  day!: string;
  constructor(private _route :ActivatedRoute,
    private _bookInfoService:BookInformationService,
    private alertify:AlertifyService,
    private _router: Router,
    private _rentService:RentbookService) { }

  ngOnInit(): void {
    this._route.params.subscribe(param=>{
      let routeParam=param._id;
      console.log(routeParam)
      this._bookInfoService.findBookById(routeParam).subscribe(
        res => this.book=res,
        err => {
          if(err instanceof HttpErrorResponse){
            if(err.status===401){
            this._router.navigate(['/login'])
          }
          }
          console.log(err)}
      )
    })
  }
  rentBook(item:Book,tcNo:string, day:string){
    console.log("burdayım")
    item=this.book;
    this._rentService.rentBook(item,tcNo,day,).subscribe(  res=> {
      if(res.status===200){
        this.alertify.mySuccess("Başarıyla Güncellendi")
        this._router.navigate(["/userhomepage"])
      }else{
        this.alertify.myErr("")
      }
    },
    err => this.alertify.myErr(err)
    )
  };
  }

