import { Model } from 'pinia-orm'
import Oponent from './oponentModel'
import Treasure from './treasureModel'

export default class Fight extends Model {
    // entity is a required property for all models.
    static entity = 'fights'
    // List of all fields (schema) of the post model. `this.string()` declares
    // a string field type with a default value as the first argument.
    // `this.uid()` declares a unique id if none provided.
    static fields() {
        return {
            id: this.uid(),
            name: this.string(''),
            description: this.string(''),
            group: this.string(''),
            ready: this.boolean(false),
            oponents: this.hasMany(Oponent, 'fightId'),
            treasures: this.hasMany(Treasure, 'fightId')
        }
    }

    removeOponent(oponentID:string){
        this.oponents = this.oponents.filter(function(oponent:any) {
            return oponentID === oponent.id
        });
    }

    declare id: string
    declare name: string
    declare description: string
    declare group: string
    declare ready: boolean
    declare oponents: Oponent[]
    declare treasures: Treasure[]

    static piniaOptions = {
        persist: true // for pinia-plugin-persistedstate
    }
}