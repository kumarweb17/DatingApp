import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable()

export class MemberEditResolver implements  Resolve<User>{
  
constructor(private userService:UserService , private router:Router, private authservice: AuthService ,private alertify:AlertifyService) {}

resolve(route : ActivatedRouteSnapshot) :Observable<User>{

return this.userService.getUser(this.authservice.decodedtoken.nameid).pipe(

    catchError(error => {
       this.alertify.error('problem with solving your data');
        this.router.navigate['/members'];
        return of(null);
    })
)

    }
}
