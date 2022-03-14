const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwtUtils = require('jsonwebtoken');;
const MaskData = require('maskdata');
const Joi = require('joi');



exports.signup = (req, res) => {

    
    if (!req.body) {
        res.status(400).json({ message: "Erreur !" })
    }
    //Hashage du MDP
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
        
            /*const emailMask2Options = {
                maskWith: "*", 
                unmaskedStartCharactersBeforeAt: 3,
                unmaskedEndCharactersAfterAt: 1,
                maskAtTheRate: false
            };
            
            const mail = req.body.mail;
            
            const maskedEmail = MaskData.maskEmail2(mail, emailMask2Options);

            const schema = Joi.object({
                username: Joi.string()
                    .alphanum()
                    .min(3)
                    .max(30)
                    .required(),
            
                password: Joi.string()
                    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
            
                repeat_password: Joi.ref('password'),
            
            
                mail: Joi.string()
                    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'fr'] } })
            })
                .with('username', 'mail')
                .xor('password', 'mail')
                .with('password', 'repeat_password');
            
            
            schema.validate({});*/
        

            const userObject = new User({
                mail: req.body.mail,
                password: hash,
                username: req.body.username,
                imageProfil : req.body.imageProfil,
                isAdmin : req.body.isAdmin 
            }) 
            
            const user = new User({
                ...userObject,
                imageProfil: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
             });
        
             
            User.create(user, (err, data) => {
                if (err)
                    res.status(500).json({ message: "Utilisateur non crée !" + err })
                else res.send(data);
            })
            
        }).catch(err => res.status(500).json({ message: "Il y a une erreur :" + err }))

}  

exports.login = (req, res) => {
    User.findOneUser(req.body.mail, (err, user) => {
        if (err) {
            res.status(400).json({ message: err })
        }
        else { 
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        res.status(401).json({ message: "Mot de passe incorrect !" })
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jwtUtils.sign({ userId: user.id }, 'RANDOM_TOKEN_SECRET', {
                            expiresIn: '6h'
                        })
                    })
                })
        }
    }
    )
} 


exports.findOneUser = (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
        if (err) {
            res.status(500).send({ message: "Aucun Utilisateur trouvé !" + err });
        }
        else {
            res.send(user)
          }
        })
};


exports.modifyUser = (req, res, next) => {
  
    const userObject = {...req.body};
    
  User.updateUser(req.params.id, userObject, (err,data)=>{
    if(err){
     res.status(500).json({ error });
   }
   else{
       const userObject = req.file ?
    {
      ...JSON.parse(req.body.user),
      imageProfil: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
     res.json({message:"Utilisateur modifié avec succès !"})
   }

 })
    
};


 

exports.deleteUser = (req, res, next) => {
  User.deleteUser(req.params.id, (err,data)=>{
    if(err){
     res.status(500).json({ error });
   }
   else{
     res.json({message:"Utilisateur supprimé avec succès !"})
   }

 })
}



exports.getAllUsers = (req, res, next) => {

      User.getAllUsers((err, data) => {
          if (err)
              res.status(500).send({ message: "Utilisateur non trouvé" + err });
          else res.send(data);
      });
  };
