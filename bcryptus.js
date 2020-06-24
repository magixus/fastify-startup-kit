const bcrypt = require("bcrypt");
const saltRounds = 10;
const plainTextPassword1 = "DFGh5546*%^__90";

bcrypt
  .genSalt(saltRounds)
  .then(salt => {
    console.log(`Salt: ${salt}`);

    return bcrypt.hash(plainTextPassword1, salt);
  })
  .then(hash => {
    console.log(`Hash: ${hash}`);

    // Store hash in your password DB.
  })
  .catch(err => console.error(err.message));
  
  
  bcrypt
  .hash(plainTextPassword1, 10)
  .then(hash =>console.log(`Hash: ${hash}`) )
  .catch(err => console.error(err.message));

