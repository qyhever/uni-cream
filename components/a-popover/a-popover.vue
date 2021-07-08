<template>
  <view class="dropmenu">
    <view class="dropmenu-trigger">
      <slot></slot>
    </view>
    <view
      class="a-mask"
      :class="{'a-mask-show': visible}"
      :style="[maskStyle]"
      hover-stop-propagation
      @tap="onMaskClick"
      @touchmove.stop.prevent="() => {}"
    >
    </view>
    <ul class="dropmenu-list" :class="{'dropmenu-show': visible}">
      <li
        @click.stop="onItemClick(item)"
        class="dropmenu-item"
        :class="{active: activeValue === item.value}"
        v-for="(item, index) in dropdownList"
        :key="index"
      >
        {{item.label}}
      </li>
    </ul>
  </view>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    activeValue: {
      type: [String, Number],
      default: ''
    },
    dropdownList: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    maskStyle() {
      const style = {}
      style.zIndex = this.visible ? 1023 : -1
      return style
    }
  },
  methods: {
    onItemClick(item) {
      if (this.activeValue !== item.value) {
        this.$emit('update:activeValue', item.value)
      }
      this.$emit('update:visible', false)
    },
    onMaskClick() {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.dropmenu {
  // position: absolute;
}
.dropmenu-trigger {
  z-index: 1025;
  position: relative;
}
.dropmenu-list {
  z-index: -1;
  position: absolute;
  padding: 10px;
  background-color: #fff;
  transition: all 0.3s ease-in-out;
  transform: translateY(-10px);
  opacity: 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.dropmenu-show {
  z-index: 1024;
  transform: translateY(0);
  opacity: 1;
}
.dropmenu-item {
  height: 28px;
  line-height: 28px;
  border-bottom: 1px solid #eee;
  &.active {
    color: $uni-color-primary;
  }
}
.a-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: all 0.3s ease-in-out;
  background-color: transparent;
  opacity: 0;
}
.a-mask-show {
  opacity: 1;
}
</style>