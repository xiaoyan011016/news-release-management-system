const ProductModel = require('../../models/ProductModel.js')

const ProductServices = {
  getList: async () => {
    return ProductModel.find({})
  }
}

module.exports = ProductServices