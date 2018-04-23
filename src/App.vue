<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item"><router-link to="/goods">商品</router-link></div>
      <div class="tab-item"><router-link to="/ratings">评价</router-link></div>
      <div class="tab-item"><router-link to="/seller">商家</router-link></div>
    </div>
    <div class="content">
      <keep-alive>
        <router-view :seller="seller"></router-view>
      </keep-alive>
    </div>
    <shopping-cart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopping-cart>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from 'components/header/header'
  import shoppingCart from 'components/shoppingCart/shoppingcart'
  export default {
    name: 'App',
    components: {
      'v-header': Header,
      shoppingCart
    },
    data () {
      return {
        seller: {}
      }
    },
    created () {
      this.$http.commonApi('/api/seller').then((res) => {
        this.seller = res
      }).catch((error) => {
        console.log(error)
      })
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin"
  #app
    .tab
      display flex
      width 100%
      height 40px
      line-height 40px
      border-1px(rgba(7,17,27,0.1))
      .tab-item
        flex 1
        text-align center
        &> a
          display: block
          color: rgb(77,85,93)
          font-size: 14px
          &.active
            color: rgb(240,20,20)
</style>
