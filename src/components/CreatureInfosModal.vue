<template>
    <ion-modal ref="creatureInfoModal" v-on:keyup.escape="dismiss" :can-dismiss="true">
        <ion-header>
            <ion-toolbar>
                <ion-icon slot="start" color="secondary" size="large" :icon="informationCircleOutline" class="ion-margin-start"></ion-icon>
                <ion-title>
                    {{ $t('Creature informations') }}
                </ion-title>
                <ion-chip v-if="creature" color="secondary" slot="start">
                    <ion-label>{{creature.name}}</ion-label>
                </ion-chip>
                <ion-buttons slot="end">
                    <ion-button @click="dismiss" size="large">
                        <ion-icon slot="end" :icon="close"></ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <iframe v-if="creature" class='webPage' :src="'https://pf2e.pathfinder-fr.org/creatures/'+creature._id" style="width:100%; height:100%;"></iframe>
        </ion-content>
    </ion-modal>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { close, informationCircleOutline } from 'ionicons/icons';

    const creatureInfoModal = ref();
    const creature:any = ref(null);

    const emit = defineEmits<{
        (e: 'onDismiss'): void
    }>();

    defineExpose({
        dismiss,
        open,
    });
    
    function open(creatureData:any){
        creature.value = creatureData;
        creatureInfoModal.value.$el.present();
    }

    function dismiss(){
        creatureInfoModal.value.$el.dismiss();
        emit('onDismiss');
    }
</script>

<style scoped>
ion-modal {
    --height: 70%;
    --max-height: 70%;
    --width: 70%;
    --max-width: 70%;
}
</style>