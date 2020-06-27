import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BackendService } from 'src/app/service/backend.service';
import { Address } from 'src/app/models/responses';
@Component({
  selector: 'app-response-page',
  templateUrl: './response-page.component.html',
  styleUrls: ['./response-page.component.scss'],
})
export class ResponsePageComponent implements OnInit {
  names = localStorage.getItem('username');
  public data;
  details: any;
  addDetails: any;
  ImageURL: string;
  image: boolean = false;
  public updateaddressconfirm: boolean = false;
  public add;
  constructor(
    private obj: ActivatedRoute,
    private rou: Router,
    private backend: BackendService
  ) {
     
      console.log('after delete');
      this.details = JSON.parse(localStorage.getItem('userData'));
      console.log(this.details);
     
     if(localStorage.getItem('detailedAddress') !== 'deleted') {
      this.addDetails = JSON.parse(localStorage.getItem('detailedAddress'));
      this.updateaddressconfirm = true;
    }
     else{
       this.addDetails = new Address();
      this.addDetails.AddressLine1 = "not yet updated";
     }
      
      console.log(this.addDetails);
      console.log(this.updateaddressconfirm);
      if (this.details.ImageURL == undefined) {
        this.image = true;
        if (this.details.Gender == 'Male') {
          this.details.ImageURL = 'assets/images/male.jpg';
        } else {
          this.details.ImageURL = 'assets/images/female.jpg';
        }
      }
      this.ImageURL = this.details.ImageURL;}
  

  ngOnInit(): void {
  }
  update() {
    this.rou.navigateByUrl('/address');
  }
  callBack() {
    // this.backend.routeTo();
  }
  logout() {
    localStorage.clear();
    this.rou.navigateByUrl('/');
  }

  deleteAddress() {
    this.backend.deleteAddress();
  }
}
