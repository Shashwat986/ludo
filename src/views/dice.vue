<template>
  <div :class="['dice', 'value-' + rollValue]" @click="roll"></div>
</template>

<script>
export default {
  props: {
    num: {
      type: Number,
      default: 0
    },
    isStep: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      rollValue: this.num
    };
  },
  methods: {
    roll () {
      if (!this.isStep) return;
      this.$store.commit('roll');
      this.rollValue = this.$store.state.dieRoll;
      this.$store.dispatch('completeStep');
    }
  },
  mounted () {
  }
}
</script>

<style>
.dice {
  background-image: url('../../assets/dice.png');
  width: 50px;
  height: 50px;
  background-size: 150px;
}

.dice.selected {
  box-sizing: content-box;
  border: 1px solid black;
  border-radius: 7px;
  box-shadow: 0 0 3px 2px grey;
}

.dice.value-0 {
  background-image: url('../../assets/dice0.png');
  background-size: 50px;
}

.dice.value-1 {
  background-position: -1px -1px;
}
.dice.value-2 {
  background-position: 99px -1px;
}
.dice.value-3 {
  background-position: 49px -1px;
}
.dice.value-4 {
  background-position: -1px 49.5px;
}
.dice.value-5 {
  background-position: 98px 49.5px;
}
.dice.value-6 {
  background-position: 48.5px 48.5px;
}
</style>
