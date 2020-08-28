<template>
  <div class="dui-page" ref="wrapper">
    <div v-if="hasNavbar" class="dui-nav-bar placeholder bg-red">
      <div class="dui-nav-bar--fixed dui-nav-bar__content">
        <div class="dui-nav-bar__title">{{$route.meta.title}}</div>
        <div class="dui-icon__back" @click="$router.back()"></div>
      </div>
    </div>
    <refresh @refresh="onRefresh">
      <ul class="dui-list">
        <li class="dui-item" v-for="n in listCount" :key="n">页面内容{{ n }}</li>
      </ul>
      <load-more ref="loadMore" @load-more="onLoadMore"></load-more>
    </refresh>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listCount: 20,
    }
  },
  methods: {
    onRefresh(finished) {
      setTimeout(() => {
        this.listCount = 20
        finished(true)
        this.$refs.loadMore.refresh()
      }, 2000)
    },
    onLoadMore(finished) {
      setTimeout(() => {
        this.listCount += 20
        finished(this.listCount > 50)
      }, 2000)
    },
  },
}
</script>
