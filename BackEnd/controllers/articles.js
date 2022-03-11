const Article = require('../models/articles');
const Comment = require('../models/comments');
const fs = require('fs');
const jwtUtils = require('../utils/jwt.utils');

exports.createArticle = (req, res, next) => {
  const articleObject = new Article({
        title: req.body.title,
        message: req.body.message,
        user_id: req.body.user_id

    });
  delete articleObject._id;
  const article = new Article({
    ...articleObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  Article.create(article, (err, data) => {
        if (err)
            res.status(500).json({ message: "Article non créé !" })
        else res.send(data)
    })

}; 

exports.getOneArticle = (req, res, next) => {
  Article.getOneArticle(req.params.id, (err, article) => {
        if (err) {
            res.status(500).send({ message: "Aucun Article trouvé !" + err });
        }
        else {
            res.send(article)
          }
        })
};

exports.modifyArticle = (req, res, next) => {
    const articleObject = {...req.body};
    const userId = jwtUtils.getUserId(req.headers["authorization"]);
    console.log(userId + "bonjour");
   Article.updateArticle(req.params.id, articleObject, (err,data)=>{
     if(err){
      res.status(500).json({ error });
    }
    else{
      res.json({message:"Article modifié avec succès !"})
    }
 
  })
 };


exports.removeArticle = (req, res, next) => {
  Article.removeArticle(req.params.id, (err, data) => {

        if (err) {
            if (err.kind === "Non trouvé !") {
                res.status(404).json({ message: "Article introuvable avec l'id : " + req.params.id })
            } else {
                res.status(500).json({ message: "Article introuvable avec l'id : " + req.params.id })
            }
        } else res.json({ message: 'Article supprimé avec succès !' })
    })
}


exports.getAllArticle = (req, res) => {

    Article.getAllArticle((err, articles) => {
        if (err)
            res.status(500).send({ message: "Aucun Article trouvé !" + err });
        else {

            //Récupération de tous les commentaires
            Comment.getAllComment((err, comments) => {
                if (err) {
                    res.status(500).send({ message: "Aucun commentaire trouvé !" + err });
                } else {
                    comments.forEach(comment => {
                      console.log(articles);

                       /*let article = articles.find(elt => elt.article_id === comment.article_id)
                        article.comments.push(comment)*/
                    })
                    res.send(articles)
                }
            }
            )
        }
    })
}
