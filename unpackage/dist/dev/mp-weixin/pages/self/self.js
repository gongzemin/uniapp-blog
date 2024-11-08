"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
if (!Array) {
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_wd_icon2 = common_vendor.resolveComponent("wd-icon");
  (_easycom_uni_dateformat2 + _easycom_wd_icon2)();
}
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_wd_icon = () => "../../uni_modules/wot-design-uni/components/wd-icon/wd-icon.js";
if (!Math) {
  (_easycom_uni_dateformat + _easycom_wd_icon)();
}
const _sfc_main = {
  __name: "self",
  setup(__props) {
    const groupList1 = [
      { name: "我的长文", id: "myArticle" },
      { name: "我的点赞", id: "myLike" },
      { name: "评论过的" }
    ];
    const groupList2 = [{ name: "关于" }, { name: "意见反馈" }];
    const userInfo = common_vendor.computed(() => uni_modules_uniIdPages_common_store.store.userInfo);
    const hasLogin = common_vendor.computed(() => uni_modules_uniIdPages_common_store.store.hasLogin);
    const clickItem = (item) => {
      if ((item == null ? void 0 : item.id) == "myArticle") {
        common_vendor.index.navigateTo({
          url: "/pages/quanzi_article/list"
        });
      } else if (item.id == "myLike") {
        common_vendor.index.navigateTo({
          url: "/pages/quanzi_like/list"
        });
      }
      console.log(item, "item");
    };
    const goLoginPage = () => {
      if (!hasLogin.value) {
        common_vendor.index.showToast({
          title: "未登录",
          icon: "none"
        });
        return true;
      }
      return false;
    };
    const logout = () => {
      console.log("logout");
      if (goLoginPage())
        return;
      common_vendor.index.showModal({
        title: "是否确认退出",
        success: (res) => {
          console.log(res);
          if (res.confirm) {
            uni_modules_uniIdPages_common_store.mutations.logout();
          }
        }
      });
    };
    const toUserInfo = () => {
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/userinfo/userinfo"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: hasLogin.value && userInfo.value.avatar_file && userInfo.value.avatar_file.url
      }, hasLogin.value && userInfo.value.avatar_file && userInfo.value.avatar_file.url ? {
        b: userInfo.value.avatar_file.url
      } : {
        c: common_assets._imports_0$1
      }, {
        d: hasLogin.value
      }, hasLogin.value ? {
        e: common_vendor.t(userInfo.value.nickname || userInfo.value.username || userInfo.value.mobile || "请设置昵称"),
        f: common_vendor.p({
          date: userInfo.value.register_date,
          threshold: [3600, 99 * 365 * 24 * 60 * 60 * 1e3]
        })
      } : {}, {
        g: common_vendor.p({
          name: "arrow-right",
          size: "22px"
        }),
        h: common_vendor.o(toUserInfo),
        i: hasLogin.value && userInfo.value.avatar_file && userInfo.value.avatar_file.url
      }, hasLogin.value && userInfo.value.avatar_file && userInfo.value.avatar_file.url ? {
        j: userInfo.value.avatar_file.url
      } : {
        k: common_assets._imports_0$1
      }, {
        l: common_vendor.f(groupList1, (item, idx, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: "5be11bd1-2-" + i0,
            c: idx,
            d: common_vendor.o(($event) => clickItem(item), idx)
          };
        }),
        m: common_vendor.p({
          name: "arrow-right",
          size: "22px"
        }),
        n: common_vendor.f(groupList2, (item, idx, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: "5be11bd1-3-" + i0,
            c: idx,
            d: common_vendor.o(($event) => clickItem(item), idx)
          };
        }),
        o: common_vendor.p({
          name: "arrow-right",
          size: "22px"
        }),
        p: common_vendor.p({
          name: "arrow-right",
          size: "22px"
        }),
        q: common_vendor.o(logout)
      });
    };
  }
};
wx.createPage(_sfc_main);
