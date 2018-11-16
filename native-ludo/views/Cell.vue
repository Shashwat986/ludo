<template>
  <view class="cell" :style="{backgroundColor: bgColor}">
    <touchable-highlight :onPress="move">
      <text>{{getText}}</text>
    </touchable-highlight>
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
  computed: {
    getPos () {
      return this.dx + ',' + this.dy;
    },
    getText () {
      let finalColor = " ";
      store.state.colors.forEach((color) => {
        if (store.state.tokens[color + ',' + this.getPos] > 0) {
          finalColor = color;
        }
      });
      return finalColor;
    }
  },
  created () {
    this.bgColor = store.getters.getBgColor(this.dx, this.dy);
  },
  methods: {
    move () {
      store.dispatch('move', {color: this.getText, from: this.getPos, count: 6});
    }
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
