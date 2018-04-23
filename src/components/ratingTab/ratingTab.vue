<template>
    <div class="rating-tab border-1px">
      <div class="item-tab all" :class="{'active': isActive===0}" @click="chooseAll">全部<span>{{allNum}}</span></div>
      <div class="item-tab satisfy" :class="{'active': isActive===1}" @click="chooseGood">满意<span>{{satisfyNum}}</span></div>
      <div class="item-tab unsatisfy" :class="{'active': isActive===2}" @click="chooseBad">不满意<span>{{unsatisfyNum}}</span></div>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'ratingTab',
    props: {
      ratings: {
        type: Array
      }
    },
    data () {
      return {
        isActive: 0,
        Lists: []
      }
    },
    computed: {
      allNum () {
        if (this.ratings) {
          return this.ratings.length
        }
      },
      satisfyNum () {
        let ratings = 0
        if (this.ratings) {
          this.ratings.forEach((item) => {
            if (item.rateType === 0) {
              ratings++
            }
          })
          return ratings
        }
      },
      unsatisfyNum () {
        let ratings = 0
        if (this.ratings) {
          this.ratings.forEach((item) => {
            if (item.rateType === 1) {
              ratings++
            }
          })
          return ratings
        }
      }
    },
    methods: {
      chooseAll () {
        this.isActive = 0
        this.$emit('on-change', this.isActive)
      },
      chooseGood () {
        this.isActive = 1
        this.$emit('on-change', this.isActive)
      },
      chooseBad () {
        this.isActive = 2
        this.$emit('on-change', this.isActive)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixin"
  .rating-tab
    position relative
    font-size 0px
    margin 0px 16px
    padding 16px 0px
    box-sizing border-box
    border-1px-bottom(#e6e7e8)
    .item-tab
      display inline-block
      width 60px
      height 32px
      line-height 32px
      text-align center
      margin-left 6px
      font-size 12px
      color rgb(7,17,27)
      span
        display inline-block
        margin-left 3px
        font-size 6px
      &.active
        color rgb(255,255,255)
      &.all
        background-color #00a0dc
      &.satisfy
        background-color #ccecf8
      &.unsatisfy
        background-color #e9ebec
</style>
