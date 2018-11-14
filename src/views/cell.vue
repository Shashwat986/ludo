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

<style lang="sass">
@import 'bulma';

.cell {
  border: 0.5px solid $black;
  position: relative;
}

.cell:after {
  content: "";
  display: block;
  padding-bottom: 100%;
}

.cell:before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
}

.cell.left:before {
  left: -2px;
  border-left: 2px solid $white-ter;
}

.cell.top:before {
  top: -2px;
  border-top: 2px solid $white-ter;
}

.cell.bottom:before {
  bottom: -2px;
  border-bottom: 2px solid $white-ter;
}

.cell.right:before {
  right: -2px;
  border-right: 2px solid $white-ter;
}
</style>
