const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'public/avataruploads/' })

const UserController = require('../../controller/admin/UserController.js')

// 只负责路由控制，逻辑代码交给控制才能
router.post('/adminapi/user/login', UserController.login)

router.post('/adminapi/user/upload', upload.single('file'), UserController.upload)

router.post('/adminapi/user/add', upload.single('file'), UserController.add)

router.get('/adminapi/user/list', UserController.getList)

router.get('/adminapi/user/list/:id', UserController.getList)

router.put('/adminapi/user/list/:id', UserController.putList)

//RESTful的设计风格，即路径一致，但http的请求方式不同
router.delete('/adminapi/user/list/:id', UserController.deleteList)

module.exports = router