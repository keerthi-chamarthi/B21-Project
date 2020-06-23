import { Component, OnInit } from '@angular/core';
import {
  faMapMarker,
  faGlobe,
  faChartArea,
  faRoad,
  faCity,
} from '@fortawesome/free-solid-svg-icons';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '../service/backend.service';
import { Address } from '../models/address';
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
  addressForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private backend: BackendService) {}

  ngOnInit(): void { this.initRegForm()}
  initRegForm(){
    this.addressForm = this.fb.group({
      AddressLine1: ['', [Validators.required]],
      AddressLine2: ['', [Validators.required]],
      City: ['', Validators.required],
      Country: ['', Validators.required],
      Region: ['', Validators.required],
      Street: ['', Validators.required],
      // Zip: ['', Validators.required],
    });
  }

  update(user){
    console.log("Hello");
    console.log(user);
    let address = new Address().deserialize(user);
    console.log(address);
    this.backend.updateInfo(address);
  }
}
