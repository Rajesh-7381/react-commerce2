
const bcrypt = require('bcrypt');

function checkPassword(password, hashedPassword, callback) {
  bcrypt.compare(password, hashedPassword, (err, isValid) => {
    callback(err, isValid);
  });
}

module.exports = { checkPassword };