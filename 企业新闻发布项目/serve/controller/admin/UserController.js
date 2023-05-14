const UserServices = require('../../services/admin/UserServices.js')
const jwt = require('../../util/JWT.js')
const UserController = {
  login: async (req, res) => {
    const result = await UserServices.login(req.body)
    if (result.length === 0) {
      res.send({
        code: '-1',
        error: '用户名或密码错误'
      })
    } else {
      // 代表验证通过，初次设置token
      const token = jwt.sign({
        _id: result[0]._id,
        username: result[0].username
      }, '1d')
      // 给前端请求头发送token
      res.header("Authorization", token)

      res.send({
        ActionType: 'OK',
        userInfoData: {
          username: result[0].username,
          gender: result[0].gender ? result[0].gender : 0, // 0代表保密
          introduction: result[0].introduction, //为空的情况下并不会返回个前端
          avatar: result[0].avatar,
          role: result[0].role
        }
      })
    }
  },
  upload: async (req, res) => {
    const { username, gender, introduction } = req.body
    // 头token中解密出id,只要能到这里就代表之前的token验证成功，所以这里不需要验证步骤
    const token = req.headers['authorization'].split(' ')[1]
    const payload = jwt.verify(token)
    // 拼接文件路径
    const avatar = req.file ? `/avataruploads/${req.file.filename}` : ''

    await UserServices.upload({
      _id: payload._id,
      username,
      gender: Number(gender),
      introduction,
      avatar
    })
    if (avatar) {
      res.send({
        ActionType: 'OK',
        data: {
          username,
          gender: Number(gender),
          introduction,
          avatar //返回服务器静态资源下的头像路径
        }
      })
    } else {
      res.send({
        ActionType: 'OK',
        data: {
          // 不更新上一次的头像数据
          username,
          gender: Number(gender),
          introduction,
        }
      })
    }

  },
  add: async (req, res) => {
    const { username, password, role, introduction, gender } = req.body
    const avatar = req.file ? `/avataruploads/${req.file.filename}` : ''
    await UserServices.add({ username, password, role: Number(role), introduction, gender, avatar })
    res.send({
      ActionType: 'OK'
    })
  },
  getList: async (req, res) => {
    const result = await UserServices.getList(req.params)
    res.send({
      ActionType: 'OK',
      data: result
    })
  },
  putList: async (req, res) => {
    await UserServices.putList({ ...req.body, ...req.params })
    res.send({
      ActionType: 'OK'
    })
  },
  deleteList: async (req, res) => {
    await UserServices.deleteList({ _id: req.params.id })
    res.send({
      ActionType: 'OK'
    })
  }
}

module.exports = UserController