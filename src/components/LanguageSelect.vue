<template>
    <ion-button id="language-popover" :slot="slot" shape="rounded" fill="outline">
        <ion-avatar class="small-icon ion-margin-end">
            <img :src="'/countries/'+countryFromLocale(language)+'.png'" />
        </ion-avatar>
        <ion-label>{{$t(languageFromLocale(language))}}</ion-label>
        <ion-popover trigger="language-popover" :dismiss-on-select="true">
            <ion-content>
                <ion-list>
                    <ion-item v-for="c in countries" lines="none" button @click="emit('update:language', c.locales[0])">
                        <ion-avatar>
                            <img :src="'/countries/'+c.country+'.png'" />
                        </ion-avatar>
                        <ion-label class="ion-margin">{{ $t(c.language)}}</ion-label>
                    </ion-item>
                </ion-list>
            </ion-content>
        </ion-popover>
    </ion-button>
</template>

<script setup lang="ts">
    const countries = [
        {'country':'france', 'language':'french', 'locales':['fr','fr-fr']},
        {'country':'united-kingdom', 'language':'english', 'locales':['en']},
    ]

    const props = defineProps({
        language: {
            type: String,
            required: true,
            // TODO : default browser favortie lang, fallback : English
        },
        countryNames: {
            type: Boolean,
            default:true,
        },
        slot: {
            type: String,
            default: ''
        },
    });

    const emit = defineEmits(['update:language'])


    function countryFromLocale(locale:string):string{
        for(let c of countries){
            if(c.locales?.includes(locale)) return c.country
        }
        return '';
    }

    function languageFromLocale(locale:string):string{
        for(let c of countries){
            if(c.locales?.includes(locale)) return c.language
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