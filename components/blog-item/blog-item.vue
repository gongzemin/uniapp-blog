<template>
  <view class="blogitem">
    <view class="head">
      <view class="userinfo">
        <view class="avatar">
          <image :src="getAvatar(blogItem)" mode="aspectFill"></image>
        </view>
        <view class="name">
          {{ nickName(blogItem) }}
        </view>
        <view class="time">
          <uni-dateformat
            :date="blogItem.publish_date"
            format="MM月dd hh:mm"
            :threshold="[60000, 3600000 * 24 * 30]"></uni-dateformat>
        </view>
      </view>

      <view class="more">
        <wd-button icon="ellipsis" type="icon"></wd-button>
      </view>
    </view>

    <view class="body">
      <view class="title" @click="goDetail">
        {{ blogItem.title }}
      </view>
      <view class="text" @click="goDetail" v-if="blogItem.description">
        <view class="t">
          {{ blogItem.description }}
        </view>
      </view>
      <view class="picList" v-if="blogItem.picurls?.length">
        <!--  
		 
		  @click="clickImg(index, item.picture)"-->
        <view
          class="pic"
          :key="index"
          v-for="(pic, index) in blogItem.picurls"
          :class="
            blogItem.picurls && blogItem.picurls.length == 1 ? 'only' : ''
          ">
          <image :src="pic" mode="aspectFill" @click="clickImg(index)"></image>
        </view>
      </view>
    </view>

    <view class="info">
      <view class="box">
        <wd-icon name="browse" size="20"></wd-icon>
        <text class="count">{{ blogItem.view_count }}</text>
      </view>
      <view class="box" @click="goDetail">
        <wd-icon name="chat" size="20"></wd-icon>
        <text class="count">
          {{ blogItem.comment_count ? blogItem.comment_count : "评论" }}
        </text>
      </view>
      <view class="box">
        <wd-icon name="thumb-up" size="20"></wd-icon>
        <text class="count">
          {{ blogItem.like_count ? blogItem.like_count : "点赞" }}
        </text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { nickName, getAvatar } from "../../utils/tool";
import { ref, computed } from "vue";
const pictures = ref([1, 2]);
const props = defineProps({
  blogItem: {
    default: () => {},
  },
});

// const avatarUrl = computed(() => {
//   return props.blogItem.user_id && props.blogItem.user_id[0]?.avatar_file?.url
//     ? props.blogItem.user_id[0].avatar_file.url
//     : "../../static/images/user-default.jpg";
// });

const clickImg = (index) => {
  uni.previewImage({
    current: index,
    urls: props.blogItem.picurls,
  });
};

const goDetail = () => {
  uni.navigateTo({
    url: `/pages/detail/detail?id=${props.blogItem._id}`,
  });
};
</script>

<style lang="scss" scoped>
.blogitem {
  .head {
    display: flex;
    font-size: 32rpx;
    align-items: center;
    justify-content: space-between;
    .userinfo {
      display: flex;
      align-items: center;
      .avatar {
        width: 40rpx;
        height: 40rpx;
        border-radius: 50%;
        overflow: hidden;
        image {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
      .name {
        color: #222;
        padding-left: 10rpx;
      }
      .time {
        color: #888;
        font-size: 22rpx;
        padding-left: 20rpx;
      }
    }
    .more {
      padding: 5rpx;
      .iconfont {
        font-size: 50rpx;
        color: #888;
      }
    }
  }
  .body {
    padding: 15rpx 0 30rpx;
    .title {
      font-size: 44rpx;
      color: #000;
      font-weight: 600;
      text-align: justify;
    }
    .text {
      padding-top: 10rpx;
      padding-bottom: 10rpx;
      font-size: 30rpx;
      text-align: justify;
      color: #888;
      .t {
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        box-orient: vertical;
      }
    }
    .picList {
      display: flex;
      padding-top: 20rpx;
      .pic {
        width: 225rpx;
        height: 225rpx;
        margin-right: 6rpx;
        overflow: hidden;
        image {
          width: 100%;
          height: 100%;
        }
        &:first-child {
          border-radius: 20rpx 0 0 20rpx;
        }
        &:last-child {
          border-radius: 0 20rpx 20rpx 0;
        }
        &.only {
          border-radius: 20rpx;
        }
      }
    }
  }

  .info {
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 26rpx;
    color: #333;

    .box {
      display: flex;
      align-items: center;
      padding: 15rpx 0 5rpx;
      flex: 1;
      justify-content: center;

      .count {
        margin-left: 8rpx; // 调整间距大小
      }
    }
  }
}
</style>
