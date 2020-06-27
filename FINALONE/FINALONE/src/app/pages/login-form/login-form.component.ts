import { BackendService } from 'src/app/service/backend.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {

  registrationForm: FormGroup;
  fieldTextType: boolean;
  isValid : boolean = true;
  // repeatFieldTextType: boolean;

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  constructor(private fb: FormBuilder, private router: Router, private backend: BackendService) {}
  result: any;
  ngOnInit(): void {
    this.initRegForm();
  }
  initRegForm() {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  async validateCredentials(data){
    this.result = await this.backend.login(data.email, data.password);
    // let details = new User();
    let details = this.result;
    console.log("login:",details);
    if(details == 401){
      this.isValid = false;
    }
  //  this.router.navigateByUrl('/trade', { state: this.result });
  }

}
