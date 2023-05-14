const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 定义约束
const UserType = {
  username: String,
  password: String,
  gender: Number, //性别 0=男，1=女
  introduction: String, //介绍
  avatar: String, //头像
  role: Number //区别管理员或普通用户A
}

const UserModel = mongoose.model('user', new Schema(UserType))

module.exports = UserModel