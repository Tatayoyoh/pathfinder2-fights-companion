<template>
  <ion-app>
    <HeaderToolbar></HeaderToolbar>
    <div class="background"></div>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import HeaderToolbar from './components/HeaderToolbar.vue';
import { computed } from 'vue';
import { OptionsStore } from './stores/OptionsStore';

const optionsStore = OptionsStore()

const backgoundImage = computed(()=> {
      return optionsStore.theme == 'dark' ? 'url(bg1.jpg)':'url(bg3.jpg)'
    })
</script>

<style>
  .background{
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background-image: v-bind(backgoundImage);
      background-position: center center;
      background-attachment: fixed;
      background-repeat: no-repeat;
      background-size: cover;
      opacity: 0.7;
  }
  ion-content {
    --background: none;
  }
</style>