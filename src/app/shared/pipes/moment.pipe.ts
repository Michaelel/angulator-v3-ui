import { Pipe, PipeTransform } from '@angular/core';

// moment
import * as moment from 'moment';
import { Moment } from 'moment';
import {environment} from '../../../environments/environment';
export { Moment } from 'moment';

moment.locale(environment.locale);

@Pipe({
  name: 'moment',
})
export class MomentPipe implements PipeTransform {

  public transform(value?: any, toFormat?: string, fromFormat?: string): string {
      return value && moment(value, fromFormat).isValid() ? moment(value, fromFormat).format(toFormat) : '';
  }
}
