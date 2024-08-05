<template>
    <ion-button id="language-popover" :slot="slot" shape="rounded" fill="outline">
        <ion-avatar class="small-icon ion-margin-end">
            <img :src="'/countries/'+optionsStore.language+'.png'" />
        </ion-avatar>
        <ion-label>{{$t(languageFromLocale(optionsStore.language))}}</ion-label>
        <ion-popover trigger="language-popover" :dismiss-on-select="true">
            <ion-content>
                <ion-list>
                    <ion-item v-for="c in countries" lines="none" button @click="optionsStore.language = c.locale">
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
    import { useNavigatorLanguage } from '@vueuse/core'
    import { watch, onMounted } from 'vue';
    import { OptionsStore } from '@/stores/OptionsStore';
    import { useI18n } from 'vue-i18n';
    
    const countries = [
        {'country':'France', 'language':'french', 'locale':'fr'},
        {'country':'United-Kingdom', 'language':'english', 'locale':'en'},
    ]

    defineProps({
        slot: {
            type: String,
            default: ''
        },
    });

    const optionsStore = OptionsStore();
    const i18n = useI18n({ useScope: 'global' });

    onMounted(()=>{
        if(optionsStore.language){
            i18n.locale.value = optionsStore.language;
        }
        
        watch(optionsStore.language, () => {
            i18n.locale.value = optionsStore.language;
        })

        // auto change on browser website locale change
        const { language } = useNavigatorLanguage();
        watch(language, () => {
          optionsStore.language = localeFromLocale(language.value);
          i18n.locale.value = optionsStore.language;
        })
    });

    function languageFromLocale(locale:string):string{
        for(let c of countries){
            if(c.locale?.includes(locale.toLowerCase())) return c.language
        }
        return '';
    }

    function localeFromLocale(locale:any):string{
        for(let c of countries){
            if(c.locale?.includes(locale.toLowerCase())) return c.locale
        }
        return '';
    }

</script>

<style scoped>
.small-icon{
    max-width: 30px;
    max-height: 30px;
}
</style>