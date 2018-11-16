<template>
  <div class="tile is-child box">
    World
    <dice></dice>
  </div>
</template>

<script>
import Dice from './dice.vue';

export default {
  components: {
    dice: Dice
  }
}
</script>
