import { defineStore } from 'pinia';

export const TreasuresStore = defineStore('treasuresStore', {
    state: () => ({
        treasures: <Array<any>>[],
        language: <string> 'en'
    }),
    actions: {
        init(language:string){
            this.language = language;
            fetch('/equipment.json').then(async(res)=>{
                this.treasures = await res.json()
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