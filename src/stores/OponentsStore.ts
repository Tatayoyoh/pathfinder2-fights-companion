import { defineStore } from 'pinia';

export const OponentsStore = defineStore('oponents', {
    state: () => ({
        creatures: <Array<any>>[],
        oponents: <Array<any>>[],
    }),
    actions: {
        init(){
            fetch('/creatures.json').then(async(res)=>{
                this.creatures = await res.json()
            })
        },

        removeCondition(event:any, oponent:any, conditionId:string){
            event.stopPropagation()
            oponent.conditions = oponent.conditions.filter(function(item:any) {
              return item !== conditionId
            });
        },

        addOponent(){
            let oponent = {
              'name': '',
              'creature': 'Goblin',
              'hp': 20,
              'perception_rolled': undefined,
              'perception': 8,
              'conditions': []
            }
            this.oponents.push(oponent)
          }
    }
});