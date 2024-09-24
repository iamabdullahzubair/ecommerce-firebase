function isEmail(input) {
  const emailRegex = /\S+@\S+\.\S+/; // Simple email regex
  return emailRegex.test(input);
}

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

function validatePassword(password) {
  return passwordRegex.test(password);
}

export {isEmail, validatePassword}