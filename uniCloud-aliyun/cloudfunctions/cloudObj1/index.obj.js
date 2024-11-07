// 云对象教程: https://uniapp.dcloud.net.cn/uniCloud/cloud-obj
// jsdoc语法提示教程：https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/129
const db = uniCloud.database();
module.exports = {
  _before: function () {
    // 通用预处理器
  },
  async get(num) {
    return await db.collection("sentence").limit(num).get();
  },
  add: async () => {
    await db.collection("sentence").add({
      sentenct_type: 1,
      content: `My mother and I walked on towards the hill that stood at the top of our street.
We lived in a town stolen from the valleys, a huddled place full of chimneys
and little shops and back-to-back houses with no gardens. The hills
surrounded us, and our own swept out into the Pennines, broken now and
again with a farm or a relic from the war.`,
      source: "Oranges are not the only fruit",
    });
  },
};
