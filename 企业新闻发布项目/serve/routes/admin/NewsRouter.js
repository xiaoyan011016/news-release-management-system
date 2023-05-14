const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'public/newsuploads/' })
const NewsController = require('../../controller/admin/NewsController.js')

router.post('/adminapi/news/add', upload.single('file'), NewsController.add)

router.get('/adminapi/news/list', NewsController.getList)

router.get('/adminapi/news/list/:id', NewsController.getList)

router.post('/adminapi/news/list', upload.single('file'), NewsController.updateList)

router.put('/adminapi/news/publish/:id', NewsController.publish)

router.delete('/adminapi/news/list/:id', NewsController.deleteList)

module.exports = router