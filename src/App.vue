<template>
  <ion-app>
    <HeaderToolbar></HeaderToolbar>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import HeaderToolbar from './components/HeaderToolbar.vue';
</script>
