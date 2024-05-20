<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title><ion-text color="warning">Pathfinder2e</ion-text> Fight Companion</ion-title>
        <DarkModeToggle slot="end" class="ion-margin"></DarkModeToggle>
        <LanguageSelect slot="end" :language='language'></LanguageSelect>
      </ion-toolbar>
    </ion-header>

    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/fight">
          <ion-icon aria-hidden="true" src="/swords.svg" />
          <ion-label>{{$t('Fight')}}</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/planify">
          <ion-icon aria-hidden="true" src="/planify.svg" />
          <ion-label>{{$t('Planify')}}</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
  import { onMounted, ref, provide } from 'vue';
  import LanguageSelect from '@/components/LanguageSelect.vue'
  import DarkModeToggle from '@/components/DarkModeToggle.vue'
  import { HeroesStore } from '@/stores/HeroesStore';
  import { OponentsStore } from '@/stores/OponentsStore';
  import { ConditionsStore } from '@/stores/ConditionsStore';

  const language = ref('fr') // 'en' or 'fr'

  const heroesStore = HeroesStore();
  const oponentsStore = OponentsStore();
  const conditionsStore = ConditionsStore();

  provide('language', language)

  onMounted(()=>{
    heroesStore.init();
    oponentsStore.init();
    conditionsStore.init(language.value);
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
