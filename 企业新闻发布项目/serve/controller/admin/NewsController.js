const NewsServices = require("../../services/admin/NewsServices")

const NewsController = {
  add: async (req, res) => {
    const { title, content, category, isPublish } = req.body
    const cover = req.file ? `/newsuploads/${req.file.filename}` : ''
    await NewsServices.add({
      title,
      content,
      category: Number(category),
      cover,
      isPublish: Number(isPublish),
      editTime: new Date() //额外传递创建的时间
    })
    res.send({
      ActionType: 'OK'
    })
  },
  getList: async (req, res) => {
    const result = await NewsServices.getList({ _id: req.params.id })
    res.send({
      ActionType: 'OK',
      data: result
    })
  },
  updateList: async (req, res) => {
    const { title, content, category, isPublish, _id } = req.body
    const cover = req.file ? `/newsuploads/${req.file.filename}` : ''
    await NewsServices.updateList({
      _id,
      title,
      content,
      category: Number(category),
      isPublish: Number(isPublish),
      editTime: new Date(),
      cover
    })
    res.send({
      ActionType: 'OK'
    })
  },
  publish: async (req, res) => {
    await NewsServices.publish({ ...req.params, ...req.body })
    res.send({
      ActionType: 'OK'
    })
  },
  deleteList: async (req, res) => {
    await NewsServices.deleteList(req.params.id)
    res.send({
      ActionType: 'OK'
    })
  }
}

module.exports = NewsController