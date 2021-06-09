<template>
  <view class="building">
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
      value: ''
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
    }
  }
}
</script>

<style lang="scss">
 .search-bar {
   .uni-searchbar {
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
</style>
