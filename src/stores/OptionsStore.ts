import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core'
import { useI18n } from 'vue-i18n';

export const countries = [
    {'country':'France', 'language':'french', 'locale':'fr'},
    {'country':'United-Kingdom', 'language':'english', 'locale':'en'},
]

export const OptionsStore = defineStore('options', {
    state: () => ({
        perception_roll: <any>'all',
        browserLanguage: window.navigator.language,
        language: <any>'en', // no language set will use default browser one
    }),
    actions: {
        init(){
            // User settings
            this.perception_roll = useStorage('perception_roll', 'all')

            // User language
            this.language = useStorage('language', this.browserLanguage);
            const i18n = useI18n({ useScope: 'global' });
            i18n.locale.value = this.language;
        }
    }
});