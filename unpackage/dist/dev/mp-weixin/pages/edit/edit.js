"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_tool = require("../../utils/tool.js");
if (!Array) {
  const _easycom_wd_button2 = common_vendor.resolveComponent("wd-button");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  (_easycom_wd_button2 + _easycom_uni_icons2)();
}
const _easycom_wd_button = () => "../../uni_modules/wot-design-uni/components/wd-button/wd-button.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  (_easycom_wd_button + _easycom_uni_icons)();
}
const _sfc_main = {
  __name: "edit",
  setup(__props) {
    const db = common_vendor.Vs.database();
    const instance = common_vendor.getCurrentInstance();
    const articleObj = common_vendor.reactive({
      title: "",
      content: "",
      description: "",
      picurls: "",
      province: ""
    });
    const toolShow = common_vendor.ref(false);
    const toolList = [
      { icon: "" },
      { icon: "" },
      { icon: "" },
      { icon: "" },
      { icon: "" },
      { icon: "" }
    ];
    const activeIndex = common_vendor.ref(null);
    function setActiveIcon(idx) {
      if (activeIndex.value === idx) {
        activeIndex.value = null;
      } else {
        activeIndex.value = idx;
      }
      if (idx === 3) {
        editorCtx.value.insertDivider();
      } else if (idx === 0) {
        editorCtx.value.format("header", "h1");
      } else if (idx === 1) {
        editorCtx.value.format("bold");
      } else if (idx === 2) {
        editorCtx.value.format("italic");
      } else if (idx === 4) {
        common_vendor.index.chooseImage({
          success: async (res) => {
            console.log(res, "0");
            common_vendor.index.showLoading({
              title: "上传中请稍后"
            });
            const uploadTasks = res.tempFiles.map((item) => {
              return new Promise((resolve, reject) => {
                common_vendor.Vs.uploadFile({
                  url: "https://file-unigkiszew-mp-0f5589ad-8ec0-443d-bfcc-a8f38857fc78.oss-cn-zhangjiakou.aliyuncs.com",
                  filePath: item.path,
                  cloudPath: item.path.split("/").pop(),
                  // 获取路径中图片文件名部分
                  name: "file",
                  success: (uploadFileRes) => {
                    editorCtx.value.insertImage({
                      src: uploadFileRes.fileID
                    });
                    console.log(uploadFileRes, "2");
                    resolve();
                  },
                  fail: (err) => {
                    console.error("Upload failed:", err);
                    reject(err);
                  }
                });
              });
            });
            try {
              await Promise.all(uploadTasks);
            } catch (err) {
              console.error("One or more uploads failed:", err);
            } finally {
              common_vendor.index.hideLoading();
            }
          }
        });
      }
    }
    const onFocus = () => {
      toolShow.value = true;
    };
    const addData = () => {
      db.collection("quanzi_article").add({
        ...articleObj
      }).then((res) => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "发布成功"
        });
        setTimeout(() => {
          common_vendor.index.reLaunch({
            url: "/pages/index/index"
          });
        }, 800);
        console.log("res-add", res);
      }).catch((err) => {
        common_vendor.index.showToast({
          title: err
        });
      });
    };
    const onSubmit = () => {
      editorCtx.value.getContents({
        success: (res) => {
          articleObj.description = res.text.slice(0, 50);
          articleObj.content = res.html;
          articleObj.picurls = utils_tool.getImgSrc(res.html);
          console.log(articleObj, "articleObj");
          common_vendor.index.showLoading({
            title: "发布中..."
          });
          addData();
        }
      });
    };
    const editorCtx = common_vendor.ref(null);
    const onEditReady = () => {
      common_vendor.index.createSelectorQuery().in(instance.proxy).select("#editor").fields(
        {
          size: true,
          context: true
        },
        (res) => {
          editorCtx.value = res.context;
          console.log(res, editorCtx.value, "size-context");
        }
      ).exec();
    };
    const onStatuschange = (e) => {
      let detail = e.detail;
      if (Object.keys(detail).length === 0) {
        activeIndex.value = null;
      }
    };
    common_vendor.onMounted(() => {
    });
    common_vendor.onLoad(() => {
      utils_tool.getProvince().then((res) => {
        articleObj.province = res;
      });
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: articleObj.title,
        b: common_vendor.o(($event) => articleObj.title = $event.detail.value),
        c: common_vendor.o(onEditReady),
        d: common_vendor.o(onFocus),
        e: common_vendor.o(onStatuschange),
        f: common_vendor.o(onSubmit),
        g: common_vendor.p({
          block: true,
          plain: true,
          disabled: !articleObj.title.length
        }),
        h: toolShow.value
      }, toolShow.value ? {
        i: common_vendor.f(toolList, (item, idx, i0) => {
          return {
            a: common_vendor.t(item.icon),
            b: common_vendor.n(activeIndex.value === idx ? "active-icon" : "default-icon"),
            c: "02697ade-1-" + i0,
            d: idx,
            e: common_vendor.o(($event) => setActiveIcon(idx), idx)
          };
        }),
        j: common_vendor.p({
          size: "18",
          fontFamily: "iconfont"
        })
      } : {});
    };
  }
};
wx.createPage(_sfc_main);
