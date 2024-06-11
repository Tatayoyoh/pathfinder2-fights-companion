import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core'

export const OponentsStore = defineStore('oponents', {
    state: () => ({
        creatures: <Array<any>>[],
        oponents: <any>[],
    }),
    actions: {
        init(){
            fetch('/creatures.json').then(async(res)=>{
                this.creatures = await res.json()
            })
            this.oponents = useStorage('oponents', [])
        },

        removeCondition(event:any, oponent:any, conditionId:string){
            event.stopPropagation()
            oponent.conditions = oponent.conditions.filter(function(item:any) {
              return item !== conditionId
            });
        },

        addOponent(){
            let oponent = {
              'name': undefined,
              'creature': undefined,
              'hp': undefined,
              'perception_rolled': undefined,
              'perception': undefined,
              'conditions': []
            }
            this.oponents.push(oponent)
        },

        removeOponent(index:number){
            this.oponents.splice(index, 1)
        }
    }
});