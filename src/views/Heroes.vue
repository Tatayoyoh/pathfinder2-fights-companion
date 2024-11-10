<template>
    <ion-page>
      <ion-header :translucent="true">
        <ion-toolbar>
          <ion-title><ion-text color="warning">{{$t("Heroes")}}</ion-text></ion-title>
        
        </ion-toolbar>
      </ion-header>
  
      <ion-content>
        <ion-row>
            <ion-col size-md="6" offset-md="3" size-xs="12">
                <ion-button @click="" expand="block" shape="round">
            <ion-icon slot="start" :icon="create"></ion-icon>
            {{$t("Edit heroes")}}
        </ion-button>
            </ion-col>

        </ion-row>

        <ion-item>
        <ion-title>Your Fights</ion-title>
        <ion-button @click="" fill="outline" shape="round">
            <ion-icon slot="start" :icon="add"></ion-icon>
            {{$t('Add')}}
          </ion-button>
        </ion-item>

        <ion-list>
            <ion-item>
                <ion-label>Crypt</ion-label>
                <ion-button slot="end" shape="round">
                    {{$t("Edit")}}
                    <ion-icon aria-hidden="true" src="/planify.svg" />

                </ion-button>
                <ion-button slot="end" shape="round">
                    {{$t("Fight")}}
                    <ion-icon aria-hidden="true" src="/swords.svg" />
                </ion-button>
            </ion-item>
        </ion-list>            
          </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
    import { onMounted, ref, provide } from 'vue';
    import { HeroesStore } from '@/stores/HeroesStore';
    import { ConditionsStore } from '@/stores/ConditionsStore';
    import { OptionsStore } from '@/stores/OptionsStore';
    import { add, create } from 'ionicons/icons';

  
    const heroesStore = HeroesStore();
    const conditionsStore = ConditionsStore();
    const optionsStore = OptionsStore();
  
    onMounted(()=>{
      optionsStore.init();
      heroesStore.init();
      conditionsStore.init(optionsStore.language);
    });
  </script>
  
  <style scoped>

  </style>
  