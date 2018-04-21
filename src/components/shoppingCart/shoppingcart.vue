<template>
    <div class="shopping-cart">
      <div>
        <div class="cart">
          <div class="cart-container">
            <div class="cart-left">
              <div class="logo-wrapper" @click="toggleCart">
                <div class="logo" :class="{'hightlight':totalPrice > 0}">
                  <i class="icon-shopping_cart" :class="{'hightlight':totalPrice > 0}"></i>
                </div>
                <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
              </div>
              <div class="price">￥{{totalPrice}}</div>
              <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
            </div>
            <div class="cart-right" :class="btnClass">{{btnText}}</div>
          </div>
          <transition name="fold">
            <div class="cart-detail" v-show="showList">
              <div class="detail-container">
                <div class="cart-title border-1px">
                  购物车
                  <span class="clear" @click.stop.prevent="empty">清空</span>
                </div>
                <div class="detail-content" ref="cartList">
                  <ul>
                    <li class="detail-list border-1px" v-for="item in cartList" :key="item.name">
                      <span class="name">{{item.name}}</span>
                      <span class="price">{{item.price * item.quantity}}</span>
                      <div class="counter">
                        <cart-count :food="item" @click.stop.prevent="preventDoubleClick"></cart-count>
                      </div>
                    </li>
                    <li class="lastlist border-1px"></li>
                  </ul>
                </div>
              </div>
            </div>
          </transition>
        </div>
        <transition name="mask-fade">
          <div class="cart-mask" v-show="showList" ></div>
        </transition>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import cartCount from 'components/cartCount/cartCount'
  import BScroll from 'better-scroll'
  import {mapGetters} from 'vuex'

  export default {
    name: 'shoppingcart',
    props: {
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0

      }
    },
    components: {
      cartCount
    },
    data () {
      return {
        fold: true
      }
    },
    computed: {
      ...mapGetters({
        cartList: 'CartList',
        totalPrice: 'cartTotalPrice',
        totalCount: 'cartTotalCount'
      }),
      btnText () {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}起送`
        } else if (this.totalPrice > 0 && this.totalPrice < 20) {
          let diff = this.minPrice - this.totalPrice
          return `还差￥${diff}起送`
        } else {
          return `去结算`
        }
      },
      btnClass () {
        if (this.totalPrice < 20) {
          return 'commonBtn'
        } else {
          return 'goBuy'
        }
      },
      showList () {
        if (this.totalCount === 0) {
          this.fold = true
          return false
        }
        let show = !this.fold
        if (show) {
          this.$nextTick(() => {
            if (!this.cartScroll) {
              this.cartScroll = new BScroll(this.$refs.cartList, {
                click: true
              })
            } else {
              this.cartScroll.refresh()
            }
          })
        }
        return show
      }
    },
    methods: {
      toggleCart () {
        this.fold = !this.fold
      },
      preventDoubleClick (event) {
        if (!event._constructed) {
          return
        }
      },
      empty () {
        this.cartList.forEach((food) => {
          this.$store.commit('emptyCart', food)
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  .shopping-cart
    width 100%
    height: 48px
    position fixed
    bottom 0px
    left 0
    background-color #141d27
    z-index 50
    .cart
      z-index 50
      .cart-container
        display flex
        width 100%
        z-index 50
        .cart-left
          flex 1
          font-size 0
          .logo-wrapper
            display inline-block
            position relative
            top -10px
            width 58px
            height 58px
            margin-left 18px
            padding 6px
            box-sizing border-box
            border-radius 50%
            background-color #141d27
            vertical-align middle
            .logo
              width 44px
              height 44px
              margin-left 1px
              border-radius 50%
              text-align center
              background-color #2B333B
              &.hightlight
                background-color #009FDB
              .icon-shopping_cart
                font-size 24px
                line-height 48px
                color #7F8489
                &.hightlight
                  color rgb(255,255,255)
            .num
              position absolute
              top 0
              right 0
              width 24px
              height 16px
              font-size 9px
              padding 0 6px
              box-sizing border-box
              text-align center
              color rgb(255,255,255)
              border-radius 16px
              font-weight bold
              line-height 16px
              background-color rgb(240,20,20)
          .price
            display inline-block
            font-size 16px
            line-height 24px
            color #7F8489
            font-weight bold
            margin-left 12px
            margin-bottom 12px
            padding-right 12px
            box-sizing border-box
            border-right 1px solid rgba(255,255,255,0.1)
            vertical-align middle
          .desc
            display inline-block
            margin-left 12px
            margin-bottom 12px
            font-size 12px
            color rgba(255,255,255,0.4)
            font-weight bold
            line-height 24px
            vertical-align middle
        .cart-right
          flex 0 0 105px
          width 105px
          font-size 12px
          line-height 48px
          margin-left 12px
          font-weight bold
          text-align center
          &.commonBtn
            background-color #2B333B
            color rgba(255,255,255,0.4)
          &.goBuy
            background-color #00b43c
            color rgb(255,255,255)
      .cart-detail
        width 100%
        max-height 304px
        font-size 14px
        position absolute
        top 0px
        left 0px
        z-index -1
        overflow hidden
        transform translate3d(0,-100%,0)
        &.fold-enter,&.fold-leave-active
          transform translate3d(0,0,0)
        &.fold-enter-active,&.fold-leave-active
          transition all .3s linear
        .detail-container
          .cart-title
            width 100%
            height 40px
            padding 0px 18px
            box-sizing border-box
            border-1px(rgba(7,17,27,0.1))
            color rgb(7,17,27)
            line-height 40px
            background-color #f3f5f7
            .clear
              font-size 12px
              color rgb(0,160,220)
              line-height 40px
              position absolute
              right 16px
          .detail-content
            width 100%
            max-height 217px
            overflow hidden
            background-color rgb(255,255,255)
            .detail-list
              display flex
              height 48px
              padding 12px 16px
              box-sizing border-box
              border-1px(rgba(7,17,27,0.1))
              .name
                flex 1
                color rgb(7,17,27)
                line-height 24px
                margin-right 16px
                vertical-align middle
              .price
                color rgb(240,20,20)
                line-height 24px
                font-weight bold
                margin-right 12px
                vertical-align middle
              .counter
                display inline-block
                vertical-align middle
            .lastlist
              height 16px
    .cart-mask
      position fixed
      top 0px
      left 0px
      width 100%
      height 100%
      backdrop-filter blur(10px)
      z-index -10
      opacity 1
      background-color rgba(7,17,27,0.6)
      &.mask-fade-enter-active,&.mask-leave-active
        transition all .5s
      &.mask-fade-enter,&.mask-leave-active
        opacity 0
        background-color rgba(7,17,27,0)
</style>
