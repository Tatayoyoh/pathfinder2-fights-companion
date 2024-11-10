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

