import { Pipe, PipeTransform } from '@angular/core';

/*
 * Converts newlines into html breaks
*/
@Pipe({ name: 'toBr' })
export class ToBrPipe implements PipeTransform {
    transform(value: string, args: string[]): any {
        return value ? value.replace(/(?:\r\n|\r|\n)/g, '<br />') : value;
    }
}
