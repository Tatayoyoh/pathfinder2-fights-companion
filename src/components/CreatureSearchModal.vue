<template>
    <ion-modal ref="creaturSearchModal" v-on:keyup.escape="dismiss" :can-dismiss="true">
        <ion-header>
            <ion-toolbar>
                <ion-icon slot="start" color="secondary" size="large" :icon="add" class="ion-margin-start"></ion-icon>
                <ion-title>
                    {{ $t('Add a creature') }}
                </ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="dismiss" size="large">
                        <ion-icon slot="end" :icon="close"></ion-icon>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-toolbar>
                <ion-searchbar :placeholder="$t('Search a creature')" @ionInput="onSearchChange($event)" :debounce="200"></ion-searchbar>
            </ion-toolbar>

            <ion-progress-bar v-if="searching" type="indeterminate" color="primary"></ion-progress-bar>
                    <ion-row>
                        <ion-col size="4"><ion-label>{{$t('Name')}}</ion-label></ion-col>
                        <ion-col size="4"><ion-label>{{$t('Level')}}</ion-label></ion-col>
                        <ion-col size="4"><ion-label>{{$t('Link')}}</ion-label></ion-col>
                    </ion-row button>
                    <ion-row v-for="res of results" button @click="selectCreature(res)">
                        <ion-col size="4">
                            <ion-label v-if="(res.translations && res.translations.fr)">{{ res.translations.fr.name }}</ion-label>
                            <ion-label v-else>{{ res.name }}</ion-label>
                        </ion-col>
                        <ion-col size="4">
                            <ion-label>{{res.level}}</ion-label>
                        </ion-col>
                        <ion-col size="4">
                            <ion-button @click="$event.stopPropagation();creatureInfoModal.open(res)" expand="block" fill="outline" shape="round">
                                {{$t('More informations')}}
                            </ion-button>

                        </ion-col>
                    </ion-row>
        </ion-content>
        <CreatureInfosModal ref="creatureInfoModal"></CreatureInfosModal>
    </ion-modal>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { add, close } from 'ionicons/icons';
    import jsonata from 'jsonata'
    import CreatureInfosModal from '@/components/CreatureInfosModal.vue'

    const creaturSearchModal = ref();
    const creatureInfoModal = ref();
    const searching = ref(false)
    const results:any = ref({})

    const emit = defineEmits<{
        (e: 'dismiss'): void
        (e: 'select', data:any): void
    }>();

    defineExpose({
        dismiss,
        open,
    });
    
    const props = defineProps({
        creatures: {
            type: Object,
            required: true
        },
        language: {
            type: String,
            required: true
        },
    });

    async function onSearchChange(event:any){
        searching.value = true;
        let query = event.target.value.toLowerCase();
        
        if(query.length <= 2) return

        let res = [];
        if(props.language == 'fr'){
        let frNameQuery = jsonata(`$[$contains(translations.fr.name.$lowercase(), "${query}")]`)
        res = await frNameQuery.evaluate(props.creatures);
        }
        else{
        let enNameQuery = jsonata(`$[$contains(name.$lowercase(), "${query}")]`)
        res = await enNameQuery.evaluate(props.creatures);
        }

        if(res == undefined){
        res = [];
        }
        else {
        results.value = res;
        }

        searching.value = false;
    }

    function open(){
        creaturSearchModal.value.$el.present();
    }

    function dismiss(){
        creaturSearchModal.value.$el.dismiss();
        emit('dismiss');
    }

    function selectCreature(res:any){
        emit('select', res);
        dismiss()
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