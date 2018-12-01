import { Component, OnInit } from '@angular/core';
import {AuthService} from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})

export class NavComponent implements OnInit {
model: any = {};

constructor(private authservice:AuthService) { }

  ngOnInit() {
  }

login() {
  
 this.authservice.login(this.model).subscribe(
   (next) => { console.log("login successfully") },
    error => { console.log("login Fialed") },
    () => { console.log("login Completed") }
  );

}

loggedIn() {
  const token=localStorage.getItem('token');
  return !!token;
}

logout() {
 localStorage.removeItem('token');
}
}
