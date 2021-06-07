const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
  catch (err) {
    return null;
  }
}

const hashPasswordPromise = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds)
    .then(salt => {
      bcrypt.hash(password, salt).then(hash => resolve(hash))
    })
    .catch(err => {
      reject(err);
    })
  });
}

const compareHashPassword = async (password, hashedPassword) => {
  try {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
  }
  catch (err) {
    return err
  }
}

module.exports = {
  hashPassword,
  hashPasswordPromise,
  compareHashPassword
}