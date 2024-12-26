<template>
    <ion-modal ref="infoModal" :trigger="trigger">
      <ion-header>
        <ion-toolbar class="ion-text-center">
          <ion-title>{{$t('Help us')}}</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <div class="ion-text-center ion-margin-bottom">
          <h4>{{$t('You can support this work by offering')}}</h4>
        </div>
        <ion-item button target="_blank" href="https://ko-fi.com/tatayoyoh/1">
          <ion-avatar>
            <ion-icon size="large" src="/nachos.svg"></ion-icon>
          </ion-avatar>
          <ion-text class="ion-margin-start">{{$t('Some chips')}}</ion-text>
          <ion-chip slot="end" outline="false">
            <ion-label>2 €</ion-label>
          </ion-chip>
        </ion-item>
        <ion-item button target="_blank" href="https://ko-fi.com/tatayoyoh/5">
          <ion-avatar>
            <ion-icon size="large" src="/pizza-slice.svg"></ion-icon>
          </ion-avatar>
          <ion-text class="ion-margin-start">{{$t('A pizza slice')}}</ion-text>
          <ion-chip slot="end" outline="false">
            <ion-label>5 €</ion-label>
          </ion-chip>
        </ion-item>
        <ion-item button target="_blank" href="https://ko-fi.com/tatayoyoh/12">
          <ion-avatar>
            <ion-icon size="large" src="/whole-pizza.svg"></ion-icon>
          </ion-avatar>
          <ion-text class="ion-margin-start">{{$t('A whole pizza')}}</ion-text>
          <ion-chip slot="end" outline="false">
            <ion-label>12 €</ion-label>
          </ion-chip>
        </ion-item>
        <ion-item button target="_blank" href="https://ko-fi.com/tatayoyoh/20">
          <ion-avatar>
            <ion-icon size="large" color="primary" src="/dice.svg"></ion-icon>
          </ion-avatar>
          <ion-text class="ion-margin-start">{{$t('A critical hit !')}}</ion-text>
          <ion-chip slot="end" outline="false">
            <ion-label>20 €</ion-label>
          </ion-chip>
        </ion-item>
      </ion-content>
      <ion-footer>
          <ion-row>
            <ion-col size="6">
              <ion-button size="large" strong @click="infoModal.$el.dismiss()" color="medium" expand="block">{{$t('Close')}}</ion-button>
            </ion-col>
            <ion-col size="6">
              <ion-button size="large" strong target="_blank" href="https://ko-fi.com/tatayoyoh" expand="block">{{$t('Donate')}}</ion-button>
            </ion-col>
          </ion-row>
      </ion-footer>
    </ion-modal>
</template>

<script setup>
  import { ref } from 'vue';
  const infoModal = ref();

  const props = defineProps({
        trigger: {
            type: String,
            required: true,
        },
    });
</script>