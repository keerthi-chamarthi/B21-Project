import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap,Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { User } from '../models/user.model';
import { BackendService } from '../service/backend.service';
import { Address } from '../models/address.model';
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
  addDetails : any;
  constructor(private obj: ActivatedRoute,private rou: Router, private backend : BackendService) {
    // this.data = (this.rou.getCurrentNavigation().extras.state);
    
  }

  ngOnInit(): void {
    // this.backend.updateInfo();
    if(this.backend.details == 401){
      this.isLoggedOut = true;
    }
    
    // this.details = new User().deserialize(this.backend.details);
    this.details = JSON.parse(localStorage.getItem('details'));
    console.log(this.data);
    // this.addDetails = new Address().deserialize(this.backend.addrdetails);
    this.addDetails = JSON.parse(localStorage.getItem('addrdetails'));
  }
  update(){
    this.rou.navigateByUrl('/address');
  }
  callBack(){
    // this.backend.routeTo();
  }
}
