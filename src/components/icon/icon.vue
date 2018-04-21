<template>
  <div class="icon-view" :class="iconType">
    <span class="icon" :class="classMap[index]"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'icon',
    props: {
      index: {
        type: Number
      },
      type: {
        type: Number
      }
    },
    data () {
      return {
        classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      }
    },
    computed: {
      iconType () {
        return 'icon_' + this.type
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  .icon_2
    display inline-block
    .icon
      display: inline-block
      width: 16px
      height: 16px
      background-size: 16px 16px
      background-repeat no-repeat
      vertical-align: middle
      &.decrease
        bg-img('img/decrease_2')
      &.discount
        bg-img('img/discount_2')
      &.guarantee
        bg-img('img/guarantee_2')
      &.invoice
        bg-img('img/invoice_2')
      &.special
        bg-img('img/special_2')
  .icon_3
    display: inline-block
    .icon
      display: inline-block
      width: 12px
      height: 12px
      background-size: 12px 12px
      background-repeat no-repeat
      vertical-align: middle
      &.decrease
        bg-img('img/decrease_3')
      &.discount
        bg-img('img/discount_3')
      &.guarantee
        bg-img('img/guarantee_3')
      &.invoice
        bg-img('img/invoice_3')
      &.special
        bg-img('img/special_3')
  .icon_4
    display: inline-block
    .icon
      display: inline-block
      width: 16px
      height: 16px
      -webkit-background-size: 16px 16px
      background-size: 16px 16px
      background-repeat no-repeat
      vertical-align: middle
      &.decrease
        bg-img('img/decrease_4')
      &.discount
        bg-img('img/discount_4')
      &.guarantee
        bg-img('img/guarantee_4')
      &.invoice
        bg-img('img/invoice_4')
      &.special
        bg-img('img/special_4')
</style>
