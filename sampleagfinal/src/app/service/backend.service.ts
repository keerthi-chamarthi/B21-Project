import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { OnInit } from '@angular/core';
// import { Address } from 'cluster';
import { Detailed } from '../address';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class BackendService implements OnInit{
  values: any = [

  ];
  Object: any;
  token : any;
  config : any;

  // "AddressLine1": "Eleventh Cross",
  //   "AddressLine2": "Maruthi Nagar",
  //   "City": "Bangalore",
  //   "Country": "IN",
  //   "Region": "Karnataka",
  //   "Street": "80 feet road",
  //   "Zip": "560034"

  constructor() { }
  ngOnInit(): void {
    // throw new Error("Method not implemented.");
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
      // console.log(resp);
      let details = new User().deserialize(resp.data.ResponseData);
      console.log(details);
      // this.values= resp.data.ResponseData;
      // details.DisplayName = this.values.DisplayName;
      // details.Address = this.values.Address;
      // details.EmailId = this.values.EmailID;
      // details.BirthDate = this.values.BirthDate;
      return details;
    }
  }
  catch(err)
  {
    console.log(err);
    return 401;
  }
  
}

async updateInfo(){
  let add = new Detailed();
  add.AddressLine1 = "Eleventh Cross";
  add.AddressLine2 = "Maruthi Nagar";
  add.City= "Bangalore";
  add.Country = "IN";
  add.Region = "Karnataka";
  add.Street = "80 feet road";
  add.Zip = 560034;
  let response = await axios.get("/api/user/individual/address/detailed",this.config);
  console.log(response);
  let details = await axios.post("/api/user/individual/address/detailed",{
    AddressLine1: "11 Cross",
    AddressLine2: "Second Main, Maaruthi Nagar",
    City: "Bangalore",
    Country: "IN",
    Region: "Karnataka",
    Street: "80 feet road",
    Zip: "560034",
    ID: "8731789601955256205"
    },this.config);
  console.log(details);
  
  let resp = await axios.get("/api/user/individual/address/detailed",this.config);
  console.log(resp);

  resp = await axios.put("/api/user/individual/address/detailed",{
    AddressLine1 : "Eleventh Cross",
    AddressLine2 : "Maruthi Nagar",
    City:"Bangalore",
    Country : "IN",
    Region : "Karnataka",
    Street : "80 feet road",
    Zip : 560034,
    ID: "8731789601955256205"
    },this.config);

  resp = await axios.get("/api/user/individual/address/detailed",this.config);
  console.log(resp);
}
}