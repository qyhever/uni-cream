<template>
  <view class="home">
    <view class="home-header">
      <text>杭州匠人网络科技有限公司</text>
      <view class="menu-button" @click.stop="onMenuButtonClick">
        <image class="menu-icon" src="/static/menu.png"></image>
      </view>
    </view>
    <view class="banner">
      <view class="flex text-color-grey">出租率</view>
      <view class="flex row--center">
        <view class="percent text-color-white">
          <text>0.00</text>
          <text>%</text>
        </view>
        <view class="price">
          <view class="flex">
            <text class="text-color-grey">收缴率</text>
            <text class="value text-color-white">16.78</text>
            <text class="text-color-white">%</text>
          </view>
          <view class="flex">
            <text class="text-color-grey">在租实时均价</text>
            <text class="value text-color-white">0.00</text>
          </view>
        </view>
      </view>
      <view class="flex row--bottom">
        <view class="col">
          <view class="text-color-white">10.00㎡</view>
          <view class="text-color-grey">管理总量</view>
        </view>
        <view class="col items-center">
          <view class="text-color-white">10.00㎡</view>
          <view class="text-color-grey">已租</view>
        </view>
        <view class="col items-end">
          <view class="text-color-white">0.00㎡</view>
          <view class="text-color-grey">已招商</view>
        </view>
      </view>
    </view>
    <view class="block">
      <view class="hd flex justify-between">
         <view>数据概览</view>
         <view class="flex">
           <view class="flex">
             <text>当前</text>
             <view class="triangle"></view>
           </view>
           <view class="flex">
             <text>月</text>
             <view class="triangle"></view>
           </view>
         </view>
      </view>
      <view class="bd flex flex-wrap">
        <view
          class="item"
          v-for="(item, index) in summaryList"
          :key="index"
         >
            <view class="header">
              <text class="value">{{currencyFormat(item.value)}}</text>
              <text class="unit">{{item.unit}}</text>
            </view>
            <view class="footer flex justify-between items-center">
              <view class="label text-color-grey">{{item.label}}</view>
              <view class="change flex items-center">
                <image class="falling" src="/static/falling.png" v-if="item.rate <= 0"></image>
                <image class="rising" src="/static/rising.png" v-else></image>
                <view class="rate" :class="item.rate <= 0 ? 'text-color-success' : 'text-color-danger'">{{currencyFormat(item.rate)}}%</view>
              </view>
            </view>
        </view>
      </view>
    </view>
    <view class="block">
      <view class="hd flex justify-between">
         <view>资产前瞻</view>
         <view class="flex">
           <view class="flex">
             <text>当前</text>
             <view class="triangle"></view>
           </view>
           <view class="flex">
             <text>月</text>
             <view class="triangle"></view>
           </view>
         </view>
      </view>
      <view class="bd flex flex-wrap">
        <view
          class="item"
          v-for="(item, index) in assetList"
          :key="index"
         >
            <view class="header">
              <text class="value">{{item.value}}</text>
              <text class="unit">{{item.unit}}</text>
            </view>
            <view class="footer flex justify-between items-center">
              <view class="label text-color-grey">{{item.label}}</view>
            </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { currencyFormat } from '@/utils/currency.js'
export default {
  data() {
    return {
      summaryList: [
        { value: 19.80, label: '现金流', unit: '万元', rate: -28.80 },
        { value: 346.11, label: '收益', unit: '万元', rate: 9.11 },
        { value: 3.13, label: '收缴率', unit: '%', rate: -72.40 },
        { value: 0, label: '计租率', unit: '%', rate: 0 },
        { value: 0, label: '平效', unit: '(元/㎡*天)', rate: 0 },
        { value: 0, label: '现金流', unit: '(元/㎡*天)', rate: 0 }
      ],
      assetList: [
        { value: 631.91, label: '现金流预测', unit: '万元' },
        { value: 0, label: '合同到期统计', unit: '份' },
      ]
    }
  },
  methods: {
    onMenuButtonClick() {
      console.log('onMenuButtonClick')
    },
    currencyFormat
  }
}
</script>

<style lang="scss">
  .home {
    padding: 0 12px;
  }
  .home-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
  }
  .menu-button {
    height: 100%;
  }
  .menu-icon {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
  }
  .banner {
    padding: 15px 12px;
    border-radius: 8px;
    background-color: $uni-color-primary;
  }
  .row {
    display: flex;
  }
  .row--center {
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
    .percent {
      font-size: 18px;
    }
  }
  .row--bottom {
    justify-content: space-between;
  }
  .price {
    > .flex {
      justify-content: flex-end;
    }
    .value {
      margin-left: 4px;
    }
  }
  .col {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .hd {
    padding: 18px 0;
  }
  .bd {
    
  }
  .item {
    box-sizing: border-box;
    flex: 0 0 48%;
    padding: 15px 12px;
    margin-bottom: 10px;
    border-radius: 8px;
    background-color: #F6F7FB;
    &:nth-of-type(2n) {
      margin-left: 4%;
    }
    .header {
      margin-bottom: 8px;
    }
    .change {
      .falling, .rising {
        width: 14px;
        height: 14px;
      }
      .rate {
        margin-left: 4px;
      }
    }
  }
</style>
