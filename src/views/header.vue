<template>
  <section class="header">
    <div class="container" style="margin-bottom: 1em;">
      <article :class="['message', 'is-' + color, 'is-size-7']">
        <div class="message-body">
        {{colorName}}'s turn{{msg ? ": " + msg : ""}}
        </div>
      </article>
    </div>
  </section>
</template>

<script>
import {colormap, colorName} from '../store/constants';
export default {
  data () {
    return {};
  },
  computed: {
    color () {
      return colormap[this.$store.state.move];
    },
    colorName () {
      return colorName[this.$store.state.move];
    },
    msg () {
      switch (this.$store.state.step) {
        case 0: return "Please roll the dice";
        case 1: return "Please make your move";
      }
    }
  }
}
</script>
