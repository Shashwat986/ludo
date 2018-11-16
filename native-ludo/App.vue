<template>
  <view class="container">
    <view class="header">
    </view>
    <board></board>
    <view class="footer" :style="footerStyle">
      <text class="text-color-primary">{{t}}</text>
    </view>
  </view>
</template>

<script>
import { Dimensions } from 'react-native';
import Board from './views/Board';
import store from './store';

export default {
  data() {
    let d = Dimensions.get('window');
    let height = d.height > d.width ? d.height : d.width;
    let width = d.height > d.width ? d.width : d.height;

    footerStyle = { height: (height - width) };

    return {
      footerStyle: footerStyle
    }
  },
  computed: {
    t () {
      return JSON.stringify(store.state.tokens);
    }
  },
  components: {
    board: Board
  }
}
</script>

<style>
.container {
  background-color: indigo;
  justify-content: flex-start;
  flex: 1;
}
.header {
  height: 40;
}
.text-color-primary {
  color: white;
}
</style>
