
<template>
    <ion-header :translucent="true">
        <ion-toolbar>
          <ion-title><ion-text color="warning">Pathfinder2e</ion-text> Fight Companion</ion-title>
          <ion-button id="more-info-modal" slot="end" expand="block" fill="clear">
            {{$t("More informations")}}
          </ion-button>
          <DarkModeToggle slot="end" class="ion-margin"></DarkModeToggle>
          <LanguageSelect slot="end"></LanguageSelect>
        </ion-toolbar>
    </ion-header>
    <HelpUs trigger="more-info-modal"></HelpUs>
</template>

<script setup lang="ts">
    import HelpUs from '@/components/HelpUs.vue';
    import DarkModeToggle from './DarkModeToggle.vue';
    import LanguageSelect from './LanguageSelect.vue';
</script>