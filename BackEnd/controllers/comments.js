const Comment = require('../models/comments.js');
const fs = require('fs');

exports.createNewComment = (req, res, next) => {
  const commentObject = new Comment({
        comment: req.body.comment,
        article_id: req.body.article_id,
        imageComment: req.body.imageComment, 
        user_id: req.body.user_id

    });
  const comment = new Comment({
    ...commentObject,
    imageComment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  Comment.createNewComment(comment, (err, data) => {
        if (err)
            res.status(500).json({ message: "Commentaire non créé !" })
        else res.send(data)
    })
};

exports.getOneComment = (req, res, next) => {
  Comment.getOneComment(req.params.id, (err, comment) => {
        if (err) {
            res.status(500).send({ message: "Aucun Commentaire trouvé !" + err });
        }
        else {
            res.send(comment)
          }
        })
};

exports.modifyComment = (req, res, next) => {
   const commentObject = {...req.body};

  Comment.updateComment(req.params.id, commentObject, (err,data)=>{
    if(err){
     res.status(500).json({ error });
   }
   else{
     res.json({message:"Commentaire modifié avec succès !"})
   }

 })
};

exports.deleteComment = (req, res, next) => {

    Comment.deleteComment(req.params.id, (err, data) => {
        console.log(req.params.id);
        if (err) {
            if (err.kind === "Non trouvé !") {
                res.status(404).json({ message: "Commentaire introuvable avec l'id : " + req.params.id })
            } else {
                res.status(500).json({ message: "commentaire introuvable avec l'id : " + req.params.id })
            }
        } else res.json({ message: 'Commentaire supprimé avec succès !' })
    })
}


exports.getAllComment = (req, res, next) => {

    Comment.getAllComment((err, data) => {
        if (err)
            res.status(500).send({ message: "Commentaire non trouvé" + err });
        else res.send(data);
    });
};
