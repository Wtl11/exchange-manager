<template>
  <footer :class="{'footer-wrap': isSeize}" class="base-footer">
    <div :style="footerStyle" class="footer">
      <div class="footer-content">
        <slot></slot>
      </div>
    </div>
  </footer>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'BASE_BUTTON'

  export default {
    name: COMPONENT_NAME,
    props: {
      addIcon: {
        type: [Boolean, String],
        default: false
      },
      size: {
        type: String,
        default: 'middle' // small middle big
      },
      footerStyle: {
        type: String,
        default: '' // small middle big
      },
      isSeize: {
        type: Boolean,
        default: true
      },
      right:{
        type: String,
        default: ''
      }
    },
    data() {
      return {}
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~@design"
  $min-width = 1240px
  .footer-wrap
    width: 100%
    height: 60px

  .footer
    border-top-1px($color-line)
    position: fixed
    bottom: 0px
    right: 20px
    left 220px
    padding-bottom:20px
    z-index: 20
    background-color $color-background
    .footer-content
      height: 60px
      background-color: #F7FDFF
      display: flex
      justify-content: center
      align-items: center

      & > .btn-box
        margin-right: 10px
        &:last-child
          margin-right 0

  /*出现滚动条时展示滚动条*/
  @media screen and (max-width: $min-width) {
    .footer {
      bottom: 24px
      right: 24px
    }
  }
</style>
