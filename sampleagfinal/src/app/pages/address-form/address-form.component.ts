import { Component, OnInit } from '@angular/core';
import {
  faMapMarker,
  faGlobe,
  faChartArea,
  faRoad,
  faCity,
  faMapPin
} from '@fortawesome/free-solid-svg-icons';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/service/backend.service';
import { Address } from 'src/app/models/responses/address.model';
// import { Address } from '../models/address.model';
@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
})
export class AddressFormComponent implements OnInit {
  faMapMarker = faMapMarker;
  faGlobe = faGlobe;
  faChatArea = faChartArea;
  faRoad = faRoad;
  faCity = faCity;
  faMapPin = faMapPin;
  addressForm: FormGroup;
  data: any;
  NoAddressFound : boolean = false;
  constructor(private fb: FormBuilder, private router: Router, private backend: BackendService) {
    this.data = (this.router.getCurrentNavigation().extras.state);
    if(!this.data){
      this.NoAddressFound = true;
    }
  }

  ngOnInit(): void { this.initRegForm()}
  initRegForm(){
    this.addressForm = this.fb.group({
      AddressLine1: ['', [Validators.required]],
      AddressLine2: ['', [Validators.required]],
      City: ['', Validators.required],
      Country: ['', Validators.required],
      Region: ['', Validators.required],
      Street: ['', Validators.required],
      Zip: ['', Validators.required],
    });
  }
  fillAddress(){
    this.NoAddressFound = false;
  }
  upload(user){
    console.log("Hello");
    console.log(user);
    let address = new Address().deserialize(user);
    console.log(address);
    this.backend.updateDetailedAddress(address);
  }

  callBack(){
    this.backend.routeTo('/user');
  }
}
