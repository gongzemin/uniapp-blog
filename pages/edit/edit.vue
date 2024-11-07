<template>
  <view class="edit">
    <input
      type="text"
      placeholder="请输入标题"
      class="title"
      v-model="articleObj.title"
      placeholder-class="placeholderClass" />
    <view class="content">
      <editor
        placeholder="写写"
        class="myEdit"
        id="editor"
        show-img-size
        show-img-toolbar
        show-img-resize
        @ready="onEditReady"
        @focus="onFocus"
        @statuschange="onStatuschange"></editor>
    </view>
    <view class="btnGroup">
      <wd-button
        block
        plain
        :disabled="!articleObj.title.length"
        @click="onSubmit">
        确认发表
      </wd-button>
    </view>
    <view class="tools" v-if="toolShow">
      <!--  -->
      <view
        class="item"
        v-for="(item, idx) in toolList"
        :key="idx"
        @click="setActiveIcon(idx)">
        <uni-icons
          :class="[activeIndex === idx ? 'active-icon' : 'default-icon']"
          size="18"
          fontFamily="iconfont">
          {{ item.icon }}
        </uni-icons>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { getCurrentInstance } from "vue";
import { getImgSrc, getProvince } from "@/utils/tool.js";
import { onLoad } from "@dcloudio/uni-app"; // 导入 UniApp 的 onLoad 钩子

const db = uniCloud.database();
const instance = getCurrentInstance();

const articleObj = reactive({
  title: "",
  content: "",
  description: "",
  picurls: "",
  province: "",
});
const toolShow = ref(false);
// 工具列表
const toolList = [
  { icon: "\ue675" },
  { icon: "\ue829" },
  { icon: "\ue82b" },
  { icon: "\ue7c1" },
  { icon: "\ue622" },
  { icon: "\ue645" },
];

// 当前激活的图标索引
const activeIndex = ref(null);

// 设置激活图标的索引
function setActiveIcon(idx) {
  if (activeIndex.value === idx) {
    // 如果当前索引已经是激活状态，再次点击时取消高亮
    activeIndex.value = null;
  } else {
    activeIndex.value = idx;
  }
  // 插一条横线
  if (idx === 3) {
    editorCtx.value.insertDivider();
  } else if (idx === 0) {
    editorCtx.value.format("header", "h1");
  } else if (idx === 1) {
    editorCtx.value.format("bold");
  } else if (idx === 2) {
    editorCtx.value.format("italic");
  } else if (idx === 4) {
    // 添加头像
    uni.chooseImage({
      success: async (res) => {
        console.log(res, "0");

        // 显示 loading
        uni.showLoading({
          title: "上传中请稍后",
        });

        // 创建一个 Promise 数组，每个图片上传操作都是一个 Promise
        const uploadTasks = res.tempFiles.map((item) => {
          return new Promise((resolve, reject) => {
            uniCloud.uploadFile({
              url: "https://file-unigkiszew-mp-0f5589ad-8ec0-443d-bfcc-a8f38857fc78.oss-cn-zhangjiakou.aliyuncs.com",
              filePath: item.path,
              cloudPath: item.path.split("/").pop(), // 获取路径中图片文件名部分
              name: "file",
              success: (uploadFileRes) => {
                // 插入图片到编辑器
                editorCtx.value.insertImage({
                  src: uploadFileRes.fileID,
                });
                console.log(uploadFileRes, "2");
                resolve(); // 上传成功
              },
              fail: (err) => {
                console.error("Upload failed:", err);
                reject(err); // 上传失败
              },
            });
          });
        });

        // 等待所有上传任务完成后隐藏 loading
        try {
          await Promise.all(uploadTasks);
        } catch (err) {
          console.error("One or more uploads failed:", err);
        } finally {
          uni.hideLoading();
        }
      },
    });
  }
}
const onFocus = () => {
  toolShow.value = true;
};

const addData = () => {
  db.collection("quanzi_article")
    .add({
      ...articleObj,
    })
    .then((res) => {
      uni.hideLoading();
      uni.showToast({
        title: "发布成功",
      });
      // 为了显示发布成功 可以显示完
      setTimeout(() => {
        uni.reLaunch({
          url: "/pages/index/index",
        });
      }, 800);
      console.log("res-add", res);
    })
    .catch((err) => {
      uni.showToast({
        title: err,
      });
    });
};

const onSubmit = () => {
  editorCtx.value.getContents({
    success: (res) => {
      articleObj.description = res.text.slice(0, 50);
      articleObj.content = res.html;
      articleObj.picurls = getImgSrc(res.html);
      console.log(articleObj, "articleObj");
      uni.showLoading({
        title: "发布中...",
      });
      addData();
    },
  });
};
const editorCtx = ref(null);
const onEditReady = () => {
  uni
    .createSelectorQuery()
    .in(instance.proxy)
    .select("#editor")
    .fields(
      {
        size: true,
        context: true,
      },
      (res) => {
        editorCtx.value = res.context;
        console.log(res, editorCtx.value, "size-context");
      }
    )
    .exec();
};

const onStatuschange = (e) => {
  let detail = e.detail;
  // 敲完回车后 就不要高亮显示
  if (Object.keys(detail).length === 0) {
    activeIndex.value = null;
  }
};

onMounted(() => {});

// 使用 onLoad 钩子
onLoad(() => {
  getProvince().then((res) => {
    articleObj.province = res;
  });
});
</script>

<style lang="scss">
.ql-blank::before {
  font-style: normal;
  color: #e0e0e0;
}
.edit {
  padding: 20rpx;
  font-size: 28rpx;
  color: #333;
  .title {
    width: calc(100% - 20rpx); // 减去左右padding的总和
    padding: 10rpx;
    font-size: 28rpx;
    border: 1px solid #ddd;
    border-radius: 8rpx;
    margin-bottom: 20rpx;
  }
  .placeholderClass {
    color: #e0e0e0;
  }

  .content {
    margin-bottom: 20rpx;
    border: 1px solid #ddd;
    border-radius: 8rpx;
    overflow: hidden;

    .myEdit {
      height: calc(100vh - 500rpx);
    }

    // editor {
    //   width: 100%;
    //   min-height: 300rpx;
    //   padding: 10rpx;
    //   font-size: 26rpx;
    // }
  }

  .btnGroup {
    margin: 20rpx 0;

    wd-button {
      width: 100%;
      font-size: 26rpx;
      color: #fff;
      background-color: #409eff;
      border-radius: 8rpx;
    }

    wd-button[disabled] {
      background-color: #ccc;
      color: #999;
    }
  }

  .tools {
    display: flex;
    justify-content: space-around;
    margin-top: 20rpx;

    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50rpx;
      height: 50rpx;
      font-size: 26rpx;
      color: #11f011;
      uni-icons {
        transition: color 0.3s;
        font-size: 36rpx;
      }

      .default-icon {
        color: #333;
      }

      .active-icon {
        // color: #409eff !important;
        text {
          color: #409eff !important;
        }
      }
    }
  }
}
</style>
