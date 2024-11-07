"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_load_more2 = common_vendor.resolveComponent("uni-load-more");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_unicloud_db2 = common_vendor.resolveComponent("unicloud-db");
  (_easycom_uni_load_more2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_unicloud_db2)();
}
const _easycom_uni_load_more = () => "../../uni_modules/uni-load-more/components/uni-load-more/uni-load-more.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_unicloud_db = () => "../../node-modules/@dcloudio/uni-components/lib/unicloud-db/unicloud-db.js";
if (!Math) {
  (_easycom_uni_load_more + _easycom_uni_list_item + _easycom_uni_list + _easycom_unicloud_db)();
}
const _sfc_main = {
  __name: "demo1",
  setup(__props) {
    const udbRef = common_vendor.ref(null);
    const onRemove = (id) => {
      udbRef.value.remove(id);
    };
    const getData = () => {
      udbRef.value.loadData();
    };
    const addData = () => {
      let obj = {
        title: ` My mother keeps it by her bed. `,
        content: `My
mother is very like William Blake; she has visions and dreams and she cannot
always distinguish a flea’s head from a king. Luckily she can’t paint.`
      };
      udbRef.value.add(obj, {
        toastTitle: "新增成功",
        // toast提示语
        success: (res) => {
          udbRef.value.refresh();
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(getData),
        b: common_vendor.o(addData),
        c: common_vendor.w(({
          data,
          loading,
          error,
          options
        }, s0, i0) => {
          return common_vendor.e({
            a: error
          }, error ? {
            b: common_vendor.t(error.message)
          } : loading ? {
            d: "dfd5eba2-1-" + i0 + ",dfd5eba2-0",
            e: common_vendor.p({
              status: "loading"
            })
          } : {
            f: common_vendor.f(data, (item, k1, i1) => {
              return {
                a: common_vendor.o(($event) => onRemove(item._id)),
                b: "dfd5eba2-3-" + i0 + "-" + i1 + "," + ("dfd5eba2-2-" + i0),
                c: common_vendor.p({
                  title: item.title,
                  note: item.content,
                  thumb: item.userid.length && item.userid[0].avatar_file.url,
                  ["thumb-size"]: "lg",
                  rightText: item.userid.length && item.userid[0].username,
                  clickable: true
                })
              };
            }),
            g: "dfd5eba2-2-" + i0 + ",dfd5eba2-0"
          }, {
            c: loading,
            h: i0,
            i: s0
          });
        }, {
          name: "d",
          path: "c",
          vueId: "dfd5eba2-0"
        }),
        d: common_vendor.sr(udbRef, "dfd5eba2-0", {
          "k": "udbRef"
        }),
        e: common_vendor.p({
          collection: "cloudDemo,uni-id-users",
          orderby: "posttime desc, _id desc",
          field: "title,content,posttime,userid.username,userid.avatar_file",
          loadtime: "auto"
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
