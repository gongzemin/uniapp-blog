<template>
  <view>
    <button @click="getData">加载</button>
    <button @click="addData">添加数据</button>
    <unicloud-db
      v-slot:default="{ data, loading, error, options }"
      collection="cloudDemo,uni-id-users"
      orderby="posttime desc, _id desc"
      field="title,content,posttime,userid.username,userid.avatar_file"
      loadtime="auto"
      ref="udbRef">
      <view v-if="error">{{ error.message }}</view>
      <view v-else-if="loading">
        <uni-load-more status="loading"></uni-load-more>
      </view>
      <view v-else>
        <uni-list>
          <uni-list-item
            v-for="item in data"
            :title="item.title"
            :note="item.content"
            :thumb="item.userid.length && item.userid[0].avatar_file.url"
            thumb-size="lg"
            :rightText="item.userid.length && item.userid[0].username"
            clickable
            @click="onRemove(item._id)"></uni-list-item>
        </uni-list>
      </view>
    </unicloud-db>
  </view>
</template>

<script setup>
import { ref } from "vue";
const udbRef = ref(null);

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
always distinguish a flea’s head from a king. Luckily she can’t paint.`,
  };
  udbRef.value.add(obj, {
    toastTitle: "新增成功", // toast提示语
    success: (res) => {
      // 新增成功后的回调
      const { code, message } = res;

      udbRef.value.refresh();
    },
  });
};
</script>

<style></style>
