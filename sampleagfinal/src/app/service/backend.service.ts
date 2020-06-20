import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { OnInit } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class BackendService implements OnInit{
  values: any = [

  ];
  Object: any;
  constructor() { }
  ngOnInit(): void {
    throw new Error("Method not implemented.");
    
  }

async sendInfo(user: string, passkey: string){
    const instance = axios.create({});
    var config = {
      "headers": {
          "Authorization": "Bearer YsqC7eThciFrGzWjBmo9bdx7MifbPIpt"
      }
  };
  try{
      let resp = await axios.all ([instance.post("/api/auth/user/login", {
      Username: user,
      Password: passkey
    }),
    axios.get("/api/user/individual/profile", config)
  ]);
    this.values = resp[0].data;
    console.log(resp[0].data);
    console.log(resp[1].data);
    if(this.values.ResponseCode == 200)
    {
      return resp[1].data.ResponseData;
    }
  }
  catch(err)
  {
    console.log(err);
    return 401;
  }
  
}
}