const ProductModel = require('../../models/ProductModel')

const ProductServices = {

  add: async ({ title, introduction, detail, cover, editTime }) => {
    return ProductModel.create({ title, introduction, detail, cover, editTime })
  },
  getList: async ({ id }) => {
    return id ? ProductModel.find({ _id: id }) : ProductModel.find({})
  },

  updateList: async ({ _id, title, introduction, detail, cover, editTime }) => {
    if (cover) {
      return ProductModel.updateOne({ _id }, { _id, title, introduction, detail, cover, editTime })
    } else {
      return ProductModel.updateOne({ _id }, { _id, title, introduction, detail, editTime })
    }
  },

  deleteList: async (id) => {
    return ProductModel.deleteOne({ _id: id },)
  }
}

module.exports = ProductServices