import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  
  
  constructor(private http: HttpClient) { 

  }
  login(credentials: string[]) {
    let options: any = {
      headers: {'Content-Type': 'application/json', 'Accept':'application/json'},
      observe: 'response',
      responseType: 'json'
    }
    let body: any = {
      "grant_type": "password",
      "client_id": 2,
      "client_secret": "MvkJrrCQ7FjU2riSlBT3BkoSGvKcQCt8yVAmyhKM",
      "username": credentials[0],
      "password": credentials[1],
      "scope": "*"
    }

    
    return this.http.post('http://localhost/mixnmatch/public/api/oauth/token', body, options); //.pipe( catchError((err: HttpErrorResponse, errorObservable) => errorObservable ));
  }

  userAuth() {
    let access_token = localStorage.getItem('access_token');
    let options: any = {
      headers: {'Authorization': `Bearer ${access_token}`, 'Accept':'application/json'},
    }
    return this.http.get('http://localhost/mixnmatch/public/api/profile', options);//.pipe( catchError((err: HttpErrorResponse, errorObservable) => errorObservable));
    
  }

  signUp(credentials: string[]){
    let options: any = {
      headers: {'Content-Type': 'application/json', 'Accept':'application/json'},
      observe: 'response',
      responseType: 'json'
    }

    let signUpBody: any = {
      "name": credentials[0],
      "email": credentials[1],
      "password": credentials[2],
      "password_confirmation": credentials[2]
    }

  return this.http.post('http://localhost/mixnmatch/public/api/auth/register', signUpBody, options); //.pipe( catchError((err: HttpErrorResponse, errorObservable) => errorObservable ));

  }


}