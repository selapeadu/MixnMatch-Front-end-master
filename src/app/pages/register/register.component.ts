import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../Services/login.service';
import { Router } from '@angular/router';
//import { map } from 'rxjs/operators'
import { Subscription, timer } from 'rxjs/'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  buttonDisabled: boolean;
  buttonActive: boolean;
  tryLogin;
  progress: number;
  showProgress: boolean = false;
  numEmitter: Subscription;
  invalidInput: boolean = false;
  invalidName: boolean = false;
  invalidEmail: boolean = false;
  invalidPassword: boolean = false;


  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm){
  this.invalidName = false;
  this.invalidEmail = false;
  this.invalidPassword = false;
    let fullNameFlag: boolean = false;
    if (!f.value?.fullName) fullNameFlag = true;
    let emailFlag: boolean  = false;
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(f.value?.login_email)){
      emailFlag = true;
    }
    let passwordFlag: boolean = false;
    if (f.value?.login_password.length < 8) passwordFlag = true;

    switch( true ) {
      case  fullNameFlag:
        this.invalidName = true;
      case emailFlag:
       this.invalidEmail = true;
      case passwordFlag:
        this.invalidPassword = true;        
      default:
        // code block
    }

    if (!this.invalidName && !this.invalidEmail && !this.invalidPassword) {
      this.signup(f);
      this.buttonDisabled = true;

    } //else this.invalidInput = true;

  }
 
 signup(form: NgForm) {
    this.progressCount();
    this.invalidInput = false;
    let login_credentials: string[] = [].concat(form.value?.fullName).concat(form.value?.login_email).concat(form.value?.login_password);
    this.tryLogin = this.loginService.signUp(login_credentials).subscribe(response => { this.tryLogin.unsubscribe(), this.processSignUpResponse(response) },
     error=> {this.processErrorResponse(error)});
  }

  processSignUpResponse(response: any) {
    this.numEmitter.unsubscribe();
    this.buttonDisabled = false;
    this.buttonActive = true;
    if (response?.status < 400) {
      console.log('Sign up Success');
      localStorage.setItem('access_token', response?.access_token);
      this.progress = 100;
      setTimeout(() => this.showProgress = false, 300);
      this.router.navigateByUrl('/dashboard');
    }
  }

  processErrorResponse(err: any) {
    this.buttonDisabled = false;
    this.buttonActive = true;
      // Animate input fields and show red form validation.
      console.log("Sign up failed, please try again");
      setTimeout(() => this.showProgress = false, 300);
      //this.tryLogin.unsubscribe();
    }


  progressCount() {
    this.showProgress = true;
    this.numEmitter = timer(100, 1000).subscribe(num => this.progress = num * 10);
  }


}
