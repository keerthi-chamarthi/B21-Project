import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { Router } from '@angular/router';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-trade',
  templateUrl: './trade.component.html',
  styleUrls: ['./trade.component.css']
})
export class TradeComponent implements OnInit {
  // public login:any;
  public displayName:string="";
  // constructor(private route: ActivatedRoute) { 
  //   route.displayName

  //   // });
  // }
  constructor(private login: LoginComponent){
    this.displayName = login.getName();
  }

  ngOnInit(): void {
  }

}
