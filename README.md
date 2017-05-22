### һ��ѧ����:angular·�����漰���ܶ��µ��ʴʻ�

|����|˵��|ʹ�ó���|
|:---|:---|:---|
|Routes|����·�ɣ�����URL��Ӧ��������Լ����ĸ�RouterOutlet��չ��||
|RouterOutlet|��html�б�ǹ���·�ɵ�ռλ����||
|Router|��ts�ļ��и�����ת·�ɲ���|Router.navigate(["/xxx"]),Router.navigateByUrl("/xxx")|
|routerLink|��html��ʹ��ҳ����ת|<a [routerLink]="['/xx']"|
|routerLinkActive|��ʾ��ǰ����·�ɵ���ʽ|routerLinkActive="active"|
|ActivedRoute|��ȡ��ǰ����·�ɵĲ���,|�����һ���࣬Ҫʵ������ʹ��ʵ������Ķ���.params,xx.queryParams|
|redirectTo|�ض���|redirectTo="/·��"|
|useHash|ʹ�ù�ϣֵչ��|{useHash:true}|
|pathMatch|��ȫƥ��|pathMatch:"full"|

### ����ʵ��һ���򵥵�·��

* 1��ʹ��`angular-cli`����һ����·�ɵ���Ŀ
* 2���ֶ�����·���ļ�

* 2.1ʹ��`nagular-cli`����һ����·�ɵ���Ŀ
    * `ng new ��Ŀ���� --routing`
    * ��ഴ��һ��`app-routing.module.ts`�ļ���������
    
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

* 2.2�ֶ�����·���ļ�
    * ��`app`�ļ������洴��һ��`app.router.ts`�ļ�,�����ṹ��������:
    
        ```javascript
        /**
         * ����·����תҳ��
         */
        //����·���ļ�
        import {Routes, RouterModule} from "@angular/router";
        import {ModuleWithProviders} from "@angular/core";
        //������ص�·���ϵ����
        ....
        //����һ��·������
        const rootRouterConfig : Routes = [
            {path:"·��",component:�������},
            {path:"page4",component:�������,
                children:[
                    {path:"·��",component:...},
                    {path:"·��",component:...}
                ]
            }
        ]
        
        //���Ⱪ©��ȥ
        export const rootRouterModule : ModuleWithProviders = RouterModule.forRoot(rootRouterConfig,{useHash:true});
        ```
    
    * �ڸ�ģ����ע���ȥ
    
        ```javascript
        //�����Լ������·��
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
        
### ����һ���򵥵�·�ɰ�������,ʹ����`redirectTo`���ض���

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
                <li class="list-group-item"><a [routerLink]="['/page1']">�б�һ</a></li>
                <li class="list-group-item"><a [routerLink]="['/page2']">�б��</a></li>
            </ul>
        </div>
        <div class="col-md-10" style="border:1px solid #ddd;padding-bottom:50px;padding-top:50px;">
            <router-outlet></router-outlet>
        </div>
    </div>
</div>
    ```
### �ġ����404ҳ��
>����û������`url`��ַ����ȷ����������ĵ�ַ��������ת��ָ����·��,ʹ��"**"ȥƥ�䣬·�ɻ��ȴ�����ƥ�䣬���ƥ�䲻�ɹ��ͻ�����ƥ��

    ```javascript
    const routes : Routes = [
      {path: '',redirectTo:"/page1",pathMatch:"full"},
      {path: 'page1',component:Page1Component},
      {path: 'page2',component:Page2Component},
      {path: '**',component:Page404Component},
    ];
    ```
### �塢��`TS`�ļ���ͨ���¼�����תҳ��ʵ���л�·��
    ��ts�ļ���ʵ��·�ɵ���ת�����ַ�ʽ:���˽����õ�һ�֣���htmlҳ���б���һ��
* 1��`navigate`���洩��һ������
* 2��`navigateByUrl`���洫��һ���ַ���   

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

### ����ʵ��ѡ��ǰ·�ɸ�����ʾ

* 1����`html`ҳ�������`routerLinkActive`="��ʽ����"

    ```javascript
    <ul class="list-group">
        <li class="list-group-item"><a [routerLink]="['/page1']" routerLinkActive="active">�б�һ</a></li>
        <li class="list-group-item"><a [routerLink]="['/page2']" routerLinkActive="active">�б��</a></li>
    </ul>
    ```
* 2������ʽ���ж���`active`��ʽ

### �ߡ�·��ʵ���������֮���л����ݲ�������Ҫ�����ַ�ʽ

* 1��`path`�������ݲ���
* 2��`query`�������ݲ���

  #### 7.1 ͨ��`path`��ʽ���ݲ���
  * 1�����ô���`path`����·��


      ```javascript
      {path: 'page2/:id1/:id2',component:Page2Component},
  ```
  * 2���޸�`html`����


      ```html
      <li class="list-group-item"><a [routerLink]="['/page2',1,2]" routerLinkActive="active">�б��</a></li>
      ```
  * 3���޸�`Page2Component`��ts�ļ�
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
              console.log(`parames����:${params}`)
              this.id1 = params["id1"];
              this.id2 = params["id2"];
              console.log(`��ȡ�Ĳ���id1:${this.id1},id2:${this.id2}`)
            })
          }
      //���ж�ص�ʱ��ȡ������
          ngOnDestroy() : void {
            this.sub.unsubscribe();
          }
    }
  ```
  
    #### 7.2 ͨ��`navigate`����`path`����
    ```javascript
    this.router.navigate(["/page1",����1,����2]);
    //����������
    this.router.navigateByUrl("/page2/����1/����2");
    ```
    
    ### 7.3ͨ��`query`���ݲ���
    * 1���޸�`html`ҳ����Ӵ��ݲ���


        ```html
        <li class="list-group-item"><a [routerLink]="['/page1']" [queryParams]="{id:1,name:'hello',age:20}" routerLinkActive="active">�б�һ</a></li>
        ```
    * 2���޸�`ts`����ʹ��`queryParams`��ȡ���ݲ���

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
                    console.log("queryParams����:",queryParams);
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
    * 3��ͨ��`navigate`����`query`����
        
       ```javascript
       this.router.navigate(["/page1"],{queryParams:{"id":"10","name":"word","age":"30"}});
       ```
   * 4��ͨ��`navigateByUrl`����`query`����
       ```javascript
       this.router.navigateByUrl("/page1?name=hello&id=2&age=20");
       ```

### �ˡ�������·��
* 1���޸�·���ļ�

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
* 2����`page3`��`html`ҳ���޸�

    ```html
    <button class="btn btn-danger" [routerLink]="['./page31']">page31</button>
    <button class="btn btn-danger" [routerLink]="['./page32']">page32</button>
    <router-outlet></router-outlet>
    ```
    
### �š�����·��(�ֵ�·��)����һ��ҳ����ʹ�ö��·�ɲ���`<router-outlet></<router-outlet>`
>ʹ�÷�ʽ:

* 1����`<router-outlet name="xxx"></<router-outlet>`�������
* 2����·���ļ�������һ��`outlet`������,��:`{path: 'page1',component:Page1Component,outlet="xxx"}`



