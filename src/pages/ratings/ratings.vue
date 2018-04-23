<template>
    <div class="ratings-view" ref="ratingsList">
      <div>
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
        <div class="tabs">
          <rating-tab :ratings="ratings" @on-change="changeRatingList"></rating-tab>
        </div>
        <div class="rating-tip"><i class="icon-check_circle"></i><span>只看有内容的评价</span></div>
        <div class="ratings-panel " v-for="item in ratingList">
          <img class="avatar" :src="item.avatar">
          <div class="ratings-content">
            <div class="username">{{item.username}}</div>
            <div class="deliveryTime">
              <star class="star" :size="36" :score="item.score"></star>
              {{item.deliveryTime}}分钟送达
            </div>
            <div class="rating-text">{{item.text}}</div>
            <div class="recommend">
              <i :class="item.rateType === 0 ? 'icon-thumb_up':'icon-thumb_down'"></i>
              <span class="recommend-tip" v-for="(tip,index) in item.recommend" :key="tip">{{item.recommend[index]}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star'
  import ratingTab from 'components/ratingTab/ratingTab'
  import BScroll from 'better-scroll'
  export default {
    name: 'ratings',
    components: {
      star,
      ratingTab
    },
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        ratings: [],
        ratingList: []
      }
    },
    created () {
      this.$http.commonApi('/api/ratings').then((res) => {
        this.ratings = res
        this.ratingList = this.ratings
        this.$nextTick(() => {
          if (!this.ratingScroll) {
            this.ratingScroll = new BScroll(this.$refs.ratingsList, {
              click: true
            })
          } else {
            this.ratingScroll.refresh()
          }
        })
      }).catch(err => {
        console.log(err)
      })
    },
    methods: {
      changeRatingList (value) {
        if (value === 0) {
          this.ratingList = this.ratings
        }
        if (value === 1) {
          this.ratingList = this.ratings.filter((item) => {
            return item.rateType === 0
          })
        }
        if (value === 2) {
          this.ratingList = this.ratings.filter((item) => {
            return item.rateType === 1
          })
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixin"
  .ratings-view
    position absolute
    top 178px
    bottom 44px
    width 100%
    overflow hidden
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
    .rating-tip
      width 100%
      height 49px
      line-height 49px
      padding-left 16px
      font-size 12px
      color #b7bbbf
      border-1px-bottom(#e6e7e8)
      span
        display inline-block
        margin-left 3px
    .ratings-panel
      display flex
      padding 16px 16px
      color rgb(7,17,27)
      font-size 0px
      .avatar
        width 28px
        height 28px
        border-radius 50%
      .ratings-content
        flex 1
        margin-left 12px
        .username
          font-size 10px
          line-height 12px
        .deliveryTime
          margin-top 4px
          margin-bottom 6px
          font-size 10px
          color rgb(147,153,159)
          line-height 12px
          .star
            display inline-block
            margin-right 6px
            vertical-align middle
        .rating-text
          font-size 12px
          line-height 18px
          margin-bottom 8px
        .recommend
          font-size 12px
          color rgb(0,160,220)
          line-height 16px
          i
            margin-right 6px
            &.icon-thumb_down
              color rgb(183,187,191)
          .recommend-tip
            display inline-block
            max-width 60px
            margin-right 8px
            padding 0px 6px
            box-sizing border-box
            text-overflow ellipsis
            white-space nowrap
            overflow hidden
            border 1px solid rgba(7,17,27,0.1)
            border-radius 2px
            font-size 9px
            color rgb(147,153,159)
            line-height 16px
            vertical-align middle
</style>
