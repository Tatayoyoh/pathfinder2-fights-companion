<template>
    <ion-page>
      <ion-content :fullscreen="true">
        <ion-card>
          <ion-item lines="none">
            <ion-card-title slot="start">{{$t('Heroes')}}</ion-card-title>
          </ion-item>
          <ion-card-content>
            <ion-item v-for="heroe of heroesStore.heroes" lines="none">
              <ion-label>{{heroe.name}}</ion-label>
              <ion-chip v-for="conditionId of heroe.conditions" color="primary" mode="ios" outline="true" @click="conditionInfoModal.open(conditionId, conditionNameById(conditionId))">
                <ion-icon :icon="close" @click="heroesStore.removeCondition($event, heroe, conditionId)"></ion-icon>
                <ion-label>{{conditionNameById(conditionId)}}</ion-label>
              </ion-chip>
              <ion-button @click="editConditionsPopup(heroe)">{{$t('Edit conditions')}}</ion-button>
            </ion-item>
          </ion-card-content>
        </ion-card>
        
        <ion-card>
          <ion-item lines="none">
            <ion-card-title slot="start">{{$t('Oponents')}}</ion-card-title>
            <ion-button @click="rollPerceptions" fill="outline" shape="round" slot="start">
              {{$t('Roll perceptions')}}
            </ion-button>
          </ion-item>
          <ion-card-content>
            <ion-list>
              <ion-item v-for="(oponent, i) of oponentsStore.oponents">
                <ion-label>{{oponent.name}}<p>{{oponent.creature}}</p></ion-label>
                <ion-label v-if="oponent.perception_rolled">{{oponent.perception_rolled}}</ion-label>
                <ion-button v-else @click="rollPerception(i)" fill="outline" shape="round">
                  {{$t('Roll perceptions')}}
                </ion-button>
                <ion-label>{{oponent.hp}}</ion-label>
                <ion-chip v-for="conditionId of oponent.conditions" color="primary" mode="ios" outline="true" @click="conditionInfoModal.open(conditionId, conditionNameById(conditionId))">
                  <ion-icon :icon="close" @click="heroesStore.removeCondition($event, oponent, conditionId)"></ion-icon>
                  <ion-label>{{conditionNameById(conditionId)}}</ion-label>
                </ion-chip>
                <ion-button slot="end" @click="editConditionsPopup(oponent)">{{$t('Edit conditions')}}</ion-button>
              </ion-item>
              
            </ion-list>
          </ion-card-content>
        </ion-card>
  
  
        <CreatureInfosModal ref="creatureInfoModal"></CreatureInfosModal>
        <ConditionInfosModal ref="conditionInfoModal"></ConditionInfosModal>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import CreatureInfosModal from '@/components/CreatureInfosModal.vue'
    import ConditionInfosModal from '@/components/ConditionInfosModal.vue'
    import { close } from 'ionicons/icons';
    import { HeroesStore } from '@/stores/HeroesStore'
    import { OponentsStore } from '@/stores/OponentsStore'
  
    const oponents:any = ref([])
  
    const creatureInfoModal = ref()
    const conditionInfoModal = ref()
  

    // Stores
    const heroesStore = HeroesStore();
    const oponentsStore = OponentsStore();
  
  
    function rollPerceptions(){
      for(let i in oponents.value){
        console.log(i)
        oponents.value[i].perception_rolled = 10
      }
    }
  
    function rollPerception(oponentIndex:number){
      oponents.value[oponentIndex].perception_rolled = 15;
    }
  
  
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
  </style>
  