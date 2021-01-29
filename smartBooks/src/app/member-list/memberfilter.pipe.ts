import { Pipe, PipeTransform } from '@angular/core';
import {Member} from '../modelClass/member.model'
@Pipe({
  name: 'memberfilter'
})
export class MemberfilterPipe implements PipeTransform {

  transform(value: Member[], filterText:any ): Member[]  {
    if(!value || !filterText){
      return value;
    }
    return value.filter(result => result.memberName.toLowerCase().includes(filterText.toLowerCase()));
  }

}
