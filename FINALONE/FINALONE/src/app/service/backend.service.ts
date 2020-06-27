import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { OnInit } from '@angular/core';
import {
  LoginRequestModel,
  PutAddressRequest,
  PostAddressRequest,
} from '../models/requests';
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
  navigateStatus: boolean;
  message: any;
  constructor(private router: Router) {}
  ngOnInit(): void {}

  async login(user: string, passkey: string) {
    const instance = axios.create({});
    const requestObj: LoginRequestModel = { Username: user, Password: passkey };
    try {
      let postResponse = await instance.post(
        '/api/auth/user/login',
        requestObj
      );
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
        localStorage.setItem('config',JSON.stringify(this.config));
        await this.getDetailedAddress();
        if (this.AddressFound) {
          this.navigateStatus = true;
          console.log('Address defined ', this.detailedAddress.AddressLine1);
          await this.getProfileDetails();
          this.routeTo('/user');
        } else {
          this.message = 'Address not found';
          localStorage.setItem('detailedAddress', 'deleted');
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
    this.token = localStorage.getItem('token');
    this.config = {
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    };
    console.log('input data ', input);
    await this.getDetailedAddress();
    if (this.AddressFound) {
      await this.putDetailedAddress(input);
    } else {
      await this.postDetailedAddress(input);
    }
    await this.getProfileDetails();
    await this.getDetailedAddress();
    this.routeTo('/user');
  }
 
  async deleteAddress() {
    this.token = localStorage.getItem('token');
    this.config = {
      headers: {
        Authorization: 'Bearer ' + this.token,
      },
    };
    await this.getDetailedAddress();
    console.log(this.config);
    let deleteResponse = await axios.delete(
      '/api/user/individual/address/detailed/' + this.detailedAddress.ID,
      this.config
    );
    localStorage.setItem('detailedAddress', 'deleted');
    console.log(this.detailedAddress.AddressLine1);
    console.log('deletion working');
    await this.getProfileDetails();
    this.routeTo('user');
    console.log('results: ');
    console.log(deleteResponse.data.ResponseData);
  }

  async getProfileDetails() {
    this.config = JSON.parse(localStorage.getItem("config"));
    console.log("getProfileDetails");
    let resp = await axios.get('/api/user/individual/profile', this.config);
    this.userProfileDetails = new User().deserialize(resp.data.ResponseData);
    
    localStorage.setItem('userData', JSON.stringify(this.userProfileDetails));
    console.log(resp.data.ResponseData);
    this.router.navigate(['test']);
  }

  async getDetailedAddress() {
    console.log(localStorage.getItem("token"));
    let getResponse = await axios.get(
      '/api/user/individual/address/detailed',
      this.config
    );
    if (getResponse.data.ResponseData.length != 0) {
      this.AddressFound = true;
    } else {
      this.AddressFound = false;
    }
    console.log('AddressFound');
    this.detailedAddress = new Address().deserialize(
      getResponse.data.ResponseData[0]
    );
    console.log(this.detailedAddress);
    localStorage.setItem(
      'detailedAddress',
      JSON.stringify(this.detailedAddress)
    );
  }

  async putDetailedAddress(input) {
    console.log(this.detailedAddress.ID);
    const putRequestObject: PutAddressRequest = {
      AddressLine1: input.AddressLine1,
      AddressLine2: input.AddressLine2,
      City: input.City,
      Country: input.Country,
      DefaultAddress: true,
      ID: String(this.detailedAddress.ID),
      Name: 'Address',
      Region: input.Region,
      Street: input.Street,
      Zip: input.Zip,
    };

    let putResponse = await axios.put(
      '/api/user/individual/address/detailed',
      putRequestObject,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      }
    );
    console.log('upload is working');
    console.log(putResponse);
  }

  async postDetailedAddress(input) {
    const postRequestObject: PostAddressRequest = {
      AddressLine1: input.AddressLine1,
      AddressLine2: input.AddressLine2,
      City: input.City,
      Country: input.Country,
      DefaultAddress: true,
      Name: 'Address',
      Region: input.Region,
      Street: input.Street,
      Zip: input.Zip,
    };
    let postResponse = await axios.post(
      '/api/user/individual/address/detailed/',
      postRequestObject,
      this.config
    );
    console.log(postResponse);
  }

  routeTo(link: string) {
    if (link == '/user') this.router.navigateByUrl('/user');
    else this.router.navigateByUrl(link, { state: this.message });
  }
}
