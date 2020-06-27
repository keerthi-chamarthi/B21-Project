import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap,Router } from '@angular/router';
// import { faUser } from '@fortawesome/free-solid-svg-icons';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-response-page',
  templateUrl: './response-page.component.html',
  styleUrls: ['./response-page.component.scss'],
})
export class ResponsePageComponent implements OnInit {
  // s = faUser;
  names = localStorage.getItem("username");
  public data;
  public isLoggedOut : boolean =false;
  details : any;
  addDetails : any;
  ImageURL: string;
  image : boolean = false;
  constructor(private obj: ActivatedRoute,private rou: Router, private backend : BackendService) {
    this.details = JSON.parse( localStorage.getItem("userData") );
    console.log(this.details);
    //this.addDetails = new Address().deserialize(this.backend.addrdetails);
    this.addDetails = JSON.parse(localStorage.getItem("detailedAddress"));
    console.log(this.addDetails);
    this.details.ImageURL = undefined;
    if(this.details.ImageURL == undefined ){
      this.image = true;
      if(this.details.Gender == "Male"){
        this.details.ImageURL = "assets/images/male.jpg";
      }
      else{
        this.details.ImageURL = "assets/images/female.jpg";
      }
    }
    this.ImageURL = this.details.ImageURL;
  }

  ngOnInit(): void {
    // this.backend.updateInfo();
    // this.ImageURL = "data:image/png;base64, " + this.backend.userProfileDetails.ImageURL;
    // this.details = JSON.parse( localStorage.getItem("userData") );
    // console.log(this.data);
    // //this.addDetails = new Address().deserialize(this.backend.addrdetails);
    // this.addDetails = JSON.parse(localStorage.getItem("detailedAddress"));
    // console.log(this.addDetails);
  }
  update(){
    this.rou.navigateByUrl('/address');
  }
  callBack(){
    // this.backend.routeTo();
  }
}
