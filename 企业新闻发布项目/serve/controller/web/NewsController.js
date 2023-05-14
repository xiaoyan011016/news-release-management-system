const NewsServices = require("../../services/web/NewsServices")

const NewsController = {
  getList: async (req, res) => {
    const result = await NewsServices.getList(req.params)
    res.send({
      ActionType: 'OK',
      data: result
    })
  },
  getTopList: async (req, res) => {
    const result = await NewsServices.getTopList(req.query)
    res.send({
      ActionType: 'OK',
      data: result
    })
  }
}

module.exports = NewsController