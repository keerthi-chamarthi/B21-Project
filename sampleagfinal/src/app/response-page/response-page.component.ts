import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap,Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { User } from '../models/user.model';
import { BackendService } from '../service/backend.service';
@Component({
  selector: 'app-response-page',
  templateUrl: './response-page.component.html',
  styleUrls: ['./response-page.component.scss'],
})
export class ResponsePageComponent implements OnInit {
  faUser = faUser;
  public data;
  public isLoggedOut : boolean =false;
  details : any;
  constructor(private obj: ActivatedRoute,private rou: Router, private backend : BackendService) {
    this.data = (this.rou.getCurrentNavigation().extras.state);
    if(this.data == 401){
      this.isLoggedOut = true;
    }
    this.details = new User().deserialize(this.data);
    console.log(this.data);
  }

  ngOnInit(): void {
    this.initRegForm();
    this.backend.updateInfo();
 
  }
  initRegForm(){
  }

}
