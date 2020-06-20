import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-response-page',
  templateUrl: './response-page.component.html',
  styleUrls: ['./response-page.component.scss'],
})
export class ResponsePageComponent implements OnInit {
  faUser = faUser;
  public displayName: string = '';
  constructor(private obj: ActivatedRoute) {}

  ngOnInit(): void {
    this.obj.paramMap.subscribe(
      (params: ParamMap) => (this.displayName = String(params.get('name')))
    );
  }
}
