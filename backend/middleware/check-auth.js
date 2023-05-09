const jwt = require('jsonwebtoken');

// https://www.udemy.com/course/angular-2-and-nodejs-the-practical-guide/learn/lecture/10541472#questions
module.exports = (req, res, next) => {
  try{
    const token = req.headers.authorization.split(' ')[1]; // Split after 'Bearer jfkldjfkldsjfdlsjfklds'

    const decodedToken = jwt.verify(token,'this_is_the_secret_server_token_that_is_used_to_verify_user_tokens');
    req.userData = {email: decodedToken.email, userId: decodedToken.userId};

    next();
    
  }catch (error) {
    res.status(401).json({message: 'Auth failed'})
  }
};