<template>

</template>

<script setup lang="ts">
    import Condition from '@/models/conditionModel';
    import { OptionsStore } from '@/stores/OptionsStore';
    import { useRepo } from 'pinia-orm';
    import { onMounted } from 'vue';
    import { CreaturesStore } from '@/stores/creaturesStore';
    import { TreasuresStore } from '@/stores/TreasuresStore';

    const optionsStore = OptionsStore();
    const creaturesStore = CreaturesStore();
    const treasuresStore = TreasuresStore();
    const conditionRepo = useRepo(Condition);

    onMounted(()=>{
        if(!conditionRepo.all().length){
            conditionsInit()
        }
        if(!creaturesStore.creatures.length){
            creatureInit()
        }
        if(!treasuresStore.treasures.length){
            treasureInit()
        }

        optionsStore.init();
    });

    function conditionsInit(){
        fetch('/conditions.json').then(async(res)=>{
            let conditions = await res.json()
            for(let condition of conditions){
                conditionRepo.save(condition)
            }
        })
    }

    function creatureInit(){
        creaturesStore.init(optionsStore.language)
    }

    function treasureInit(){
        treasuresStore.init(optionsStore.language)
    }
</script>