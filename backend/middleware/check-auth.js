const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try{
    const token = req.headers.authorization.split(' ')[1]; // Split after 'Bearer jfkldjfkldsjfdlsjfklds'

    jwt.verify(
      token,
      'this_is_the_secret_server_token_that_is_used_to_verify_user_tokens'
    );
    
    next();
    
  }catch (error) {
    res.status(401).json({message: 'Auth failed'})
  }


};