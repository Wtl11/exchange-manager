<template>

  <div class="base-input"
       :class="[{'base-input--after':clear&& !disabled || $slots.after,'is-disabled':disabled},size ? 'zb-input--' + size : '',radius?'zb-input--radius-'+radius:'']"
       :style="{width:width && width + 'px',height:height && height + 'px' || type==='textarea' && textareaHeight + 'px'}"
  >
    <slot name="after">
      <span v-if="isShowClear" class="clear-wrap" @click="clearBtn">
        <i class="clear-icon"></i>
      </span>
    </slot>
    <textarea v-if="type==='textarea'"
              :value="value"
              :style="inputStyle"
              :maxlength="maxlength || limit"
              :placeholder="placeholder"
              :readonly="readonly || disabled"
              :disabled="disabled"
              class="zb-textarea input__inner"
              @focus="focusHandler"
              @blur="blurHandler"
              @input="inputEvent"
              @keydown="keydown"
              @change="changeHandler"
    ></textarea>
    <!--v-int="isInt"-->
    <input v-else
           :value="value"
           :style="inputStyle"
           :placeholder="placeholder"
           :type="type"
           :readonly="readonly || disabled"
           :maxlength="maxlength || limit"
           :disabled="disabled"
           class="zb-input input__inner"
           @focus="focusHandler"
           @blur="blurHandler"
           @input="inputEvent"
           @keydown="keydown"
           @change="changeHandler"
    >
    <span v-if="limit" class="base-input__count" :class="{'input-count__center': type === 'text'}">{{value.length}}/{{limit}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'BASE_INPUT'

  export default {
    name: COMPONENT_NAME,
    // directives:{
    //   int:{
    //     inserted(el,binding){
    //       if(!binding.value){
    //         return
    //       }
    //       const input = el
    //       input.onkeyup=function (e) {
    //         input.value=parseInt(input.value)
    //       }
    //     }
    //   }
    // },
    props: {
      hand: {
        default: false,
        type: Boolean
      },
      value: {
        default: '',
        type: [String, Boolean, Number]
      },
      limit: {
        type: [Number, String],
        default: null
      },
      clear: {
        default: false,
        type: [Boolean, String]
      },
      type: {
        default: 'text',
        type: String
      },
      disabled: {
        default: false,
        type: [Boolean, Number, String]
      },
      placeholder: {
        default: '',
        type: String
      },
      maxlength: {
        default: null,
        type: Number
      },
      readonly: {
        default: false,
        type: [String, Boolean]
      },
      inputStyle: {
        default: () => {
        },
        type: [Object, String]
      },
      radius: {
        type: [Number, String],
        default: null
      },
      size: {
        default: 'middle', // big middle small mini
        type: String
      },
      width: {
        default: '',
        type: [String, Number]
      },
      height: {
        default: '',
        type: [String, Number]
      },
      textareaHeight: {
        default: 94,
        type: [String, Number]
      },
      handIcon: {
        default: '',
        type: String
      },
      isInt: {
        default: false,
        type: Boolean
      }
    },

    data() {
      return {
        isFocus: false
      }
    },
    computed: {
      isShowClear() {
        return this.isFocus && this.clear && this.value !== '' && !this.disabled
      },
      style() {
        return {
          width: this.width && this.width + 'px',
          height: this.height && this.height + 'px'
        }
      }
    },
    mounted() {
    },
    methods: {
      focusHandler() {
        this.isFocus = true
      },
      blurHandler() {
        setTimeout(() => {
          this.isFocus = false
        }, 1000)
      },
      clearBtn() {
        this.$emit('input', '')
      },
      inputEvent(e) {
        let value = e.target.value
        if(this.isInt)  value=parseInt(value)
        this.$emit('input', value)
      },
      changeHandler(e){
        let value = e.target.value
        this.$emit('change', value)
      },
      keydown(e) {
        this.$emit('keydown', e)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~@design"
  .base-input
    display: inline-block
    position: relative

    &.zb-input--big
      height: 60px
      width: 360px

    &.zb-input--middle
      height: 44px
      width: 400px

    .clear-wrap
      padding-top: 10px
      padding-bottom: 10px

    &.zb-input--small
      height: 40px
      width: 164px

    .clear-wrap
      padding-top: 12px
      padding-bottom: 12px

    &.zb-input--mini
      height: 34px
      width: 96px

      .clear-wrap
        padding-top: 8px
        padding-bottom: 8px

      .clear-wrap
        padding-top: 23px
        padding-bottom: 23px

    .input__inner
      width: 100%
      height: 100%
      border-radius: 4px
      border: 0.5px solid $color-line
      color: $color-text-main
      font-size: $font-size-14
      font-family: $font-family-regular
      padding-right: 14px
      padding-left: 14px
      box-sizing: border-box

      &:hover
        border: 0.5px solid $color-border-hover

      &:focus
        border: 0.5px solid $color-main

    &.zb-input--radius-4 .input__inner
      border-radius: 4px

    &.zb-input--radius-2 .input__inner
      border-radius: 2px

    &.base-input--after
      .input__inner
        padding-right: 30px

      .clear-wrap
        display: inline-block
        position: absolute
        top: 50%
        right: 0px
        padding-right: 10px
        padding-left: 7px
        transform: translateY(-50%)

      .clear-icon
        width: 13px
        height: @width
        icon-image('icon-delet')
        cursor: pointer

        &:hover
          icon-image('icon-delet_hover')

    &.is-disabled .input__inner
      background: #f9f9f9
      color: $color-text-assist
      cursor: not-allowed

    .base-input__count
      font-size: $font-size-12
      color: #C9CCDA
      letter-spacing: 0.5px
      position: absolute
      bottom: 10px
      right: 10px

    .input-count__center
      col-center()

  .zb-textarea
    padding: 14px
    resize: none

  input::-webkit-input-placeholder
  textarea::-webkit-input-placeholder
    font-family: $font-family-regular
    color: $color-text-sub

  input:disabled
  textarea:disabled
    background: #f9f9f9
    font-family: $font-family-regular
    color: $color-text-assist
    cursor: not-allowed


</style>
