<template>
    <ion-page>
      <ion-content :fullscreen="true">
        <FightHeader :fight="fight"></FightHeader>

        <ion-card>
          <ion-item lines="none">
            <ion-card-title slot="start">{{$t('Heroes')}}</ion-card-title>
          </ion-item>
          <ion-card-content>
            <ion-item v-for="heroe of heroeRepo.all()" lines="none">
              <ion-icon slot="start" :icon="personCircle" color="primary"></ion-icon>
              <ion-label v-if="heroe.name">{{heroe.name}}</ion-label>
              <ion-label v-else>{{$t('Unnamed heroe')}}</ion-label>
              <ion-chip v-for="condition of heroe.conditions" color="primary" mode="ios" outline="true" @click="conditionInfoModal.open(condition.id, condition)">
                <ion-icon :icon="close" @click="removeCondition($event, heroe, condition.id)"></ion-icon>
                <ion-label>{{ condition.translate(optionsStore.language) }}</ion-label>
              </ion-chip>
              <ion-button @click="editConditionsPopup(heroe)">{{$t('Edit conditions')}}</ion-button>
            </ion-item>
          </ion-card-content>
        </ion-card>

        <!-- <ion-row v-if="fight">
          <ion-col size="4">
            <ion-button v-if="fight" @click="ionRouter.push(`/fight/${fight.id-1}`)" expand="block" shape="round">
              <ion-icon slot="icon-only" :icon="chevronBack"></ion-icon>
              {{$t('Previous')}}
            </ion-button>
          </ion-col>
          <ion-col size="4" class="ion-text-center">
            <h1>{{fight.name}}</h1>
          </ion-col>
          <ion-col size="4">
            <ion-button v-if="fight.id < fightRepo.all().length-1" @click="ionRouter.push(`/fight/${fightRepo.id+1}`)" expand="block" shape="round">
              <ion-icon slot="icon-only" :icon="chevronForward"></ion-icon>
              {{$t('Next')}}
            </ion-button>
          </ion-col>
        </ion-row> -->

        <ion-card v-if="fight">
          <ion-item lines="none">
            <ion-button class="perception-button" @click="rollPerceptions" fill="outline" shape="round" slot="start">
              <ion-icon src="/d20.svg" color="primary"></ion-icon>
              {{$t('Roll perceptions')}}
              <ion-select v-model="optionsStore.perception_roll" class="" @click="$event.stopPropagation()">
                <ion-select-option value="all">{{$t('For all')}}</ion-select-option>
                <ion-select-option value="oponents">{{$t('Oponents only')}}</ion-select-option>
              </ion-select>
            </ion-button>
            <ion-toggle slot="start" :enable-on-off-labels="true">{{ $t('Auto reorder') }}</ion-toggle>
          </ion-item>
          <ion-card-content v-if="fight.oponents">

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
                    <ion-button @click="rollPerception(oponent)" size="small" fill="outline">
                      <img class="d20-button" src="/des-d20.png"></img>
                    </ion-button>
                </span>
                <ion-button v-else @click="rollPerception(oponent)" fill="outline" shape="round">
                  {{$t('Roll perceptions')}}
                </ion-button>
              </template>
              <template #item-conditions="oponent">
                  <Popper v-for="conditionId of oponent.conditions" hover arrow>
                    <ion-chip :id="conditionId" color="primary" mode="ios" outline="true" @click="conditionInfoModal.open(conditionId, conditionRepo.find(conditionId)?.name)">
                      <ion-icon :icon="close" @click="removeCondition($event, fight.oponentById(oponent.id), conditionId)"></ion-icon>
                      <ion-label>{{conditionRepo.find(conditionId)?.name}}</ion-label>
                    </ion-chip>

                    <template #content>
                      <div>TODO: short effect infos 👀</div>
                      <div><small>click to show more informations</small></div>
                    </template>
                  </Popper>
              </template>

              <template #item-editconditions="oponent">
                <ion-button size="small" @click="editConditionsPopup(fight.oponentById(oponent.id))">{{$t('Edit conditions')}}</ion-button>
              </template>
            </Vue3EasyDataTable>
          </ion-card-content>
        </ion-card>
  
  
        <CreatureInfosModal ref="creatureInfoModal"></CreatureInfosModal>
        <ConditionInfosModal ref="conditionInfoModal"></ConditionInfosModal>
        <!-- <DiceTray></DiceTray> -->

        <RepoDataInit></RepoDataInit>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
    import { computed, ref } from 'vue';
    import { chevronBack, chevronForward, close, personCircle, reload } from 'ionicons/icons';
    import CreatureInfosModal from '@/components/CreatureInfosModal.vue'
    import ConditionInfosModal from '@/components/ConditionInfosModal.vue'
    import DiceTray from '@/components/DiceTray.vue';
    import FightHeader from '@/components/FightHeader.vue';
    import RepoDataInit from '@/components/RepoDataInit.vue';
    import Vue3EasyDataTable from 'vue3-easy-data-table';
    import type { Header, SortType } from "vue3-easy-data-table";
    import { OptionsStore } from '@/stores/OptionsStore';
    import { useRoute } from 'vue-router';
    import { alertController } from '@ionic/vue';
    import { useRepo } from 'pinia-orm';
    import Fight from '@/models/fightModel';
    import Heroe from '@/models/heroeModel';
    import Condition from '@/models/conditionModel';
    import Oponent from '@/models/oponentModel';

    const route = useRoute();
  
    const headers: Header[] = [
        { text: "", value: "type", sortable: true, width:50 },
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
    const fightRepo = useRepo(Fight).withAllRecursive();
    const conditionRepo = useRepo(Condition);
    const fightID:any = route.params.id;
    const fight = computed(()=>fightRepo.find(fightID))
    const heroeRepo = useRepo(Heroe).withAllRecursive();
    const optionsStore = OptionsStore();
  
  
    function rollPerceptions(){
      for(let oponent of fight.value.oponents){
        oponent.perception_rolled = getRandomInt() + oponent.perception;
      }
    }
  
    function rollPerception(oponent:any){
      fight.value.oponentById(oponent.id).perception_rolled = getRandomInt() + oponent.perception;
    }
  
    function getRandomInt() {
      const minCeiled = Math.ceil(1);
      const maxFloored = Math.floor(20);
      return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
    }

    function removeCondition(event:Event, character:Heroe|Oponent|any, conditionId:string){
      event.stopPropagation();
      if(character.player != undefined){
        character.removeCondition(conditionId)
        console.log(character)
        character = heroeRepo.save({id:character.id, conditions:character.conditions})
        console.log(character)
      }
      else{
        // fightRepo.
      }
    }

    async function editConditionsPopup(character:any){
        let conditionInputs:any = []
        if(!character.conditions) character.conditions = []
        for(let condition of conditionRepo.all()){
          // More informations about alertInput : https://ionicframework.com/docs/api/alert#alertinput
          conditionInputs.push({
            label: condition.translate(optionsStore.language),
            value: condition.id,
            type: 'checkbox',
            checked: character.hasCondition(condition.id)
          })
        }
    
        const alert = await alertController.create({
          header: "Select a condition",
          buttons: [{text:'Clear conditions', role:'clearall'},{text:'OK', role:'confirm'}],
          inputs: conditionInputs,
        });
    
        await alert.present();
    
        const {role, data} = await alert.onDidDismiss();
        if(role == 'clearall') character.conditions = []
        else {
          for(let conditionID of data.values){
            character.conditions.push(conditionRepo.find(conditionID));
          }
        }

        console.log(character.conditions)

        if(character.player != undefined) {
          console.log(character.id)
          heroeRepo.save({id:character.id, conditions:character.conditions})
        }
        
      }

  </script>
  
  <style scoped>
  .perception-button ion-icon{
    margin-left: 5px;
    margin-right: 5px;
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
  