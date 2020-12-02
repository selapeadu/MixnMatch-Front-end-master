import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../Services/login.service';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs/';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  buttonDisabled: boolean;
  buttonActive: boolean;
  tryLogin;
  progress: number;
  showProgress: boolean = false;
  numEmitter: Subscription;
  invalidInput: boolean = false;


  constructor(private router: Router, private loginService: LoginService) {

  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  onSubmit(f: NgForm) {
    console.log('Submit clicked!')
    if (f.value?.login_email && f.value?.login_password) {
      this.login(f);
      this.buttonDisabled = true;
    } else this.invalidInput = true;
  }

  login(form: NgForm) {
    this.progressCount();
    this.invalidInput = false;
    let login_credentials: string[] = [].concat(form.value?.login_email).concat(form.value?.login_password);
    this.tryLogin = this.loginService.login(login_credentials).subscribe(response => { this.tryLogin.unsubscribe(), this.processLoginResponse(response) },
     error=> {this.processErrorResponse(error)});
  }

  processLoginResponse(response: any) {
    console.log(response);
    this.numEmitter.unsubscribe();
    this.buttonDisabled = false;
    this.buttonActive = true;
    if (response?.status < 400) {
      console.log('login Success');
      //store access token
      localStorage.setItem('access_token', response?.body?.access_token);
      this.progress = 100;
      setTimeout(() => this.showProgress = false, 300);
      this.router.navigateByUrl('/dashboard');
    }
  }
  processErrorResponse(err: any) {
    this.buttonDisabled = false;
    this.buttonActive = true;
      // Animate input fields and show red form validation.
      console.log('login failed');
      this.invalidInput = true;
      //alert("Email or password is not correct");
      setTimeout(() => this.showProgress = false, 300);
      //this.tryLogin.unsubscribe();
    }


  

  progressCount() {
    //  const start = 10;
    // Rx.Observable.timer(100, 100) // timer(firstValueDelay, intervalBetweenValues)
    // .map(i => start - i)
    // .take(start + 1)
    // .subscribe(i => console.log(i));
    this.showProgress = true;
    this.numEmitter = timer(100, 1000).subscribe(num => this.progress = num * 10);
  }
}
