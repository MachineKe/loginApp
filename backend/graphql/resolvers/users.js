const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../../models/User")
const { SECRET_KEY } = require("../../config")
const { UserInputError } = require("apollo-server")
const {
  validateRegisterInput, 
  validateLoginInput,
} = require("../../util/validators")

function generateToken(user) {
  return jwt.sign({
    id: user.id,
    email: user.email,
    username: user.username,
    gender: user.gender,
    // yob: user.yob,
  },
    SECRET_KEY,
  {expiresIn: "1h"}
  )
}

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password)
      
      if (!valid) {
        throw new UserInputError("Errors", {
          errors
        })
      }

      const user = await User.findOne({ username })
      if (!user) {
        errors.general = "User not found"
        throw new UserInputError("User not found", {errors})
      }

      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        errors.general = "Wrong credentials"
        throw new UserInputError("Wrong credentials", { errors })
      }
        const token = generateToken(user)
        return {
          ...user._doc,
          id: user._id,
          token,
        }
    },
    async register(
      _,
      {registerInput: {username,email,phone,password, confirmPassword,gender,yob}}
    ) {
      // Validate user data
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        phone,
        password,
        confirmPassword
      )

      if (!valid) {
        throw new UserInputError("Errors", {errors})
      }
      // Make sure user doesnt already exist
      const user = await User.findOne({ username })
      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is taken"
          },
        })
      }
      const emailfield = await User.findOne({ email })
      if (emailfield) {
         throw new UserInputError("Email in use", {
          errors: {
            email: "This email is registered"
          },
        })
      }
     const phonefield = await User.findOne({ phone })
      if (phonefield) {
         throw new UserInputError("Phone number in use", {
          errors: {
            phone: "This phone is registered"
          },
        })
      }

      // hash password and create an auth token
      password = await bcrypt.hash(password, 12)
      
      const newUser = new User({
        email,
        phone,
        username,
        // yob,
        gender,
        password,
        createdAt: new Date().toISOString(),
      })

      const res = await newUser.save()
      const token = generateToken(res)
   
      return {
        ...res._doc,
        id: res._id,
        token,
   }
    },
  },
}