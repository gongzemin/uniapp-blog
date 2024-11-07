"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_tool = require("../../utils/tool.js");
if (!Array) {
  const _easycom_uni_dateformat2 = common_vendor.resolveComponent("uni-dateformat");
  const _easycom_wd_button2 = common_vendor.resolveComponent("wd-button");
  const _easycom_wd_icon2 = common_vendor.resolveComponent("wd-icon");
  (_easycom_uni_dateformat2 + _easycom_wd_button2 + _easycom_wd_icon2)();
}
const _easycom_uni_dateformat = () => "../../uni_modules/uni-dateformat/components/uni-dateformat/uni-dateformat.js";
const _easycom_wd_button = () => "../../uni_modules/wot-design-uni/components/wd-button/wd-button.js";
const _easycom_wd_icon = () => "../../uni_modules/wot-design-uni/components/wd-icon/wd-icon.js";
if (!Math) {
  (_easycom_uni_dateformat + _easycom_wd_button + _easycom_wd_icon)();
}
const _sfc_main = {
  __name: "blog-item",
  props: {
    blogItem: {
      default: () => {
      }
    }
  },
  setup(__props) {
    common_vendor.ref([1, 2]);
    const props = __props;
    const clickImg = (index) => {
      common_vendor.index.previewImage({
        current: index,
        urls: props.blogItem.picurls
      });
    };
    const goDetail = () => {
      common_vendor.index.navigateTo({
        url: `/pages/detail/detail?id=${props.blogItem._id}`
      });
    };
    return (_ctx, _cache) => {
      var _a, _b;
      return common_vendor.e({
        a: common_vendor.unref(utils_tool.getAvatar)(__props.blogItem),
        b: common_vendor.t(common_vendor.unref(utils_tool.nickName)(__props.blogItem)),
        c: common_vendor.p({
          date: __props.blogItem.publish_date,
          format: "MM月dd hh:mm",
          threshold: [6e4, 36e5 * 24 * 30]
        }),
        d: common_vendor.p({
          icon: "ellipsis",
          type: "icon"
        }),
        e: common_vendor.t(__props.blogItem.title),
        f: common_vendor.o(goDetail),
        g: __props.blogItem.description
      }, __props.blogItem.description ? {
        h: common_vendor.t(__props.blogItem.description),
        i: common_vendor.o(goDetail)
      } : {}, {
        j: (_a = __props.blogItem.picurls) == null ? void 0 : _a.length
      }, ((_b = __props.blogItem.picurls) == null ? void 0 : _b.length) ? {
        k: common_vendor.f(__props.blogItem.picurls, (pic, index, i0) => {
          return {
            a: pic,
            b: common_vendor.o(($event) => clickImg(index), index),
            c: index
          };
        }),
        l: common_vendor.n(__props.blogItem.picurls && __props.blogItem.picurls.length == 1 ? "only" : "")
      } : {}, {
        m: common_vendor.p({
          name: "browse",
          size: "20"
        }),
        n: common_vendor.t(__props.blogItem.view_count),
        o: common_vendor.p({
          name: "chat",
          size: "20"
        }),
        p: common_vendor.t(__props.blogItem.comment_count ? __props.blogItem.comment_count : "评论"),
        q: common_vendor.o(goDetail),
        r: common_vendor.p({
          name: "thumb-up",
          size: "20"
        }),
        s: common_vendor.t(__props.blogItem.like_count ? __props.blogItem.like_count : "点赞")
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ed6c1afa"]]);
wx.createComponent(Component);
