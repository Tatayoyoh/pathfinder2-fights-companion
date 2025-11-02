<template>
    <ion-buttons slot="start">
        <ion-button v-if="darkMode" @click="paletteColorChange" color="primary">
            <ion-icon slot="icon-only" :icon="sunny"></ion-icon>
        </ion-button>
        <ion-button v-else @click="paletteColorChange" color="primary">
            <ion-icon slot="icon-only" :icon="moon"></ion-icon>
        </ion-button>
    </ion-buttons>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { ToggleCustomEvent } from '@ionic/vue';
    import { moon, sunny } from 'ionicons/icons';
    import { OptionsStore } from '@/stores/OptionsStore';

    const darkMode = ref(false)
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const optionStore = OptionsStore()
    const initializeDarkPalette = (isDark:boolean) => {
        darkMode.value = isDark;
        toggleDarkPalette(isDark);
    };

    const paletteColorChange = () => {
        darkMode.value=!darkMode.value;
        optionStore.theme = darkMode.value ? 'dark':'light';
        toggleDarkPalette(darkMode.value);
    };

    const toggleDarkPalette = (shouldAdd:boolean) => {
        document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
    };

    onMounted(()=>{
        if(! optionStore.initialized) optionStore.init()
        
        let isDark = prefersDark.matches;
        if(optionStore.theme != ''){
            isDark = (optionStore.theme == 'dark') 
        }
        initializeDarkPalette(isDark);
    })

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener('change', (mediaQuery) => initializeDarkPalette(mediaQuery.matches));

</script>