const UserModel = require('../../models/UserModel.js')

const UserServices = {
  // 数据库查询设计异步操作
  login: async ({ username, passwrod }) => {
    // 返回一个数组
    return UserModel.find({
      username, passwrod
    })
  },
  upload: async ({ _id, username, gender, introduction, avatar }) => {
    if (avatar) {
      return UserModel.updateOne({ _id }, {
        username, gender, introduction, avatar
      })
    } else {
      return UserModel.updateOne({ _id }, {
        // 不更新上一次的头像数据
        username, gender, introduction
      })
    }
  },
  add: async ({ username, password, role, introduction, gender, avatar }) => {
    return UserModel.create({ username, password, role, introduction, gender, avatar })
  },
  getList: async ({ id }) => {
    // 然后id不存在，查找空对象则返回全部数据
    return id ? UserModel.find({ _id: id }) : UserModel.find({})
  },
  putList: async ({ username, password, role, introduction, gender, id }) => {
    return UserModel.updateOne({ _id: id }, { username, password, role, introduction, gender })
  },
  deleteList: async (id) => {
    return UserModel.deleteOne({ _id: id },)
  }
}

module.exports = UserServices