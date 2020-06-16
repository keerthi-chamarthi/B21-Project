import { Component, OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = "";
  password = "";
  displayName = "";

  constructor() { }

  ngOnInit(): void {
  }
  signUp() {
    // const email = this.email;
    // passwrod = this.password;
    // displayName = this.displayName
  }
}
