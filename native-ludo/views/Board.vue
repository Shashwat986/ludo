<template>
  <view class="main">
    <view class="inner" v-for='i in x'>
      <cell :dx="i" :dy="j" v-for="j in y"></cell>
    </view>
  </view>
</template>

<script>
import Cell from './Cell';

export default {
  data() {
    return {
      x: 15,
      y: 15
    }
  },
  components: {
    cell: Cell
  }
}
</script>

<style>
.main {
  aspect-ratio: 1;
  padding: 20;
}
.inner {
  flex: 1;
  flex-direction: row;
}
.cell {
  background-color: red;
  flex: 1;
  aspect-ratio: 1;
  border-width: 1;
  border-color: black;
}
</style>
