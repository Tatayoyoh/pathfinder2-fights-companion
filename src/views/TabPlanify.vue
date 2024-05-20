<template>
    <ion-page> 
      <ion-content :fullscreen="true">
        <ion-card>
          <ion-item lines="none">
            <ion-card-title slot="start">{{$t('Heroes')}}</ion-card-title>
            <ion-button @click="heroesStore.addHeroe" fill="outline" shape="round" slot="start">
              {{$t('Add')}}
            </ion-button>
          </ion-item>
          <ion-card-content>
            <ion-item v-for="heroe of heroesStore.heroes" lines="none">
              <ion-label>{{heroe.name}}</ion-label>
            </ion-item>
          </ion-card-content>
        </ion-card>

        <ion-card>
          <ion-item lines="none">
            <ion-card-title slot="start">{{$t('Oponents')}}</ion-card-title>
            <ion-button @click="oponentsStore.addOponent" fill="outline" shape="round" slot="start">
              {{$t('Add')}}
            </ion-button>
          </ion-item>
          <ion-card-content>
            <ion-list>
              <ion-item v-for="(oponent, i) of oponentsStore.oponents">
                <ion-button v-if="!oponent.name"  fill="outline" shape="round" @click="creatureSearchModal.open()">
                  {{$t('Search')}}
                </ion-button>
                <ion-label v-else>{{oponent.name}}<p>{{oponent.creature}}</p></ion-label>
                <ion-label v-if="oponent.perception_rolled">{{oponent.perception_rolled}}</ion-label>
                <ion-label>{{oponent.hp}}</ion-label>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>

        <CreatureSearchModal ref="creatureSearchModal" :creatures="oponentsStore.creatures" :language="language"></CreatureSearchModal>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
    // import { ref, onMounted } from 'vue';
    // import { alertController } from '@ionic/vue';
    // import LanguageSelect from '@/components/LanguageSelect.vue'
    // import CreatureInfosModal from '@/components/CreatureInfosModal.vue'
    // import CreatureSearchModal from '@/components/CreatureSearchModal.vue'
    // import ConditionInfosModal from '@/components/ConditionInfosModal.vue'
    // import DarkModeToggle from '@/components/DarkModeToggle.vue'
    // import { close } from 'ionicons/icons';
    import { ref, inject } from 'vue';
    import CreatureInfosModal from '@/components/CreatureInfosModal.vue'
    import CreatureSearchModal from '@/components/CreatureSearchModal.vue'
    import { HeroesStore } from '@/stores/HeroesStore'
    import { OponentsStore } from '@/stores/OponentsStore'
  
    const creatureSearchModal = ref()

    const heroesStore = HeroesStore();
    const oponentsStore = OponentsStore();

    const language:any = inject('language');
  
  </script>
  
  <style scoped>

  </style>
  