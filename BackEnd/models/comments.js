const sql = require('../connexion.js');

const Comment = function(comment) {
  this.id = comment.id,
  this.comment = comment.comment,
  this.imageComment = comment.imageComment,
  this.user_id = comment.user_id,
  this.article_id = comment.article_id,
  this.date_comment = comment.date
};


// Création d'un commentaire

Comment.createNewComment = (newComment, result) => {
    sql.query(`INSERT INTO Comment (comment, imageComment, article_id, user_id, date_comment) VALUES ("${newComment.comment}","${newComment.imageComment}","${newComment.article_id}","${newComment.user_id}", Now())`, (err, res) => {
        if (err) {
            console.log("erreur: ", err);
            result(err, null);
            return;
        }
        console.log("Création du commentaire : ", { id: res.insertId, ...newComment });
        result(null, { id: res.insertId, ...newComment });
    });
};

// Récupération de tous les commentaires

Comment.getAllComment = result => {
    sql.query(`SELECT comment.id, comment.article_id, comment.comment, comment.imageComment, comment.date_comment, comment.user_id, user.username FROM Comment INNER JOIN User ON comment.user_id = user.id ORDER BY date_comment DESC`, (err, res) => {
      if (err) {
            console.log("erreur: ", err);
            result(null, err);
            return;
        }
        let comments = [];
        comments = res.map(element => {
            let content = new Comment(element)
            content.author = {
                username: element.username,
            }
            return comments;
        })
        result(null, res);
    });
};

//Récupération d'un seul commentaires

Comment.getOneComment = (commentId, result) => {
    sql.query(`SELECT * FROM Comment WHERE id = ${commentId} ORDER BY date_comment DESC`,
        (err, res) => {
            if (err) {
                console.log("erreur: ", err);
                result(err, null);
                return;
            }
            else {
                console.log("Commentaire trouvé ! : ", res);
                result(null, res);
                return;
            }
        })
};

//Modification du commentaire

Comment.updateComment = (id, Comment, result) => {
    sql.query(`UPDATE Comment SET comment= ?, imageComment= ?, article_id = ? WHERE id= ? INNER JOIN User ON user.id = comment.user_id`,
    [Comment.comment, Comment.imageComment, Comment.article_id, Comment.id, Comment.user_id]
    , (err, res) => {
        if (err) throw err;

        result(null, res);

    })
};


// Suppression d'un commentaire en fonction de son ID

Comment.deleteComment = (id, result) => {
    sql.query("DELETE FROM Comment WHERE id = ? INNER JOIN User ON user.id = comment.user_id", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // Aucun Utilisateur Trouvé 
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("Suppression du commentaire avec l'id: ", id);
        result(null, res);
    });
};


module.exports = Comment;
