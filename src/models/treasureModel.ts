import { Model } from 'pinia-orm'
import Fight from './fightModel'

export default class Treasure extends Model {
    static entity = 'treasures'

    static fields() {
        return {
            id: this.uid(),
            name: this.string(''),
            type: this.string(''),
            data: this.attr({}),
            
            // relationship
            fightId: this.attr(null).notNullable(),
            fight: this.belongsTo(Fight, 'fightId').onDelete('set null'),
        }
    }

    declare id: string
    declare fightId: string
    declare fight: Fight
    declare name: string
    declare type: string
    declare data: object

    static piniaOptions = {
        persist: true // for pinia-plugin-persistedstate
    }
}