"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_wd_skeleton2 = common_vendor.resolveComponent("wd-skeleton");
  const _easycom_blog_item2 = common_vendor.resolveComponent("blog-item");
  const _easycom_wd_tab2 = common_vendor.resolveComponent("wd-tab");
  const _easycom_wd_tabs2 = common_vendor.resolveComponent("wd-tabs");
  const _easycom_wd_button2 = common_vendor.resolveComponent("wd-button");
  const _easycom_wd_fab2 = common_vendor.resolveComponent("wd-fab");
  (_easycom_wd_skeleton2 + _easycom_blog_item2 + _easycom_wd_tab2 + _easycom_wd_tabs2 + _easycom_wd_button2 + _easycom_wd_fab2)();
}
const _easycom_wd_skeleton = () => "../../uni_modules/wot-design-uni/components/wd-skeleton/wd-skeleton.js";
const _easycom_blog_item = () => "../../components/blog-item/blog-item.js";
const _easycom_wd_tab = () => "../../uni_modules/wot-design-uni/components/wd-tab/wd-tab.js";
const _easycom_wd_tabs = () => "../../uni_modules/wot-design-uni/components/wd-tabs/wd-tabs.js";
const _easycom_wd_button = () => "../../uni_modules/wot-design-uni/components/wd-button/wd-button.js";
const _easycom_wd_fab = () => "../../uni_modules/wot-design-uni/components/wd-fab/wd-fab.js";
if (!Math) {
  (_easycom_wd_skeleton + _easycom_blog_item + _easycom_wd_tab + _easycom_wd_tabs + _easycom_wd_button + _easycom_wd_fab)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const db = common_vendor.Vs.database();
    const tab = common_vendor.ref(0);
    const navActiveIndex = common_vendor.ref(0);
    const navList = [
      { name: "最新", type: "publish_date" },
      { name: "热门", type: "view_count" }
    ];
    const dataList = common_vendor.ref([1, 2, 3]);
    const isSkeletonShow = common_vendor.ref(true);
    const handleClick = (e) => {
      isSkeletonShow.value = true;
      navActiveIndex.value = e.index;
      dataList.value = [];
      getData();
    };
    const handleFabClick = () => {
      console.log(111);
      common_vendor.index.navigateTo({
        url: "/pages/edit/edit"
      });
    };
    const getData = () => {
      common_vendor.index.showLoading({
        title: "数据加载中..."
      });
      let articleTemp = db.collection("quanzi_article").field(
        `title,user_id,description,
  picurls,comment_count,like_count,view_count,publish_date`
      ).getTemp();
      let userTemp = db.collection("uni-id-users").field("_id,username,nickname,avatar_file").getTemp();
      db.collection(articleTemp, userTemp).orderBy(navList[navActiveIndex.value].type, "desc").get().then((res) => {
        common_vendor.index.hideLoading();
        console.log("res", res.result);
        if (res.result.errCode === 0)
          dataList.value = res.result.data;
        isSkeletonShow.value = false;
        console.log(res, "res--getData");
      }).catch((err) => {
        common_vendor.index.hideLoading();
        console.log(err, "err");
      });
    };
    getData();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(navList, (item, k0, i0) => {
          return {
            a: "fde66112-2-" + i0 + "," + ("fde66112-1-" + i0),
            b: common_vendor.f(dataList.value, (item2, index, i1) => {
              return {
                a: "fde66112-3-" + i0 + "-" + i1 + "," + ("fde66112-1-" + i0),
                b: common_vendor.p({
                  blogItem: item2
                }),
                c: index
              };
            }),
            c: "fde66112-1-" + i0 + ",fde66112-0",
            d: common_vendor.p({
              title: item.name
            }),
            e: item
          };
        }),
        b: common_vendor.p({
          animation: "gradient",
          theme: "paragraph"
        }),
        c: isSkeletonShow.value,
        d: common_vendor.o(handleClick),
        e: common_vendor.o(($event) => tab.value = $event),
        f: common_vendor.p({
          inactiveColor: "#888",
          modelValue: tab.value
        }),
        g: common_vendor.p({
          icon: "edit-1",
          type: "icon"
        }),
        h: common_vendor.o(handleFabClick),
        i: common_vendor.p({
          position: "right-bottom",
          expandable: false
        })
      };
    };
  }
});
wx.createPage(_sfc_main);
