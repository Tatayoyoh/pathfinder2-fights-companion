<template>
  <ion-page> 
    <ion-content :fullscreen="true">


      <ion-card>
        <ion-item lines="none">
          <ion-card-title slot="start">{{$t('Oponents')}}</ion-card-title>
          <ion-button @click="creatureSearchModal.open()" fill="outline" shape="round" slot="start">
            <ion-icon slot="start" :icon="add"></ion-icon>
            {{$t('Add')}}
          </ion-button>
        </ion-item>
        <ion-card-content v-if="fight">
          <Vue3EasyDataTable v-if="fight.oponents" class="data-table" :headers="headers" :items="fight.oponents" 
          :hide-footer="true" :rows-per-page="200" :sort-by="sortBy" :sort-type="sortType"
          @click-row="creatureInfoModal.open($event.data)">
              <template #item-remove="creature">
                <ion-buttons class="remove-oponent" slot="end">
                  <ion-button @click="$event.stopPropagation();fight.removeOponent(creature.id)">
                    <ion-icon slot="icon-only" :icon="close" color="danger"></ion-icon>
                  </ion-button>
              </ion-buttons>
              </template>
          </Vue3EasyDataTable>
        </ion-card-content>
      </ion-card>

      <CreatureSearchModal ref="creatureSearchModal" :creatures="fight.creatures" @select="fight.addOponent($event)"></CreatureSearchModal>
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
    import { add, close } from 'ionicons/icons';
    import { alertController } from '@ionic/vue';
    import type { Header, SortType } from "vue3-easy-data-table";
    import { useI18n } from 'vue-i18n';
    import { useRepo } from 'pinia-orm';
    import Fight from '@/models/fightModel';
    import { useRoute } from 'vue-router';

    const i18n = useI18n();

    const route = useRoute();
    const fightID:any = route.params.id;

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

    const fightRepo = useRepo(Fight);
    const fight = fightRepo.find(fightID)

</script>
  
<style scoped>

</style>
  