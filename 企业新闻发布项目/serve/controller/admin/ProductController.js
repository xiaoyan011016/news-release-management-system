const ProductServices = require('../../services/admin/ProductServices.js')
const ProductController = {
  add: async (req, res) => {
    const { title, introduction, detail } = req.body
    const cover = req.file ? `/productuploads/${req.file.filename}` : ''
    await ProductServices.add({ title, introduction, detail, cover, editTime: new Date() })
    res.send({
      ActionType: 'OK'
    })
  },
  getList: async (req, res) => {
    const result = await ProductServices.getList(req.params)
    res.send({
      ActionType: 'OK',
      data: result
    })
  },
  updateList: async (req, res) => {
    const { title, introduction, detail, _id } = req.body
    const cover = req.file ? `/productuploads/${req.file.filename}` : ''
    await ProductServices.updateList({
      _id,
      title,
      introduction,
      detail,
      editTime: new Date(),
      cover
    })
    res.send({
      ActionType: 'OK'
    })
  },
  deleteList: async (req, res) => {
    await ProductServices.deleteList({ _id: req.params.id })
    res.send({
      ActionType: 'OK'
    })
  }
}

module.exports = ProductController