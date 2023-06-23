// program to generate random strings

// declare all characters
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#';

module.exports.generateRandomPassword = (req, res, next) => {
  const randomPassword = generateString(8);
  req.body.password = randomPassword;
  req.body.passwordConfirm = randomPassword;
  next();
}

function generateString(length) {
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}