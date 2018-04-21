<template>
    <div class="header">
      <!--头部主体内容-->
      <div class="content-wrapper">
        <div class="avatar">
          <img :src="seller.avatar" width="64" height="64"/>
        </div>
        <div class="content">
          <div class="title">
            <span class="brand"></span>
            <span class="name">{{seller.name}}</span>
          </div>
          <div class="description">
            <span>{{seller.description}}/</span>
            <span>{{seller.deliveryTime}}分钟送达</span>
          </div>
          <div class="support" v-if="seller.supports">
            <icon :type="2" :index="seller.supports[0].type"></icon>
            <span class="text">{{seller.supports[0].description}}</span>
          </div>
        </div>
        <div class="more" @click="onShowDetail">
          <span v-if="seller.supports" class="num">{{seller.supports.length}}个</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
      <!--公告栏-->
      <div class="bulletin" @click="onShowDetail">
        <span class="brand"></span>
        <span class="text">{{seller.bulletin}}</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
      <!--模糊背景-->
      <div class="bg-mask">
        <img :src="seller.avatar" width="100%" height="100%">
      </div>
      <!--详情展板-->
      <div class="detail" v-if="isShowDetail">
        <div class="detail-content">
          <div class="name">{{seller.name}}</div>
          <div class="star">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="discount-info">
            <div class="discount-title">
              <div class="line"></div>
              <div class="title">优惠信息</div>
              <div class="line"></div>
            </div>
            <div class="discount-text">
              <div class="text" v-for="item in seller.supports" :key="item.description">
                <icon :type="2" :index="item.type"></icon>
                <span>{{item.description}}</span>
              </div>
            </div>
          </div>
          <div class="detail-bulletin">
            <div class="bulletin-title">
              <div class="line"></div>
              <div class="title">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="text">{{seller.bulletin}}</div>
          </div>
        </div>
        <div class="detail-footer">
          <span class="icon-close" @click="onCloseDetail"></span>
        </div>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star'
  import icon from 'components/icon/icon'
  export default {
    name: 'vheader',
    components: {
      star,
      icon
    },
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        isShowDetail: false
      }
    },
    methods: {
      onShowDetail () {
        this.isShowDetail = true
      },
      onCloseDetail () {
        this.isShowDetail = false
      }
    }

  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixin.styl"

  .header
    position: relative
    overflow: hidden
    font-size: 0
    color: rgb(255,255,255)
    .content-wrapper
      position: relative
      padding: 24px 0px 18px 24px
      background: rgba(7,17,27,0.5)
      .avatar
        display: inline-block
        margin-right: 16px
        vertical-align: top
        img
          border-radius: 2px
      .content
        display: inline-block
        .title
          font-size: 16px
          font-weight: bold
          line-height: 18px
          margin-top: 2px
          margin-bottom: 8px
          .brand
            display: inline-block
            width: 30px
            height: 18px
            margin-right: 6px
            bg-img('img/brand')
            background-size: 30px 18px
            background-repeat: no-repeat
            vertical-align: top
        .description
          margin-bottom: 10px
          font-size: 12px
          font-weight: 100px
          line-height: 12px
        .support
          margin-bottom: 2px
          font-size: 10px
          font-weight: 100px
          line-height: 12px
      .more
        position: absolute;
        right: 12px
        bottom: 18px
        height: 24px;
        padding: 7px 8px
        border-radius: 14px
        background-color: rgba(0,0,0,0.2)
        font-size: 10px
        box-sizing: border-box
        .num
          font-weight: 100px
          line-height: 12px
          margin-right: 2px
    .bulletin
      width: 100%
      height: 28px
      padding: 0px 12px
      box-sizing: border-box
      background-color: rgba(7,17,27,0.2)
      font-size: 10px
      font-weight: 100px
      line-height: 28px
      .brand
        display: inline-block
        width: 22px
        height: 12px
        margin-top: 7px
        margin-right: 4px
        bg-img('img/bulletin')
        -webkit-background-size: 22px 12px
        background-size: 22px 12px
        background-repeat: no-repeat
        vertical-align: top
      .text
        display: inline-block
        width: 85%
        margin-right: 8px
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
        vertical-align: top
    .bg-mask
      position: absolute
      top: 0px
      left: 0px
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(10px)
    .detail
      display: flex
      position: fixed
      top: 0px
      left: 0px
      flex-flow: column
      width: 100%;
      min-height: 100%
      overflow: auto
      z-index: 100
      background-color: rgba(7,17,27,0.8)
      //filter: blur(10px)
      .detail-content
        flex: 1
        .name
          margin-top: 64px
          margin-bottom: 16px
          font-size: 16px
          font-weight: 700px
          line-height: 16px
          text-align: center
        .star
          width: 100%
          height: 24px
          margin-bottom: 28px
          text-align:center
        .discount-info
          font-size: 12px
          line-height: 12px
          .discount-title
            display: flex
            width: 80%
            margin: 0px auto 24px auto
            text-align: center
            line-height: 24px
            .title
              font-size: 14px
              font-weight: bold
              padding: 0px 12px
            .line
              flex:1
              position: relative
              top: 12px
              height: 1px
              background-color: rgba(255,255,255,0.2)
          .discount-text
            width: 80%
            margin auto
            .text
              margin-left: 12px
              margin-bottom: 12px
              span
                &:first-child
                  display: inline-block
                  width: 16px
                  height: 16px
                  background-size: 16px 16px
                  background-repeat: no-repeat
                  vertical-align: middle
                  margin-right: 6px
        .detail-bulletin
          margin-top: 28px
          font-size: 12px
          line-height: 24px
          .bulletin-title
            display: flex
            width: 80%
            margin: 0px auto 24px auto
            text-align: center
            .title
              font-size: 14px
              font-weight: bold
              padding: 0px 12px
            .line
              flex:1
              position: relative
              top: 12px
              height: 1px
              background-color: rgba(255,255,255,0.2)
          .text
            margin-top: 24px
            margin-left: 48px
            margin-right: 48px
      .detail-footer
        flex: 0
        margin-bottom: 32px
        .icon-close
          display:block
          text-align: center
          font-size: 32px
          color: rgba(255,255,255,0.5)
</style>
