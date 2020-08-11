<template>
  <div class="dui-page">
    <div class="dui-nav-bar placeholder bg-red">
      <div class="dui-nav-bar--fixed dui-nav-bar__content">
        <div class="dui-nav-bar__title">图片上传</div>
        <div class="dui-icon__back" @click="$router.back()"></div>
      </div>
    </div>
    <div>
      <div class="padding text-center" ref="pulldown" v-pulldown="getPulldownOptions()">{{ pulldownText }}</div>
      <div class="padding-lr-sm padding-tb-xs bg-yellow">访问失败请下拉刷新页面</div>
      <div class="grid bg-white padding-lr-sm">
        <div class="col-4 square xs bg-img cover radius" v-for="(img, index) in imgPaths" :key="index" v-src="img" @click="onPreview(imgPaths, index)"></div>
        <div class="col-4 square xs radius upload-icon">
          <input type="file" name="file" @change="onUpload">
        </div>
      </div>
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
      pulldownText: '下拉刷新',
      imgPaths: [],
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    getPulldownOptions() {
      return {
        onPullDownRefresh: () => {
          this.pulldownText = '正在刷新...'
          return this.init().then(() => {
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
    onPreview(imgPaths, index) {
      this.$preview(imgPaths, index)
      copy(imgPaths[index])
    },
    init() {
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
        return this.getList()
      })
    },
    async onUpload(e) {
      try {
        const file = e.target.files[0]
        const { url } = await this.ossClient.put(md5(file.name + '?' + Date.now()), file)
        this.imgPaths.push(url)
        copy(url)
      } catch (e) {
        this.$toast('上传失败')
      }
    },
    async getList() {
      try {
        const { objects } = await this.ossClient.list({
          // marker: '',
          'max-keys': 20,
        })
        this.imgPaths = objects.map(({ url }) => url)
      } catch (e) {
        //
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.upload-icon {
  background-color: #f1f1f1;
  &::before,
  &::after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40%;
    height: 3px;
    border-radius: 3px;
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
</style>
