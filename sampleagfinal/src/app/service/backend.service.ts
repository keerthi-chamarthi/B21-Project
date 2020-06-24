import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { OnInit } from '@angular/core';
// import { Address } from 'cluster';
// import { Detailed } from '../address';
import { User } from '../models/user.model';
import { Address } from '../models/address.model';
import { LoginRequestModel } from '../models/requests';
@Injectable({
  providedIn: 'root'
})
export class BackendService implements OnInit{
  values: any = [];
  Object: any;
  token : any;
  config : any;
  addrdetails: any;
  details: any;
  isAddress: any;

  constructor(private router : Router) { }
  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }
async sendInfo(user: string, passkey: string){

    const instance = axios.create({});
    const requestObj : LoginRequestModel = { Username : user , Password : passkey};
    
  try{
      let resp = await instance.post("/api/auth/user/login", requestObj);
      this.values = resp.data;
    console.log(this.values);
    if(this.values.ResponseCode == 200)
    {
      this.token = this.values.ResponseData.sessionToken;
      this.config = {"headers": {
        "Authorization": "Bearer "+this.token,
        }
      };
      let resp = await axios.get("/api/user/individual/profile", this.config);
      let addrresp = await axios.get("/api/user/individual/address/detailed",this.config);
      console.log(addrresp);
      this.details = new User().deserialize(resp.data.ResponseData);
      this.addrdetails = new Address().deserialize(addrresp.data.ResponseData[0]);
      if(addrresp.data.ResponseData.length != 0) {
        console.log("Address defined ",this.addrdetails.AddressLine1);
        this.routeTo('/user');
      }
      else {
        // this.router.navigate('/')
        this.isAddress = "Address not found";
        this.routeTo('/address');
      }
      console.log("details: ",this.details);
      return this.details;
    }
  }
  catch(err)
  {
    console.log(err);
    this.details = 401;
    this.routeTo('/user');
    return 401;
  }
  
}

async updateInfo(){
  let add = new Address();
  add.AddressLine1 = "11 Cross";
  add.AddressLine2 = "Second Main, Maaruthi Nagar";
  add.City = "Bangalore";
  add.Country = "IN";
  add.Region = "Karnataka";
  add.Street = "80 feet road";
  add.Zip = 560034;
  add.ID = 8731789601955256205;

  let response = await axios.get("/api/user/individual/address/detailed",this.config);
  
  console.log(response.data);

  response = await axios.delete("/api/user/individual/address/detailed/"+response.data.ResponseData[0].ID,this.config)
  console.log("results: ");
  console.log(response.data.ResponseData[0]);

  // let details = await axios.post("/api/user/individual/address/detailed",{
  //   AddressLine1: "11 Cross",
  //   AddressLine2: "Second Main, Maaruthi Nagar",
  //   City: "Bangalore",
  //   Country: "IN",
  //   Region: "Karnataka",
  //   Street: "80 feet road",
  //   Zip: "560034",
  //   // ID: "8731789601955256205"
  //   },this.config);
  // console.log(details);
  
  let resp = await axios.get("/api/user/individual/address/detailed",this.config);
  console.log(resp);

  // let resp = await axios.put("/api/user/individual/address/detailed",  {
  //   AddressLine1: "11 Cross",
  //   AddressLine2: "Second Main, Maaruthi Nagar",
  //   City: "Bangalore",
  //   Country: "IN",
  //   DefaultAddress: true,
  //   ID: "8731789601939789709",
  //   Name: "Address",
  //   Region: "Karnataka",
  //   Street: "80 feet road",
  //   Zip: "560034"
  
  //   },this.config);
  //   console.log(resp);

  // let resp = await axios.get("/api/user/individual/address/detailed",this.config);
  // console.log("UpdateInfo :"+resp);
}

async onUpdate(input){
  console.log("input data ",input);
  let addrresp = await axios.get("/api/user/individual/address/detailed",this.config);
  console.log("getcall",addrresp);
  if(addrresp.data.ResponseData[0].length != 0) {
    let resp = await axios.put("/api/user/individual/address/detailed",  {
      AddressLine1: input.AddressLine1,
      AddressLine2: input.AddressLine2,
      City: input.City,
      Country: input.Country,
      DefaultAddress: true,
      ID: addrresp.data.ResponseData[0].ID,
      Name: "Address",
      Region: input.Region,
      Street: input.Street,
      Zip: input.Zip
    
      },this.config);
      console.log(resp);
      
  }
  else{
    let resp = await axios.post("/api/user/individual/address/detailed/",  {
      AddressLine1: input.AddressLine1,
      AddressLine2: input.AddressLine2,
      City: input.City,
      Country: input.Country,
      DefaultAddress: true,
      // ID: "8731789601939789709",
      Name: "Address",
      Region: input.Region,
      Street: input.Street,
      Zip: input.Zip
    
      },this.config);
      console.log(resp);
  }
  let resp = await axios.get("/api/user/individual/profile", this.config);
  this.details = new User().deserialize(resp.data.ResponseData);
  addrresp = await axios.get("/api/user/individual/address/detailed",this.config);
  this.addrdetails = new Address().deserialize(addrresp.data.ResponseData[0]);
  this.routeTo('/user');
}

routeTo(link:string){
  if(link =='/user')
  this.router.navigateByUrl('/user',{state : this.details});
  else
  this.router.navigateByUrl(link, {state : this.isAddress});
}
}