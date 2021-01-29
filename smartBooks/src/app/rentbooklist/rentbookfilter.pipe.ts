import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../modelClass/book.model';
import { RentalBook } from '../modelClass/rental-book.model';

@Pipe({
  name: 'rentbookfilter'
})
export class RentbookfilterPipe implements PipeTransform {

  transform(value: RentalBook[], filterText:any ): RentalBook[]  {
    if(!value || !filterText){
      return value;
    }
    return value.filter(result => result.bookBarcode.toLowerCase().includes(filterText.toLowerCase()));
  }

}
