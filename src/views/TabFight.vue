<template>
    <ion-page>
      <ion-content :fullscreen="true">
        <ion-card>
          <ion-item lines="none">
            <ion-card-title slot="start">{{$t('Heroes')}}</ion-card-title>
          </ion-item>
          <ion-card-content>
            <ion-item v-for="heroe of heroesStore.heroes" lines="none">
              <ion-label v-if="heroe.name">{{heroe.name}}</ion-label>
              <ion-label v-else>{{$t('Unnamed heroe')}}</ion-label>
              <ion-chip v-for="conditionId of heroe.conditions" color="primary" mode="ios" outline="true" @click="conditionInfoModal.open(conditionId, conditionsStore.conditionNameById(conditionId))">
                <ion-icon :icon="close" @click="heroesStore.removeCondition($event, heroe, conditionId)"></ion-icon>
                <ion-label>{{conditionsStore.conditionNameById(conditionId)}}</ion-label>
              </ion-chip>
              <ion-button @click="conditionsStore.editConditionsPopup(heroe)">{{$t('Edit conditions')}}</ion-button>
            </ion-item>
          </ion-card-content>
        </ion-card>

        <ion-row>
          <ion-col size="4">
            <ion-button v-if="fight" @click="ionRouter.push(`/fight/${fight.id-1}/fight`)" expand="block" shape="round">
              <ion-icon slot="icon-only" :icon="chevronBack"></ion-icon>
              {{$t('Previous')}}
            </ion-button>
          </ion-col>
          <ion-col size="4" class="ion-text-center">
            <h1>{{fight.name}}</h1>
          </ion-col>
          <ion-col size="4">
            <ion-button v-if="fight.id < fightRepo.all().length-1" @click="ionRouter.push(`/fight/${fightRepo.id+1}/fight`)" expand="block" shape="round">
              <ion-icon slot="icon-only" :icon="chevronForward"></ion-icon>
              {{$t('Next')}}
            </ion-button>
          </ion-col>
        </ion-row>

        <ion-card v-if="fight">
          <ion-item lines="none">
            <ion-button class="perception-button" @click="rollPerceptions" fill="outline" shape="round" slot="start">
              {{$t('Roll perceptions')}}
              <ion-select v-model="optionsStore.perception_roll" class="" @click="$event.stopPropagation()">
                <ion-select-option value="all">{{$t('For all')}}</ion-select-option>
                <ion-select-option value="oponents">{{$t('Oponents only')}}</ion-select-option>
              </ion-select>
            </ion-button>
            <ion-toggle slot="start" :enable-on-off-labels="true">{{ $t('Auto reorder') }}</ion-toggle>
          </ion-item>
          <ion-card-content>

            <Vue3EasyDataTable class="data-table" :headers="headers" :items="fight.oponents" :hide-footer="true" :rows-per-page="200" :sort-by="sortBy" :sort-type="sortType">
              <template #item-type="oponent">
                <ion-avatar v-if="oponent.type == 'creature'">
                  <ion-icon  src="/creature.svg" size="large" color="warning"></ion-icon>
                </ion-avatar>
                <ion-avatar v-if="oponent.type == 'heroe'">
                  <ion-icon  :icon="personCircle" size="large" color="primary"></ion-icon>
                </ion-avatar>
              </template>
              <template #item-perception_rolled="oponent">
                <span v-if="oponent.perception_rolled">
                  <ion-text class="perception-rolled">{{oponent.perception_rolled}}</ion-text>
                  <!-- <ion-buttons> -->
                    <ion-button @click="rollPerception(oponent)" size="small" fill="outline">
                      <img class="d20-button" src="/des-d20.png"></img>
                    </ion-button>
                  <!-- </ion-buttons> -->

                </span>
                <ion-button v-else @click="rollPerception(oponent)" fill="outline" shape="round">
                  {{$t('Roll perceptions')}}
                </ion-button>
              </template>
              <template #item-conditions="oponent">
                  <Popper v-for="conditionId of oponent.conditions" hover arrow>
                    <ion-chip :id="conditionId" color="primary" mode="ios" outline="true" @click="conditionInfoModal.open(conditionId, conditionsStore.conditionNameById(conditionId))">
                      <ion-icon :icon="close" @click="fight.removeCondition($event, fight.oponentById(oponent.id), conditionId)"></ion-icon>
                      <ion-label>{{conditionsStore.conditionNameById(conditionId)}}</ion-label>
                    </ion-chip>

                    <template #content>
                      <div>TODO: short effect infos 👀</div>
                      <div><small>click to show more informations</small></div>
                    </template>
                  </Popper>
              </template>

              <template #item-editconditions="oponent">
                <ion-button size="small" @click="conditionsStore.editConditionsPopup(fight.oponentById(oponent.id))">{{$t('Edit conditions')}}</ion-button>
              </template>
            </Vue3EasyDataTable>
          </ion-card-content>
        </ion-card>
  
  
        <CreatureInfosModal ref="creatureInfoModal"></CreatureInfosModal>
        <ConditionInfosModal ref="conditionInfoModal"></ConditionInfosModal>
        <!-- <DiceTray></DiceTray> -->
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
    import { ref } from 'vue';
    import CreatureInfosModal from '@/components/CreatureInfosModal.vue'
    import ConditionInfosModal from '@/components/ConditionInfosModal.vue'
    import { chevronBack, chevronForward, close, personCircle, reload } from 'ionicons/icons';
    import { HeroesStore } from '@/stores/HeroesStore'
    import { ConditionsStore } from '@/stores/ConditionsStore';
    import DiceTray from '@/components/DiceTray.vue';
    import Vue3EasyDataTable from 'vue3-easy-data-table';
    import type { Header, SortType } from "vue3-easy-data-table";
    import { OptionsStore } from '@/stores/OptionsStore';
    import { useIonRouter } from '@ionic/vue';
    import { useRepo } from 'pinia-orm';
    import Fight from '@/models/fightModel';
    import { useRoute } from 'vue-router';

    const ionRouter = useIonRouter();
    const route = useRoute();
  
    const headers: Header[] = [
        { text: "Type", value: "type", sortable: true, width:50 },
        { text: "Name", value: "name", sortable: true },
        { text: "Perception", value: "perception_rolled", sortable: true, width:100},
        { text: "HP", value: "hp", sortable: true, width: 50},
        { text: "Conditions", value: "conditions"},
        { text: "", value: "editconditions", width: 200},
    ];
    const sortBy = "name";
    const sortType:SortType = "asc";  
    const creatureInfoModal = ref()
    const conditionInfoModal = ref()
    
    
    // Stores
    const fightRepo = useRepo(Fight);
    const fightID:any = route.params.id;
    const fight = fightRepo.find(fightID)
    const heroesStore = HeroesStore();
    const conditionsStore = ConditionsStore();
    const optionsStore = OptionsStore();
  
  
    function rollPerceptions(){
      for(let oponent of fight.oponents){
        oponent.perception_rolled = getRandomInt() + oponent.perception;
      }
    }
  
    function rollPerception(oponent:any){
      fight.oponentById(oponent.id).perception_rolled = getRandomInt() + oponent.perception;
    }
  
    function getRandomInt() {
      const minCeiled = Math.ceil(1);
      const maxFloored = Math.floor(20);
      return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
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

  .perception-button ion-select{
    border-left: 1px solid var(--ion-color-primary); 
    margin-left: 10px; 
    padding-left: 10px
  }
  .perception-rolled {
    font-size: 30px;
  }
  .d20-button {
    width: 40px;
  }
  </style>
  