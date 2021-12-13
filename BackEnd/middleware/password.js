const passwordValidator = require('password-validator');

module.exports = (req, res, next) => {
    try {
        const schema = new passwordValidator();
        schema
.is().min(8)                                    
.is().max(100)                                  
.has().uppercase()                              
.has().lowercase()                             
.has().digits(2)                                
.has().not().spaces()                           
.is().not().oneOf(['Passw0rd', 'Password123']);

console.log(schema.validate('validPASS123'));
// => true
console.log(schema.validate('invalidPASS'));
// => false

// Get a full list of rules which failed
console.log(schema.validate('joke', { list: true }));

      if (req.body.password && req.body.password !== schema) {
        throw 'Mot de Passe Incorrect !';
      } else {
        next();
      }
    } catch {
      res.status(401).json({
        error: new Error('Invalid request!')
      });
    }
  };
// Create a schema


// Add properties to it
 // Blacklist these values

// Validate against a password string
