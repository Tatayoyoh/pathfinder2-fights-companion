<template>
    <ion-modal ref="modal" mode="ios" @keydown.enter="create">
        <ion-header>
            <ion-toolbar>
                <ion-title>
                    <ion-icon src="swords.svg" color="primary" size="medium"></ion-icon>
                    {{ $t("Fight name") }}
                </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-input 
            ref="nameInput"
            v-model="fightName"         
            fill="outline" 
            class="modalInput"
            :placeholder="i18n.t('Enter your fight name')"></ion-input>
        </ion-content>
        <ion-footer>
            <ion-toolbar>
                <ion-row>
                    <ion-col size="6">
                        <ion-button @click="close()" expand="block" size="medium" color="light">
                            {{ $t('Close') }}
                        </ion-button>
                    </ion-col>
                    <ion-col size="6">
                        <ion-button @click="save()" expand="block" size="medium" :disabled="!fightName">
                            {{ $t('OK') }}
                        </ion-button>
                    </ion-col>
                </ion-row>
            </ion-toolbar>
        </ion-footer>
    </ion-modal>
</template>

<script setup lang="ts">
    import { onMounted, Ref, ref } from 'vue';
    import { closeOutline, createOutline, star, trashOutline } from 'ionicons/icons';
    import { useRepo } from 'pinia-orm';
    import Fight from '@/models/fightModel';
    import { useI18n } from 'vue-i18n';
    import { focusInput } from '@/utils/UserExperience';

    // HTML components refs
    const modal = ref();
    const nameInput = ref();
    const fightName = ref('');
    const fightId = ref('')

    const i18n = useI18n();
    const fightRepo = useRepo(Fight);

    defineExpose({
        create,
        edit,
        close,
    });

    function create(){
        fightId.value = '';
        fightName.value = '';
        modal.value.$el.present();
        focusInput(nameInput)
    }

    function edit(id:string){
        fightId.value = id;
        fightName.value = fightRepo.find(id)?.name;
        modal.value.$el.present();
        focusInput(nameInput)
    }

    function close(){
        modal.value.$el.dismiss()
    }

    function save(){
        if(fightName.value)
            if(! fightId.value){ // create
                fightRepo.save({ name: fightName.value })
                close()
            }
            else{ // update
                fightRepo.where('id', fightId.value).update({ name : fightName.value })
                close()
            }
    }

</script>

<style scoped>
    ion-modal {
        --height: 200px;
    }
    ion-modal ion-content{
        max-height: 50px;
    }
    ion-title{
        font-size: 1.4rem;
    }
    ion-input.modalInput {
        font-size: 1.2rem;
        --background: #373737;
        --color: #fff;
        --placeholder-color: #ddd;
        --placeholder-opacity: 0.8;

        --padding-bottom: 10px;
        --padding-end: 10px;
        --padding-start: 10px;
        --padding-top: 10px;
    }
</style>