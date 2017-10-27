import { Injectable } from "@angular/core";

@Injectable()

export class HeroServer {

    getHero(){
        return [
            {
                id:'001',
                name:'qqq',
                power:'qqqqqq',
                amountPeopleSaved:100
            },{
                id:'002',
                name:'www',
                power:'wwwwww',
                amountPeopleSaved:200
            },{
                id:'003',
                name:'eee',
                power:'eeeeee',
                amountPeopleSaved:300
            }
        ]
    }
}