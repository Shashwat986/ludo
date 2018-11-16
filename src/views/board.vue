<template>
  <div class="column">
    <div class="columns is-mobile is-gapless is-marginless" v-for="i in 15">
      <div class="column" v-for="j in 15">
        <cell :dx="i" :dy="j"></cell>
      </div>
    </div>
  </div>
</template>

<script>
import Cell from './cell.vue';

export default {
  components: {
    cell: Cell
  }
}
</script>

<style>
</style>
