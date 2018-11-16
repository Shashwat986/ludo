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
export default {
  data () {
    return {};
  },
  computed: {
    color () {
      return this.$store.state.colormap[this.$store.state.move];
    },
    colorName () {
      return this.$store.state.colorName[this.$store.state.move];
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
