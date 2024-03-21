const { model, Schema } = require('mongoose')

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  phone: String,
  createdAt: String
})

module.exports = model('User', userSchema)