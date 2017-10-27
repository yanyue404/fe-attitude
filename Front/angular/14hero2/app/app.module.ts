 //缺少下述模块引入，会输出"Uncaught reflect-metadata shim is required when using class decorators"的错误
 import 'core-js/es6';
 import 'core-js/es7/reflect';
 import 'zone.js/dist/zone';
 //引入NgModule装饰器
 import { NgModule }      from '@angular/core';
 //引入浏览器模块
 import { BrowserModule } from '@angular/platform-browser';
 import { FormsModule } from '@angular/forms';
 //引入路由
 import { routing } from './routing';
 //引入创建的component
 import { AppComponent }  from './app.component';
 import { DashboardComponent }  from './dashboard/dashboard.component';
 import { DetailComponent }  from './detail/detail.component';
 //引入创建的server
 import { HeroServer }  from './server/hero.server';
 
 
 @NgModule({
   imports:      [ 
       BrowserModule,
       routing,
       FormsModule
   ],
   declarations: [ 
       AppComponent,
       DashboardComponent,
       DetailComponent
   ],
   providers: [
       HeroServer
   ],
   bootstrap:    [ AppComponent ]
 })
 export class AppModule { }