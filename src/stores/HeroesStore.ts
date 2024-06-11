import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core'

export const HeroesStore = defineStore('heroes', {
    state: () => ({
        heroes: <any>[],
    }),
    actions: {
        init(){
            this.heroes = useStorage('heroes', [])
        },

        addHeroe(){
            let heroe = {
              'name': null,
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
        },

        removeHeroe(index:number){
            this.heroes.splice(index, 1)
        }
    }
});