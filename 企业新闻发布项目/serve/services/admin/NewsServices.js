const NewsModel = require('../../models/NewsModel.js')

const NewsServices = {
  add: async ({ title, content, category, cover, isPublish, editTime }) => {
    return NewsModel.create({ title, content, category, cover, isPublish, editTime })
  },
  updateList: async ({ _id, title, content, category, isPublish, editTime, cover }) => {
    if (cover) {
      return NewsModel.updateOne({ _id }, { title, content, category, isPublish, editTime, cover })
    } else {
      return NewsModel.updateOne({ _id }, { title, content, category, isPublish, editTime })
    }
  },
  getList: async ({ _id }) => {
    //有id查找指定的，无id查找全部
    return _id ? NewsModel.find({ _id }) : NewsModel.find({})
  },
  publish: async ({ id, isPublish }) => {
    return NewsModel.updateOne({ _id: id }, { isPublish })
  },
  deleteList: async (id) => {
    return NewsModel.deleteOne({ _id: id })
  }
}

module.exports = NewsServices