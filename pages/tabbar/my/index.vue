<template>
  <view>
    <a-popover
      :visible.sync="visible"
      :dropdownList="dropdownList"
      :activeValue.sync="activeValue"
    >
      <view @click="onClick" class="my">my</view>
    </a-popover>
  </view>
</template>

<script>
export default {
  name: 'My',
  data() {
    return {
      visible: false,
      dropdownList: [
        { label: '选项一', value: 1 },
        { label: '选项二', value: 2 },
        { label: '选项三', value: 3 },
        { label: '选项四', value: 4 },
        { label: '选项五', value: 5 }
      ],
      activeValue: ''
    }
  },
  methods: {
    onClick() {
      this.visible = true
    },
    onItemClick({ value }) {
      if (this.activeValue !== value) {
        this.activeValue = value
      }
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.my {
  height: 28px;
  line-height: 28px;
  background-color: #fff;
}
</style>