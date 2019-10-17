import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from 'src/environments/environment';
import { ColorsResponse } from './colors-response';

@Injectable()
export class AppService {

    private apiEndpoint = environment.apiUrl;

    constructor(private http: Http) {}

    getColors(): Promise < ColorsResponse > {

      let url = `${this.apiEndpoint}/colors`;

      return this.http.get(url)
          .toPromise()
          .then(response => response.json())
          .catch(this.handleError);
    }

    getColorsPerPage(page: number): Promise < ColorsResponse > {
      
      let url = `${this.apiEndpoint}/colors?page=${page}`;

      return this.http.get(url)
          .toPromise()
          .then(response => response.json())
          .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('error', error);
        return Promise.reject(error.message || error);
    }

}
