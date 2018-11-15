<template>
  <view class="cell" :style="{backgroundColor: bgColor}">
    <text>{{text}}</text>
  </view>
</template>

<script>
import store from '../store';

export default {
  props: ['dx', 'dy'],
  data () {
    return {
      bgColor: 'white',
      text: " ",
    };
  },
  created () {
    this.bgColor = store.getters.getBgColor(this.dx, this.dy);
  },
  mounted () {
    store.state.colors.forEach((color) => {
      if (store.state.tokens[color + ',' + this.dx + ',' + this.dy]) {
        this.text = color;
      }
    });
  }
}
</script>

<style>
.cell {
  background-color: red;
  flex: 1;
  aspect-ratio: 1;
  border-width: 1;
  border-color: black;
  border-radius: 3;
}
</style>
