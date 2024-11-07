"use strict";
const db = uniCloud.database();
exports.main = async (event, context) => {
  //event为客户端上传的参数
  console.log("event : ", event);
  // 接受客户端传递的数据
  const { username, email, phone, password, role, age } = event;
  // 检查必填函数是否存在
  if (!username || !email || !phone || !password || !role || !age) {
    return {
      code: 400,
      message: "缺少必需的参数",
    };
  }

  try {
    // 插入用户数据到users集合
    const res = await db.collection("users").add({
      username,
      email,
      phone,
      age,
      password, // 在真实项目中应加密密码
      role,
      created_at: new Date(),
      updated_at: new Date(),
    });
  } catch (error) {
    return {
      code: 500,
      message: "数据库操作失败",
      error,
    };
  }
  //返回数据给客户端
  return event;
};
