import { BackendService } from '../service/backend.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  faEyeSlash = faEyeSlash;
  faEnvelope = faEnvelope;
  faEye = faEye;
  faUser = faUser;

  registrationForm: FormGroup;
  fieldTextType: boolean;
  // repeatFieldTextType: boolean;

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  // toggleRepeatFieldTextType() {
  //   this.repeatFieldTextType = !this.repeatFieldTextType;
  // }
  constructor(private fb: FormBuilder, private router: Router, private backend: BackendService) {}
  result: any;
  ngOnInit(): void {
    this.initRegForm();
  }
  initRegForm() {
    this.registrationForm = this.fb.group({
      // email: ['', [Validators.required, Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{3,4}$/)]],
      // password: ['', [Validators.required, Validators.pattern(/^[A-za-z0-9_-]{8,15}$/),Validators.minLength(8)]],
      // displayName: ['', Validators.required],

      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      displayName: ['', Validators.required]

    });
    
  }
  async getInfo(data){
    this.result = await this.backend.sendInfo(data.email, data.password);   
  }
  async getData(data){
    await this.getInfo(data);
    console.log("navigation");
    this.router.navigate(['/trade', String(data.displayName)+this.result], {
      skipLocationChange: true,
    });
    console.log("button clicked "+data.email+ " "+ data.password+" "+data.displayName);
  }
}
