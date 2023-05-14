const mongoose = require('mongoose')

// 连接数据库,并创建数据库名，其集合名为users
mongoose.connect('mongodb://127.0.0.1:27017/company-system')