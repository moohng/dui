<template>
  <div class="dui-page">
    <div v-if="hasNavbar" class="dui-nav-bar placeholder bg-red">
      <div class="dui-nav-bar--fixed dui-nav-bar__content">
        <div class="dui-nav-bar__title">{{$route.meta.title}}</div>
        <div class="iconfont icon-arrow-left" @click="$router.back()"></div>
      </div>
    </div>
    <div class="container">
      <dui-refresh scroller=".container" @refresh="onRefresh">
        <ul class="dui-list bg-white">
          <li class="dui-item mlr" v-for="n in listCount" :key="n">页面内容{{ n }}</li>
        </ul>
        <load ref="loadMore" @load="onLoadMore"></load>
      </dui-refresh>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// eslint-disable-next-line no-unused-vars
import { RefreshEventCallBack } from '@/components/refresh'
// eslint-disable-next-line no-unused-vars
import { LoadMoreEventCallBack } from '@/components/load-more'

export default defineComponent({
  data () {
    return {
      listCount: 20,
    }
  },
  mounted () {
    (this.$refs.loadMore as any).finished()
  },
  methods: {
    onRefresh (finished: RefreshEventCallBack) {
      setTimeout(() => {
        this.listCount = 20
        finished(true);
        (this.$refs.loadMore as any).refresh()
      }, 2000)
    },
    onLoadMore (finished: LoadMoreEventCallBack) {
      setTimeout(() => {
        this.listCount += 20
        finished(this.listCount > 50)
      }, 2000)
    },
  },
})
</script>

<style lang="scss" scoped>
.container {
  margin-top: 60px;
  height: 60vh;
  background: #ccc;
  overflow: auto;
}
ul {
  margin: 0;
  padding: 0;
}
li {
  padding: 0;
}
</style>
