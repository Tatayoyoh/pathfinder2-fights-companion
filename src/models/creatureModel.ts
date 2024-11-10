import { Model } from 'pinia-orm'

export default class Creature extends Model {
    // entity is a required property for all models.
    static entity = 'creatures'
    // List of all fields (schema) of the post model. `this.string()` declares
    // a string field type with a default value as the first argument.
    // `this.uid()` declares a unique id if none provided.
    static fields() {
        return {
            id: this.uid(),
            name: this.string(null).notNullable(),
            level: this.number(null).notNullable(),
            data: this.attr({}),
        }
    }
    declare id: string
    declare name: string
    declare level: string
    declare data: object

    static piniaOptions = {
        persist: true // for pinia-plugin-persistedstate
    }
}