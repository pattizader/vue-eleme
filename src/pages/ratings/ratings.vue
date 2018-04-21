<template>
    <div class="ratings-view">
      <div class="score-panel">
        <div class="score-panel-left border-1px">
          <h1 class="score">{{seller.score}}</h1>
          <p class="rankRate">综合评分<br/><span>高于周边商家{{seller.rankRate}}%</span></p>
        </div>
        <div class="score-panel-right">
          <p class="avgScore foodScore">商品评分<star class="star" :size="36" :score="3.9"></star><span>{{seller.foodScore}}</span></p>
          <p class="avgScore serviceScore">服务态度<star class="star" :size="36" :score="4.0"></star><span>{{seller.serviceScore}}</span></p>
          <p class="deliveryTime">送达时间<span>{{seller.deliveryTime}}分钟</span></p>
        </div>
      </div>
      <div class="blank"></div>
      <div class="ratings-panel">
        <div class="tabs">
          <rating-tab></rating-tab>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star'
  import ratingTab from 'components/ratingTab/ratingTab'
  export default {
    name: 'ratings',
    components: {
      star,
      ratingTab
    },
    props: {
      seller:{
        type: Object
      }
    },
    data () {
      return {
        ratings: []
      }
    },
    created () {
      this.$http.commonApi('/api/ratings').then((res) => {
        this.ratings = res
      }).catch(err => {
        console.log(err)
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixin"
  .ratings-view
    position relative
    .score-panel
      width 100%
      display flex
      font-size 0px
      border-1px-right(rgba(147,153,159,0.5))
      border-bottom 1px solid rgba(147,153,159,0.5)
      .score-panel-left
        width 30%
        padding 18px 0px
        text-align center
        .score
          font-size 24px
          color rgb(255,153,0)
          line-height 28px
        .rankRate
          font-size 12px
          color rgb(7,17,27)
          line-height 15px
          &> span
            font-size 10px
            color rgb(7,17,27)
            line-height 12px
      .score-panel-right
        flex 1
        padding 18px 24px
        box-sizing border-box
        font-size 12px
        color rgb(7,17,27)
        line-height 18px
        .avgScore
          margin-bottom 8px
          &> span
            font-size 12px
            color rgb(255,153,0)
            line-height 18px
          .star
            display inline-block
            margin 0px 12px
            vertical-align middle
        .deliveryTime
          &> span
            display inline-block
            margin-left 12px
            font-size 12px
            color rgb(147,153,159)
            line-height 18px
            font-style noe
    .blank
      width 100%
      height 18px
      background-color rgba(147,153,159,0.2)
      border-bottom 1px solid rgba(147,153,159,0.2)
</style>
