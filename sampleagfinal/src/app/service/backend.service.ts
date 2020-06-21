import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { OnInit } from '@angular/core';
import { User } from '../user';
@Injectable({
  providedIn: 'root'
})
export class BackendService implements OnInit{
  values: any = [

  ];
  Object: any;
  token : any;
  config : any;
  constructor() { }
  ngOnInit(): void {
    throw new Error("Method not implemented.");
    
  }

async sendInfo(user: string, passkey: string){
    const instance = axios.create({});
  try{
      let resp = await instance.post("/api/auth/user/login", {
      Username: user,
      Password: passkey
    })
    this.values = resp.data;
    if(this.values.ResponseCode == 200)
    {
      this.token = this.values.ResponseData.sessionToken;
      this.config = {"headers": {
        "Authorization": "Bearer "+this.token,
        }
      };
      let resp = await axios.get("/api/user/individual/profile", this.config);
      console.log(resp);
      let details = new User();
      this.values= resp.data.ResponseData;
      details.DisplayName = this.values.DisplayName;
      details.Address = this.values.Address;
      details.EmailId = this.values.EmailID;
      details.BirthDate = this.values.BirthDate;
      return details;
    }
  }
  catch(err)
  {
    console.log(err);
    return 401;
  }
  
}
}