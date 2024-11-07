//获取富文本内的图片url地址
export function getImgSrc(richtext, num = 3) {
  let imgList = [];
  richtext.replace(/<img [^>]*src=['"]([^'"]+)[^>]*>/g, (match, capture) => {
    imgList.push(capture);
  });
  imgList = imgList.slice(0, num);
  return imgList;
}

// 向外导出省份
export function getProvince() {
  return new Promise((resolve, reject) => {
    let historyProvince = uni.getStorageSync("historyProvince");
    console.log(historyProvince, "historyProvince");
    if (historyProvince) {
      // 如果大于1小时 就重新请求
      console.log("走了缓存");
      if (Date.now() - historyProvince.time > 1000 * 60 * 60) {
        console.log("走了重新请求逻辑");
        getIp()
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        console.log("直接读取缓存");
        resolve(historyProvince.province);
      }
    } else {
      console.log("直接第一次走网络");
      getIp()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}

// 获取所在省市
function getIp() {
  return new Promise((resolve, reject) => {
    uni.request({
      url: "https://restapi.amap.com/v3/ip?key=f0a4048989bf3e0650698d12d2cdc679",
      success: (res) => {
        let str = "";
        str = typeof res.data.province == "string" ? res.data.province : "未知";
        resolve(str);
        let obj = {
          province: str,
          time: Date.now(),
        };
        uni.setStorageSync("historyProvince", obj);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}

//向外导出省份
export function getProvince1() {
  return new Promise((resolve, reject) => {
    let historyProvince = uni.getStorageSync("historyProvince");
    if (historyProvince) {
      if (Date.now() - historyProvince.time > 1000 * 60 * 60) {
        getIp()
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      } else {
        resolve(historyProvince.province);
      }
    } else {
      getIp()
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
}

//获取所在省市
function getIp1() {
  return new Promise((resolve, reject) => {
    uni.request({
      url: "https://restapi.amap.com/v3/ip?key=4a43fb1fc001e386a52215b6feea63f4",
      success: (res) => {
        let str = "";
        typeof res.data.province == "string"
          ? (str = res.data.province)
          : (str = "火星");
        resolve(str);
        let obj = {
          province: str,
          time: Date.now(),
        };
        uni.setStorageSync("historyProvince", obj);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}

// 获取昵称
export function nickName(item) {
  return item.user_id && item.user_id[0]
    ? item.user_id[0].nickname ||
        item.user_id[0].username ||
        item.user_id[0].mobile
    : "请设置昵称";
}

// 获取头像
export function getAvatar(item) {
  return item.user_id && item.user_id[0]
    ? item.user_id[0]?.avatar_file?.url
    : "../../static/images/user-default.jpg";
}
