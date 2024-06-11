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
            <ion-item v-for="heroe, i of heroesStore.heroes" lines="none">
              <InlineField slot="start" :document="heroe" fieldName="name" placeholder="Give a name here"></InlineField>
              <ion-buttons slot="end">
                  <ion-button @click="removeHeroeAlert(i)">
                    <ion-icon slot="icon-only" :icon="close" color="danger"></ion-icon>
                  </ion-button>
              </ion-buttons>
            </ion-item>
          </ion-card-content>
        </ion-card>

        <ion-card>
          <ion-segment :scrollable="true" value="heart">
            <ion-segment-button v-for="encounter of encounters" :value="encoutner">
              {{ encounter }}
            </ion-segment-button>
            <ion-segment-button value="add" @click="encounters.push($t('Fight')+' '+(encounters.length+1))">
              <ion-icon :icon="add"></ion-icon>
            </ion-segment-button>
          </ion-segment>
          <ion-buttons slot="end">
            <ion-button @click="">
              <ion-icon name="add"></ion-icon>
            </ion-button>
          </ion-buttons>
          
          <ion-item lines="none">
            <ion-card-title slot="start">{{$t('Oponents')}}</ion-card-title>
            <ion-button @click="creatureSearchModal.open()" fill="outline" shape="round" slot="start">
              {{$t('Add')}}
            </ion-button>
            <ion-button @click="" color="danger" fill="outline" shape="round" slot="end">
              {{$t('Remove')}} {{$t('Fight')}}
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
                <ion-buttons slot="end">
                  <ion-button @click="oponentsStore.removeOponent(i)">
                    <ion-icon slot="icon-only" :icon="close" color="danger"></ion-icon>
                  </ion-button>
                </ion-buttons>
              </ion-item>
            </ion-list>
          </ion-card-content>
        </ion-card>

        <CreatureSearchModal ref="creatureSearchModal" :creatures="oponentsStore.creatures" :language="language" @select="oponentsStore.addOponent($event)"></CreatureSearchModal>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
    import { ref, inject } from 'vue';
    import InlineField from '@/components/InlineField.vue';
    import CreatureInfosModal from '@/components/CreatureInfosModal.vue'
    import CreatureSearchModal from '@/components/CreatureSearchModal.vue'
    import { HeroesStore } from '@/stores/HeroesStore'
    import { OponentsStore } from '@/stores/OponentsStore'
    import { add, close } from 'ionicons/icons';
    import { alertController } from '@ionic/vue';

    const creatureSearchModal = ref()
    const encounters:any = ref([]);

    const heroesStore = HeroesStore();
    const oponentsStore = OponentsStore();

    const language:any = inject('language');
  
    async function removeHeroeAlert(index:number) {
      const alert = await alertController.create({
        header: 'Confirm heroe deletion',
        buttons: [
          {
            text: 'Cancel', role: 'cancel',
          },
          {
            text: 'OK', role: 'confirm', handler: () => {
              heroesStore.removeHeroe(index);
            },
          },
        ],
      });

      await alert.present();
    };

  </script>
  
  <style scoped>

  </style>
  