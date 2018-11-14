<template>
  <view class="container">
    <view class="main">
      <view class="inner" v-for='i in x'>
        <view class="cell" v-for="j in y">
          <text class="text-color-primary">&nbsp;</text>
        </view>
      </view>
    </view>
    <view class="footer">
      <text class="text-color-primary">World</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      x: 15,
      y: 15
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
}
.text-color-primary {
  color: blue;
}
</style>
