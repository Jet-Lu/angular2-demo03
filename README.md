### 一、学单词:angular路由中涉及到很多新单词词汇

|单词|说明|使用场景|
|:---|:---|:---|
|Routes|配置路由，保存URL对应的组件，以及在哪个RouterOutlet中展现||
|RouterOutlet|在html中标记挂载路由的占位容器||
|Router|在ts文件中负责跳转路由操作|Router.navigate(["/xxx"]),Router.navigateByUrl("/xxx")|
|routerLink|在html中使用页面跳转|<a [routerLink]="['/xx']"|
|routerLinkActive|表示当前激活路由的样式|routerLinkActive="active"|
|ActivedRoute|获取当前激活路由的参数,|这个是一个类，要实例化，使用实例化后的对象.params,xx.queryParams|
|redirectTo|重定向|redirectTo="/路径"|
|useHash|使用哈希值展现|{useHash:true}|
|pathMatch|完全匹配|pathMatch:"full"|

### 二、实现一个简单的路由

* 1、使用`angular-cli`创建一个带路由的项目
* 2、手动配置路由文件

* 2.1使用`nagular-cli`创建一个带路由的项目
    * `ng new 项目名称 --routing`
    * 会多创建一个`app-routing.module.ts`文件代码如下
    
        ```javascript
        import { NgModule } from '@angular/core';
        import { Routes, RouterModule } from '@angular/router';
        
        const routes: Routes = [
          {
            path: '',
            children: []
          }
        ];
        
        @NgModule({
          imports: [RouterModule.forRoot(routes)],
          exports: [RouterModule],
          providers: []
        })
        export class AppRoutingModule { }
        
        ```

* 2.2手动配置路由文件
    * 在`app`文件夹下面创建一个`app.router.ts`文件,基本结构代码如下:
    
        ```javascript
        /**
         * 定义路由跳转页面
         */
        //引入路由文件
        import {Routes, RouterModule} from "@angular/router";
        import {ModuleWithProviders} from "@angular/core";
        //引入挂载到路由上的组件
        ....
        //配置一个路由数组
        const rootRouterConfig : Routes = [
            {path:"路径",component:组件名称},
            {path:"page4",component:组件名称,
                children:[
                    {path:"路径",component:...},
                    {path:"路径",component:...}
                ]
            }
        ]
        
        //对外暴漏出去
        export const rootRouterModule : ModuleWithProviders = RouterModule.forRoot(rootRouterConfig,{useHash:true});
        ```
    
    * 在根模块中注入进去
    
        ```javascript
        //引入自己定义的路由
        import {rootRouterModule} from "./app.router";
        @NgModule({
         ....
          imports: [
            BrowserModule,
            FormsModule,
            HttpModule,
            rootRouterModule
          ],
          providers: [],
          bootstrap: [AppComponent]
        })
        export class AppModule { }
        ```
        
### 三、一个简单的路由案例代码,使用了`redirectTo`做重定向

    ```javascript
    import { NgModule } from '@angular/core';
    import { Routes, RouterModule } from '@angular/router';
    import {Page1Component} from "app/page1/page1.component";
    import {Page2Component} from "app/page2/page2.component";
    
    const routes : Routes = [
      {path: '',redirectTo:"/page1",pathMatch:"full"},
      {path: 'page1',component:Page1Component},
      {path: 'page2',component:Page2Component},
    ];
    
    @NgModule({
      imports: [RouterModule.forRoot(routes)],
      exports: [RouterModule],
      providers: []
    })
    export class AppRoutingModule { }
    
    ```
    ```html
    <div class="container" style="margin-top:50px;">
    <div class="row">
        <div class="col-md-2">
            <ul class="list-group">
                <li class="list-group-item"><a [routerLink]="['/page1']">列表一</a></li>
                <li class="list-group-item"><a [routerLink]="['/page2']">列表二</a></li>
            </ul>
        </div>
        <div class="col-md-10" style="border:1px solid #ddd;padding-bottom:50px;padding-top:50px;">
            <router-outlet></router-outlet>
        </div>
    </div>
</div>
    ```
### 四、添加404页面
>如果用户输入的`url`地址不正确，或者输入的地址不存在跳转到指定的路径,使用"**"去匹配，路由会先从上面匹配，如果匹配不成功就会往下匹配

    ```javascript
    const routes : Routes = [
      {path: '',redirectTo:"/page1",pathMatch:"full"},
      {path: 'page1',component:Page1Component},
      {path: 'page2',component:Page2Component},
      {path: '**',component:Page404Component},
    ];
    ```
### 五、在`TS`文件中通过事件绑定跳转页面实现切换路由
    在ts文件中实现路由的跳转有两种方式:本人建议用第一种，跟html页面中保持一致
* 1、`navigate`里面穿的一个数组
* 2、`navigateByUrl`里面传递一个字符串   

    ```javascript
    import { Component, OnInit } from '@angular/core';
    import {Router} from "@angular/router";
    
    @Component({
      selector: 'app-page404',
      templateUrl: './page404.component.html',
      styleUrls: ['./page404.component.css']
    })
    export class Page404Component implements OnInit {
    
      constructor(private router:Router) { }
    
      ngOnInit() {
      }
      topage1(){
        this.router.navigate(["/page1"]);
      }
      topage2(){
        this.router.navigateByUrl("/page2");
      }
    }
    ```

### 六、实现选择当前路由高亮显示

* 1、在`html`页面中添加`routerLinkActive`="样式名称"

    ```javascript
    <ul class="list-group">
        <li class="list-group-item"><a [routerLink]="['/page1']" routerLinkActive="active">列表一</a></li>
        <li class="list-group-item"><a [routerLink]="['/page2']" routerLinkActive="active">列表二</a></li>
    </ul>
    ```
* 2、在样式表中定义`active`样式

### 七、路由实现两个组件之间切换传递参数，主要有两种方式

* 1、`path`方法传递参数
* 2、`query`方法传递参数

  #### 7.1 通过`path`方式传递参数
  * 1、配置传递`path`参数路由


      ```javascript
      {path: 'page2/:id1/:id2',component:Page2Component},
  ```
  * 2、修改`html`代码


      ```html
      <li class="list-group-item"><a [routerLink]="['/page2',1,2]" routerLinkActive="active">列表二</a></li>
      ```
  * 3、修改`Page2Component`的ts文件
  ```javascript
    import {Component, OnInit, OnDestroy} from '@angular/core';
    import {ActivatedRoute} from "@angular/router";
    export class Page2Component implements OnInit,OnDestroy {
          private id1 : number;
          private id2 : number;
          private sub:any;
          constructor(private _activatedRoute:ActivatedRoute) { }
                
          ngOnInit() {
            this.sub = this._activatedRoute.params.subscribe(params=>{
              console.log(`parames参数:${params}`)
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
  ```
  
    #### 7.2 通过`navigate`传递`path`参数
    ```javascript
    this.router.navigate(["/page1",参数1,参数2]);
    //或者是这样
    this.router.navigateByUrl("/page2/参数1/参数2");
    ```
    
    ### 7.3通过`query`传递参数
    * 1、修改`html`页面添加传递参数


        ```html
        <li class="list-group-item"><a [routerLink]="['/page1']" [queryParams]="{id:1,name:'hello',age:20}" routerLinkActive="active">列表一</a></li>
        ```
    * 2、修改`ts`代码使用`queryParams`获取传递参数

        ```javascript
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
        ```
    * 3、通过`navigate`传递`query`参数
        
       ```javascript
       this.router.navigate(["/page1"],{queryParams:{"id":"10","name":"word","age":"30"}});
       ```
   * 4、通过`navigateByUrl`传递`query`参数
       ```javascript
       this.router.navigateByUrl("/page1?name=hello&id=2&age=20");
       ```

### 八、配置子路由
* 1、修改路由文件

    ```javascript
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
    ```
* 2、在`page3`的`html`页面修改

    ```html
    <button class="btn btn-danger" [routerLink]="['./page31']">page31</button>
    <button class="btn btn-danger" [routerLink]="['./page32']">page32</button>
    <router-outlet></router-outlet>
    ```
    
### 九、辅助路由(兄弟路由)就是一个页面中使用多个路由插座`<router-outlet></<router-outlet>`
>使用方式:

* 1、在`<router-outlet name="xxx"></<router-outlet>`定义别名
* 2、在路由文件中增加一个`outlet`的属性,如:`{path: 'page1',component:Page1Component,outlet="xxx"}`



