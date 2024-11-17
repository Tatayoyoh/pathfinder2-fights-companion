import { defineStore } from 'pinia';

export const CreaturesStore = defineStore('creaturesStore', {
    state: () => ({
        creatures: <Array<any>>[],
        language: <string> 'en'
    }),
    actions: {
        init(language:string){
            this.language = language;
            fetch('/creatures.json').then(async(res)=>{
                this.creatures = await res.json()
            })
        },

        translatedName(creature:any){
            if(this.language == 'en')
                return creature.name
            else
                return creature.translations[this.language].name
        }
    }
});