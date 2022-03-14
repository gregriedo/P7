import React, {useEffect, useState} from 'react';
import "/Users/lhommesanscoeur/github/P7/FrontEnd/groupomania/src/styles/comment.css";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCommentIcon from '@mui/icons-material/AddComment';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Comment() {
    
    const [comments, setComments] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;
    const navigate = useNavigate();

  

    useEffect(() =>{
      const res = axios
      .get('http://localhost:3000/api/comments/',{ headers: {"Authorization" : `Bearer ${token}`} });
      res.then((data)=>{
        setComments(data.data);
      })
    }, [token]);

    const deleteComment = (e) =>{
      e.preventDefault();
       
       axios.delete(`http://localhost:3000/api/comments/${comments.id}`,{
         headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json',
           'authorization': 'Bearer ' + user.token,
         },
       })
       .then(() => {
        navigate("../userBoard", { replace: true });
        alert("Votre Commentaire a bien été supprimé!")
         window.location.reload();
         })
         .catch(function (error) {
           alert("Vous n'avez pas les droits pour utiliser cette fonction!")
           console.log(error);
         });
        }

    return (
        <div className='feed'>
        <div className='feedWrapper'>
        {comments.map((c) =>(
            <Card key={c.id}sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {c.username}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              subheader={c.date_creation}
            />
            <CardMedia
              component="img"
              height="194"
              src="{c.imageComment}"
              alt=""
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {c.message}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
            <IconButton href="/newComment" aria-label="reply">
              <AddCommentIcon />
            </IconButton>
            <IconButton aria-label="reply">
              <ThumbUpIcon />
            </IconButton>
            
            <IconButton onClick={deleteComment} aria-label="delete article">
            <DeleteIcon />
            </IconButton>
             
             
            </CardActions>
              </Card>
        ))}
        
        </div>
        
    </div>
    )
  }