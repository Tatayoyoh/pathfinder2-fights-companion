import { defineStore } from 'pinia';

export const HeroesStore = defineStore('heroes', {
    state: () => ({
        heroes: <Array<any>>[],
    }),
    actions: {
        init(){
            
        },

        addHeroe(){
            let heroe = {
              'player': null,
              'perception': null,
              'conditions': []
            }
            this.heroes.push(heroe)
        },

        removeCondition(event:any, heroe:any, conditionId:string){
            event.stopPropagation()
            heroe.conditions = heroe.conditions.filter(function(item:any) {
              return item !== conditionId
            });
        }
    }
});