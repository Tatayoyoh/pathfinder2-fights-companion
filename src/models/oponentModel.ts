import { Model } from 'pinia-orm'
import Fight from './fightModel'

export default class Oponent extends Model {
    static entity = 'oponents'

    static fields() {
        return {
            id: this.uid(),
            name: this.string(''),
            type: this.string(''),
            hp: this.number(0).notNullable(),
            perception: this.number(0).notNullable(),
            perception_rolled: this.number(0),
            conditions: this.attr([]),
            data: this.attr({}),

            // relationship
            fightId: this.attr(null).notNullable(),
            fight: this.belongsTo(Fight, 'fightId'),
        }
    }

    declare id: string
    declare name: string
    declare type: string
    declare hp: number
    declare perception: number
    declare perception_rolled: number
    declare conditions: string[]
    declare data: object
    declare fightId: string
    declare fight: Fight

    static piniaOptions = {
        persist: true // for pinia-plugin-persistedstate
    }
}