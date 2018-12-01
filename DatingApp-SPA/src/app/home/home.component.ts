import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode =false;
  values: any;
  constructor(private httpclient: HttpClient) { }

  ngOnInit() {
   
  }

  registerToggle() {
    
    this.registerMode =!this.registerMode;
   }


   cancelRegisterMode(Registermode: boolean){

   this.registerMode = Registermode;
   }
}
