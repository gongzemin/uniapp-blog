"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_tool = require("../../utils/tool.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
if (!Array) {
  const _easycom_wd_skeleton2 = common_vendor.resolveComponent("wd-skeleton");
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_wd_icon2 = common_vendor.resolveComponent("wd-icon");
  (_easycom_wd_skeleton2 + _easycom_uni_dateformat2 + _easycom_wd_icon2)();
}
const _easycom_wd_skeleton = () => "../../uni_modules/wot-design-uni/components/wd-skeleton/wd-skeleton.js";
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_wd_icon = () => "../../uni_modules/wot-design-uni/components/wd-icon/wd-icon.js";
if (!Math) {
  (_easycom_wd_skeleton + _easycom_uni_dateformat + _easycom_wd_icon)();
}
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const detailObj = common_vendor.reactive({});
    const loadingState = common_vendor.ref(true);
    const articleId = common_vendor.ref("");
    const db = common_vendor.Vs.database();
    const utilsObj = common_vendor.Vs.importObject("utilsObj", {
      customUI: true
    });
    common_vendor.ref([]);
    const likeTime = common_vendor.ref(null);
    const clickLike = async () => {
      if (!uni_modules_uniIdPages_common_store.store.hasLogin) {
        common_vendor.index.showModal({
          title: "登录后才可进行后续操作",
          success: (res) => {
            if (res.confirm) {
              common_vendor.index.navigateTo({
                url: "/" + common_vendor.pageJson.uniIdRouter.loginPage
              });
            }
          }
        });
      }
      let time = Date.now();
      if (time - likeTime.value < 2e3) {
        common_vendor.index.showToast({
          title: "操作太频繁，请稍后...",
          icon: "none"
        });
        return;
      }
      likeTime.value = time;
      detailObj.isLike ? detailObj.like_count-- : detailObj.like_count++;
      detailObj.isLike = !detailObj.isLike;
      likeFunc();
    };
    const likeFunc = async () => {
      let count = await db.collection("quanzi_like").where(`article_id=="${articleId.value}" && user_id==$cloudEnv_uid`).count();
      console.log(count.result, count.result.total, "count.result.total");
      if (count.result.total) {
        db.collection("quanzi_like").where(
          `article_id=="${articleId.value}"
		  && user_id==$cloudEnv_uid`
        ).remove();
        utilsObj.operation("quanzi_article", "like_count", articleId.value, -1);
      } else {
        db.collection("quanzi_like").add({
          article_id: articleId.value
        });
        utilsObj.operation("quanzi_article", "like_count", articleId.value, 1);
      }
    };
    const getData = () => {
      let artTemp = db.collection("quanzi_article").where(`_id=="${articleId.value}"`).getTemp();
      let userTemp = db.collection("uni-id-users").field("_id,username,nickname,avatar_file").getTemp();
      let likeTemp = db.collection("quanzi_like").where(`article_id=="${articleId.value}" && user_id==$cloudEnv_uid`).getTemp();
      console.log("likeTemp", likeTemp);
      console.log("store hasLogin", uni_modules_uniIdPages_common_store.store.hasLogin);
      let tempArr = [artTemp, userTemp];
      if (uni_modules_uniIdPages_common_store.store.hasLogin) {
        tempArr.push(likeTemp);
      }
      if (!articleId.value) {
        console.error("articleId 未定义");
        return;
      }
      db.collection(...tempArr).get({
        getOne: true
      }).then((res) => {
        loadingState.value = false;
        console.log(res.result.data, "res");
        if (res.errCode === 0) {
          if (res.result.data) {
            let isLike = false;
            if (uni_modules_uniIdPages_common_store.store.hasLogin)
              isLike = res.result.data._id.quanzi_like.length ? true : false;
            res.result.data.isLike = isLike;
            Object.assign(detailObj, res.result.data);
            common_vendor.index.setNavigationBarTitle({
              title: detailObj.title
            });
          } else {
            errFunc();
          }
          console.log(detailObj, "res1");
        } else {
          console.error("数据为空或错误代码:", res.errCode);
        }
      }).catch((err) => {
        loadingState.value = false;
        errFunc();
        console.error("查询失败:", err);
      });
    };
    const readCountUpdate = () => {
      utilsObj.operation("quanzi_article", "view_count", articleId.value, 1);
    };
    const errFunc = () => {
      common_vendor.index.showToast({
        title: "参数有误",
        icon: "none"
      });
      setTimeout(() => {
        common_vendor.index.reLaunch({
          url: "/pages/index/index"
        });
      }, 1e3);
    };
    common_vendor.onLoad((e) => {
      if (!e.id) {
        errFunc();
        return;
      }
      articleId.value = e.id;
      getData();
      readCountUpdate();
      console.log(e, "onLoad", articleId.value);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: loadingState.value
      }, loadingState.value ? {
        b: common_vendor.p({
          animation: "gradient",
          theme: "paragraph"
        })
      } : common_vendor.e({
        c: Object.keys(detailObj).length
      }, Object.keys(detailObj).length ? common_vendor.e({
        d: common_vendor.t(detailObj.title),
        e: common_vendor.unref(utils_tool.getAvatar)(detailObj),
        f: common_vendor.t(common_vendor.unref(utils_tool.nickName)(detailObj)),
        g: common_vendor.p({
          date: detailObj.publish_date,
          format: "yyyy年MM月dd hh:mm"
        }),
        h: common_vendor.t(detailObj.province),
        i: detailObj.content,
        j: common_vendor.p({
          name: "thumb-up",
          size: "20"
        }),
        k: detailObj.like_count
      }, detailObj.like_count ? {
        l: common_vendor.t(detailObj.like_count)
      } : {}, {
        m: common_vendor.n(detailObj.isLike ? "active" : ""),
        n: common_vendor.o(clickLike),
        o: common_assets._imports_0$2,
        p: common_vendor.t(detailObj.view_count)
      }) : {}));
    };
  }
};
wx.createPage(_sfc_main);
