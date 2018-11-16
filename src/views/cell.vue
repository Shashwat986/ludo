<template>
  <div :class="[bgClass, 'cell', isHoverable ? 'hoverable' : '']" :data-x="dx" :data-y="dy" @click="clicked">
    <div class='cell-text'>
      {{getText}}
    </div>
  </div>
</template>

<script>
export default {
  props: ['dx', 'dy'],
  data () {
    return {
      isHoverable: false
    };
  },
  computed: {
    bgClass () {
      return 'has-background-' + this.$store.getters.getBgColor(this.dx, this.dy);
    },
    getPos () {
      return this.dx + ',' + this.dy;
    },
    getText () {
      let allTokens = this.$store.getters.getAllTokens(this.getPos);

      if (allTokens.length > 0)
        return allTokens[0];
      else
        return " ";
    }
  },
  methods: {
    clicked (e) {
      if (this.$store.state.disabled) {
        return;
      }
      if (this.$store.state.move !== this.getText) {
        return;
      }

      this.$store.dispatch('move', {
        color: this.getText,
        from: this.getPos
      });
    }
  }
}
</script>

<style lang="sass">
@import 'bulma';

.cell.hoverable:hover {
  cursor: pointer;
  z-index: 400;
  box-shadow: 0 0 10px 4px $grey-light;
}

.cell {
  border: 0.5px solid $black;
  position: relative;
}

.cell:after {
  content: "";
  display: block;
  padding-bottom: 100%;
}

.cell-text {
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
