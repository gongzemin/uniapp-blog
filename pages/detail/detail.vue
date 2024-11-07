<template>
  <view class="detail">
    <view class="container">
      <view v-if="loadingState">
        <wd-skeleton animation="gradient" theme="paragraph" />
      </view>
      <view v-else>
        <view v-if="Object.keys(detailObj).length">
          <view class="title">{{ detailObj.title }}</view>
          <view class="userinfo">
            <view class="avatar">
              <image :src="getAvatar(detailObj)" mode="aspectFill"></image>
            </view>
            <view class="text">
              <view class="name">
                {{ nickName(detailObj) }}
              </view>
              <view class="small">
                <uni-dateformat
                  :date="detailObj.publish_date"
                  format="yyyy年MM月dd hh:mm"></uni-dateformat>
                ， 发布于{{ detailObj.province }}
              </view>
            </view>
          </view>
          <view class="content">
            <view v-html="detailObj.content"></view>
          </view>

          <view class="like">
            <view
              class="btn"
              :class="detailObj.isLike ? 'active' : ''"
              @click="clickLike">
              <wd-icon name="thumb-up" size="20"></wd-icon>
              <text v-if="detailObj.like_count">
                {{ detailObj.like_count }}
              </text>
            </view>
            <view class="users">
              <image
                src="../../static/images/user.jpg"
                mode="aspectFill"></image>
            </view>
            <view class="text">
              <text class="num">{{ detailObj.view_count }}</text>
              人看过
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import pageJson from "@/pages.json";
// console.log(pageJson.uniIdRouter.loginPage)
import { onLoad } from "@dcloudio/uni-app";
import { ref, reactive, watch } from "vue";
import { nickName, getAvatar } from "../../utils/tool";
import { store } from "@/uni_modules/uni-id-pages/common/store.js";

const detailObj = reactive({});
const loadingState = ref(true);
const articleId = ref("");
const db = uniCloud.database();
const utilsObj = uniCloud.importObject("utilsObj", {
  customUI: true,
});
const collections = ref([]);
const likeTime = ref(null);

const clickLike = async () => {
  if (!store.hasLogin) {
    uni.showModal({
      title: "登录后才可进行后续操作",
      success: (res) => {
        if (res.confirm) {
          uni.navigateTo({
            url: "/" + pageJson.uniIdRouter.loginPage,
          });
        }
      },
    });
  }
  //防止频繁操作
  let time = Date.now();
  if (time - likeTime.value < 2000) {
    uni.showToast({
      title: "操作太频繁，请稍后...",
      icon: "none",
    });
    return;
  }
  likeTime.value = time;
  // 如果已经点过赞 并且用户是当前登录的用户
  detailObj.isLike ? detailObj.like_count-- : detailObj.like_count++;
  detailObj.isLike = !detailObj.isLike;
  likeFunc();
};

const likeFunc = async () => {
  let count = await db
    .collection("quanzi_like")
    .where(`article_id=="${articleId.value}" && user_id==$cloudEnv_uid`)
    .count();

  console.log(count.result, count.result.total, "count.result.total");
  if (count.result.total) {
    // 只有数据库中文章的id等于当前文章id, 用户id等于当前用户id 才删除这条记录
    db.collection("quanzi_like")
      .where(
        `article_id=="${articleId.value}"
		  && user_id==$cloudEnv_uid`
      )
      .remove();
    utilsObj.operation("quanzi_article", "like_count", articleId.value, -1);
  } else {
    db.collection("quanzi_like").add({
      article_id: articleId.value,
    });
    utilsObj.operation("quanzi_article", "like_count", articleId.value, 1);
  }
};

// 获取数据库数据
const getData = () => {
  let artTemp = db
    .collection("quanzi_article")
    .where(`_id=="${articleId.value}"`)
    .getTemp();
  let userTemp = db
    .collection("uni-id-users")
    .field("_id,username,nickname,avatar_file")
    .getTemp();

  let likeTemp = db
    .collection("quanzi_like")
    .where(`article_id=="${articleId.value}" && user_id==$cloudEnv_uid`)
    .getTemp();
  console.log("likeTemp", likeTemp);
  console.log("store hasLogin", store.hasLogin);
  let tempArr = [artTemp, userTemp];
  if (store.hasLogin) {
    tempArr.push(likeTemp);
  }

  // 确保 articleId 有值
  if (!articleId.value) {
    console.error("articleId 未定义");
    return;
  }

  db.collection(...tempArr)
    .get({
      getOne: true,
    })
    .then((res) => {
      loadingState.value = false;
      console.log(res.result.data, "res");
      if (res.errCode === 0) {
        if (res.result.data) {
          let isLike = false;
          if (store.hasLogin)
            isLike = res.result.data._id.quanzi_like.length ? true : false;
          res.result.data.isLike = isLike;
          Object.assign(detailObj, res.result.data);
          uni.setNavigationBarTitle({
            title: detailObj.title,
          });
        } else {
          errFunc();
        }
        console.log(detailObj, "res1");
      } else {
        console.error("数据为空或错误代码:", res.errCode);
      }
    })
    .catch((err) => {
      loadingState.value = false;
      errFunc();
      console.error("查询失败:", err);
    });
};

const readCountUpdate = () => {
  utilsObj.operation("quanzi_article", "view_count", articleId.value, 1);
};

const errFunc = () => {
  uni.showToast({
    title: "参数有误",
    icon: "none",
  });
  setTimeout(() => {
    uni.reLaunch({
      url: "/pages/index/index",
    });
  }, 1000);
};
onLoad((e) => {
  if (!e.id) {
    errFunc();
    return;
  }
  articleId.value = e.id; // 确保 onLoad 后设置 articleId
  getData();
  readCountUpdate();
  console.log(e, "onLoad", articleId.value);
});
</script>

<style lang="scss">
/* 样式保持不变 */
.detail {
  background: #f8f8f8;
  min-height: calc(100vh - var(--window-top));
  .container {
    padding: 30rpx;
    background: #fff;
    .title {
      font-size: 46rpx;
      color: #333;
      line-height: 1.4em;
      font-weight: 600;
    }
    .userinfo {
      padding: 20rpx 0 50rpx;
      display: flex;
      align-items: center;
      .avatar {
        width: 60rpx;
        height: 60rpx;
        padding-right: 15rpx;
        image {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .text {
        font-size: 28rpx;
        color: #555;
        .small {
          font-size: 20rpx;
          color: #999;
        }
      }
    }
    .content {
    }
    .like {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 80rpx 50rpx 50rpx;
      .btn {
        width: 260rpx;
        height: 120rpx;
        background: #e4e4e4;
        border-radius: 100rpx;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-size: 28rpx;
        .iconfont {
          font-size: 50rpx;
        }
        &.active {
          background: #0199fe;
        }
      }
      .text {
        font-size: 26rpx;
        color: #666;
        .num {
          color: #0199fe;
        }
        .spot {
          padding: 0 10rpx;
        }
      }
      .users {
        display: flex;
        justify-content: center;
        padding: 30rpx 0;
        image {
          width: 50rpx;
          height: 50rpx;
          border-radius: 50%;
          border: 3px solid #fff;
          margin-left: -20rpx;
        }
      }
    }
  }

  .comment {
    padding: 30rpx;
    padding-bottom: 120rpx;
    .item {
      padding: 10rpx 0;
    }
  }
}
</style>
