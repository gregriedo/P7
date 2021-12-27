const sql = require('../connexion.js');

const Article = function(article) {
  this.id = article.id,
  this.title = article.title,
  this.message = article.message,
  this.imageArticle = article.imageArticle,
  this.user_id = article.user_id,
  this.date_creation = article.date
 
};
//Création d'un article

Article.create = (newArticle, result) => {
    sql.query(`INSERT INTO Article (title, message, imageArticle, user_id, date_creation) VALUES ('${newArticle.title}','${newArticle.message}','${newArticle.imageArticle}','${newArticle.user_id}', Now()) `, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(err, null);
            return;
        }
        else{
          console.log("Création de l'article : ", { id: res.insertId, ...newArticle});
          result(null, { id: res.insertId, ...newArticle });
        }

    });
};

//Récupération de tous les articles
Article.getAllArticle = result => {
  sql.query(`SELECT article.id, article.title, article.message, article.imageArticle, article.date_creation, article.user_id, user.username FROM article INNER JOIN user ON article.user_id = user.id ORDER BY date_creation DESC`, (err, res) => {
      if (err) {
          console.log("erreur: ", err);
          result(null, err);
          return;
      }
      let articles = [];
      articles = res.map(element => {
          let topic = new Article(element)
          topic.author = {
              username: element.username,
          }
          return topic;
      })
      result(null, articles);
  });
};


// Récupération d'un article en fonction de son ID

Article.getOneArticle = (articleId, result) => {
    sql.query(`SELECT * FROM Article WHERE id = ${articleId} ORDER BY date_creation DESC`,
        (err, res) => {
            if (err) {
                console.log("erreur: ", err);
                result(err, null);
                return;
            }
            else {
                console.log("Article trouvé ! : ", res);
                result(null, res);
                return;
            }
        })
};

//Modification d'un article

Article.updateArticle= (id, Article, result) => {
    
    sql.query(`UPDATE Article SET title= ?, message= ?, imageArticle= ?, date_creation= ? WHERE id = ? INNER JOIN user ON  user.id = article.user_id`, 
    [Article.title, Article.message, Article.imageArticle, Article.date_creation, Article.id, Article.user_id]
    ,(err, res)=>{
        if (err) throw err;

        result(null, res); 
})
};


// Supression d'un article

Article.removeArticle = (id, result) => {
    sql.query("DELETE FROM Article WHERE id = ? INNER JOIN user ON article.user_id = user.id", id, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(null, err);
            return;
        }
        if (id === user.id) {
            console.log("Suppression de l'Article avec l'id : ", id);
        result(null, res);
        }
        
    });
};


module.exports = Article;
