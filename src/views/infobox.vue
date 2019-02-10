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
      <div class="field is-grouped is-grouped-multiline is-centered">
        <div class="control" v-for="i in numTypes">
        <span class="tags has-addons">
          <a
            :class="{tag: true, 'is-info': isAvailable(i), selected: isStepBtn(i)}"
            @click="btnPress(i)"
          >
            {{btnTypes[i-1]}}
          </a>
          <span class="tag is-dark">
            {{btnPowers[btnTypes[i-1]]}}
          </span>
        </span>
        </div>
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
import {btnPowers, btnTypes, colormap, colorName} from '../store/constants';

export default {
  props: ['color'],
  components: {
    dice: Dice
  },
  data () {
    return {
    };
  },
  computed: {
    player() {
      return Player.get(this.color);
    },
    btnTypes() {
      return btnTypes;
    },
    btnPowers() {
      return btnPowers;
    },
    numTypes () {
      return btnTypes.length;
    },
    bColor () {
      return colormap[this.color];
    },
    colorName () {
      return colorName[this.color];
    }
  },
  methods: {
    isAvailable (i) {
      return (btnPowers[btnTypes[i-1]] <= this.player.energy);
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
