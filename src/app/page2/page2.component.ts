import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-page2',
  templateUrl: './page2.component.html',
  styleUrls: ['./page2.component.css']
})
export class Page2Component implements OnInit,OnDestroy {
  private id1 : number;
  private id2 : number;
  private sub:any;
  constructor(private _activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.sub = this._activatedRoute.params.subscribe(params=>{
      console.log(`parames参数:`,params)
      this.id1 = params["id1"];
      this.id2 = params["id2"];
      console.log(`获取的参数id1:${this.id1},id2:${this.id2}`)
    })
  }
  //组件卸载的时候取消订阅
  ngOnDestroy() : void {
    this.sub.unsubscribe();
  }
}
