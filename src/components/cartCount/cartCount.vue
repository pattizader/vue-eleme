<template>
    <div class="compute-view">
      <transition name="move">
        <span class="descrease"  @click.stop.prevent="cutCount" v-show="food.quantity">
          <span class="inner icon-remove_circle_outline"></span>
        </span>
      </transition>
      <span class="num" v-show="food.quantity">{{food.quantity}}</span>
      <span class="add icon-add_circle" @click.stop.prevent="addCount"></span>
    </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import {mapGetters} from 'vuex'
  export default {
    name: 'compute',
    props: {
      food: {
        type: Object
      }
    },
    computed: {
      ...mapGetters({})
    },
    methods: {
      addCount (event) {
        if (!event._constructed) {
          return
        }
        if (!this.food.quantity) {
          Vue.set(this.food, 'quantity', 1)
        }
        this.$store.dispatch('addFoodToCart', this.food)
      },
      cutCount (event) {
        if (!event._constructed) {
          return
        }
        this.$store.dispatch('decreaseFoodOutCart', this.food)
      }
    },
    watch: {
      food () {
        if (this.food.quantity === 0) {
          this.$store.commit('emptyCart', this.food)
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .compute-view
    display inline-block
    font-size 0
    .descrease
      padding 6px
      .inner
        display inline-block
        font-size 24px
        color rgb(0,160,220)
        vertical-align middle
      &.move-enter-active
        transition all 0.4s linear
        opacity 1
        transform translate3d(0,0,0)
        .inner
          transform rotate(0)
          transition all 0.4s linear
      &.move-leave-active
        opacity 0
        transition all 0.4s linear
        transform translate3d(28px,0,0)
        .inner
          transform rotate(180deg)
          transition all 0.4s linear
      &.move-enter
        opacity 0
        transform translate3d(28px,0,0)
        .inner
          transform rotate(180deg)
    .num
      display inline-block
      padding 0px 2px
      box-sizing border-box
      text-align center
      font-size 10px
      color rgb(147,153,159)
      line-height 24px
      vertical-align middle
    .add
      font-size 24px
      color rgb(0,160,220)
      line-height 24px
      padding 6px
      vertical-align middle
</style>
