import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
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
  constructor(private obj: ActivatedRoute) {}

  ngOnInit(): void {
    this.obj.paramMap.subscribe(
      (params: ParamMap) => (this.data = params.get('name'))
    );
    // this.displayName = this.data.DisplayName;
    this.data = JSON.parse(this.data);
    console.log(this.data);
    this.displayName = this.data.DisplayName;
    this.address = this.data.Address;
    this.email = this.data.EmailID;
    this.birthdate = this.data.BirthDate;
  }
}
