import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RentalBook } from '../modelClass/rental-book.model';
import { AlertifyService } from '../services/alertify.service';
import { RentbookService } from '../services/rentbook.service';

@Component({
  selector: 'app-rentbooklist',
  templateUrl: './rentbooklist.component.html',
  styleUrls: ['./rentbooklist.component.css']
})
export class RentbooklistComponent implements OnInit {
  filterText=""
  rentBookList!: RentalBook[];
  constructor(private _rentbookservice:RentbookService,private forms:FormsModule,private alertify:AlertifyService , private _router :Router) { }
  ngOnInit(): void {
    this._rentbookservice.getBookList()
    .subscribe(
      res => {this.rentBookList = res,
        console.log(res)},
      err => {
        if(err instanceof HttpErrorResponse){
          if(err.status===401){
          this._router.navigate(['/login'])
        }
        }
        console.log(this.rentBookList)}

    )
  }
  bookDelete(item:any){

    this._rentbookservice.memberDelete(item).subscribe(
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

}
