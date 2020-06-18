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
    const instance = axios.create({
      // baseURL: "/api",
      // withCredentials: false,
      // headers: {
      //   'Access-Control-Allow-Origin' : '*',
      //   'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      //   }
    });
    let resp = await instance.post("/api/user/individual/profile", {
      Username: user,
      Password: passkey
    })
    //  .then(response => {
    //    console.log(response.data);
    //    this.values = response.data
    //    console.log(this.values);
    //  });
    this.values = resp.data;
    console.log(resp.data);
     return this.values.ResponseCode;
  }
  // getValues(): string{
    
  //   return this.values.ResponseCode;
  // }
}
