<template>
  <view class="container">
    <view class="header">
    </view>
    <board></board>
    <view class="footer" :style="footerStyle">
      <text class="text-color-primary">World</text>
    </view>
  </view>
</template>

<script>
import { Dimensions } from 'react-native';
import Board from './views/Board';

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
