const jsonwebtoken = require('jsonwebtoken')
// 创建一个密钥
const secret = '我是你爷爷'
// 二次封装
const jwt = {
  sign(value, time) {
    return jsonwebtoken.sign(value, secret, { expiresIn: time })
  },
  verify(token) {
    try {
      return jsonwebtoken.verify(token, secret)
    } catch {
      return false
    }
  }
}
module.exports = jwt