<template>
  <view>
    <!-- <view @click="toggle" style="background-color: #fff;">data</view> -->
    <!-- <van-transition :show="visible" name="fade-down">
      <view class="popup"></view>
    </van-transition> -->
    <a-van-popup></a-van-popup>
    <view class="triangle"></view>
  </view>
</template>

<script>
export default {
  name: 'DataSpace',
  data() {
    return {
      visible: false
    }
  },
  methods: {
    toggle() {
      this.visible = !this.visible
    }
  }
}
</script>

<style lang="scss" scoped>
.popup {
  width: 200px;
  height: 200px;
  background-color: pink;
}
</style>