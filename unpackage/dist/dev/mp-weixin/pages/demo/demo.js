"use strict";
const common_vendor = require("../../common/vendor.js");
const uni_modules_uniIdPages_common_store = require("../../uni_modules/uni-id-pages/common/store.js");
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list)();
}
const _sfc_main = {
  __name: "demo",
  setup(__props) {
    const db = common_vendor.Vs.database();
    db.command;
    const createUser = async () => {
      try {
        const res = await common_vendor.Vs.callFunction({
          name: "addUser",
          // 云函数名称
          data: {
            username: "梅超风",
            email: "john@example.com",
            phone: "1234567890",
            password: "123456",
            // 在真实项目中应加密密码
            role: "user",
            age: 19
          }
        });
        console.log("用户创建结果:", res);
      } catch (error) {
        console.error("云函数调用失败:", error);
      }
    };
    const gouserinfo = () => {
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/userinfo/userinfo"
      });
    };
    const getUser = () => {
      db.collection("users").where("age >= 30").get().then((res) => {
        console.log("users", res);
      });
    };
    const goLogin = () => {
      common_vendor.index.navigateTo({
        url: "/uni_modules/uni-id-pages/pages/login/login-withpwd"
      });
    };
    const listArr = common_vendor.ref([]);
    const getData = () => {
      let artTemp = db.collection("cloudDemo").field("title,content,userid").getTemp();
      let userTemp = db.collection("uni-id-users").field("_id,username,avatar_file,nickname").getTemp();
      db.collection(artTemp, userTemp).get().then((res) => {
        listArr.value = res.result.data;
        console.log(res, "周六");
      });
    };
    const logout = () => {
      uni_modules_uniIdPages_common_store.mutations.logout();
    };
    getData();
    getUser();
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(createUser),
        b: common_vendor.o(goLogin),
        c: common_vendor.o(logout),
        d: common_vendor.o(gouserinfo),
        e: common_vendor.f(listArr.value, (item, k0, i0) => {
          return {
            a: "79af7231-1-" + i0 + ",79af7231-0",
            b: common_vendor.p({
              title: item.title,
              thumb: item.userid.length && item.userid[0].avatar_file.url,
              ["thumb-size"]: "lg",
              rightText: item.userid.length && item.userid[0].username,
              note: item.content
            })
          };
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
