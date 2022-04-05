import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noData'
})
export class NoDataPipe implements PipeTransform {

    /**
     * It transforms the data.
     * @param {string} data - The data to be transformed.
     * @returns The transformed data.
     */
    transform( data : string ): string {
        if ( !data ) {
            return 'No data';
        }
        return data;
    }

}
