const jwt = require('jsonwebtoken');
require('dotenv').config()

const isTokenValid = (token, type) => {
  try {
    const secretKey = type === 'ACCESS_TOKEN' ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET; 
    const isValid = jwt.verify(token, secretKey);
    if (isValid) return true
    return false
  }
  catch (err) {
    return false;
  }
}

module.exports = {
  isTokenValid
}