import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-response-page',
  templateUrl: './response-page.component.html',
  styleUrls: ['./response-page.component.scss']
})
export class ResponsePageComponent implements OnInit {
  public displayName: string = '';
  constructor(private obj: ActivatedRoute) { }

  ngOnInit(): void {
    this.obj.paramMap.subscribe(
      (params: ParamMap) => (this.displayName = String(params.get('name')))
    );
  }

}
