const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, emailId, password } = req.body;
  if (!firstName.length) {
    throw new Error(" Missing name");
  } else if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("first name should be 4-50 chars");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email Id is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Bro give some strong password");
  }
};

const validateLogin = (req)=>{
  const {emailId , password } = req.body;

  if(!emailId || !password){
    throw new Error("Missing credentials");
  }else if(!validator.isEmail(emailId)){
    throw new Error("Invalid email id");
  }
}

module.exports = {
  validateSignUpData,
  validateLogin
};
