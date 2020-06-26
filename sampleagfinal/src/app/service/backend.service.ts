import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { OnInit } from '@angular/core';
import { LoginRequestModel, UpdateAddressRequest } from '../models/requests';
import { User } from '../models/responses/user.model';
import { Address } from '../models/responses/address.model';

@Injectable({
  providedIn: 'root',
})
export class BackendService implements OnInit {
  values: any = [];
  Object: any;
  token: any;
  config: any;
  detailedAddress: Address;
  userProfileDetails: any;
  AddressFound: boolean;
  message : any;
  navigateStatus: boolean;

  constructor(private router: Router) {}
  ngOnInit(): void {}

  async login(user: string, passkey: string) {
    const instance = axios.create({});
    const requestObj: LoginRequestModel = { Username: user, Password: passkey };
    try {
      let postResponse = await instance.post('/api/auth/user/login', requestObj);
      this.values = postResponse.data;
      console.log(this.values);
      if (this.values.ResponseCode == 200) {
        this.token = this.values.ResponseData.sessionToken;
        this.config = {
          headers: {
            Authorization: 'Bearer ' + this.token,
          },
        };
        localStorage.setItem('token', this.token);
        await this.getDetailedAddress();
        if (this.AddressFound) {
          this.navigateStatus = true;
          console.log('Address defined ', this.detailedAddress.AddressLine1);
          await this.getProfileDetails();
          this.routeTo('/user');
        } 
        else {
          this.message = "Address not found";
          this.routeTo('/address');
        }
        return this.userProfileDetails;
      }
    } catch (err) {
      console.log(err);
      this.userProfileDetails = 401;
      return 401;
    }
  }

  async updateDetailedAddress(input) {
    console.log('input data ', input);
    await this.getDetailedAddress();
    if (this.AddressFound) {
      await this.putDetailedAddress(input);
    } 
    else {
      await this.postDetailedAddress(input);
    }
    await this.getProfileDetails();
    await this.getDetailedAddress();
    this.routeTo('/user');
  }

  async deleteAddress(){
    await this.getDetailedAddress();
    let deleteResponse = await axios.delete(
      '/api/user/individual/address/detailed/' +
      this.detailedAddress.ID,
      this.config
    );
    console.log('results: ');
    console.log(deleteResponse.data.ResponseData[0]);
  }

  async getProfileDetails(){
    let resp = await axios.get('/api/user/individual/profile', this.config);
    this.userProfileDetails = new User().deserialize(resp.data.ResponseData);
    localStorage.setItem('userData', JSON.stringify(this.userProfileDetails));
  }

  async getDetailedAddress(){
    let getResponse = await axios.get('/api/user/individual/address/detailed',this.config);
    if(getResponse.data.ResponseData.length != 0){
      this.AddressFound = true;
    }
    else{
      this.AddressFound = false;
    }
    console.log("AddressFound");
    this.detailedAddress = new Address().deserialize(getResponse.data.ResponseData[0]);
    console.log(this.detailedAddress);
    localStorage.setItem('detailedAddress',JSON.stringify(this.detailedAddress));
  }

  async putDetailedAddress(input){
    const putRequestObject : UpdateAddressRequest = {
      AddressLine1: input.AddressLine1,
      AddressLine2: input.AddressLine2,
      City: input.City,
      Country: input.Country,
      DefaultAddress: true,
      ID: this.detailedAddress.ID,
      Name: 'Address',
      Region: input.Region,
      Street: input.Street,
      Zip: input.Zip,}

    let putResponse = await axios.put('/api/user/individual/address/detailed',putRequestObject,this.config);
      console.log(putResponse);
  }

  async postDetailedAddress(input){
    let postResponse = await axios.post(
      '/api/user/individual/address/detailed/',
      {
        AddressLine1: input.AddressLine1,
        AddressLine2: input.AddressLine2,
        City: input.City,
        Country: input.Country,
        DefaultAddress: true,
        // ID: "8731789601939789709",
        Name: 'Address',
        Region: input.Region,
        Street: input.Street,
        Zip: input.Zip,
      },
      this.config
    );
    console.log(postResponse);
  }

  routeTo(link: string) {
    if (link == '/user')
      this.router.navigateByUrl('/user', { state: this.userProfileDetails });
    else 
      this.router.navigateByUrl(link, { state: this.message });
  }
}
