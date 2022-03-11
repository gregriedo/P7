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
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';


export default function Feed() {
    const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
   const [posts, setPosts] = useState([]);
  

  useEffect(() => {
    axios.get("http://localhost:3000/api/articles/",{ headers: {"Authorization" : `Bearer ${token}`} })
    .then((response) => {

      setPosts(response.data);
    });
  }, [token]);

  return (
    <div className='feed'>
        <div className='feedWrapper'>
        {posts.map((p) =>(
            <Card key={p.id}sx={{ maxWidth: 345 }}>
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
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
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