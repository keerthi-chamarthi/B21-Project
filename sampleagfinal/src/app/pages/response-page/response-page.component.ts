import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap,Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { BackendService } from 'src/app/service/backend.service';
@Component({
  selector: 'app-response-page',
  templateUrl: './response-page.component.html',
  styleUrls: ['./response-page.component.scss'],
})
export class ResponsePageComponent implements OnInit {
  faUser = faUser;
  names = localStorage.getItem("username");
  public data;
  details : any;
  addDetails : any;
<<<<<<< HEAD
  // ImageURL: string;
=======
>>>>>>> master
  constructor(private obj: ActivatedRoute,private rou: Router, private backend : BackendService) {
    this.details = JSON.parse( localStorage.getItem("userData") );
    console.log(this.data);
    //this.addDetails = new Address().deserialize(this.backend.addrdetails);
    this.addDetails = JSON.parse(localStorage.getItem("detailedAddress"));
  }

  ngOnInit(): void {
    // this.backend.updateInfo();
<<<<<<< HEAD
    // this.ImageURL = "data:image/png;base64, " + this.backend.userProfileDetails.ImageURL;
=======
>>>>>>> master
  }
  update(){
    this.rou.navigateByUrl('/address');
  }
  callBack(){
    // this.backend.routeTo();
  }
  logout(){
    localStorage.clear();
    this.rou.navigateByUrl('/');
  }

  deleteAddress(){
    this.backend.deleteAddress();
  }
}
