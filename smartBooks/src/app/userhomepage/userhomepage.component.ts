import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from '../modelClass/book.model';
import { AlertifyService } from '../services/alertify.service';
import { BookInformationService } from '../services/book-information.service';
import { BooklistService } from '../services/booklist.service';

@Component({
  selector: 'app-userhomepage',
  templateUrl: './userhomepage.component.html',
  styleUrls: ['./userhomepage.component.css']
})
export class UserhomepageComponent implements OnInit {
  filterText=""
  bookList!: Book[]; 
  constructor(private _booklistservice:BooklistService,private forms:FormsModule,private alertify:AlertifyService , private _router :Router,private _bookInfoService:BookInformationService) { }

  ngOnInit(): void {
    this._booklistservice.getBookList()
    .subscribe(
      res => this.bookList = res,
      err => {
        if(err instanceof HttpErrorResponse){
          if(err.status===401){
          this._router.navigate(['/login'])
        }
        }
        console.log(err)}

    )
  }
  bookDelete(item:any){

    this._bookInfoService.bookDelete(item).subscribe(
     res=> {
       if(res.status==200){
         this.alertify.mySuccess("Başarıyla Silindi")
          this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this._router.navigate(["/userhomepage"]); // navigate to same route
      }); 
         this._router.navigate(["/userhomepage"])
       }else{
         this.alertify.myErr("")
        
       }
     },
     err =>  this.alertify.myErr(err)
     
    )
    
  }
  selectedItemUpdate(item:any):void {
    this._router.navigate(['/updateBookInformation',item._id])
  }
  selectedBookRent(item:any){
    this._router.navigate(['/rentbook',item._id])
  }

}
