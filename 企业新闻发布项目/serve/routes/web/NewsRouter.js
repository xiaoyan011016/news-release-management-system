const express = require('express')
const NewsController = require('../../controller/web/NewsController')
const router = express.Router()

router.get('/webapi/news/list', NewsController.getList)
router.get('/webapi/news/list/:id', NewsController.getList)
router.get('/webapi/news/toplist', NewsController.getTopList)
module.exports = router