import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../Services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userAuth;
  user_email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  constructor ( private loginService: LoginService, private router: Router ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(){
    this.userAuth = this.loginService.userAuth().subscribe( user => this.processUserInfo(user), err=> this.processErrorResponse(err));

  }

  processErrorResponse(err: any) {
    this.fullName = "Not Signed in";
    this.userAuth.unsubscribe();
      setTimeout(() => this.router.navigateByUrl('/login'), 300);
      
    }

  processUserInfo($User){
    this.fullName = $User.data?.name;
    [this.firstName, this.lastName] = this.fullName.split(' ');
    this.user_email = $User.data?.email;
    // "created_at": "2020-11-22T17:50:42.000000Z",
    // "updated_at": "2020-11-22T17:50:42.000000Z"
  }

}
