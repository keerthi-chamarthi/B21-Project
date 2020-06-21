import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap,Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { User } from '../user';
@Component({
  selector: 'app-response-page',
  templateUrl: './response-page.component.html',
  styleUrls: ['./response-page.component.scss'],
})
export class ResponsePageComponent implements OnInit {
  faUser = faUser;
  public data;
  public displayName: string = '';
  public email : string;
  public address : string;
  public birthdate : string;
  public isLoggedIn : boolean =false;
  constructor(private obj: ActivatedRoute,private rou: Router) {
    this.data = (this.rou.getCurrentNavigation().extras.state);
    if(this.data == 401){
      this.isLoggedIn = true;
    }
    let details = new User();
    details=this.data;
    this.displayName = details.DisplayName;
    this.address = details.Address;
    this.email = details.EmailId;
    this.birthdate = details.BirthDate;
    console.log(this.data);
  }

  ngOnInit(): void {
    this.obj.paramMap.subscribe(
      (params: ParamMap) => (this.data = params.get('name'))
    );
    // this.displayName = this.data.DisplayName;
    
 
  }
}
