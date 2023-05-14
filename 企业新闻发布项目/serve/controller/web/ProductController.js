const ProductServices = require("../../services/web/ProductServices")

const ProductController = {
  getList: async (req, res) => {
    const result = await ProductServices.getList()
    res.send({
      ActionType: 'OK',
      data: result
    })
  }
}

module.exports = ProductController