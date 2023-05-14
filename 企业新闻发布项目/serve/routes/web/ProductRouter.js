const express = require('express')
const ProductController = require('../../controller/web/ProductController')
const router = express.Router()

router.get('/webapi/product/list', ProductController.getList)

module.exports = router