<template>
  <div class="dui-actionsheet" :class="{ toggle: show }">
    <div class="mask" @click="close()"></div>
    <div class="dui-actionsheet__body">
      <slot>
        <div class="dui-item" v-if="title">
          <p class="flex-sub text-sm text-gray text-center">{{ title }}</p>
        </div>
        <div class="dui-list" v-if="menus.length">
          <div
            class="dui-item justify-center text-lg"
            v-for="(menu, index) in menus" :key="menu.id || menu.key || index"
            :class="[].concat(menu.class || [])"
            @click="onClick(index, menu)"
          >
            {{ menu.name || menu }}
          </div>
        </div>
        <div class="dui-list" v-if="cancel">
          <div
            class="dui-item justify-center text-lg"
            :class="[].concat(cancelClass || [])"
            @click="close()"
          >{{ cancel }}</div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import modalHelper from '../../tools/modalHelper';

export default {
  name: 'dui-actionsheet',
  props: {
    title: {
      type: String,
      default: '',
    },
    menus: {
      type: Array,
      default: () => [],
    },
    cancel: {
      type: [String, Boolean],
      default: '取消',
    },
    cancelClass: {
      type: [Array, String],
      default: '',
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
    async onClick(index, menu, e) {
      if (typeof menu.onClick === 'function') {
        await menu.onClick(e);
        this.close();
      } else if (typeof this.click === 'function') {
        await this.click(index, menu, e);
        this.close();
      } else {
        this.close();
      }
    },
  },
};
</script>
