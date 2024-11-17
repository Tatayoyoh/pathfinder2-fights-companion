
<template>
      <ion-item lines="none" color="none">
          <ion-button router-link="/" color="dark" expand="block" fill="clear" shape="round" class="ion-float-start" size="normal">
            <ion-icon slot="start" :icon="chevronBackCircle"></ion-icon>
              {{$t('Back')}}
            </ion-button>
            <ion-text color="warning" class="ion-text-center"><ion-title>{{$t("Fight")}}</ion-title></ion-text>
            <ion-text color="primary" v-if="fight">
              <h1><b>{{fight.name}}</b></h1>
            </ion-text>
            <ion-button v-if="!fight.ready" slot="end" @click="toggleFight" size="large">
              <ion-icon aria-hidden="true" src="/swords.svg" />
              <ion-label><b>{{$t('Ready to fight !')}}</b></ion-label>
            </ion-button>
            <ion-button v-else slot="end" @click="toggleFight" size="large">
              <ion-icon aria-hidden="true" src="/planify.svg" />
              <ion-label><b>{{$t('Back to planify')}}</b></ion-label>
            </ion-button>
      </ion-item>
</template>

<script setup lang="ts">
    import Fight from '@/models/fightModel';
    import { chevronBackCircle } from 'ionicons/icons';
    import { useRepo } from 'pinia-orm';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const fightRepo = useRepo(Fight).withAllRecursive();

    const props = defineProps({
        fight: {
            type: Object,
            required: true
        },
    });

    function toggleFight(){
        props.fight.ready = ! props.fight.ready
        fightRepo.save({id: props.fight.id, ready: props.fight.ready})
        if(props.fight.ready){
            router.push(`/fight/${props.fight.id}`);
        }
        else{
            router.push(`/planify/${props.fight.id}`);
        }
    }
</script>