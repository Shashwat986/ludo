<template>
  <div :class="[bgClass, 'cell']" :data-x="i" :data-y="j"></div>
</template>

<script>
export default {
  props: ['i', 'j', 'color'],
  computed: {
    bgClass () {
      return 'has-background-' + this.color;
    }
  }
}
</script>

<style>
.cell:after {
  content: "";
  display: block;
  padding-bottom: 100%;
}
</style>
