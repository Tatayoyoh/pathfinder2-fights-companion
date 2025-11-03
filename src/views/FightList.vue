<template>
    <ion-page>
      <ion-content>
        <ion-row>
          <ion-col sizeLg="8" pushLg="2">
            <ion-list>
              <ion-item button router-link="/heroes" lines="none">
                <ion-icon slot="start" src="/heroe.svg"></ion-icon>
                <ion-title class="ion-no-padding">{{$t('Heroes')}}</ion-title>
                <ion-button slot="end" router-link="/heroes" expand="block" size="medium" fill="outline">
                  <ion-icon slot="start" :icon="create"></ion-icon>
                  {{$t("Edit heroes")}}
              </ion-button>
              </ion-item>
            </ion-list>
    
            
            <ion-list class="ion-margin-top">
              <ion-item lines="none">
                <ion-icon slot="start" src="/swords.svg"></ion-icon>
                <ion-title class="ion-no-padding">{{$t('Your Fights')}}</ion-title>
                <ion-button slot="end" @click="fightNameModal.create()" fill="outline" shape="round">
                  <ion-icon slot="start" :icon="add"></ion-icon>
                  {{$t('Add')}}
                </ion-button>
                <!-- <ion-button @click="selection=!selection" :fill="selection ? 'solid':'outline'" shape="round">
                  <ion-icon slot="start" :icon="copyOutline"></ion-icon>
                  {{$t('Group')}}
                </ion-button> -->
              </ion-item>
                <ion-item v-for="fight in fightRepo.all()" button @click="clickFight(fight.id)">
                    <ion-icon :icon="chevronForwardCircleOutline" class="ion-margin-end"></ion-icon>
                    <ion-text class="ion-margin-start">{{fight.name}}</ion-text>
                    <ion-chip v-if="fight.done" color="medium" mode="ios" outline="true" class="ion-margin-start">
                      <ion-icon color="medium" size="large" src="/rip.svg"></ion-icon>
                      <ion-label>{{$t('Done')}}</ion-label>
                    </ion-chip>
                    <ion-chip v-else-if="fight.ready" color="success" mode="ios" outline="true" class="ion-margin-start">
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
                          <ion-icon :icon="copy" class="ion-margin-end"></ion-icon>
                          <ion-label>{{$t('Copy')}}</ion-label>
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
        
    
            <ion-accordion-group ref="accordionGroup" v-model="openedGroup" :multiple="false">
                <div v-for="fights, groupName of fightGroups()">
                    <ion-accordion :id="groupName" :value="groupName" @dragover="openedGroup=groupName">
                      <ion-item slot="header" lines="none" color="light" class="strong border margin">
                          <ion-icon slot="start" :icon="documentTextOutline"></ion-icon>
                          <ion-input v-if="groupEdition[groupName]" v-model="groupEdition[groupName]" slot="start" type="text" :placeholder="i18n.t('Group name')" fill="outline" class="placeholder-padding ion-no-margin" v-on:keyup.enter="editGroupName($event, groupName)" @click="(e:Event)=>{e.stopPropagation()}"></ion-input>
                          <ion-text v-else slot="start" class="ion-no-margin">
                              {{groupName}}
                          </ion-text>
                          <ion-buttons slot="start">
                              <ion-button v-if="groupEdition[groupName]" @click="editGroupName($event, groupName)">
                                  <ion-icon slot="icon-only" :icon="checkmarkCircleOutline" color="success"></ion-icon>
                              </ion-button>
                              <ion-button v-else @click="toggleGroupNameEdit($event, groupName)" class="file-edit">
                                  <ion-icon slot="icon-only" :icon="createOutline"></ion-icon>
                              </ion-button>
                          </ion-buttons>
    
                          <!-- <ion-badge id="count-header-file" slot="end" :color="file.included_headers.length ? 'primary':'medium'">{{ file.included_headers.length }}</ion-badge> -->
    
                          <!-- <ion-buttons slot="end" class="ion-no-margin">
                              <ion-button :id="'remove'+file.pk" class="remove-file" @click="(e:Event)=>(e.stopPropagation())">
                                  <ion-icon color="danger" slot="icon-only" :icon="trash"></ion-icon>
                              </ion-button>
                              <ion-alert
                                  :trigger="'remove'+file.pk"
                                  header="Confirmer la suppression"
                                  :buttons="[
                                      {text: 'Annuler',role: 'cancel',},
                                      {text: 'Oui', role: 'confirm', handler: ()=>deleteCsvFile(file.pk)},
                                  ]"
                              ></ion-alert>
                          </ion-buttons> -->
                      </ion-item>
                    <ion-list slot="content" class="ion-no-padding">
                      <!-- <ion-item v-for="fight of fights">
                        <ion-label>{{fight}}</ion-label>
                      </ion-item> -->
                        <draggable class="file-drop-list" :value="fights" group="fightgroups" item-key="id" @change="onfightDropped(fight.id)" :animation="300" :scroll-sensitivity="500">
                          <template #item="{element}">
                              <ion-item>
                                <ion-label>{{element.name}}</ion-label>
                              </ion-item>
                                <!-- <BaslDraggableHeader 
                                    :header="element" 
                                    :headerFormModal="headerFormModal" 
                                    :displayCsvNames="displayCsvNames"
                                    :buttons="[
                                        {icon:createOutline, color:'primary', click:()=>{headerFormModal.openEdit(element, updateCsvFileHeader, file)}}, 
                                        {icon:close, color:'danger', click:()=>{removeCsvFileHeader(file, element)}}
                                    ]"
                                ></BaslDraggableHeader> -->
                            </template>
                        </draggable>
                    </ion-list>
                    </ion-accordion>
                </div>
            </ion-accordion-group>
          </ion-col>
        </ion-row>

        <FightNameModal ref="fightNameModal"></FightNameModal>

        <RepoDataInit></RepoDataInit>
      </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
    import { ref } from 'vue';
    import FightNameModal from '@/components/FightNameModal.vue';
    import RepoDataInit from '@/components/RepoDataInit.vue';
    import { add, archive, create, ellipsisVertical, trash, documentTextOutline, createOutline, checkmarkCircleOutline, copy, chevronForwardCircleOutline }  from 'ionicons/icons';
    import { useI18n } from 'vue-i18n';
    import { useIonRouter } from '@ionic/vue';
    import draggable from 'vuedraggable'
    import { useRepo } from 'pinia-orm'
    import Fight from '@/models/fightModel'
    import {fightGroups} from '@/models/fightModel'

    const i18n = useI18n();
    const router = useIonRouter();
  
    const accordionGroup = ref();
    const openedGroup = ref();
    const fightNameModal = ref();
    const selection = ref(false)
    const groupEdition:any = ref({});
    const fightRepo = useRepo(Fight);

    function clickFight(fightId:number){
      if(!selection.value == true){
        if(fightRepo.find(fightId)?.ready){
          router.push(`/fight/${fightId}`)  
        }
        else{
          router.push(`/planify/${fightId}`)
        }
      }
      else{

      }
    }

    function toggleGroupNameEdit(e:Event, csvFile:any){
        e.stopPropagation();
        fileEdition.value[csvFile.pk] = true;
    }

    function editGroupName(event, group){

    }

    function onfightDropped(fightId:number){

    }

    function removeFight(fightId:string){
      fightRepo.destroy(fightId)
    }
</script>
  
<style scoped>
</style>
  