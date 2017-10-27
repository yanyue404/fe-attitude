import { Component,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

import { Hero } from '../models/hero';

@Component({
    selector: 'detail',
    templateUrl: './app/detail/detail.html'
})

export class DetailComponent implements OnInit {
    hero: Hero = new Hero();
    heros: any;
    a;
    constructor(
		private router: Router,
        private route: ActivatedRoute
	) {}
    ngOnInit(){
        this.hero.id = this.route.snapshot.params["id"];
        this.a = 1;
        // let that = this;
        // setInterval(function(){
        //     that.a++;
        //     if(that.a == 4){
        //         that.a = 1
        //     }
        // },1000)
    }
    idGetObj(id:string,arr:any){
        for(let i=0;i<arr.length;i++){
            if(id == arr[i].id){
                return arr[i];
            }
        }
        this['a'] = 1;
    }
    cancel(){
        this.router.navigate(['dashboard']);
    }
    save(){
        this.router.navigate(['dashboard']);      
    }
}