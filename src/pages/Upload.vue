<template>
  <div class="dui-page bg-white">
    <div v-if="hasNavbar" class="dui-nav-bar placeholder bg-red">
      <div class="dui-nav-bar--fixed dui-nav-bar__content">
        <div class="dui-nav-bar__title">{{$route.meta.title}}</div>
        <div class="dui-icon__back" @click="$router.back()"></div>
      </div>
    </div>
    <!-- 文件路径 -->
    <div class="search-bar" :class="{'has-navbar': hasNavbar}">
      <div class="search-bar__inner flex align-center fixed plr bg-white">
        <input class="round plr-sm flex-sub margin-right" v-model="prefixText" type="text" placeholder="请输入文件路径">
        <button class="dui-button round bg-red sm" @click="onSearch">搜索</button>
      </div>
    </div>
    <refresh @refresh="onRefresh">
      <!-- 顶部提示 -->
      <div v-show="showTip" class="plr-sm ptb-xs bg-yellow flex align-center">
        <span class="flex-sub">访问失败请重新加载页面</span>
        <i class="dui-icon__close" @click="showTip = false"></i>
      </div>
      <!-- 文件列表 -->
      <div v-if="imgPaths.length > 0" class="grid">
        <div class="col-3 square xxs bg-img cover" v-for="(img, index) in imgPaths" :key="img" v-src="img" @click="onPreview(imgPaths, index)">
          <div class="img-text text-xs">{{img.split('.com/')[1]}}</div>
        </div>
      </div>
      <load-more ref="loadMore" @load-more="onLoadMore"></load-more>
    </refresh>
    <!-- 上传按钮 -->
    <div class="flat-button round bg-red upload-icon">
      <input type="file" name="file" @change="onUpload">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import OSS from 'ali-oss'
import md5 from 'md5'
import copy from '@moohng/dan/lib/copy'
// eslint-disable-next-line no-unused-vars
import { RefreshEventCallBack } from '@/components/refresh'

let ossClient: any

export default defineComponent({
  name: 'Upload',
  data () {
    return {
      showTip: false,
      pulldownText: '下拉刷新',

      prefixText: '',
      imgPaths: [],
      nextMarker: '',
      nextStatus: '',
    }
  },
  mounted () {
    this.auth().then(() => {
      this.getList('')
    })
  },
  methods: {
    onRefresh (finished: RefreshEventCallBack) {
      this.getList('').then(() => {
        finished(true);
        (this.$refs.loadMore as any).refresh()
      }).catch(() => {
        finished(false)
      })
    },
    onLoadMore () {
      this.getList()
    },
    onPreview (imgPaths: string[], index: number) {
      try {
        window.WeixinJSBridge.invoke('imagePreview', {
          urls: imgPaths,
          current: imgPaths[index],
        })
      } catch {
        this.$preview(imgPaths, index)
      }
      copy(imgPaths[index])
    },
    auth () {
      const hide = this.$loading('授权中...')
      return this.$get('https://api.miu.moohng.com/sts').then((res: any) => {
        ossClient = new OSS({
          accessKeyId: res.AccessKeyId,
          accessKeySecret: res.AccessKeySecret,
          stsToken: res.SecurityToken,
          // endpoint: 'http://oss.miu.moohng.com',
          // cname: true,
          region: 'oss-cn-hongkong',
          bucket: 'miu-yuntu',
          secure: true,
        })
      }).catch(() => {
        this.$toast('授权失败，请稍后再试')
      }).finally(hide)
    },
    async onUpload (e: any) {
      try {
        const file = e.target.files[0]
        console.log(file.name)
        let [name, ext] = file.name.split('.')
        name = this.prefixText + md5(name + '?' + Date.now())
        const filePath = ext ? (name + '.' + ext) : name
        const { url } = await ossClient.put(filePath, file)
        this.imgPaths.push(url as never)
        copy(url)
      } catch (e) {
        this.showTip = true
      }
    },
    async getList (marker?: string) {
      marker = marker || this.nextMarker
      try {
        const result = await ossClient.list({
          marker,
          prefix: this.prefixText,
          'max-keys': 30,
        })
        const { nextMarker = '', objects } = result
        if (!marker) {
          this.imgPaths = objects?.map(({ url }: { url: any }) => url) ?? []
        } else {
          this.imgPaths = this.imgPaths.concat(objects?.map(({ url }: { url: any }) => url) ?? [])
        }
        this.nextMarker = nextMarker;
        (this.$refs.loadMore as any).finished(objects.length < 30)
      } catch (e) {
        this.showTip = true
      }
    },
    onSearch () {
      this.imgPaths = []
      this.getList('')
    },
  },
})
</script>

<style lang="scss" scoped>
.img-text {
  padding: 2px 4px;
  color: #fff;
  background-color: rgba(0,0,0,.18);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.flat-button {
  position: fixed;
  left: 50%;
  bottom: 80px;
  width: 52px;
  height: 52px;
  transform: translateX(-50%);
  z-index: 9;
  box-shadow: 0 1px 6px 0 #ff4f44;
}
.upload-icon {
  &::before,
  &::after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40%;
    height: 2px;
    border-radius: 2px;
    background-color: #fff;
  }
  &::after {
    transform: translate(-50%, -50%) rotate(90deg);
  }
}
input[type="file"] {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
}
.dui-icon__close {
  width: 16px;
  height: 16px;
}
.search-bar {
  height: 48px;
  &__inner {
    height: 48px;
    &.fixed {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;
    }
    input[type="text"] {
      padding-top: 8px;
      padding-bottom: 8px;
      background-color: #f8f8f8;
    }
  }
  &.has-navbar {
    .fixed {
      top: 44px;
    }
  }
}
</style>
