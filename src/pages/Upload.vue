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
      <div class="search-bar__inner flex align-center fixed padding-lr bg-white">
        <input class="round padding-lr-sm flex-sub margin-right" v-model="prefixText" type="text" placeholder="请输入文件路径">
        <button class="dui-button round bg-red sm" @click="onSearch">搜索</button>
      </div>
    </div>
    <div>
      <div class="padding text-center" ref="pulldown" v-pulldown="getPulldownOptions()">{{ pulldownText }}</div>
      <!-- 顶部提示 -->
      <div v-show="showTip" class="padding-lr-sm padding-tb-xs bg-yellow flex align-center">
        <span class="flex-sub">访问失败请重新加载页面</span>
        <i class="dui-icon__close" @click="showTip = false"></i>
      </div>
      <!-- 文件列表 -->
      <div v-if="imgPaths.length > 0" class="grid padding-lr-xs">
        <div class="col-4 square xxs bg-img cover" v-for="(img, index) in imgPaths" :key="img" v-src="img" @click="onPreview(imgPaths, index)">
          <div class="img-text text-xs">{{img.split('.com/')[1]}}</div>
        </div>
      </div>
      <div class="padding text-center text-gray" v-pullup="onLoadMore()">
        <i v-show="nextStatus === 'loading'" class="dui-icon__loading"></i>
        <!-- <span v-show="nextStatus === 'noMore'">没有更多数据了~</span> -->
      </div>
    </div>
    <!-- 上传按钮 -->
    <div class="flat-button round bg-red upload-icon">
      <input type="file" name="file" @change="onUpload">
    </div>
  </div>
</template>

<script>
import OSS from 'ali-oss'
import md5 from 'md5'
import copy from '@moohng/dan/src/copy'

export default {
  name: 'Upload',
  data() {
    return {
      showTip: false,
      pulldownText: '下拉刷新',

      prefixText: '',
      imgPaths: [],
      nextMarker: '',
      nextStatus: '',
    }
  },
  mounted() {
    this.auth().then(() => {
      this.getList()
    })
  },
  methods: {
    getPulldownOptions() {
      return {
        onPullDownRefresh: () => {
          this.pulldownText = '正在刷新...'
          return this.getList(true).then(() => {
            this.pulldownText = '刷新成功'
          }).catch(() => {
            this.pulldownText = '刷新失败'
          })
        },
        onPullDown: (y, flag) => {
          if (flag) {
            this.pulldownText = '松开刷新'
          } else {
            this.pulldownText = '下拉刷新'
          }
        },
      }
    },
    onLoadMore() {
      if (this.nextStatus === 'more') {
        this.getList()
      }
    },
    onPreview(imgPaths, index) {
      if (typeof window.WeixinJSBridge !== 'undefined') {
        window.WeixinJSBridge.invoke('imagePreview', {
          urls: imgPaths,
          current: imgPaths[index],
        })
      } else {
        this.$preview(imgPaths, index)
      }
      copy(imgPaths[index])
    },
    auth() {
      this.$loading('授权中...')
      return this.$get('https://api.miu.moohng.com/sts').then((res) => {
        this.ossClient = new OSS({
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
      }).finally(this.$loading.hide)
    },
    async onUpload(e) {
      try {
        const file = e.target.files[0]
        console.log(file.name)
        let [name, ext] = file.name.split('.')
        name = this.prefixText + md5(name + '?' + Date.now())
        const filePath = ext ? (name + '.' + ext) : name
        const { url } = await this.ossClient.put(filePath, file)
        this.imgPaths.push(url + '!blur')
        copy(url)
      } catch (e) {
        this.showTip = true
      }
    },
    async getList(isRefresh = false) {
      if (this.nextStatus === 'loading') return
      if (!isRefresh) {
        this.nextStatus = 'loading'
      }
      try {
        const result = await this.ossClient.list({
          marker: this.nextMarker,
          prefix: this.prefixText,
          'max-keys': 40,
        })
        const { nextMarker = '', objects } = result
        if (isRefresh || !this.nextMarker) {
          this.imgPaths = objects?.map(({ url }) => url + '!blur') ?? []
        } else {
          this.imgPaths = this.imgPaths.concat(objects?.map(({ url }) => url + '!blur') ?? [])
        }
        this.nextMarker = nextMarker
        this.nextStatus = nextMarker ? 'more' : 'noMore'
      } catch (e) {
        console.log(e)
        this.showTip = true
      }
    },
    onSearch() {
      this.getList(true)
    },
  },
}
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
.dui-icon__close::after {
  width: 16px;
  height: 16px;
}
.dui-icon__loading::after {
  width: 24px;
  height: 24px;
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
