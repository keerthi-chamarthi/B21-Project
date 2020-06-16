import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  displayName = '';
  constructor(private router: Router) {}

  ngOnInit(): void {}
  signUp(p) {
    this.router.navigate(['/trade', String(p.displayName)], {
      skipLocationChange: true,
    });
  }

  getName() {
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
