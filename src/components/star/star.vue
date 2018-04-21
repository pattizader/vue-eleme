<template>
    <div class="star-view" :class="starType">
      <span v-for="(starClass,index) in starClasses" :class="starClass" class="star-item" :key="index"></span>
    </div>
</template>

<script type="text/ecmascript-6">
  const LEN = 5
  const ON_CLA = 'on'
  const HALF_CLA = 'half'
  const OFF_CLA = 'off'
  export default {
    name: 'star',
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType () {
        return 'star-' + this.size
      },
      starClasses () {
        let result = []
        let score = Math.floor(this.score * 2) / 2
        let hasHalf = score % 1
        for (let i = 0; i < Math.floor(score); i++) {
          result.push(ON_CLA)
        }
        if (hasHalf !== 0) {
          result.push(HALF_CLA)
        }
        while (result.length < LEN) {
          result.push(OFF_CLA)
        }
        return result
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  .star-view
    font-size 0px
    &.star-48
      .star-item
        display: inline-block
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        background-repeat no-repeat
        &.on
          bg-img('img/star48_on')
        &.half
          bg-img('img/star48_half')
        &.off
          bg-img('img/star48_off')
    &.star-36
      .star-item
        display: inline-block
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        background-repeat no-repeat
        &.on
          bg-img('img/star36_on')
        &.half
          bg-img('img/star36_half')
        &.off
          bg-img('img/star36_off')
    &.star-24
      .star-item
        display: inline-block
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        background-repeat no-repeat
        &.on
          bg-img('img/star24_on')
        &.half
          bg-img('img/star24_half')
        &.off
          bg-img('img/star24_off')

</style>
