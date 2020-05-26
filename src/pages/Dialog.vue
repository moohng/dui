<template>
  <div>
    <div class="dui-nav-bar bg-red">
      <div class="dui-nav-bar--fixed dui-nav-bar__content">
        <div class="dui-nav-bar__title">Dialog</div>
        <div>返回</div>
      </div>
    </div>
    <div class="dui-list indent">
      <div class="dui-item" @click="onDialogClick">
        快捷调用<small class="margin-left-sm text-grey">this.$dialog</small>
      </div>
      <div class="dui-item" @click="$refs.bgDialog.open()">背景图弹窗</div>
      <div class="dui-item" @click="$refs.imgDialog.open()">图片弹窗</div>
    </div>
    <!-- 背景弹窗 -->
    <dui-dialog ref="bgDialog" @mask="$refs.bgDialog.close()">
      <div class="bg-dialog__wrapper bg-img cover" v-src="'https://images.quarkblockchain.cn/images/user/bj.png'"></div>
    </dui-dialog>
    <dui-dialog ref="imgDialog" @mask="$refs.imgDialog.close()">
      <img v-src="'https://images.quarkblockchain.cn/images/user/bj.png'" />
    </dui-dialog>
  </div>
</template>

<script>
export default {
  methods: {
    onDialogClick() {
      this.$dialog({
        title: '弹窗标题',
        content: '弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行之内',
        buttons: [
          { text: '取消', class: '' },
          { text: '确定', class: 'text-red' },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.bg-dialog__wrapper {
  width: 300px;
  height: 320px;
  border-radius: 10px;
}
</style>
