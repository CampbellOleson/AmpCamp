const Validator = require('validator')
const validText = require("./valid-text")

module.exports = function validateLogin(data){
    data.email = validText(data.email) ? data.email : "";
    data.password = validText(data.password) ? data.password: "";

    // if (!Validator.isEmail(data.email)) {
    //     return { message: "Email is invalid", isValid: false };
    // }
    if (Validator.isEmpty(data.username)) {
        return { message: "Username Required", isValid: false };
    }
    if (Validator.isEmpty(data.password)) {
        return { message: "Password is required", isValid: false };
    }

    return {
        message: "",
        isValid: true
    }

}