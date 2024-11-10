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
        <ion-item button href="/heroes">
          <ion-text slot="start">
            <ion-title>{{$t('Heroes')}}</ion-title>
          </ion-text>
          <ion-button slot="end" href="/heroes" expand="block" size="medium" fill="outline">
            <ion-icon slot="start" :icon="create"></ion-icon>
            {{$t("Edit heroes")}}
        </ion-button>
        </ion-item>
        <ion-row>
            <ion-col size-md="6" offset-md="3" size-xs="12">
            </ion-col>

        </ion-row>

        <ion-item>
          <ion-title>{{$t('Your Fights')}}</ion-title>
          <ion-button @click="fightNameModal.create()" fill="outline" shape="round">
            <ion-icon slot="start" :icon="add"></ion-icon>
            {{$t('Add')}}
          </ion-button>
          <ion-button @click="selection=!selection" :fill="selection ? 'solid':'outline'" shape="round">
            <ion-icon slot="start" :icon="copyOutline"></ion-icon>
            {{$t('Group')}}
          </ion-button>
        </ion-item>

        <ion-list>
            <ion-item v-for="fight in fightRepo.all()" button @click="clickFight(fight.id)">
                <ion-text>{{fight.name}}</ion-text>
                <ion-icon v-if="fight.ready" class="ion-margin-start" color="primary" size="small" :icon="checkmarkCircleOutline"></ion-icon>

                <ion-checkbox v-if="selection" justify="end"></ion-checkbox>

                <ion-buttons v-else slot="end" @click="$event.stopImmediatePropagation()">
                  <ion-button :id="'fight-options-'+fight.id">
                    <ion-icon :icon="ellipsisVertical"></ion-icon>
                  </ion-button>
                </ion-buttons>

                <ion-popover :trigger="'fight-options-'+fight.id" trigger-action="click" :dismiss-on-select="true">
                  <ion-content class="ion-padding">
                    <ion-item button @click="fightNameModal.edit(fight.id)">
                      <ion-icon :icon="createOutline" class="ion-margin-end"></ion-icon>
                      <ion-label>{{$t('Edit name')}}</ion-label>
                    </ion-item>
                    <ion-item button @click="">
                      <ion-icon :icon="archive" class="ion-margin-end"></ion-icon>
                      <ion-label>{{$t('Archive')}}</ion-label>
                    </ion-item>
                    <ion-item button @click="removeFight(fight.id)">
                      <ion-icon :icon="trash" class="ion-margin-end" color="danger"></ion-icon>
                      <ion-label>{{$t('Delete')}}</ion-label>
                    </ion-item>
                  </ion-content>
                </ion-popover>
            </ion-item>
        </ion-list>            
    

        <FightNameModal ref="fightNameModal"></FightNameModal>

        <HelpUs trigger="more-info-modal"></HelpUs>
      </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import LanguageSelect from '@/components/LanguageSelect.vue'
    import DarkModeToggle from '@/components/DarkModeToggle.vue'
    import FightNameModal from '@/components/FightNameModal.vue';
    import HelpUs from '@/components/HelpUs.vue'
    import { HeroesStore } from '@/stores/HeroesStore';
    import { ConditionsStore } from '@/stores/ConditionsStore';
    import { OptionsStore } from '@/stores/OptionsStore';
    import { add, archive, create, ellipsisVertical, trash, copyOutline, documentTextOutline, createOutline, checkmarkCircleOutline } from 'ionicons/icons';
    import { useI18n } from 'vue-i18n';
    import { useIonRouter } from '@ionic/vue';
    import draggable from 'vuedraggable'
    import { useRepo } from 'pinia-orm'
    import Fight from '@/models/fightModel'

    const i18n = useI18n();
    const ionRouter = useIonRouter();
  
    const heroesStore = HeroesStore();
    const conditionsStore = ConditionsStore();
    const optionsStore = OptionsStore();

    const accordionGroup = ref();
    const openedGroup = ref();
    const fightNameModal = ref();
    const selection = ref(false)
    const groupEdition:any = ref({});
    const fightRepo = useRepo(Fight);
    onMounted(()=>{
      optionsStore.init();
      heroesStore.init();
      conditionsStore.init(optionsStore.language);
    });

    function clickFight(fightId:number){
      if(!selection.value == true){
        if(fightRepo.find(fightId)?.ready){
          ionRouter.push(`/fight/${fightId}/fight`)  
        }
        else{
          ionRouter.push(`/fight/${fightId}/planify`)
        }
      }
      else{

      }
    }

    function removeFight(fightId:string){
      fightRepo.destroy(fightId)
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
    font-size: 2em;
  }
  ion-tab-button ion-label {
    font-size: 2em;
  }
  ion-tab-bar{
    height: 130px;
  }
</style>
  