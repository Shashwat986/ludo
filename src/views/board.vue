<template>
  <div class="container">
    <div class="columns is-mobile is-gapless is-marginless" v-for="i in 15">
      <div class="column" v-for="j in 15">
        <cell :i="i" :j="j" :color='((i + j) % 2 === 0 ? "info" : "primary")'></cell>
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
