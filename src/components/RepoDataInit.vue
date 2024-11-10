<template>

</template>

<script setup lang="ts">
    import Condition from '@/models/conditionModel';
    import Creature from '@/models/creatureModel';
    import { OptionsStore } from '@/stores/OptionsStore';
    import { useRepo } from 'pinia-orm';
    import { onMounted } from 'vue';

    const optionsStore = OptionsStore();
    const conditionRepo = useRepo(Condition);
    const creatureRepo = useRepo(Creature)

    onMounted(()=>{
        if(!conditionRepo.all().length){
            conditionsInit(optionsStore.language)
        }
        if(!creatureRepo.all().length){
            creatureInit(optionsStore.language)
        }
    });

    function conditionsInit(language:string){
        fetch('/conditions.json').then(async(res)=>{
            let conditions = await res.json()
            for(let condition of conditions){
                conditionRepo.save(condition)
            }
        })
    }

    function creatureInit(language:string){
        fetch('/creatures.json').then(async(res)=>{
            let creatures = await res.json()
            for(let creature of creatures){
                creatureRepo.save(creature)
            }
        })
    }
</script>