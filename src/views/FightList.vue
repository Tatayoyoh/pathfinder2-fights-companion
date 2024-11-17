<template>
    <ion-page>
      <ion-content>
        <ion-item button router-link="/heroes">
          <ion-text>
            <ion-title>{{$t('Heroes')}}</ion-title>
          </ion-text>
          <ion-button slot="end" router-link="/heroes" expand="block" size="medium" fill="outline">
            <ion-icon slot="start" :icon="create"></ion-icon>
            {{$t("Edit heroes")}}
        </ion-button>
        </ion-item>

        <ion-item class="ion-margin-top">
          <ion-title>{{$t('Your Fights')}}</ion-title>
          <ion-button @click="fightNameModal.create()" fill="outline" shape="round">
            <ion-icon slot="start" :icon="add"></ion-icon>
            {{$t('Add')}}
          </ion-button>
          <!-- <ion-button @click="selection=!selection" :fill="selection ? 'solid':'outline'" shape="round">
            <ion-icon slot="start" :icon="copyOutline"></ion-icon>
            {{$t('Group')}}
          </ion-button> -->
        </ion-item>

        <ion-list>
            <ion-item v-for="fight in fightRepo.all()" button @click="clickFight(fight.id)">
                <ion-text>{{fight.name}}</ion-text>
                <ion-chip v-if="fight.ready" color="success" mode="ios" outline="true" class="ion-margin-start">
                  <ion-icon color="success" size="small" :icon="checkmarkCircleOutline"></ion-icon>
                  <ion-label>{{$t('ready')}}</ion-label>
                </ion-chip>

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

        <RepoDataInit></RepoDataInit>
      </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import FightNameModal from '@/components/FightNameModal.vue';
    import HeaderToolbar from '@/components/HeaderToolbar.vue';
    import RepoDataInit from '@/components/RepoDataInit.vue';
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
          ionRouter.push(`/fight/${fightId}`)  
        }
        else{
          ionRouter.push(`/planify/${fightId}`)
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
</style>
  