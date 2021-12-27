const passwordValidator = require('password-validator');

        const passwordSchema = new passwordValidator();
        
        // Schema que doit respecter le mot de passe
        passwordSchema
          .is().min(5)                                    
          .is().max(10)                                  
          .has().uppercase()                              
          .has().lowercase()                             
          .has().digits(2)                                
          .has().not().spaces()                           
          .is().not().oneOf(['Passw0rd', 'Password123']);

      

   

     module.exports = (req, res, next) =>{
        if(passwordSchema.validate(req.body.password)){
          next();
        }else{
          return res.status(400).json({error:`Le Mot de Passe n'est pas assez Fort ${passwordSchema.validate('req.body.password', { list: true })}` }) 
        }
     }