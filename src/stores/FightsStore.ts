import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core'
import { language } from 'ionicons/icons';
import { v4 as uuid } from 'uuid';
import { useRoute } from "vue-router";

export const FightsStore = defineStore('fightsStore', {
    state: () => ({
        creatures: <Array<any>>[],
        fights: <any>[],
        currentFight: 0,
        language: <string> 'en'
    }),
    actions: {
        init(){
            fetch('/creatures.json').then(async(res)=>{
                this.creatures = await res.json()
            })
            this.fights = useStorage('figths', [])

            const route = useRoute();
            if(route.params.id) this.currentFight = route.params.id;
            
        },

        addFight(name:string){
            let id = 1;
            if(this.fights.length) id = this.fights[this.fights.length -1].id + 1

            this.fights.push({
                id: id,
                name: name,
                description: '',
                group: '',
                oponents: [],
                treasures: [],
                ready: false
            })
        },

        removeFight(id:string){
            this.fights = this.fights.filter(function(fight:any) {
                return id === fight.id
            });
        },

        setCurrent(fightId:number){
            this.currentFight = fightId;
        },

        current(){
            return this.fights[this.currentFight]
        },

        fight(id:number){
            for(let fight of this.fights){
                if(fight.id == id) return fight
            }
            return undefined
        },

        groups(){
            let groups:any = {}
            for(let fight of this.fights){
                let group = fight.group
                if(group == '') group = "Ungrouped"
                if(!groups[group]) groups[group] = []
                groups[group].push(fight)
            }

            let ordered = Object.keys(groups).sort().reduce(
                (obj:any, key) => { 
                  obj[key] = groups[key]; 
                  return obj;
                }, 
                {}
            );

            return ordered
        },

        oponents(){
            return this.fights[this.currentFight].oponents;
        },

        removeCondition(event:any, oponent:any, conditionId:string){
            event.stopPropagation()
            oponent.conditions = oponent.conditions.filter(function(item:any) {
              return item !== conditionId
            });
        },

        addOponent(oponentData:any, type='creature'){
            if(oponentData){
                this.oponents().push({
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
            this.oponents = this.oponents().filter(function(oponent:any) {
                return id === oponent.id
            });
        },

        oponentById(id:string){
            return this.oponents().find((oponent:any) => oponent.id == id);
        },

        translatedName(creature:any){
            if(this.language == 'en')
                return creature.name
            else
                return creature.translations[this.language].name
        }
    }
});