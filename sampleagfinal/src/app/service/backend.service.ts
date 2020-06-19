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
          "Authorization": "Bearer 5ZPhT2Sxmj9E2F7ZhJU6MZILsFW4M4j1"
      }
  };
  try{
      let resp = await axios.all ([instance.post("/api/auth/user/login", {
      Username: user,
      Password: passkey
    }),
    axios.get("/api/user/individual/profile", config
    )
  ]);
    this.values = resp[0].data;
    console.log(resp[0].data);
    console.log(resp[1].data);
     return this.values.ResponseCode;

  }
  catch(err)
  {
    console.log(err);
    return 401;
  }
  
}
}