<template>
  <div class="dui-page">
    <div v-if="hasNavbar" class="dui-nav-bar placeholder bg-red">
      <div class="dui-nav-bar--fixed dui-nav-bar__content">
        <div class="dui-nav-bar__title">{{$route.meta.title}}</div>
        <div class="iconfont icon-arrow-left" @click="$router.back()"></div>
      </div>
    </div>
    <div class="dui-list bg-white plr">
      <div class="dui-item" @click="onDialogClick">
        快捷调用<small class="ml-sm text-grey">this.$dialog</small>
      </div>
      <div class="dui-item" @click="onDialogClick2">
        快捷调用2<small class="ml-sm text-grey">this.$dialog</small>
      </div>
      <div class="dui-item" @click="$refs.bgDialog.open()">背景图弹窗</div>
      <div class="dui-item" @click="$refs.imgDialog.open()">图片弹窗</div>
    </div>
    <!-- 背景弹窗 -->
    <dui-dialog ref="bgDialog" closable>
      <div class="bg-dialog__wrapper bg-img cover" v-src="'https://images.quarkblockchain.cn/images/user/bj.png'"></div>
    </dui-dialog>
    <dui-dialog ref="imgDialog" closable>
      <img v-src="'https://images.quarkblockchain.cn/images/user/bj.png'" />
    </dui-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    onDialogClick () {
      this.$dialog({
        title: '弹窗标题',
        content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行之内',
        buttons: [
          { text: '取消', class: '' },
          { text: '确定', class: 'text-red', onClick: () => { alert('确定吗？') } },
        ],
      }).then((index) => {
        console.log('您点击了：', index)
      })
    },
    onDialogClick2 () {
      this.$dialog({
        title: '弹窗标题2',
        content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行之内'.split('').reverse().join(''),
        buttons: [
          { text: '取消', class: 'text-red' },
          { text: '确定', class: 'text-blue' },
        ],
        closable: true,
      }).then((index) => {
        console.log('您点击了：', index)
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.bg-dialog__wrapper {
  width: 300px;
  height: 320px;
  border-radius: 10px;
}
</style>
