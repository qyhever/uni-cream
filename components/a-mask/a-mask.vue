<template>
  <view
    class="a-mask"
    :class="{'a-mask-show': visible}"
    :style="[maskStyle]"
    hover-stop-propagation
    @tap="onClick"
    @touchmove.stop.prevent="noop"
  >
    <slot></slot>
  </view>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
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
    onClick() {
      this.$emit('update:visible', false)
      this.$emit('close')
    },
    noop() {
      // ...
    }
  }
}
</script>

<style lang="scss" scoped>
.a-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: all 0.3s ease-in-out;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
}
.a-mask-show {
  opacity: 1;
}
</style>
