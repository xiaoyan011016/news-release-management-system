const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'public/productuploads/' })

const ProductController = require('../../controller/admin/ProductController.js')

router.post('/adminapi/product/add', upload.single('file'), ProductController.add)

router.get('/adminapi/product/list', ProductController.getList)

router.get('/adminapi/product/list/:id', ProductController.getList)

router.post('/adminapi/product/list', upload.single('file'), ProductController.updateList)

// router.put('/adminapi/user/list/:id', ProductController.putList)
router.delete('/adminapi/product/list/:id', ProductController.deleteList)

module.exports = router