import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../../Services/login.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  logged_user_name: string;
  userAuth;
  constructor(location: Location, private element: ElementRef, private loginService: LoginService, private router: Router) {
    this.location = location;
    
    if(localStorage.getItem('access_token')) this.getUser(); 
        else this.router.navigateByUrl('/login');
    
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }
  getUser(){
    this.userAuth = this.loginService.userAuth().subscribe( user => this.processUserInfo(user), err=> this.processErrorResponse(err));

  }

  processErrorResponse(err: any) {
    this.logged_user_name = "Not Signed in";
    this.userAuth.unsubscribe();
      setTimeout(() => this.router.navigateByUrl('/login'), 300);
      
    }

  processUserInfo($User){
    this.logged_user_name = $User.data?.name;
  }

  logout(){
    localStorage.setItem('access_token', '');
    this.router.navigateByUrl('/login');
  }

}
