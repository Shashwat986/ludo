<template>
  <div :class="[{animate, selected}, 'dice', 'value-' + num]" @click="roll"></div>
</template>

<script>
export default {
  props: {
    num: {
      type: Number,
      default: 0
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      animate: false
    };
  },
  methods: {
    roll () {
      this.$store.commit('roll');
      this.num = this.$store.state.dieRoll;
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
  border: 1px solid black;
  border-radius: 7px;
  box-shadow: 0 0 3px 2px grey;
}

.dice.value-0 {
  background-image: url('../../assets/dice0.png');
  width: 50px;
  height: 50px;
  background-size: 50px;
}

.dice.value-0.animate {
  background-position: 175px -1px;
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
