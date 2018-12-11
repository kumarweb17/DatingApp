import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

@Output() CancelRegister =new EventEmitter();

model :any ={ };

  constructor(private authservice:AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  register() {
      this.authservice.register(this.model).subscribe( () =>  { 
      this.alertify.success("Register Succeessfully"); 
      }, 
      error => { 
        this.alertify.error(error);
       }
    );
  }

  cancel() {
    this.CancelRegister.emit(false);
    console.log("Cancelled");
  }

}
