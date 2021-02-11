import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class CountryService {

  constructor(private http: HttpClient) {
  }
  
  getCountrys() {
    return this.http.get('https://restcountries.eu/rest/v2/lang/es').pipe(
      map( (resp: any[]) => {
        return resp.map( country => {
          return {
            name: country.name,
            code: country.alpha3Code
          }
        });
      })
    );

    // Segunda forma de retornar con MAP de una forma más resumida.
    /* return this.http.get('https://restcountries.eu/rest/v2/lang/es').pipe(
      map( (resp: any[]) => 
      resp.map( country => ({ name: country.name, code: country.alpha3Code }) )
    )); */
  }

}
