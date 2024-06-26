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
          <Vue3EasyDataTable class="data-table" :headers="headers" :items="oponentsStore.oponents" 
          :hide-footer="true" :rows-per-page="200" :sort-by="sortBy" :sort-type="sortType"
          @click-row="creatureInfoModal.open($event.data)">
              <template #item-remove="creature">
                <ion-buttons class="remove-oponent" slot="end">
                  <ion-button @click="$event.stopPropagation();oponentsStore.removeOponent(creature.id)">
                    <ion-icon slot="icon-only" :icon="close" color="danger"></ion-icon>
                  </ion-button>
              </ion-buttons>
              </template>
          </Vue3EasyDataTable>
        </ion-card-content>
      </ion-card>

      <CreatureSearchModal ref="creatureSearchModal" :creatures="oponentsStore.creatures" :language="language" @select="oponentsStore.addOponent($event)"></CreatureSearchModal>
      <CreatureInfosModal ref="creatureInfoModal"></CreatureInfosModal>
    </ion-content>
  </ion-page>
</template>
  
<script setup lang="ts">
    import { ref, inject } from 'vue';
    import InlineField from '@/components/InlineField.vue';
    import CreatureInfosModal from '@/components/CreatureInfosModal.vue'
    import CreatureSearchModal from '@/components/CreatureSearchModal.vue'
    import Vue3EasyDataTable from 'vue3-easy-data-table';
    import { HeroesStore } from '@/stores/HeroesStore'
    import { OponentsStore } from '@/stores/OponentsStore'
    import { add, close } from 'ionicons/icons';
    import { alertController } from '@ionic/vue';
    import type { Header, SortType } from "vue3-easy-data-table";

    const headers: Header[] = [
        { text: "Name", value: "name", sortable: true },
        { text: "Level", value: "data.level", sortable: true},
        { text: "HP", value: "hp", sortable: true},
        { text: "", value: "remove", width: 50},
    ];
    const sortBy = "name";
    const sortType:SortType = "asc";

    const creatureSearchModal = ref();
    const creatureInfoModal = ref();
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
  