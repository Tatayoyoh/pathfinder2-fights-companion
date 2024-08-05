import { defineStore } from 'pinia';
import { useStorage, useNavigatorLanguage } from '@vueuse/core'

export const OptionsStore = defineStore('options', {
    state: () => ({
        perception_roll: <any>'all',
        language: <any>'en', // no language set will use default browser one
    }),
    actions: {
        init(){
            const { language } = useNavigatorLanguage()
            this.perception_roll = useStorage('perception_roll', 'all')
            this.language = useStorage('language', language.value);
        },
    }
});