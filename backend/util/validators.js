const { parsePhoneNumberFromString } = require('libphonenumber-js');
const validator = require('validator');
module.exports.validateRegisterInput = (
  username,
  email,
  phone,
  yob,
  fullname,
  gender,
  password,
  confirmPassword
) => {
  const errors = {};


  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }   else if (!validator.isAlpha(username.replace(/\s/g, ''))) {
    errors.username = "Username must contain only letters";
  }

     if (fullname.trim() === "") {
    errors.fullname = "FullName must not be empty";
     }
    
  if (yob.trim() === "") {
    errors.yob = "YOB must be selected";
  }

  if (gender.trim() === "") {
    errors.gender = "Gender must be selected";
  }

  if (phone.trim() === "") {
    errors.phone = "Phone must not be empty";
  } else {
    try {
      const phoneNumber = parsePhoneNumberFromString(phone);
      if (!phoneNumber || !phoneNumber.isValid()) {
        errors.phone = "Phone must be a valid phone number";
      }
    } catch (error) {
      errors.phone = "Invalid phone number format";
    }
  }

  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const emailRegex = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(emailRegex)) {
      errors.email = "Email must be a valid email address";
    }
  }

  if (password === "") {
    errors.password = "Password must not be empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (username, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "Username must not be empty";
  }
  if (password.trim() === "") {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
