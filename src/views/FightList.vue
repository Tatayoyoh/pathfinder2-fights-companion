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
        <ion-row>
            <ion-col size-md="6" offset-md="3" size-xs="12">
                <ion-button @click="" expand="block" shape="round">
            <ion-icon slot="start" :icon="create"></ion-icon>
            {{$t("Edit heroes")}}
        </ion-button>
            </ion-col>

        </ion-row>

        <ion-item>
          <ion-title>Your Fights</ion-title>
          <ion-button id="create-fight" @click="" fill="outline" shape="round">
            <ion-icon slot="start" :icon="add"></ion-icon>
            {{$t('Add')}}
          </ion-button>
          <ion-button @click="selection=!selection" :fill="selection ? 'solid':'outline'" shape="round">
            <ion-icon slot="start" :icon="copyOutline"></ion-icon>
            {{$t('Group')}}
          </ion-button>
        </ion-item>

        <ion-list>
            <ion-item v-for="fight of fightsStore.fights" button @click="clickFight(fight.id)">
                <ion-text>{{fight.name}}</ion-text>
                <ion-icon v-if="fight.ready" class="ion-margin-start" color="primary" size="small" :icon="checkmarkCircleOutline"></ion-icon>

                <ion-checkbox v-if="selection" justify="end"></ion-checkbox>

                <ion-buttons v-else slot="end" @click="$event.stopImmediatePropagation()">
                  <ion-button :id="'fight-options-'+fight.id">
                    <ion-icon :icon="ellipsisVertical"></ion-icon>
                  </ion-button>
                </ion-buttons>

                <ion-popover :trigger="'fight-options-'+fight.id" trigger-action="click">
                  <ion-content class="ion-padding">
                    <ion-item button @click="">
                      <ion-icon :icon="archive" class="ion-margin-end"></ion-icon>
                      <ion-label>{{$t('Archive')}}</ion-label>
                    </ion-item>
                    <ion-item button @click="">
                      <ion-icon :icon="trash" class="ion-margin-end" color="danger"></ion-icon>
                      <ion-label>{{$t('Delete')}}</ion-label>
                    </ion-item>
                  </ion-content>
                </ion-popover>
            </ion-item>
        </ion-list>            
    

        <ion-alert
          trigger="create-fight"
          :header="$t('Add')"
          :buttons="alertButtons"
          :inputs="alertInputs"
        ></ion-alert>

        <HelpUs trigger="more-info-modal"></HelpUs>
      </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import LanguageSelect from '@/components/LanguageSelect.vue'
    import DarkModeToggle from '@/components/DarkModeToggle.vue'
    import HelpUs from '@/components/HelpUs.vue'
    import { HeroesStore } from '@/stores/HeroesStore';
    import { FightsStore } from '@/stores/FightsStore';
    import { ConditionsStore } from '@/stores/ConditionsStore';
    import { OptionsStore } from '@/stores/OptionsStore';
    import { add, archive, create, ellipsisVertical, trash, copyOutline, documentTextOutline, createOutline, checkmarkCircleOutline } from 'ionicons/icons';
    import { useI18n } from 'vue-i18n';
    import { useIonRouter } from '@ionic/vue';
    import draggable from 'vuedraggable'

    const i18n = useI18n();
    const ionRouter = useIonRouter();
  
    const heroesStore = HeroesStore();
    const fightsStore = FightsStore();
    const conditionsStore = ConditionsStore();
    const optionsStore = OptionsStore();

    const accordionGroup = ref();
    const openedGroup = ref();
    const selection = ref(false)
    const groupEdition:any = ref({});
  
    onMounted(()=>{
      optionsStore.init();
      heroesStore.init();
      fightsStore.init();
      conditionsStore.init(optionsStore.language);
    });

    function clickFight(fightId:number){
      if(!selection.value == true){
        if(fightsStore.fight(fightId).ready){
          ionRouter.push(`/fight/${fightId}/fight`)  
        }
        else{
          ionRouter.push(`/fight/${fightId}/planify`)
        }
      }
      else{

      }
    }

    const alertButtons = [
      {
        text: i18n.t("Cancel"),
        role: 'cancel',
      },
      {
        text: i18n.t("OK"),
        role: 'confirm',
        handler: (data:any) => {
          fightsStore.addFight(data[0])
        },
      },
    ];
    const alertInputs = [
      {
        placeholder: i18n.t("Name"),
      },
    ];
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
  