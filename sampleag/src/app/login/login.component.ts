import { Component, OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
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
    // const password = this.password;
    // const displayName = this.displayName;
    // this.router.navigate(['/trade']);
    // this.handleResponse(this.displayName);
  }

  getName(){
    return this.displayName;
  }
  fieldTextType: boolean;

toggleFieldTextType() {
  this.fieldTextType = !this.fieldTextType;
}

// handleResponse(data){
//   // this.Token.handle(data.access_token);
//   // this.Auth.changeAuthStatus(true);
//   sessionStorage.setItem('loggedUser', data.Username);
//   this.router.navigateByUrl('/trade');
// }
}
