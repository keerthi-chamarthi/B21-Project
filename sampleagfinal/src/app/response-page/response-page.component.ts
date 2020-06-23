import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap,Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
// import { User } from '../user';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { User } from '../models/user.model';
import { Address } from '../models/address';
import { BackendService } from '../service/backend.service';
@Component({
  selector: 'app-response-page',
  templateUrl: './response-page.component.html',
  styleUrls: ['./response-page.component.scss'],
})
export class ResponsePageComponent implements OnInit {
  faUser = faUser;
  public data;public addr1;public addr2;public street;public city;
  public zip;public region; public country;public ma = false;
  public displayName: string = '';
  public email : string;
  public address : string;
  public birthdate : string;
  public isLoggedOut : boolean =false;public fields;
  
  
  constructor(private obj: ActivatedRoute,private rou: Router,private bu: FormBuilder,private backend: BackendService) {
    this.data = (this.rou.getCurrentNavigation().extras.state);
    if(this.data == 401){
      this.isLoggedOut = true;
    }
    let details = new User();

    details=this.data;

    this.displayName = details.DisplayName;
    this.address = details.Address;
    this.email = details.EmailID;
    this.birthdate = details.BirthDate;
    console.log(this.data);
  }

  ngOnInit(): void {
    this.initRegForm();
    this.backend.updateInfo();
 
  }
  initRegForm(){
  }

}
