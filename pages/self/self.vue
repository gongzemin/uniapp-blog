<template>
  <view class="user">
    <view class="top">
      <view class="group" @click="toUserInfo">
        <view class="userinfo">
          <view class="pic">
            <image
              v-if="
                hasLogin && userInfo.avatar_file && userInfo.avatar_file.url
              "
              :src="userInfo.avatar_file.url"
              mode="aspectFill"></image>
            <image
              v-else
              src="../../static/images/user-default.jpg"
              mode="aspectFill"></image>
          </view>
          <view class="text" v-if="hasLogin">
            <view class="nickname">
              {{
                userInfo.nickname ||
                userInfo.username ||
                userInfo.mobile ||
                "请设置昵称"
              }}
            </view>
            <view class="year">
              <uni-dateformat
                :date="userInfo.register_date"
                :threshold="[
                  3600,
                  99 * 365 * 24 * 60 * 60 * 1000,
                ]"></uni-dateformat>
              注册
            </view>
          </view>
          <view classs="text" v-else>
            <view class="nickname">点击登录</view>
          </view>
        </view>

        <view class="more">
          <wd-icon name="arrow-right" size="22px"></wd-icon>
        </view>
      </view>

      <view class="bg">
        <image
          v-if="hasLogin && userInfo.avatar_file && userInfo.avatar_file.url"
          :src="userInfo.avatar_file.url"
          mode="aspectFill"></image>
        <image
          v-else
          src="../../static/images/user-default.jpg"
          mode="aspectFill"></image>
      </view>
    </view>

    <view class="main">
      <view class="info">
        <view class="item">
          <text>33</text>
          获赞
        </view>
        <view class="item">
          <text>11</text>
          评论
        </view>
        <view class="item">
          <text>1</text>
          发文
        </view>
      </view>
      <view class="list">
        <view class="group">
          <view class="item" v-for="(item, idx) in groupList1" :key="idx">
            <view class="left">
              <text>{{ item.name }}</text>
            </view>
            <view class="right">
              <wd-icon name="arrow-right" size="22px"></wd-icon>
            </view>
          </view>
        </view>
        <view class="group">
          <view class="item" v-for="(item, idx) in groupList2" :key="idx">
            <view class="left">
              <text>{{ item.name }}</text>
            </view>
            <view class="right">
              <wd-icon name="arrow-right" size="22px"></wd-icon>
            </view>
          </view>
        </view>
        <view class="group">
          <view class="item" @click="logout">
            <view class="left">
              <text>退出登录</text>
            </view>
            <view class="right">
              <wd-icon name="arrow-right" size="22px"></wd-icon>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { computed } from "vue";
import { store, mutations } from "@/uni_modules/uni-id-pages/common/store.js";
import { nickName, getAvatar } from "../../utils/tool";
const groupList1 = [
  { name: "我的长文" },
  { name: "我的点赞" },
  { name: "评论过的" },
];

const groupList2 = [{ name: "关于" }, { name: "意见反馈" }];

const userInfo = computed(() => store.userInfo);
const hasLogin = computed(() => store.hasLogin);

const logout = () => {
  console.log("logout");
  if (!hasLogin.value) {
    uni.showToast({
      title: "未登录",
      icon: "none",
    });
    return;
  }

  uni.showModal({
    title: "是否确认退出",
    success: (res) => {
      console.log(res);
      if (res.confirm) {
        mutations.logout();
      }
    },
  });
};

const toUserInfo = () => {
  uni.navigateTo({
    url: "/uni_modules/uni-id-pages/pages/userinfo/userinfo",
  });
};
</script>

<style lang="scss">
.user {
  .top {
    height: 300rpx;
    background: #bbb;
    padding: 0 30rpx;
    padding-top: var(--status-bar-height);
    position: relative;
    display: flex;
    align-items: center;
    .group {
      position: relative;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      color: #fff;
      .userinfo {
        display: flex;
        width: 100%;
        align-items: center;
        .pic {
          width: 120rpx;
          height: 120rpx;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid #fff;
          image {
            width: 100%;
            height: 100%;
          }
        }
        .text {
          padding-left: 20rpx;
          .nickname {
            font-size: 44rpx;
            font-weight: 600;
          }
        }
      }
    }
    .bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      image {
        width: 100%;
        height: 100%;
        filter: blur(20px);
        transform: scale(2);
        opacity: 0.5;
      }
    }
  }
  .main {
    width: 100%;
    min-height: 200rpx;
    background: #fff;
    border-radius: 30rpx;
    transform: translateY(-30rpx);
    padding: 30rpx 0;
    .info {
      padding: 10rpx 30rpx;
      display: flex;
      font-size: 30rpx;
      .item {
        padding-right: 20rpx;
        color: #888;
        text {
          font-weight: 600;
          color: #333;
        }
      }
    }
    .list {
      .group {
        padding: 15rpx 30rpx;
        border-bottom: 15px solid #f4f4f4;
        .item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 25rpx 0;
          font-size: 36rpx;
          color: #555;

          .left {
            display: flex;
            align-items: center;
          }
          .right {
          }
        }
        .item:not(:last-child) {
          border-bottom: 1rpx solid #f8f8f8;
        }
      }
      .group:last-child {
        border: none;
      }
    }
  }
}
</style>
