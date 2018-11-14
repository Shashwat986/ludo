<template>
  <div class="column">
    <div class="columns is-mobile is-gapless is-marginless" v-for="i in 15">
      <div class="column" v-for="j in 15">
        <cell :i="i" :j="j" :color='getColor(i,j)'></cell>
      </div>
    </div>
  </div>
</template>

<script>
import Cell from './cell.vue';

export default {
  components: {
    cell: Cell
  },
  methods: {
    getColor (i, j) {
      return this.$constants.colormap[this.$constants.boardData[i-1][j-1]];
    }
  },
  mounted () {
    console.log(this.$constants);
  }
}
</script>

<style>
</style>
