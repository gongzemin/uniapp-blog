"use strict";
const common_vendor = require("../common/vendor.js");
function getImgSrc(richtext, num = 3) {
  let imgList = [];
  richtext.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, (match, capture) => {
    imgList.push(capture);
  });
  imgList = imgList.slice(0, num);
  return imgList;
}
function getProvince() {
  return new Promise((resolve, reject) => {
    let historyProvince = common_vendor.index.getStorageSync("historyProvince");
    console.log(historyProvince, "historyProvince");
    if (historyProvince) {
      console.log("走了缓存");
      if (Date.now() - historyProvince.time > 1e3 * 60 * 60) {
        console.log("走了重新请求逻辑");
        getIp().then((res) => {
          resolve(res);
        }).catch((err) => {
          reject(err);
        });
      } else {
        console.log("直接读取缓存");
        resolve(historyProvince.province);
      }
    } else {
      console.log("直接第一次走网络");
      getIp().then((res) => {
        resolve(res);
      }).catch((err) => {
        reject(err);
      });
    }
  });
}
function getIp() {
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      url: "https://restapi.amap.com/v3/ip?key=f0a4048989bf3e0650698d12d2cdc679",
      success: (res) => {
        let str = "";
        str = typeof res.data.province == "string" ? res.data.province : "未知";
        resolve(str);
        let obj = {
          province: str,
          time: Date.now()
        };
        common_vendor.index.setStorageSync("historyProvince", obj);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}
function nickName(item) {
  return item.user_id && item.user_id[0] ? item.user_id[0].nickname || item.user_id[0].username || item.user_id[0].mobile : "请设置昵称";
}
function getAvatar(item) {
  var _a, _b;
  return item.user_id && item.user_id[0] ? (_b = (_a = item.user_id[0]) == null ? void 0 : _a.avatar_file) == null ? void 0 : _b.url : "../../static/images/user-default.jpg";
}
exports.getAvatar = getAvatar;
exports.getImgSrc = getImgSrc;
exports.getProvince = getProvince;
exports.nickName = nickName;
