<template>
    <ion-modal ref="infoModal" :trigger="trigger">
      <ion-header>
        <ion-toolbar>
          <ion-title>Help us !</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-item lines="none">
          <ion-label>{{$t('You can support this work by offering')}}</ion-label>
        </ion-item>
        <ion-item button>
          <ion-avatar>
            <ion-icon size="large" src="/nachos.svg"></ion-icon>
          </ion-avatar>
          <ion-text class="ion-margin-start">Some chips</ion-text>
        </ion-item>
        <ion-item button>
          <ion-avatar>
            <ion-icon size="large" src="/pizza-slice.svg"></ion-icon>
          </ion-avatar>
          <ion-text class="ion-margin-start">A pizza slice</ion-text>
        </ion-item>
        <ion-item button>
          <ion-avatar>
            <ion-icon size="large" src="/whole-pizza.svg"></ion-icon>
          </ion-avatar>
          <ion-text class="ion-margin-start">A whole pizza</ion-text>
        </ion-item>
        <ion-item button>
          <ion-avatar>
            <ion-icon size="large" color="primary" src="/dice.svg"></ion-icon>
          </ion-avatar>
          <ion-text class="ion-margin-start">A critical hit !</ion-text>
        </ion-item>
      </ion-content>
      <ion-footer>
          <ion-button size="large" strong @click="infoModal.$el.dismiss()" expand="full">{{$t('Close')}}</ion-button>
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