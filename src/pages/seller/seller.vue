<template>
    <div class="seller-view" ref="sellerList">
      <div>
        <div class="seller-about border-1px">
          <div class="about-text">
            <h1 class="name">{{seller.name}}</h1>
            <div class="score">
              <star class="star" :size="36" :score="seller.score"></star>
              <span>({{seller.ratingCount}})</span>
              <span>月售{{seller.sellCount}}单</span>
            </div>
          </div>
          <div class="about-tip border-1px">
            <div class="tip">
              起送价
              <p><span>{{seller.minPrice}}</span>元</p>
            </div>
            <div class="tip">
              商家配送
              <p><span>{{seller.deliveryPrice}}</span>元</p>
            </div>
            <div class="tip">
              平均配送时间
              <p><span>{{seller.deliveryTime}}</span>分钟</p>
            </div>
          </div>
        </div>
        <div class="seller-activity">
          <div class="act-content border-1px">
            <h1 class="act-title">公告与活动</h1>
            <div class="act-info">{{seller.bulletin}}</div>
          </div>
          <div class="act-tip border-1px" v-for="item in seller.supports" :key="item.description">
            <icon class="icon" :type="2" :index="item.type"></icon>
            <span>{{item.description}}</span>
          </div>
        </div>
        <div class="seller-picshow">
          <h1 class="pic-title">商家实景</h1>
          <div class="pic-gallery" ref="galleryList">
            <ul class="pic-list" ref="picsList">
              <li class="pic-item" v-for="img in seller.pics">
                <img :src="img" width="120px" height="90px">
              </li>
            </ul>
          </div>
        </div>
        <div class="seller-info">
          <h1 class="info-title border-1px">商家信息</h1>
          <div class="info-text border-1px" v-for="info in seller.infos">{{info}}</div>
        </div>
        <star></star>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star'
  import icon from 'components/icon/icon'
  import BScroll from 'better-scroll'
  export default {
    name: 'seller',
    components: {
      star,
      icon
    },
    props: {
      seller: {
        type: Object
      }
    },
    mounted () {
      this._initScroll()
      this._initPics()
    },
    watch: {
      seller () {
        this._initPics()
      }
    },
    methods: {
      _initPics () {
        if (this.seller.pics) {
          let pic = 120
          let margin = 6
          let picsWidth = (pic + margin) * this.seller.pics.length - margin
          this.$refs.picsList.style.width = picsWidth + 'px'
          this.$nextTick(() => {
            this.galleryScroll = new BScroll(this.$refs.galleryList,{
              scrollX: true,
              eventPassthrough: 'vertical'
            })
          })
        }
      },
      _initScroll () {
        this.sellerScroll = new BScroll(this.$refs.sellerList,{
          click: true
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixin.styl"
  .seller-view
    position absolute
    top 178px
    bottom 44px
    width 100%
    overflow hidden
    background-color #F2F4F6
    .seller-about
      padding 0px 16px
      border-1px-bottom(rgba(7,17,27,0.1))
      color rgb(7,17,27)
      background-color rgb(255,255,255)
      .about-text
        padding 16px 0px
        border-1px-bottom(rgba(7,17,27,0.1))
        .name
          font-size 14px
          line-height 14px
          margin-bottom 8px
        .score
          font-size 0px
          .star
            display inline-block
            vertical-align middle
          span
            display inline-block
            margin-left 8px
            font-size 10px
            color rgb(77,85,93)
            line-height 36px
            vertical-align middle
          span
            &:first-child
              margin-right 12px
      .about-tip
        display flex
        padding 16px 0px
        font-size 0px
        .tip
          flex 1
          font-size 10px
          color rgb(147,153,159)
          line-height 10px
          text-align center
          border-right 1px solid rgba(7,17,27,0.1)
          p
            color rgb(7,17,27)
          span
            font-size 24px
            color rgb(7,17,27)
            line-height 24px
        .tip
          &:last-child
            border-right none
    .seller-activity
      margin-top 16px
      padding 0px 18px
      background-color rgb(255,255,255)
      .act-content
        padding 18px 0px
        border-1px-bottom(rgba(7,17,27,0.1))
        .act-title
          font-size 14px
          color rgb(7,17,27)
          line-height 14px
        .act-info
          margin 0px 12px
          font-size 12px
          color rgb(240,20,20)
          line-height 24px

      .act-tip
        padding 16px 0px
        font-size 12px
        color rgb(7,17,27)
        line-height 16px
        border-1px-bottom(rgba(7,17,27,0.1))
        .icon
          margin 0px 12px
    .seller-picshow
      margin-top 16px
      padding 18px
      color rgb(7,17,27)
      border-top 1px solid rgba(7,17,27,0.1)
      border-bottom 1px solid rgba(7,17,27,0.1)
      background-color rgb(255,255,255)
      .pic-title
        font-size 14px
        line-height 28px
      .pic-gallery
        width 100%
        margin-top 12px
        overflow hidden
        white-space nowrap
        .pic-list
          font-size 0px
          .pic-item
            display inline-block
            width 120px
            height 90px
            margin-right 6px
            &:last-child
              margin 0px
    .seller-info
      margin-top 16px
      padding 18px 18px 0px
      color rgb(7,17,27)
      background-color rgb(255,255,255)
      .info-title
        font-size 14px
        line-height 28px
        border-1px-bottom(rgba(7,17,27,0.1))
      .info-text
        padding 16px 12px
        font-size 12px
        line-height 16px
        border-1px-bottom(rgba(7,17,27,0.1))
</style>
