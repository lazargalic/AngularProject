import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'samoDatumPipe2'
  })

export class MyDatePipe2 implements PipeTransform {
    transform(value: any, format: string = 'dd.MM.yyyy'): string {
      const datePipe: DatePipe = new DatePipe('en-US');
      return datePipe.transform(value, format);
    }
  }