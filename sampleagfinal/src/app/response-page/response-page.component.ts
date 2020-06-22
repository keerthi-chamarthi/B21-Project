import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap,Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { BackendService } from '../service/backend.service';
import { User } from '../models/user.model';
@Component({
  selector: 'app-response-page',
  templateUrl: './response-page.component.html',
  styleUrls: ['./response-page.component.scss'],
})
export class ResponsePageComponent implements OnInit {
  faUser = faUser;
  public data;
  public isLoggedIn : boolean =false;
  details = new User();
  constructor(private obj: ActivatedRoute,private rou: Router, private backend : BackendService) {
    this.data = (this.rou.getCurrentNavigation().extras.state);
    if(this.data == 401){
      this.isLoggedIn = true;
    }
    // let details = new User();
    this.details=this.data;
    console.log(this.data);
    console.log(this.details.EmailID);
    // console.log(this.details.DisplayName);
  }

  ngOnInit(): void {
    this.backend.updateInfo();
    
  }
}
