<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title><ion-text color="warning">Pathfinder2e</ion-text> Fight Companion</ion-title>
        <ion-button id="more-info-modal" slot="end" expand="block" fill="clear">
          {{$t("More informations")}}
        </ion-button>
        <DarkModeToggle slot="end" class="ion-margin"></DarkModeToggle>
        <LanguageSelect slot="end"></LanguageSelect>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-tabs>
        <ion-router-outlet></ion-router-outlet>
        <ion-footer>
          <ion-toolbar class="ion-text-center">
            <ion-text color="primary">
              <h1>{{fight.name}}</h1>
            </ion-text>
            <ion-button @click="" color="danger" fill="outline" shape="round" slot="end">
              {{$t('Remove')}} {{$t('Fight')}}
            </ion-button>
            <ion-button v-if="fight.ready" tab="planify" @click="toggleFight">
              <ion-icon aria-hidden="true" src="/planify.svg" />
              <ion-label>{{$t('Planify')}}</ion-label>
            </ion-button>
            <ion-button v-else slot="end" tab="fight" @click="toggleFight">
              <ion-icon aria-hidden="true" src="/swords.svg" />
              <ion-label>{{$t('Ready to fight !')}}</ion-label>
            </ion-button>
          </ion-toolbar>
        </ion-footer>
        <!-- <ion-tab-bar slot="bottom">
          <ion-text color="primary">
            <h1>{{fight.name}}</h1>
          </ion-text>
          <ion-tab-button v-if="fight.ready" tab="planify" :href="`/fight/${fight.id}/planify`">
            <ion-icon aria-hidden="true" src="/planify.svg" />
            <ion-label>{{$t('Planify')}}</ion-label>
          </ion-tab-button>
          <ion-tab-button v-else tab="fight" :href="`/fight/${fight.id}/fight`">
            <ion-icon aria-hidden="true" src="/swords.svg" />
            <ion-label>{{$t('Fight')}}</ion-label>
          </ion-tab-button>
        </ion-tab-bar> -->
      </ion-tabs>
  
      <HelpUs trigger="more-info-modal"></HelpUs>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
  import { onMounted, ref, provide, onBeforeMount } from 'vue';
  import LanguageSelect from '@/components/LanguageSelect.vue'
  import DarkModeToggle from '@/components/DarkModeToggle.vue'
  import HelpUs from '@/components/HelpUs.vue'
  import { HeroesStore } from '@/stores/HeroesStore';
  import { ConditionsStore } from '@/stores/ConditionsStore';
  import { OptionsStore } from '@/stores/OptionsStore';
  import { useRoute } from "vue-router";
  import { useIonRouter } from '@ionic/vue';
  import { useRepo } from 'pinia-orm';
  import Fight from '@/models/fightModel';

  const route = useRoute();
  const router = useIonRouter();

  const heroesStore = HeroesStore();
  const conditionsStore = ConditionsStore();
  const optionsStore = OptionsStore();
  
  const fightID:any = route.params.id;
  const fightRepo = useRepo(Fight);
  const fight = fightRepo.find(fightID)

  onBeforeMount(()=>{
    if(!route.params.id) router.navigate('/')
    else{
      optionsStore.init();
      heroesStore.init();
      conditionsStore.init(optionsStore.language);
    }
  });

  function toggleFight(){
    fight.ready = ! fight.ready
    if(fight.ready){
      router.push(`/fight/${fight.id}/fight`);
    }
    else{
      router.push(`/fight/${fight.id}/planify`);
    }
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

ion-router-outlet{
  margin-top: 80px;
}

ion-icon{
  font-size: 6em;
}
ion-tab-button ion-label {
  font-size: 2em;
}
ion-tab-bar{
  height: 130px;
}
</style>
