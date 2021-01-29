import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { from } from 'rxjs';
import { BookInformationService } from '../services/book-information.service';
import { AlertifyService } from '../services/alertify.service';
import { HttpErrorResponse } from '@angular/common/http';



@Component({
  selector: 'app-updatebookinformation',
  templateUrl: './updatebookinformation.component.html',
  styleUrls: ['./updatebookinformation.component.css']
})
export class UpdatebookinformationComponent implements OnInit {
 
  book: any={};
  constructor(private _route :ActivatedRoute,
              private _bookInfoService:BookInformationService,
              private alertify:AlertifyService,
              private _router: Router
              ) {
    
   }
   
   bookUpdate(){
    this._bookInfoService.bookUpdate(this.book).subscribe(
      res=> {
        if(res.status==200){
          this.alertify.mySuccess("Başarıyla Güncellendi")
          this._router.navigate(["/userhomepage"])
        }else{
          this.alertify.myErr("")
          this._router.navigate(["/userhomepage"])
        }
      },
      err => console.log("1")
    )

   }
   bookDelete(){

     this._bookInfoService.bookDelete(this.book).subscribe(
      res=> {
        if(res.status==200){
          this.alertify.mySuccess("Başarıyla Silindi")
          this._router.navigate(["/userhomepage"])
        }else{
        this.alertify.myErr("")
        }
      },
      err => console.log("1")
      
     )
   }
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

}
