import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core'
import { language } from 'ionicons/icons';
import { v4 as uuid } from 'uuid';

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

        addOponent(oponentData:any, type='creature'){
            if(oponentData){
                this.oponents.push({
                    'id': uuid(),
                    'name': this.translatedName(oponentData),
                    'type': type,
                    'creature': undefined,
                    'hp': oponentData.attributes.hp,
                    'perception_rolled': undefined,
                    'perception': oponentData.perception.mod,
                    'conditions': [],
                    'data': oponentData
                });
            }
        },

        removeOponent(id:number){
            this.oponents = this.oponents.filter(function(oponent:any) {
                return id === oponent.id
            });
        },

        oponentById(id:string){
            return this.oponents.find((oponent:any) => oponent.id == id);
        },

        translatedName(creature:any){
            if(this.language == 'en')
                return creature.name
            else
                return creature.translations[this.language].name
        }
    }
});