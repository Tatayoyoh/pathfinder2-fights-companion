<template>
  <ion-page> 
    <ion-content :fullscreen="true">
      <ion-card>
        <ion-item lines="none">
          <ion-card-title slot="start">{{$t('Heroes')}}</ion-card-title>
          <ion-button @click="heroesStore.addHeroe" fill="outline" shape="round" slot="start">
            <ion-icon slot="start" :icon="add"></ion-icon>
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
            <ion-icon slot="start" :icon="add"></ion-icon>
            {{$t('Add')}}
          </ion-button>
          <ion-button @click="" color="danger" fill="outline" shape="round" slot="end">
            {{$t('Remove')}} {{$t('Fight')}}
          </ion-button>
        </ion-item>
        <ion-card-content>
          <Vue3EasyDataTable class="data-table" :headers="headers" :items="fightsStore.oponents()" 
          :hide-footer="true" :rows-per-page="200" :sort-by="sortBy" :sort-type="sortType"
          @click-row="creatureInfoModal.open($event.data)">
              <template #item-remove="creature">
                <ion-buttons class="remove-oponent" slot="end">
                  <ion-button @click="$event.stopPropagation();fightsStore.removeOponent(creature.id)">
                    <ion-icon slot="icon-only" :icon="close" color="danger"></ion-icon>
                  </ion-button>
              </ion-buttons>
              </template>
          </Vue3EasyDataTable>
        </ion-card-content>
      </ion-card>

      <CreatureSearchModal ref="creatureSearchModal" :creatures="fightsStore.creatures" @select="fightsStore.addOponent($event)"></CreatureSearchModal>
      <CreatureInfosModal ref="creatureInfoModal"></CreatureInfosModal>
    </ion-content>
  </ion-page>
</template>
  
<script setup lang="ts">
    import { ref } from 'vue';
    import InlineField from '@/components/InlineField.vue';
    import CreatureInfosModal from '@/components/CreatureInfosModal.vue'
    import CreatureSearchModal from '@/components/CreatureSearchModal.vue'
    import Vue3EasyDataTable from 'vue3-easy-data-table';
    import { HeroesStore } from '@/stores/HeroesStore'
    import { FightsStore } from '@/stores/FightsStore'
    import { add, close } from 'ionicons/icons';
    import { alertController } from '@ionic/vue';
    import type { Header, SortType } from "vue3-easy-data-table";
    import { useI18n } from 'vue-i18n';

    const i18n = useI18n();

    const headers: Header[] = [
        { text: i18n.t("Name"), value: "name", sortable: true },
        { text: i18n.t("Level"), value: "data.level", sortable: true},
        { text: i18n.t("HP"), value: "hp", sortable: true},
        { text: "", value: "remove", width: 50},
    ];
    const sortBy = "name";
    const sortType:SortType = "asc";

    const creatureSearchModal = ref();
    const creatureInfoModal = ref();
    const encounters:any = ref([]);

    const heroesStore = HeroesStore();
    const fightsStore = FightsStore();

    async function removeHeroeAlert(index:number) {
      const alert = await alertController.create({
        header: 'Confirm heroe deletion',
        buttons: [
          {
            text: i18n.t('Cancel'), role: 'cancel',
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
  