<template>
<div id="dice-box"></div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue';
    import { checkboxOutline, createOutline } from 'ionicons/icons';
    import { focusInput } from '@/utils/UserExperience';
    import DiceBox from '@3d-dice/dice-box'

    onMounted(()=>{

      const diceBox = new DiceBox("#dice-box", {
        assetPath: '/dice-box/', // include the trailing backslash
        scale: 9,
        onDieComplete: diceResult
      });

      diceBox.init().then(()=>{
        diceBox.roll('2d20')
      })
    });

    function diceResult(res:any){
      console.log(res)
    }
</script>

<style scoped>
#dice-box {
  width: 100%;
  height: 500px;
  background-color: gray;
}


</style>