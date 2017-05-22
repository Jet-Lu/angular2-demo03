import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Page1Component} from "app/page1/page1.component";
import {Page2Component} from "app/page2/page2.component";
import {Page404Component} from "app/page404/page404.component";
import {Page3Component} from "app/page3/page3.component";
import {Page31Component} from "app/page31/page31.component";
import {Page32Component} from "app/page32/page32.component";

const routes : Routes = [
  {path: '',redirectTo:"/page1",pathMatch:"full"},
  {path: 'page1',component:Page1Component},
  {path: 'page2/:id1/:id2',component:Page2Component},
  {path: 'page3',component:Page3Component,children:[
    {path:"",redirectTo:"page31",pathMatch:"full"},
    {path:"page31",component:Page31Component},
    {path:"page32",component:Page32Component},
  ]},
  {path: '**',component:Page404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
