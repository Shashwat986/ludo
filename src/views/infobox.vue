<template>
  <div :class="['tile', 'is-child', 'card']">
    <header :class="['card-header', 'has-background-' + bColor]">
      <p class="card-header-title">
        {{colorName}}
      </p>
    </header>
    <div class="card-content">
      <div class="level is-mobile">
        <div :class="{selected: isStep('dice'), ['level-left']: true}">
          <dice :isStep="isStep('dice')"></dice>
        </div>
        <div :class="['level-right', {selected: isStep('pass')}]">
          <a class="button" @click="pass">Pass</a>
        </div>
      </div>
      <div class="buttons is-centered">
        <a
          :class="{button: true, 'is-info': isAvailable(i), selected: isStepBtn(i)}"
          v-for="i in numTypes"
          @click="btnPress(i)"
        >
          {{btnTypes[i-1]}}
        </a>
      </div>
      <div>
        <progress :class="['progress', 'is-' + bColor]" :value="energy()" max="100">{{energy}}%</progress>
      </div>
    </div>
  </div>
</template>

<script>
import Dice from './dice.vue';
import Player from '../store/player';
import {btnPowers, btnTypes} from '../store/constants';

export default {
  props: ['color'],
  components: {
    dice: Dice
  },
  data () {
    return {
      player: Player.get(this.color)
    };
  },
  computed: {
    btnTypes() {
      return btnTypes;
    },
    numTypes () {
      return btnTypes.length;
    },
    bColor () {
      return this.$store.state.colormap[this.color];
    },
    colorName () {
      return this.$store.state.colorName[this.color];
    }
  },
  methods: {
    isAvailable (i) {
      return (btnPowers[btnTypes[i-1]] < this.player.energy);
    },
    isStep (ref) {
      return this.$store.getters.isStep(ref, this.color);
    },
    isStepBtn (i) {
      let ref = btnTypes[i-1];
      return this.$store.getters.isStep("btn", {btn: ref, color: this.color});
    },
    energy () {
      return this.$store.getters.getEnergy(this.color);
    },
    pass () {
      this.$store.dispatch('movePass');
    },
    btnPress (i) {
      this.$store.dispatch('moveBtn', {btn: btnTypes[i-1]});
    }
  }
}
</script>
