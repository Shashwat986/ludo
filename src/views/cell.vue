<template>
  <div :class="[bgClass, 'cell', { selected: isStep }]" :data-x="dx" :data-y="dy" @click="clicked">
    <div class='cell-text'>
      {{getText}}
    </div>
  </div>
</template>

<script>
import Cell from '../store/cell';

export default {
  props: ['dx', 'dy'],
  data () {
    return {
      cell: Cell.get(this.dx, this.dy)
    };
  },
  computed: {
    bgClass () {
      return 'has-background-' + this.$store.getters.getBgColor(this.dx, this.dy);
    },
    getPos () {
      return this.dx + ',' + this.dy;
    },
    getColor () {
      let allTokens = this.$store.getters.getAllTokenColors(this.getPos);

      if (allTokens.length > 0)
        return allTokens[0];
      else
        return " ";
    },
    getText () {
      if (this.getColor !== " ")
        return this.getColor;
      else if (this.cell.isStarPoint) {
        return "⭐";
      }
      return " ";
    },
    isStep () {
      return this.$store.getters.isStep("cell", this.getPos);
    }
  },
  methods: {
    clicked (e) {
      if (this.$store.state.disabled) {
        return;
      }
      if (!this.isStep) {
        return;
      }

      let sts = this.$store.dispatch('moveToken', {
        color: this.getColor,
        from: this.getPos
      });

      if (!(sts && typeof sts.then === 'function')) {
        sts = Promise.resolve(sts);
      }

      sts.then((res) => {
        if (res) {
          this.$store.dispatch('completeStep');
        } else {
          alert("Invalid move");
        }
      });
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
