import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core'

export const OptionsStore = defineStore('options', {
    state: () => ({
        perception_roll: <any>'all',
        language: <any>'en',
    }),
    actions: {
        init(){
            this.perception_roll = useStorage('perception_roll', 'all')
            this.language = useStorage('perception_roll', 'en');
        },
    }
});