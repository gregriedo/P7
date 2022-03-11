const jwt = require('jsonwebtoken');

const RANDOM_TOKEN_SECRET = '<RANDOM_TOKEN_SECRET>';

// Exported functions
module.exports = {
  generateTokenForUser: function(userData) {
    return jwt.sign({
      userId: userData.id,
      isAdmin: userData.isAdmin
    },
    RANDOM_TOKEN_SECRET,
    {
      expiresIn: '1h'
    })
  },
  parseAuthorization: function(authorization) {
    return (authorization != null) ? authorization.replace('Bearer ', '') : null;
  },
  getUserId: function(authorization) {
    let userId = -1;
    let token = module.exports.parseAuthorization(authorization);
    if(token != null) {
      try {
        const jwtToken = jwt.verify(token, RANDOM_TOKEN_SECRET);
        if(jwtToken != null)
          userId = jwtToken.userId;
      } catch(err) { }
    }
    return userId;
  }
}