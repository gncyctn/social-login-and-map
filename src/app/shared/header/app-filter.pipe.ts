import { Pipe, PipeTransform } from '@angular/core';

import { SelectApp } from './app-selectapp';

@Pipe({
    name: 'appfilter',
    pure: false
})
export class AppFilterPipe implements PipeTransform {
  
  transform(items: SelectApp[], filter: SelectApp): SelectApp[] {
    

    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    
   
      return items.filter((item: SelectApp) => this.applyFilter(item, filter)); 
    
    
  }
  
  /**
   * Perform the filtering.
   * 
   * @param {Book} book The book to compare to the filter.
   * @param {Book} filter The filter to apply.
   * @return {boolean} True if book satisfies filters, false if not.
   */
  applyFilter(book: SelectApp, filter: SelectApp): boolean {
    
    for (let field in filter) {
      if (filter[field]) {
        
        if (typeof filter[field] === 'string') {
          
          if (book[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        } else if (typeof filter[field] === 'number') {
          if (book[field] !== filter[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}