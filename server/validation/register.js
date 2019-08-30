const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateRegister(data) {
  let errors = {};

  data.username = validText(data.username) ? data.username : "";
  data.email = validText(data.email) ? data.email : "";
  data.password = validText(data.password) ? data.password : "";

  if (Validator.isEmpty(data.username)) {
    errors.username = "First name field is required";
  }
  if (!Validator.isLength(data.username, { min: 2, max: 30 })) {
    errors.username = "Username must be at least 2 characters!";
  }
  if (!Validator.isEmail(data.email)) {
    return { message: "Email is invalid", isValid: false };
  }
  if (Validator.isEmpty(data.email)) {
    return { message: "Email is required", isValid: false };
  }
  if (Validator.isEmpty(data.password)) {
    return { message: "Password can't be blank", isValid: false };
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
