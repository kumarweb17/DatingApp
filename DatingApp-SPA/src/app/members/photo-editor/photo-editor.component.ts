import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Photo } from 'src/app/_models/photo';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {

  @Input() photos:Photo[];

  @Output() getmemberphoteoChange = new EventEmitter<string>();

 uploader:FileUploader;
 hasBaseDropZoneOver = false;
 baseurl = environment.apiUrl;
 Currentmain: Photo;

  constructor(private authservice: AuthService, private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.initilizeuploader();
  }


  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  initilizeuploader(){

 this.uploader=new FileUploader ({
  url:this.baseurl + 'users/' + this.authservice.decodedtoken.nameid + '/photos',
  authToken: "Bearer " + localStorage.getItem('token'),
  isHTML5:true,
  allowedFileType:['image'],
  removeAfterUpload: true,
  autoUpload: false,
  maxFileSize :10 * 1024 * 1024

 });

       this.uploader.onAfterAddingFile =(file) => { file.withCredentials= false; };

       this.uploader.onSuccessItem = (item, response, status, headers)=> {

if(response){

  const res :Photo =JSON.parse(response);

  const photo = {

    id:res.id,
    url: res.url,
    dateAdded: res.dateAdded,
    description: res.description,
    isMain:res.isMain
  };
  this.photos.push(photo);


}
       }

  }


  setMainPhoto(photo: Photo){

      this.userService.setMainPhoto(this.authservice.decodedtoken.nameid, photo.id).subscribe(() =>
      {
        this.Currentmain = this.photos.filter(p =>p.isMain === true)[0];
        this.Currentmain.isMain = false;
        photo.isMain=true;
       //this.getmemberphoteoChange.emit(photo.url);
       this.authservice.changeMemberPhoto(photo.url);
       this.authservice.currentUser.photoUrl=photo.url;
       localStorage.setItem('user',JSON.stringify(this.authservice.currentUser));
      },

       error =>{this.alertify.error(error)}
      )
  }


  deletePhoto(id: number) {
    this.alertify.confirm('Are you sure you want to delete this photo?', () => {
      this.userService.deletePhoto(this.authservice.decodedtoken.nameid, id).subscribe(() => {
        this.photos.splice(this.photos.findIndex(p => p.id === id), 1);
        this.alertify.success('Photo has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the photo');
      });
    });
  }
  
}
