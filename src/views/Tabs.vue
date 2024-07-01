<template>
  <ion-page>
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

    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="planify" href="/planify">
          <ion-icon aria-hidden="true" src="/planify.svg" />
          <ion-label>{{$t('Planify')}}</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="fight" href="/fight">
          <ion-icon aria-hidden="true" src="/swords.svg" />
          <ion-label>{{$t('Fight')}}</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>

    <HelpUs trigger="more-info-modal"></HelpUs>
  </ion-page>
</template>

<script setup lang="ts">
  import { onMounted, ref, provide } from 'vue';
  import LanguageSelect from '@/components/LanguageSelect.vue'
  import DarkModeToggle from '@/components/DarkModeToggle.vue'
  import HelpUs from '@/components/HelpUs.vue'
  import { HeroesStore } from '@/stores/HeroesStore';
  import { OponentsStore } from '@/stores/OponentsStore';
  import { ConditionsStore } from '@/stores/ConditionsStore';
  import { OptionsStore } from '@/stores/OptionsStore';

  const heroesStore = HeroesStore();
  const oponentsStore = OponentsStore();
  const conditionsStore = ConditionsStore();
  const optionsStore = OptionsStore();

  onMounted(()=>{
    optionsStore.init();
    heroesStore.init();
    oponentsStore.init();
    conditionsStore.init(optionsStore.language);
  });
</script>

<style scoped>
@font-face {
    font-family: heroes;
    src: url('/Heroes.ttf'); /* from https://www.dafont.com/fr/heroes-2.font */
}

ion-title {
  font-family: heroes;
  font-size: 50px;
}

ion-router-outlet{
  margin-top: 80px;
}
</style>
