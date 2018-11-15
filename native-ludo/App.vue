<template>
  <view class="container">
    <view class="main">
      <view class="inner" v-for='i in x'>
        <view class="cell" v-for="j in y">
          <text class="text-color-primary">&nbsp;</text>
        </view>
      </view>
    </view>
    <view class="footer" :style="footerStyle">
      <text class="text-color-primary">World</text>
    </view>
  </view>
</template>

<script>
import { Dimensions } from 'react-native';

export default {
  data() {
    let d = Dimensions.get('window');
    let height = d.height > d.width ? d.height : d.width;
    let width = d.height > d.width ? d.width : d.height;

    footerStyle = { height: (height - width) };

    return {
      x: 15,
      y: 15,
      footerStyle: footerStyle
    }
  }
}
</script>

<style>
.container {
  background-color: white;
  justify-content: flex-start;
  flex: 1;
}
.main {
  aspect-ratio: 1;
  padding: 20;
  background-color: green;
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
.footer {
  background-color: green;
  height: 200;
}
.text-color-primary {
  color: blue;
}
</style>
