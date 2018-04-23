<template>
  <transition name="food-fade">
    <div class="food-detail-view" v-show="showFood" ref="fooddetail">
      <div>
        <div class="food-img">
          <img :src="food.image"/>
        </div>
        <div class="food-about">
          <h1 class="name">{{food.name}}</h1>
          <p class="count"><span>月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span></p>
          <p class="price"><span>￥{{food.price}}</span><span v-show="food.oldPrice">￥{{food.oldPrice}}</span></p>
          <div class="addBtn" v-show="showCartBtn" @click="addFood(food,$event)">加入购物车</div>
          <counter class="counterBtn" :food="food" v-show="!showCartBtn"></counter>
        </div>
        <div class="food-info" v-show="food.info">
          <h1 class="title">商品介绍</h1>
          <div class="info">{{food.info}}</div>
        </div>
        <div class="food-ratings" v-show="food.ratings">
          <h1 class="title">商品评价</h1>
          <rating-tab :ratings="food.ratings" @on-change="changeRatingList"></rating-tab>
          <div class="rating-tip"><i class="icon-check_circle"></i><span>只看有内容的评价</span></div>
          <div class="rating-content" v-for="rating in ratingList">
            <div class="rating-left">
              <div class="time">{{rating.rateTime}}</div>
              <div class="text">
                <i :class="rating.rateType === 0 ? 'icon-thumb_up':'icon-thumb_down'"></i>
                <span v-show="rating.rateType === 0" class="thumb-tip">赞了该商品</span><span v-show="rating.rateType === 1" class="thumb-tip">吐槽了该商品</span>
                <p v-show="rating.text">{{rating.text}}</p>
              </div>
            </div>
            <div class="rating-right">
              <span>{{rating.username}}</span>
              <img :src="rating.avatar" width="12" height="12">
            </div>
          </div>
        </div>
        <div class="close-icon" @click="close(food,$event)">
          <i class="icon-close"></i>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {mapGetters, mapActions} from 'vuex'
  import Vue from 'vue'
  import ratingTab from 'components/ratingTab/ratingTab'
  import counter from 'components/cartCount/cartCount'
  export default {
    name: 'detail',
    components: {
      ratingTab,
      counter
    },
    props: {
      food: {
        type:Object
      }
    },
    data () {
      return {
        ratingList: []
      }
    },
    computed: {
      ...mapGetters({
        showFood: 'showFood',
        cartList: 'CartList'
      }),
      showCartBtn () {
        if (this.cartList.length !== 0) {
          const cartItem = this.cartList.find(item => item.name === this.food.name)
          if (!cartItem) {
            return true
          } else {
            return false
          }
        } else {
          return true
        }
      }
    },
    methods: {
      _initScroll () {
        this.Scroll = new BScroll(this.$refs.fooddetail, {
          click: true
        })
      },
      changeRatingList (value) {
        if (value === 0) {
          this.ratingList = this.food.ratings
        }
        if (value === 1) {
          this.ratingList = this.food.ratings.filter((item) => {
            return item.rateType === 0
          })
        }
        if (value === 2) {
          this.ratingList = this.food.ratings.filter((item) => {
            return item.rateType === 1
          })
        }
      },
      close (food, event) {
        if (!event._constructed) {
          return
        }
        this.$store.commit('closeFoodDetail', food)
      },
      addFood (food, event) {
        if(!event._constructed) {
          return
        }
        this.$store.dispatch('addFoodToCart', food)
        Vue.set(this.food, 'quantity', 1)
      }
    },
    mounted () {
      this.$nextTick(() => {
        this._initScroll()
      })
    },
    watch: {
      food () {
        this.$nextTick(() => {
          if (!this.Scroll) {
            this._initScroll()
          } else {
            this.Scroll.refresh()
          }
        })
        this.ratingList = this.food.ratings
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  .food-detail-view
    position fixed
    top 0px
    left 0px
    bottom 44px
    width 100%
    z-index 20
    background-color #f3f5f7
    overflow hidden
    &.food-fade-enter-active,&.food-fade-leave-active
      transition all .3s linear
      transform translate3d(0,0,0)
    &.food-fade-enter,&.food-fade-leave-active
      transform translate3d(0,100%,0)
    .food-img
      position relative
      width 100%
      height 0
      padding-top 100%
      img
        position: absolute
        top 0px
        left 0px
        width 100%
        height 100%
    .food-about
      position relative
      padding 18px
      font-size 10px
      color rgb(7,17,27)
      background-color #ffffff
      border-1px-bottom(rgba(7,17,27,0.1))
      .name
        font-size  14px
        line-height 14px
        margin-bottom 8px
      .count
        span
          &:first-child
            margin-right 12px
        color rgb(147,153,159)
        line-height 20px
        margin-bottom 18px
      .price
        span
          &:first-child
            font-size 14px
            color rgb(240,20,20)
            line-height 24px
            font-weight bold
            margin-right 12px
            vertical-align middle
          &:last-child
            font-size 10px
            color rgb(147,153,159)
            line-height 24px
            text-decoration line-through
      .addBtn
        position: absolute
        bottom 18px
        right 18px
        width 74px
        height 24px
        padding 6px 12px
        box-sizing border-box
        color #ffffff
        border-radius 12px
        background-color rgb(0,160,220)
      .counterBtn
        position: absolute
        bottom 18px
        right 18px
    .food-info
      padding 18px
      margin-top 18px
      font-size 12px
      color rgb(77,85,93)
      line-height 24px
      background-color #ffffff
      .title
        font-size  14px
        line-height 14px
        margin-bottom 6px
      .info
        margin 0px 8px
    .food-ratings
      padding 18px 0px
      margin-top 18px
      font-size 12px
      color rgb(77,85,93)
      background-color #ffffff
      .title
        font-size  14px
        line-height 14px
        margin-left 18px
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
      .rating-content
        display flex
        padding 18px 0px
        margin 0px 12px
        border-1px-bottom(rgba(7,17,27,0.1))
        .rating-left
          flex 1
          vertical-align middle
          .time
            font-size 10px
            color rgb(147,153,159)
            line-height 12px
            margin-bottom 6px
          .text
            i
              font-size 12px
              color rgb(147,153,159)
              line-height 24px
              &.icon-thumb_up
                color rgb(0,160,220)
            .thumb-tip
              margin-left 3px
              color rgb(147,153,159)
              font-size 10px
              line-height 24px
              vertical-align middle
            p
              margin-left 4px
              font-size 12px
              color rgb(7,17,27)
              line-height 16px
        .rating-right
          font-size 10px
          color 10px
          line-height 12px
          img
            display inline-block
            margin-left 6px
            vertical-align middle
    .close-icon
      position absolute
      top 20px
      left 20px
      i
        font-size 24px
        color rgba(255,255,255,0.5)
</style>
