import { Pipe, PipeTransform } from '@angular/core';
import { Book } from '../modelClass/book.model';

@Pipe({
  name: 'bookfilter'
})
export class BookfilterPipe implements PipeTransform {

  transform(value: Book[], filterText:any ): Book[]  {
    if(!value || !filterText){
      return value;
    }
    return value.filter(result => result.bookName.toLowerCase().includes(filterText.toLowerCase()));
  }

}
