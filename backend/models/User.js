const { model, Schema } = require('mongoose')

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  fullname: String,
  yob: String,
  age: String,
  gender: String,
  phone: String,
  createdAt: String
})

module.exports = model('User', userSchema)