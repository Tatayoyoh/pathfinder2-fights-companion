
<template>
    <ion-item>
        <ion-text class="document-field" v-if="document && ! fieldEdition" @click="editField">
                {{ document[props.fieldName] || $t(props.placeholder) }}
        </ion-text>
        <ion-buttons v-if="document && ! fieldEdition">
            <ion-button @click="editField">
                <ion-icon slot="icon-only" :icon="createOutline" color="primary"></ion-icon>
            </ion-button>
        </ion-buttons>
        <ion-input v-if="document && fieldEdition" type="text" v-model="fieldvalue" fill="outline"
            ref="fieldInput" color="primary" class="ion-no-margin placeholder-padding"  
            @keydown.escape="fieldEdition = false" @keydown.enter="updateField()">
        </ion-input>
        <ion-spinner v-if="updating" name="circular" class="ion-margin-start" color="tertiary"></ion-spinner>
        <ion-buttons v-if="!updating && fieldEdition" >
            <ion-button @click="updateField()">
                <ion-icon slot="icon-only" :icon="checkboxOutline" color="primary" shape="rounded"></ion-icon>
            </ion-button>
        </ion-buttons>
    </ion-item>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { checkboxOutline, createOutline } from 'ionicons/icons';
    import { focusInput } from '@/utils/UserExperience';

    const fieldEdition = ref(false);
    const fieldInput = ref()
    const fieldvalue = ref()
    const fieldLength = ref("20ch")

    const props = defineProps({
        document: {
            type: Object,
            required: true,
        },
        fieldName: {
            type: String,
            required: true,
        },
        placeholder: {
            type: String,
            default: 'Enter Text'
        },
    });

    const emit = defineEmits<{
        (e: 'onUpdated', data: string): void,
    }>()

    function calculateFieldSize(){
        fieldvalue.value = props.document[props.fieldName] || '';
        fieldLength.value = `${fieldvalue.value.length}ch`;
    }

    function editField(){
        calculateFieldSize();
        fieldEdition.value = true;
        focusInput(fieldInput);
    }

    function updateField(){
        if(props.document[props.fieldName] == fieldvalue.value){ // no need to update
            fieldEdition.value = false;
            return
        }

        props.document[props.fieldName] = fieldvalue.value;
        emit('onUpdated', fieldvalue.value)
        fieldEdition.value = false;
        calculateFieldSize();
    }

</script>

<style scoped>
    ion-item .input-wrapper{
        width: 0px;
    }
    ion-text.document-field{
        cursor: pointer;
        font-size: 20px;
        max-width: 100%;
    }

    ion-input{
        min-width: 20ch;
        width: v-bind(fieldLength);
    }
</style>

