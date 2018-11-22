<template>
  <div :class="['tile', 'is-child', 'card']">
    <header :class="['card-header', 'has-background-' + bColor]">
      <p class="card-header-title">
        {{colorName}}
      </p>
    </header>
    <div class="card-content">
      <div class="level is-mobile">
        <div :class="{['has-border-' + bColor]: isStep, pointer: isStep, ['level-left']: true}">
        <dice :isStep="isStep"></dice>
        </div>
        <div :class="['level-right', {selected: isStep2}]">
          <a class="button" @click="pass">Pass</a>
        </div>
      </div>
      <div class="buttons is-centered">
          <a :class="{button: true, 'is-info': false, selected: isStep2}">&#x2B50;</a>
          <a :class="{button: true, 'is-info': false, selected: isStep2}">&#x2B50;</a>
          <a :class="{button: true, 'is-info': true, selected: isStep2}">&#x2B50;</a>
          <a :class="{button: true, 'is-info': true, selected: isStep2}">&#x2B50;</a>
      </div>
    </div>
  </div>
</template>

<script>
import Dice from './dice.vue';

export default {
  props: ['color'],
  components: {
    dice: Dice
  },
  computed: {
    bColor () {
      return this.$store.state.colormap[this.color];
    },
    colorName () {
      return this.$store.state.colorName[this.color];
    },
    isStep () {
      return (this.color === this.$store.state.move && this.$store.state.step === 0);
    },
    isStep2 () {
      return (this.color === this.$store.state.move && this.$store.state.step === 1);
    }
  },
  methods: {
    pass () {
      if (this.$store.state.disabled) {
        return;
      }
      if (this.isStep2) {
        this.$store.dispatch('completeStep');
      }
    }
  }
}
</script>
