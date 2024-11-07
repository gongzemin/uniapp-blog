<template>
  <view>
    <button @click="createUser">创建用户</button>
    <button @click="goLogin">登录</button>
    <button @click="logout">退出登录</button>
    <button @click="gouserinfo">个人中心</button>
    <view>
      <uni-list>
        <uni-list-item
          v-for="item in listArr"
          :title="item.title"
          :thumb="item.userid.length && item.userid[0].avatar_file.url"
          thumb-size="lg"
          :rightText="item.userid.length && item.userid[0].username"
          :note="item.content"></uni-list-item>
      </uni-list>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { mutations } from "@/uni_modules/uni-id-pages/common/store.js";

const db = uniCloud.database();
const dbCmd = db.command;
const createUser = async () => {
  try {
    // 动态传递用户数据
    const res = await uniCloud.callFunction({
      name: "addUser", // 云函数名称
      data: {
        username: "梅超风",
        email: "john@example.com",
        phone: "1234567890",
        password: "123456", // 在真实项目中应加密密码
        role: "user",
        age: 19,
      },
    });

    console.log("用户创建结果:", res);
  } catch (error) {
    console.error("云函数调用失败:", error);
  }
};

const gouserinfo = () => {
  uni.navigateTo({
    url: "/uni_modules/uni-id-pages/pages/userinfo/userinfo",
  });
};

const getUser = () => {
  db.collection("users")
    .where("age >= 30")
    .get()
    .then((res) => {
      console.log("users", res);
    });
};

const goLogin = () => {
  uni.navigateTo({
    url: "/uni_modules/uni-id-pages/pages/login/login-withpwd",
  });
};

const listArr = ref([]);
const getData = () => {
  let artTemp = db
    .collection("cloudDemo")
    .field("title,content,userid")
    .getTemp();
  let userTemp = db
    .collection("uni-id-users")
    .field("_id,username,avatar_file,nickname")
    .getTemp();

  db.collection(artTemp, userTemp)
    .get()
    .then((res) => {
      listArr.value = res.result.data;
      console.log(res, "周六");
    });
  // db.collection("cloudDemo")
  //   .get()
  //   .then((res) => {
  //     console.log(res);
  //     listArr.value = res.result.data;
  //   });
};

const logout = () => {
  mutations.logout();
};
getData();
getUser();
</script>

<style>
/* 样式代码 */
</style>
