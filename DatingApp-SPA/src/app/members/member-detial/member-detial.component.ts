import { Component, OnInit } from "@angular/core";
import { AlertifyService } from "src/app/_services/alertify.service";
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { ActivatedRoute } from "@angular/router";
import { UserService } from "src/app/_services/user.service";
import { User } from "src/app/_models/user";

@Component({
  selector: "app-member-detial",
  templateUrl: "./member-detial.component.html",
  styleUrls: ["./member-detial.component.css"]
})
export class MemberDetialComponent implements OnInit {
  user: User;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(
    private userservice: UserService,
    private alertify: AlertifyService,
    private router: ActivatedRoute
  ) {}

  ngOnInit() {
    //this.loadUser();

    this.router.data.subscribe((data)=>
    {
      this.user=data['user'];
    })


    this.galleryOptions = [
      {
          width: '600px',
          height: '400px',
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide,
          preview: false
      },
     
     
  ];
 
  this.galleryImages = this.getImages();
  
}

getImages(){

const imageUrls = [];

for(let i=0; i< this.user.photos.length; i++){
  imageUrls.push({
      small : this.user.photos[i].url,
      medium:this.user.photos[i].url,
      big: this.user.photos[i].url
  })  
}
return imageUrls;

}

  // loadUser() {
  //   this.userservice.getUser(+this.router.snapshot.params["id"]).subscribe(
  //     (user: User) => {
  //       this.user = user;
  //       console.log(this.user);
  //     },
  //     error => {
  //       this.alertify.error(error);
  //     }
  //   );
  // }
}
