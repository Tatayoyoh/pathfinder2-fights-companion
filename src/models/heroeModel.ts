import { Model } from 'pinia-orm'
import Condition from './conditionModel'

export default class Heroe extends Model {
    static entity = 'heroes'

    static fields() {
        return {
            id: this.uid(),
            name: this.string(''),
            player: this.string(''),
            perception: this.number(null),
            conditions: this.hasMany(Condition, 'conditionId'),
        }
    }

    declare id: string
    declare name: string
    declare player: string
    declare perception: number|null
    declare conditions: Condition[]

    static piniaOptions = {
        persist: true // for pinia-plugin-persistedstate
    }
}