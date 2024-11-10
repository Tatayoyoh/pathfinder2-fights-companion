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
            <ion-toolbar>
                <ion-searchbar :placeholder="$t('Search a creature')" v-model="searchQuery" @ionInput="onSearchChange($event)" :debounce="200"></ion-searchbar>
            </ion-toolbar>
        </ion-header>
        <ion-content>

            <ion-progress-bar v-if="searching" type="indeterminate" color="primary"></ion-progress-bar>
            
            <Vue3EasyDataTable class="data-table" :headers="headers" :items="results" @click-row="selectCreature" :hide-footer="true" :rows-per-page="200"
                :sort-by="sortBy" :sort-type="sortType">

                <template #item-name="creature">
                    {{translatedName(creature)}}
                </template>
                <template #item-link="creature">
                    <ion-button class="info-btn" @click="$event.stopPropagation();creatureInfoModal.open(creature)" expand="block" fill="outline" shape="round">
                        {{$t('More informations')}}
                    </ion-button>
                </template>
            </Vue3EasyDataTable>
        
            <CreatureInfosModal ref="creatureInfoModal"></CreatureInfosModal>
        </ion-content>
    </ion-modal>
</template>

<script setup lang="ts">
    import { ref, Ref, inject } from 'vue';
    import { add, close } from 'ionicons/icons';
    import jsonata from 'jsonata'
    import Vue3EasyDataTable from 'vue3-easy-data-table';
    import CreatureInfosModal from '@/components/CreatureInfosModal.vue'
    import type { Header, Item, SortType } from "vue3-easy-data-table";
    import { OptionsStore } from '@/stores/OptionsStore';

    const headers: Header[] = [
        { text: "Name", value: "name" },
        { text: "Level", value: "level"},
        { text: "Link", value: "link"},
    ];

    const optionsStore = OptionsStore();
    const creaturSearchModal = ref();
    const creatureInfoModal = ref();
    const searching = ref(false)
    const searchQuery = ref('')
    const results:Ref<Item[]> = ref([])
    const sortBy = "name";
    const sortType:SortType = "asc";

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
            type: Array,
            required: true
        },
    });

    async function onSearchChange(event:any){
        searching.value = true;
        let query = event.target.value.toLowerCase();
        
        if(query.length <= 2) return

        let res = [];
        if(optionsStore.language == 'fr'){
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

    function translatedName(creature:any){
        if(optionsStore.language == 'en')
            return creature.name
        else
            return creature.translations[optionsStore.language].name
    }
</script>

<style scoped>
ion-modal {
    --height: 70%;
    --max-height: 70%;
    --width: 70%;
    --max-width: 70%;
}

.vue3-easy-data-table tbody tr {
    cursor: pointer !important;
}

.info-btn:hover {
    --color: var(--ion-color-warning)
}
</style>