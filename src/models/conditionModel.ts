import { Model } from 'pinia-orm'

export default class Condition extends Model {
    // entity is a required property for all models.
    static entity = 'conditions'
    // List of all fields (schema) of the post model. `this.string()` declares
    // a string field type with a default value as the first argument.
    // `this.uid()` declares a unique id if none provided.
    static fields() {
        return {
            id: this.uid(),
            name: this.string(''),
            effects: this.attr([]),
            description: this.string(''),
            duration: this.attr({}),
            group: this.string(''),
            overrides: this.attr([]),
            publication: this.string(''),
            value: this.number(null),
            translations: this.attr({}),
        }
    }

    // "_id": "XgEqL1kFApUbl5Z2",
    // "name": "Blinded",
    // "effects": [],
    // "description": "<p>You can't see. All normal terrain is difficult terrain to you. You can't detect anything using vision. You automatically critically fail Perception checks that require you to be able to see, and if vision is your only precise sense, you take a –4 status penalty to Perception checks. You are immune to visual effects. Blinded overrides @UUID[Compendium.pf2e.conditionitems.Item.TkIyaNPgTZFBCCuh]{Dazzled}.</p>",
    // "duration": {
    //     "value": 0
    // },
    // "group": "senses",
    // "overrides": [
    //     "dazzled"
    // ],
    // "publication": "Pathfinder Player Core",
    // "value": null,
    // "translations": {
    //     "fr": {
    //         "name": "Aveuglé",
    //         "description": "<p>Vous ne pouvez voir. Tous les terrains normaux vous sont des terrains difficiles. Vous ne pouvez rien détecter en utilisant votre vision. Vous obtenez automatiquement un échec critique sur les tests de Perception qui nécessitent que vous soyez capable de voir et, si votre vision est votre seul sens précis, vous subissez une pénalité de statut de -4 à vos tests de Perception. Vous êtes immunisé contre les effets visuels. Aveuglé est prépondérant sur @UUID[Compendium.pf2e.conditionitems.Item.TkIyaNPgTZFBCCuh]{Ébloui}.</p>"
    //     },
    //     "zh": {
    //         "name": "目盲 Blinded",
    //         "description": "<p>你看不见事物。对你而言所有正常地形都是困难地形。你无法用视觉侦测任何事物。你在需要你看的察觉检定上自动大失败，若视觉是你唯一的精确感官，你的察觉检定受到-4状态减值。你免疫视觉效果。目盲覆盖@UUID[Compendium.pf2e.conditionitems.Item.TkIyaNPgTZFBCCuh]{目眩Dazzled}。</p>"
    //     }
    // }

    declare id: string
    declare name: string
    declare effects: string[]
    declare description: string
    declare duration: object
    declare group: string
    declare overrides: string[]
    declare publication: string
    declare value: number|null
    declare translations: object


    static piniaOptions = {
        persist: true // for pinia-plugin-persistedstate
    }
}




// import { defineStore } from 'pinia';
// import { alertController } from '@ionic/vue';

// export const ConditionsStore = defineStore('conditions', {
//     state: () => ({
//         conditions: <Array<any>>[],
//         language: <string>'en',
//     }),
//     actions: {
//         init(language:string){
//             this.language = language;
//             fetch('/conditions.json').then(async(res)=>{
//                 this.conditions = await res.json()
//             })
//         },
        
//         conditionNameById(conditionId:string){
//             for(let condition of this.conditions){
//               if(condition._id == conditionId){
//                 if(this.language == 'fr') return condition.translations.fr.name
//                 else return condition.name
//               }
//             }
//         },
         
//         async editConditionsPopup(character:any){
//             let conditionInputs:any = []
//             for(let condition of this.conditions){
//               // More informations about alertInput : https://ionicframework.com/docs/api/alert#alertinput
//               conditionInputs.push({
//                 label: condition.translations.fr.name,
//                 value: condition._id,
//                 type: 'checkbox',
//                 checked: (character.conditions.includes(condition._id))
//               })
//             }
        
//             const alert = await alertController.create({
//               header: "Select a condition",
//               buttons: [{text:'Clear conditions', role:'clearall'},{text:'OK', role:'confirm'}],
//               inputs: conditionInputs,
//             });
        
//             await alert.present();
        
//             const {role, data} = await alert.onDidDismiss();
//             if(role == 'clearall') character.conditions = []
//             else character.conditions = data.values;
//           }

//     }
// });