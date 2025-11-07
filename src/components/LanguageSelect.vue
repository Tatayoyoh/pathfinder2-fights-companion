<template>
    <ion-button id="language-popover" :slot="slot" shape="rounded" fill="clear">
        <ion-avatar class="small-icon ion-margin-end">
            <img :src="'/countries/'+localeFromLocale(optionsStore.language)+'.png'" />
        </ion-avatar>
        <ion-label>{{$t(languageFromLocale(optionsStore.language))}}</ion-label>
        <ion-popover trigger="language-popover" :dismiss-on-select="true">
            <ion-content>
                <ion-list>
                    <ion-item v-for="c in countries" lines="none" button @click="changeLocale(c)">
                        <ion-avatar>
                            <img :src="'/countries/'+c.locale+'.png'" />
                        </ion-avatar>
                        <ion-label class="ion-margin">{{ $t(c.language)}}</ion-label>
                    </ion-item>
                </ion-list>
            </ion-content>
        </ion-popover>
    </ion-button>
</template>

<script setup lang="ts">
    import { countries, OptionsStore } from '@/stores/OptionsStore';
    import { useI18n } from 'vue-i18n';


    defineProps({
        slot: {
            type: String,
            default: ''
        },
    });

    const optionsStore = OptionsStore();
    const i18n = useI18n({ useScope: 'global' });

    function changeLocale(country:any){
        i18n.locale.value = country.locale;
        optionsStore.language = country.locale
    }

    function localeFromLocale(locale:any):string{
        for(let c of countries){
            if(locale.toLowerCase().includes(c.locale)) return c.locale
        }
        return 'en'; // default locale
    }

    function languageFromLocale(locale:string):string{
        for(let c of countries){
            if(locale.toLowerCase().includes(c.locale)) return c.language
        }
        return 'english'; // default language
    }

</script>

<style scoped>
.small-icon{
    max-width: 30px;
    max-height: 30px;
}
</style>