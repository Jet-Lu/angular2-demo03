import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit,OnDestroy {
  private sub:any;
  private id:number;
  private name:string;
  private age:number;
  constructor(private _activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.sub = this._activatedRoute.queryParams.subscribe(queryParams=>{
      console.log("queryParams参数:",queryParams);
      this.id = Number.parseInt(queryParams["id"]);
      this.name = queryParams["name"];
      this.age = Number.parseInt(queryParams["age"]);
    })
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
