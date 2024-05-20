import { defineStore } from 'pinia';
import { alertController } from '@ionic/vue';

export const ConditionsStore = defineStore('conditions', {
    state: () => ({
        conditions: <Array<any>>[],
        language: <string>'en',
    }),
    actions: {
        init(language:string){
            this.language = language;
            fetch('/conditions.json').then(async(res)=>{
                this.conditions = await res.json()
            })
        },
        
        conditionNameById(conditionId:string){
            for(let condition of this.conditions){
              if(condition._id == conditionId){
                if(this.language == 'fr') return condition.translations.fr.name
                else return condition.name
              }
            }
        },
         
        async editConditionsPopup(character:any){
            let conditionInputs:any = []
            for(let condition of this.conditions){
              // More informations about alertInput : https://ionicframework.com/docs/api/alert#alertinput
              conditionInputs.push({
                label: condition.translations.fr.name,
                value: condition._id,
                type: 'checkbox',
                checked: (character.conditions.includes(condition._id))
              })
            }
        
            const alert = await alertController.create({
              header: "Select a condition",
              buttons: [{text:'Clear conditions', role:'clearall'},{text:'OK', role:'confirm'}],
              inputs: conditionInputs,
            });
        
            await alert.present();
        
            const {role, data} = await alert.onDidDismiss();
            if(role == 'clearall') character.conditions = []
            else character.conditions = data.values;
          }

    }
});