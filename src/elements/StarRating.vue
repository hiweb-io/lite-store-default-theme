<template>

  <div class="star-rating" :class="customClass">

    <label class="star-rating__star"
      v-for="rating in ratings"
      v-on:click="set(rating)"
      v-on:mouseover="star_over(rating)"
      v-on:mouseout="star_out"
      :style="{'font-size': fontSize}">

      <input class="star-rating star-rating__checkbox" type="radio" :value="rating" :name="name" v-model="value" :disabled="disabled">
      
      <span v-if="value >= rating && value != null" class="fa star fa-star"></span>
      <span v-else class="far star fa-star"></span>

    </label>

    ({{ value }})

  </div>

</template>

<style lang="scss">
  %visually-hidden {
    position: absolute;
    overflow: hidden;
    clip: rect(0 0 0 0);
    height: 1px; width: 1px;
    margin: -1px; padding: 0; border: 0;
  }

  .star-rating {

    &__star {
      display: inline-block;
      padding: 1px;
      vertical-align: middle;
      line-height: 1;
      font-size: 1.5em;
      color: #ABABAB;
      transition: color .2s ease-out;

      &:hover {
        cursor: pointer;
      }
      
      &.is-selected {
        color: #fec600;
      }
      
      &.is-disabled:hover {
        cursor: default;
      }
    }

    .star {
      font-size:0.8em;
      color: #fbb400;
    }

    &__checkbox {
      @extend %visually-hidden;
    }
  }
</style>

<script>

export default {

  props: ['name', 'value', 'id', 'disabled', 'required', 'customClass', 'fontSize'],

  data() {
    return {

      temp_value: null,
      ratings: [1, 2, 3, 4, 5]

    };
  },

  methods: {
    
    star_over(index) {
      var self = this;

      if (!this.disabled) {
        this.temp_value = this.value;
        return this.value = index;
      }

    },

    star_out() {
      var self = this;

      if (!this.disabled) {
        return this.value = this.temp_value;
      }
    },

    set(value) {
      var self = this;

      if (!this.disabled) {
        this.temp_value = value;
        return this.value = value;
      }
    }
  }

}
</script>