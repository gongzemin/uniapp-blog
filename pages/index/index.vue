<template>
  <view class="home">
    <wd-tabs v-model="tab" @click="handleClick" inactiveColor="#888">
      <block v-for="item in navList" :key="item">
        <wd-tab :title="item.name">
          <view class="loadingState" v-show="isSkeletonShow">
            <wd-skeleton animation="gradient" theme="paragraph" />
          </view>
          <view class="content">
            <view class="item" v-for="(item, index) in dataList" :key="index">
              <blog-item :blogItem="item"></blog-item>
            </view>
          </view>
        </wd-tab>
      </block>
    </wd-tabs>
    <view class="edit">
      <wd-fab position="right-bottom" :expandable="false">
        <template #trigger>
          <view class="round" @click="handleFabClick">
            <wd-button icon="edit-1" type="icon"></wd-button>
          </view>
        </template>
      </wd-fab>
    </view>
    <!-- <uni-icons size="18" color="#11f011" fontFamily="iconfont">
      &#xe670;
    </uni-icons> -->
  </view>
</template>

<script setup lang="ts">
import { ref } from "vue";
// import { useToast } from "@/uni_modules/wot-design-uni";

const db = uniCloud.database();
const tab = ref<number>(0);
const navActiveIndex = ref(0);
const navList = [
  { name: "最新", type: "publish_date" },
  { name: "热门", type: "view_count" },
];
const dataList = ref([1, 2, 3]);
const isSkeletonShow = ref(true);
const handleClick = (e) => {
  isSkeletonShow.value = true;
  navActiveIndex.value = e.index;
  dataList.value = [];
  getData();
};
const handleFabClick = () => {
  console.log(111);
  uni.navigateTo({
    url: "/pages/edit/edit",
  });
};

const getData = () => {
  uni.showLoading({
    title: "数据加载中...",
  });

  let articleTemp = db
    .collection("quanzi_article")
    .field(
      `title,user_id,description,
  picurls,comment_count,like_count,view_count,publish_date`
    )
    .getTemp();
  let userTemp = db
    .collection("uni-id-users")
    .field("_id,username,nickname,avatar_file")
    .getTemp();

  db.collection(articleTemp, userTemp)
    .orderBy(navList[navActiveIndex.value].type, "desc") // 根据 last_publish_date 字段倒序排列
    .get()
    .then((res) => {
      uni.hideLoading();
      console.log("res", res.result);
      if (res.result.errCode === 0) dataList.value = res.result.data;
      isSkeletonShow.value = false;
      console.log(res, "res--getData");
    })
    .catch((err) => {
      uni.hideLoading();
      console.log(err, "err");
    });
};
getData();
</script>

<style lang="scss">
.home {
  .topnav {
    margin-bottom: 30rpx;
  }
  .loadingState {
    padding: 30rpx;
  }
  .content {
    .item {
      padding: 30rpx;
      border-bottom: #f7f7f7 15px solid;
    }
  }
  .edit {
    margin-right: 30rpx;
    margin-bottom: 30rpx;
    .round {
      width: 120rpx;
      height: 120rpx;
      background: #0199fe;
      border-radius: 50%;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      .wd-button {
        color: #fff;
        font-size: 40rpx;
      }
    }
  }
}
</style>
