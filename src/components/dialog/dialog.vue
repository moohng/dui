<template>
  <div class="dui-dialog" :class="{ toggle: show }">
    <div class="mask" @click="onMask"></div>
    <div class="dui-dialog__body">
      <slot>
        <div class="dui-dialog__hd padding-lr-lg padding-top-xl padding-bottom" v-if="title">
          <strong>{{ title }}</strong>
        </div>
        <div
          class="dui-dialog__content padding-lr-lg margin-bottom-xl text-grey"
          v-if="content"
        >{{ content }}</div>
        <div class="dui-dialog__ft flex solid-top" v-if="buttons.length">
          <a
            class="flex-sub padding text-bold"
            v-for="(button, index) in buttons"
            :key="index"
            :class="[index > 0 ? 'solid-left' : ''].concat(button.class || [])"
            @click="onClick(button, index)"
          >{{ button.text || button }}</a>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import modalHelper from '../../tools/modalHelper';

export default {
  name: 'dui-dialog',
  props: {
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    buttons: {
      type: Array,
      default: () => [
        {
          text: '确定',
          class: '',
        },
      ],
    },
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    open() {
      this.show = true;
      modalHelper.afterOpen();
    },
    close() {
      modalHelper.beforeClose();
      this.$emit('close');
      this.show = false;
    },
    async onClick(button, index, e) {
      if (typeof button.onClick === 'function') {
        await button.onClick(e);
        this.close();
      } else if (typeof this.click === 'function') {
        await this.click(index, e);
        this.close();
      } else {
        this.close();
      }
    },
    async onMask(e) {
      if (typeof this.click === 'function') {
        this.click('mask', e);
      } else {
        this.$emit('mask');
      }
    },
  },
};
</script>
