import React, {useEffect, useState} from 'react';
import '../styles/feed.css';
import Comment from '../pages/comment';
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


export default function Feed() {
    const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
   const [posts, setPosts] = useState([]);
   const navigate = useNavigate();
  

   useEffect(() =>{
    const res = axios
    .get('http://localhost:3000/api/articles/',{ headers: {"Authorization" : `Bearer ${token}`} })
    res.then((data)=>{
      setPosts(data.data);
    })
  }, [token]);

  const deletePost = (e) =>{
    e.preventDefault();
     
     axios.delete(`http://localhost:3000/api/article/${posts.id}`,{
       headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json',
         'authorization': 'Bearer ' + user.token,
       },
     })
     .then(() => {
      navigate("../userBoard", { replace: true });
      alert("Votre Article a bien été supprimé!")
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
        {posts.map((p) =>(
            <Card key={p.id}sx={{ maxWidth: 500 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {p.username}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={p.title}
              subheader={p.date_creation}
            />
            <CardMedia
              component="img"
              height="194"
              image='{p.imageArticle}'
              alt=""
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {p.message}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
            <IconButton href="/newComment" aria-label="reply">
              <AddCommentIcon />
            </IconButton>
            <IconButton aria-label="reply">
              <ThumbUpIcon />
            </IconButton>
            
            <IconButton onClick={deletePost} aria-label="delete article">
            <DeleteIcon />
            </IconButton>
             
             
            </CardActions>
            <div className='comment'>
               <Comment />
               </div>
              </Card>
               
        ))}
         
        </div>
       
      
        
    </div>
    
  
  );
}