<template>
    <div class="goods-view">
      <!--左侧菜单栏-->
      <div class="goods-wrapper" ref="goodsMenu">
        <ul>
          <li class="goods-list border-1px" v-for="(item,index) in goods" :key="item.name" :class="{'current':currentIndex === index}"
          @click="selectGoods(index,$event)">
            <span class="goods-item">
              <icon v-show="item.type>0" :type="3" :index="item.type"></icon>
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <!--右侧食物栏-->
      <div class="foods-wrapper" ref="foodsMenu">
        <div>
          <div class="foods-container foods-list-hook" v-for="item in goods" :key="item.name">
            <div class="foods-header">
            <span></span>
            <span class="text">{{item.name}}</span>
          </div>
            <div class="foods-content border-1px" v-for="food in item.foods" :key="food.name">
            <img class="food-img" :src="food.icon" width="57" height="57">
            <div class="food-info">
              <h2 class="food-name">{{food.name}}</h2>
              <p class="food-description" v-show="food.description">{{food.description}}</p>
              <p class="food-sale"><span>月售{{food.sellCount}}份</span><span>好评率{{food.rating}}%</span></p>
              <span class="price">￥{{food.price}}</span>
              <span class="old-price" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
            </div>
            <div class="counter">
              <cart-count :food="food"></cart-count>
            </div>
          </div>
          </div>
        </div>
      </div>
      <shopping-cart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopping-cart>
    </div>
</template>
<script type="text/ecmascript-6">
  import icon from 'components/icon/icon'
  import BScroll from 'better-scroll'
  import shoppingCart from 'components/shoppingCart/shoppingCart'
  import cartCount from 'components/cartCount/cartCount'

  import {mapGetters} from 'vuex'
  export default {
    name: 'goods',
    components: {
      icon,
      shoppingCart,
      cartCount
    },
    props: {
      seller: {
        type: Object
      }
    },
    created () {
      this.$store.dispatch('getAllGoods')
      this.$nextTick(() => {
        this._initScroll()
        this._calculateHeight()
      })
    },
    data () {
      return {
        listHeight: [],
        scrollY: 0
      }
    },
    methods: {
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs.goodsMenu, {
          click: true
        })
        this.foodsScroll = new BScroll(this.$refs.foodsMenu, {
          probeType: 3,
          click: true
        })
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
          // console.log(this.scrollY)
        })
      },
      _calculateHeight () {
        let height = 0
        this.listHeight.push(height)
        let foodsList = this.$refs.foodsMenu.getElementsByClassName('foods-list-hook')
        for (let i = 0; i < foodsList.length; i++) {
          height += foodsList[i].clientHeight
          this.listHeight.push(height)
        }
        console.log(this.listHeight)
      },
      selectGoods (index, e) {
        if (!e._constructed) {
          return
        }
        // console.log(index)
        let foodsList = this.$refs.foodsMenu.getElementsByClassName('foods-list-hook')
        let el = foodsList[index + 1]
        this.foodsScroll.scrollToElement(el, 300)
      }
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
      },
      ...mapGetters({
        goods: 'goodsList'
      })
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  .goods-view
    position absolute
    top 178px
    bottom 44px
    display: flex
    width 100%
    overflow hidden
    font-size 0px
    .goods-wrapper
      flex 0 0 80px
      width 80px
      .goods-list
        display table
        width 100%
        height 54px
        padding 0 12px
        box-sizing border-box
        border-1px(rgba(7,17,27,0.1))
        background-color #f3f5f7
        &.current
          background-color #ffffff
          border none
        .goods-item
          display table-cell
          vertical-align middle
          font-size 12px
          color rgb(157,153,159)
          line-height 14px
    .foods-wrapper
      flex 1
      width 100%
      overflow hidden
      .foods-container
        width 100%
        position relative
        .foods-header
          height 26px
          background-color #f3f5f7
          span
            display inline-block
            &:first-child
              width 2px
              height 26px
              margin-right 14px
              background-color #d9dde1
            &.text
              font-size 12px
              line-height 26px
              color rgb(147,153,169)
              vertical-align top
        .foods-content
          width 100%
          padding 18px
          box-sizing border-box
          border-1px(rgba(7,17,27,0.1))
          font-size 10px
          color rgb(147,153,159)
          line-height 10px
          .food-info
            display inline-block
            width calc(100% - 93px)
            margin-left 10px
            vertical-align top
            .food-name
              margin-top 2px
              font-size 14px
              color rgb(7,17,27)
              line-height 14px
            .food-description
              margin-top 8px
              line-height 12px
            .food-sale
              margin-top 8px
              span
                margin-right 12px
            .price
              font-size 14px
              color rgb(240,20,20)
              font-weight bold
              line-height 24px
            .old-price
              color rgb(147,153,159)
              font-weight bold
              line-height 24px
              text-decoration line-through
              vertical-align top
          .counter
            display inline-block
            position absolute
            bottom 18px
            right 18px
</style>
