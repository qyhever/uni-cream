<template>
  <view class="building flex flex-column">
    <van-tabs :active="active" @change="onChange" id="tabs" class="v-tabs">
      <van-tab
        v-for="(item, index) in tabList"
        :key="index"
        :name="item.value"
        :title="item.label"
       >
       </van-tab>
    </van-tabs>
    <uni-search-bar class="search-bar" v-model="value" radius="100" placeholder="搜索楼宇" cancelButton="none" @confirm="search" />
    <view class="list-wrapper flex-grow">
      <scroll-view
        class="list"
        scroll-y
        enable-back-to-top
        refresher-enabled
        :refresher-triggered="triggered"
        @refresherrefresh="onRefresh"
        @refresherrestore="onRestore"
       >
        <view
          class="item flex"
          v-for="(item, index) in 10"
          :key="index"
        >
          <view class="image-wrapper">
            <image class="image" src="/static/test.jpg"></image>
          </view>
          <view class="bd flex-grow">
            <view class="flex justify-between items-center padding-top-10">
              <text class="font-size-18">起梦-写字楼</text>
              <text>0元/㎡*天</text>
            </view>
            <view class="flex justify-between items-center">
              <view class="tag">
                预计完成率 0.00%
              </view>
              <text class="text-color-regular">管理数量 0㎡</text>
            </view>
            <view class="flex justify-between items-center text-color-secondary">
              <text>在租 0㎡</text>
              <text>可招商0.00% 0㎡</text>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'Building',
  data() {
    return {
      active: 1,
      tabList: [
        { label: '楼宇', value: 1 },
        { label: '集合', value: 2 },
        { label: '项目', value: 3 }
      ],
      value: '',
      triggered: true,
      loading: false
    }
  },
  onLoad() {
    // https://youzan.github.io/vant-weapp/#/tab#zu-jian-cong-yin-cang-zhuang-tai-qie-huan-dao-xian-shi-zhuang-tai-shi-di-bu-tiao-wei-zhi-cuo-wu
    this.selectComponent('#tabs').resize()
  },
  methods: {
    onChange(val) {
      console.log('val', val)
    },
    search(val) {
      console.log('search', val, this.value)
    },
    onRefresh() {
      console.log('onRefresh')
       if (this.loading) {
         return
       }
       this.loading = true
       setTimeout(() => {
         this.loading = false
         this.triggered = false
       }, 1000)
    },
    onRestore() {
      this.triggered = 'restore'
    }
  }
}
</script>

<style lang="scss">
page, .building {
  height: 100%;
}
.building {
  background-color: #f1f1f1;
  overflow: hidden;
}
.search-bar {
  view.uni-searchbar {
    padding: 10px 12px;
    .uni-searchbar__box {
      justify-content: flex-start;
    }
    .uni-searchbar__text-placeholder {
      position: relative;
      top: -1px;
      margin-left: 0;
    }
  }
}
.list-wrapper {
  position: fixed;
  top: 100px;
  bottom: 0;
  width: 100%;
  overflow: hidden;
}
.list {
  height: 100%;
  // padding: 0 12px;
}
.item {
  margin: 0 12px 12px;
  padding: 10px;
  // margin-bottom: 12px;
  border-radius: 4px;
  background-color: #fff;
  .image-wrapper {
    flex: 0 0 100px;
    width: 100px;
    height: 100px;
    .image {
      width: 100%;
      height: 100%;
    }
  }
  .bd {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 10px;
  }
  .tag {
    height: 25px;
    line-height: 25px;
    padding: 0 4px;
    background-color: #ecf5ff;
    color: #409eff;
    font-size: 12px;
  }
}
</style>
