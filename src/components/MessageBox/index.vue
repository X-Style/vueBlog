<template>
<div class="message-box" v-show="isShowMessageBox">
  <div class="mask" @click="cancel"></div>
  
  <div class="message-content">
    <svg class="icon" aria-hidden="true" @click="cancel" width="12" height="12" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 4.586l4.24-4.24c.395-.395 1.026-.392 1.416-.002.393.393.39 1.024 0 1.415L7.413 6l4.24 4.24c.395.395.392 1.026.002 1.416-.393.393-1.024.39-1.415 0L6 7.413l-4.24 4.24c-.395.395-1.026.392-1.416.002-.393-.393-.39-1.024 0-1.415L4.587 6 .347 1.76C-.05 1.364-.048.733.342.343c.393-.393 1.024-.39 1.415 0L6 4.587z" fill-rule="evenodd"></path>
    </svg>

    <h3 class="title">{{ title }}</h3>
    <div class="rewards-popover-item">
      <h4>支付宝扫一扫打赏</h4>
      <img src="/static/img/alipay-qrcode.png">
    </div>
    <div class="rewards-popover-item">
      <h4>微信扫一扫打赏</h4>
      <img src="/static/img/wx-qrcode.png">
    </div>

    <!-- <div>
     <input type="text" v-model="inputValue" v-if="isShowInput" ref="input">
    </div> -->
    
    <!-- <div class="btn-group">
      <button class="btn-default" @click="cancel" v-show="isShowCancelBtn">{{ cancelBtnText }}</button>
      <button class="btn-primary btn-confirm" @click="confirm" v-show="isShowConfimrBtn">{{ confirmBtnText }}</button>
    </div> -->
  </div>
</div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '标题'
    },
    content: {
      type: String,
      default: '这是弹框内容'
    },
    isShowInput: false,
    inputValue: '',
    isShowCancelBtn: {
      type: Boolean,
      default: true
    },
    isShowConfimrBtn: {
      type: Boolean,
      default: true
    },
    cancelBtnText: {
      type: String,
      default: '取消'
    },
    confirmBtnText: {
      type: String,
      default: '确定'
    }
  },
  data () {
    return {
      isShowMessageBox: false,
      resolve: '',
      reject: '',
      promise: '' // 保存promise对象
    }
  },
  methods: {
    // 确定,将promise断定为resolve状态
    confirm: function () {
      this.isShowMessageBox = false
      if (this.isShowInput) {
        this.resolve(this.inputValue)
      } else {
        this.resolve('confirm')
      }
      this.remove()
    },
    // 取消,将promise断定为reject状态
    cancel: function () {
      this.isShowMessageBox = false
      this.reject('cancel')
      this.remove()
    },
    // 弹出messageBox,并创建promise对象
    showMsgBox: function () {
      this.isShowMessageBox = true
      this.promise = new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
      // 返回promise对象
      return this.promise
    },
    remove: function () {
      setTimeout(() => {
        this.destroy()
      }, 300)
    },
    destroy: function () {
      this.$destroy()
      document.body.removeChild(this.$el)
    }
  }
}
</script>

