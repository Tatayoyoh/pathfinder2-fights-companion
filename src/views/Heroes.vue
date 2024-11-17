<template>
    <ion-page>
      <ion-header :translucent="true">
      </ion-header>
      <ion-item lines="none" color="none">
        <ion-button router-link="/" color="dark" expand="block" fill="clear" shape="round" class="ion-float-start" size="normal">
          <ion-icon slot="start" :icon="chevronBackCircle"></ion-icon>
            {{$t('Back')}}
        </ion-button>
        <ion-title color="warning">{{$t("Heroes")}}</ion-title>
      </ion-item>
        
      <ion-row class="ion-margin-top">
        <ion-col size="12">
          <ion-button @click="heroeRepo.new()" fill="outline" size="medium" expand="block">
            <ion-icon slot="start" :icon="add"></ion-icon>
            {{$t('Add new')}}
          </ion-button>
        </ion-col>
      </ion-row>
  
      <ion-content>
        <ion-card>
          <ion-card-content>
            <ion-item v-for="heroe of heroeRepo.all()" lines="none">
              <InlineField slot="start" :repo="heroeRepo" :document="heroe" fieldName="name" placeholder="Give a name here"></InlineField>
              <ion-buttons slot="end">
                  <ion-button @click="removeHeroeAlert(heroe)">
                    <ion-icon slot="icon-only" :icon="close" color="danger"></ion-icon>
                  </ion-button>
              </ion-buttons>
            </ion-item>
          </ion-card-content>
        </ion-card>

      
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
    import { add, chevronBackCircle, close } from 'ionicons/icons';
    import HeaderToolbar from '@/components/HeaderToolbar.vue';
    import { useI18n } from 'vue-i18n';
    import { useRepo } from 'pinia-orm';
    import Heroe from '@/models/heroeModel';
    import { alertController } from '@ionic/vue';
    import InlineField from '@/components/InlineField.vue';
    import { useRouter } from 'vue-router';

    const i18n = useI18n();
    const router = useRouter();

    const heroeRepo = useRepo(Heroe);

    async function removeHeroeAlert(heroe:Heroe) {
      const alert = await alertController.create({
        header: i18n.t('Confirm heroe deletion'),
        buttons: [
          {
            text: i18n.t('Cancel'), role: 'cancel',
          },
          {
            text: i18n.t('OK'), role: 'confirm', handler: () => {
              heroeRepo.destroy(heroe.id);
            },
          },
        ],
      });

      await alert.present();
    };

  </script>
  
  <style scoped>
    ion-title {
        font-size: 2em;
        text-transform: capitalize;   
    }
  </style>
  