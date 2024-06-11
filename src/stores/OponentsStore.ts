import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core'
import { language } from 'ionicons/icons';

export const OponentsStore = defineStore('oponents', {
    state: () => ({
        creatures: <Array<any>>[],
        oponents: <any>[],
        language: <string> 'en'
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

        addOponent(oponentData:any=undefined){
            let oponent = {
                'name': undefined,
                'creature': undefined,
                'hp': undefined,
                'perception_rolled': undefined,
                'perception': undefined,
                'conditions': [],
                'data': {}
            }
            if(oponentData){
                oponent = {
                    'name': this.translatedName(oponentData),
                    'creature': undefined,
                    'hp': oponentData.attributes.hp,
                    'perception_rolled': undefined,
                    'perception': oponentData.perception.mod,
                    'conditions': [],
                    'data': oponentData
                }   
            }
            this.oponents.push(oponent)
        },

        removeOponent(index:number){
            this.oponents.splice(index, 1)
        },

        translatedName(creature:any){
            if(this.language == 'en')
                return creature.name
            else
                return creature.translations[this.language].name
        }
    }
});