<template>
    <ion-buttons slot="start">
        <ion-button v-if="colorModeToggle" @click="paletteColorChange" color="primary">
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

    const colorModeToggle = ref(false)
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    const initializeDarkPalette = (isDark:boolean) => {
        colorModeToggle.value = isDark;
        toggleDarkPalette(isDark);
    };

    const paletteColorChange = () => {
        colorModeToggle.value=!colorModeToggle.value
        toggleDarkPalette(colorModeToggle.value);
    };

    const toggleDarkPalette = (shouldAdd:boolean) => {
        document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
    };

    onMounted(()=>{
        initializeDarkPalette(prefersDark.matches);
    })

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener('change', (mediaQuery) => initializeDarkPalette(mediaQuery.matches));

</script>