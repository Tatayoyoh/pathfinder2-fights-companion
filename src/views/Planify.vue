<template>
  <ion-page> 
    <ion-content :fullscreen="true">
      <FightHeader :fight="fight"></FightHeader>
      <ion-card>
        <ion-item lines="none">
          <ion-icon slot="start" src="/creature.svg" size="large" color="warning"></ion-icon>
          <ion-card-title slot="start">{{$t('Oponents')}}</ion-card-title>
          <ion-button @click="creatureSearchModal.open()" fill="outline" shape="round" slot="start">
            <ion-icon slot="start" :icon="add"></ion-icon>
            {{$t('Add')}}
          </ion-button>
        </ion-item>
        <ion-card-content v-if="fight">
          <Vue3EasyDataTable v-if="fight.oponents" class="data-table" :headers="creatureHeaders" :items="fight.oponents" 
          :hide-footer="true" :rows-per-page="200" :sort-by="sortBy" :sort-type="sortType"
          @click-row="creatureInfoModal.open($event.data)">
              <template #item-remove="creature">
                <ion-buttons slot="end">
                  <ion-button @click="$event.stopPropagation();removeOponent(creature.id)">
                    <ion-icon slot="icon-only" :icon="close" color="danger"></ion-icon>
                  </ion-button>
              </ion-buttons>
              </template>
          </Vue3EasyDataTable>
        </ion-card-content>
      </ion-card>

      <CreatureSearchModal ref="creatureSearchModal" :creatures="creaturesStore.creatures" @select="addOponent"></CreatureSearchModal>
      <CreatureInfosModal ref="creatureInfoModal"></CreatureInfosModal>

      <ion-card>
        <ion-item lines="none">
          <ion-icon slot="start" src="/treasures2.svg" size="large" color="warning"></ion-icon>
          <ion-card-title slot="start">{{$t('Treasures')}}</ion-card-title>
          <ion-button @click="treasureSearchModal.open()" fill="outline" shape="round" slot="start">
            <ion-icon slot="start" :icon="add"></ion-icon>
            {{$t('Add')}}
          </ion-button>
        </ion-item>
        <ion-card-content v-if="fight">
          <Vue3EasyDataTable v-if="fight.treasures" class="data-table" :headers="treasureHeaders" :items="fight.treasures" 
          :hide-footer="true" :rows-per-page="200" :sort-by="sortBy" :sort-type="sortType"
          @click-row="treasureInfosModal.open($event.data)">
              <template #item-remove="treasure">
                <ion-buttons slot="end">
                  <ion-button @click="$event.stopPropagation();removeTreasure(treasure.id)">
                    <ion-icon slot="icon-only" :icon="close" color="danger"></ion-icon>
                  </ion-button>
              </ion-buttons>
              </template>
          </Vue3EasyDataTable>
        </ion-card-content>
      </ion-card>

      <TreasureSearchModal ref="treasureSearchModal" :treasures="treasuresStore.treasures" @select="addTreasure"></TreasureSearchModal>
      <TreasureInfosModal ref="treasureInfosModal"></TreasureInfosModal>

      <RepoDataInit></RepoDataInit>
    </ion-content>
  </ion-page>
</template>
  
<script setup lang="ts">
    import { computed, ref } from 'vue';
    import CreatureInfosModal from '@/components/CreatureInfosModal.vue'
    import CreatureSearchModal from '@/components/CreatureSearchModal.vue'
    import TreasureSearchModal from '@/components/TreasureSearchModal.vue';
    import TreasureInfosModal from '@/components/TreasureInfosModal.vue';
    import FightHeader from '@/components/FightHeader.vue';
    import HeaderToolbar from '@/components/HeaderToolbar.vue';
    import RepoDataInit from '@/components/RepoDataInit.vue';
    import Vue3EasyDataTable from 'vue3-easy-data-table';
    import { add, chevronBackCircle, close } from 'ionicons/icons';
    import type { Header, SortType } from "vue3-easy-data-table";
    import { useI18n } from 'vue-i18n';
    import { useRepo } from 'pinia-orm';
    import Fight from '@/models/fightModel';
    import { useRoute, useRouter } from 'vue-router';
    import { CreaturesStore } from '@/stores/creaturesStore';
    import { TreasuresStore } from '@/stores/TreasuresStore';
    import Oponent from '@/models/oponentModel';
    import Treasure from '@/models/treasureModel';

    const i18n = useI18n();
    const router = useRouter();

    const route = useRoute();
    const fightID:any = route.params.id;

    const creatureHeaders: Header[] = [
        { text: i18n.t("Name"), value: "name", sortable: true },
        { text: i18n.t("Level"), value: "data.level", sortable: true},
        { text: i18n.t("HP"), value: "hp", sortable: true},
        { text: "", value: "remove", width: 50},
    ];
    const treasureHeaders: Header[] = [
        { text: i18n.t("Name"), value: "name", sortable: true },
        { text: i18n.t("Level"), value: "data.level", sortable: true},
        { text: i18n.t("Type"), value: "type", sortable: true},
        { text: "", value: "remove", width: 50},
    ];

    const sortBy = "name";
    const sortType:SortType = "asc";

    const creatureSearchModal = ref();
    const treasureSearchModal = ref();
    const creatureInfoModal = ref();
    const treasureInfosModal = ref();

    const fightRepo = useRepo(Fight).withAllRecursive();
    const fight = computed(()=>fightRepo.find(fightID))

    const creaturesStore = CreaturesStore()
    const treasuresStore = TreasuresStore()

    function addOponent(oponentData:any){
      if(fight.value){
        let oponent = useRepo(Oponent).save(
          {
            'name': creaturesStore.translatedName(oponentData),
            'type': 'creature',
            'hp': oponentData.attributes.hp,
            'perception': oponentData.perception.mod,
            'perception_rolled': undefined,
            'conditions': [],
            'data': oponentData
          }
        )
        if(!fight.value.oponents) fight.value.oponents = []
        fight.value.oponents.push(oponent)
        fightRepo.save({id:fightID, oponents:fight.value.oponents})
      }
    }

    function addTreasure(treasureData:any){
      if(fight.value){
        let treasure = useRepo(Treasure).save(
          {
            'name': creaturesStore.translatedName(treasureData),
            'type': treasureData.type,
            'data': treasureData
          }
        )
        if(!fight.value.treasures) fight.value.treasures = []
        fight.value.treasures.push(treasure)
        fightRepo.save({id:fightID, treasures:fight.value.treasures})
      }
    }

    function removeOponent(creatureId:string){
      // Workaround : do NOT use 'useRepo(Oponent)' as setup variable to avoid glitches
      useRepo(Oponent).withAllRecursive().destroy(creatureId)
    }

    function removeTreasure(treasureId:string){
      // Workaround : do NOT use 'useRepo(Treasure)' as setup variable to avoid glitches
      useRepo(Treasure).withAllRecursive().destroy(treasureId)
    }
</script>
  
<style scoped>

</style>
  