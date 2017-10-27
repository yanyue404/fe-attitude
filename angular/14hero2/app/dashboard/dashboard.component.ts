import { Component,OnInit,Input } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

import { Hero } from '../models/hero';

import { HeroServer } from '../server/hero.server';
declare var $;

@Component({
    selector: 'dashboard',
    templateUrl: './app/dashboard/dashboard.html'
})

export class DashboardComponent implements OnInit {
    heros: Hero[] = [];
    constructor(		
        private heroServer: HeroServer,
        private router: Router
	) {
        this.heros = this.heroServer.getHero();
    }
    ngOnInit(){
        $("div").css("background","red");
        
    }
    gotoList(heroId:string){
        this.router.navigate(["/detail",heroId]);
    }
}