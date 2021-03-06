import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Cliente } from '../cliente';

@Injectable()
export class LoginService {

  private loginUrl = 'api/cliente/login';
  

  constructor(private http: Http) { }

  login(cliente: Cliente): Promise<Cliente> {
    return this.http.post(this.loginUrl, cliente)
      .toPromise()
      .then(response => response.json().data as Cliente)
      .catch(this.handleError);
  }
  
  private handleError(error: any): Promise<any> {
    //console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
