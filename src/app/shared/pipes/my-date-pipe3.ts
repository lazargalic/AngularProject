import { DatePipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'samoDatumPipe3'
  })

export class MyDatePipe3 implements PipeTransform {
    transform(value: any, format: string = 'dd.MM.yyyy'): string {
      const datePipe: DatePipe = new DatePipe('en-US');
      return datePipe.transform(value, format);
    }
  }