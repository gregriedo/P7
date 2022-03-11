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
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import axios from 'axios';

export default function Comment() {
    
    const [comments, setComments] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;

  

    useEffect(() =>{
      const res = axios
      .get('http://localhost:3000/api/comments/',{ headers: {"Authorization" : `Bearer ${token}`} });
      res.then((data)=>{
        setComments(data.data);
      })
    }, [token]);

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
              title={c.title}
              subheader={c.date_creation}
            />
            <CardMedia
              component="img"
              height="194"
              image='{c.imageComment}'
              alt=""
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {c.message}
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
              </Card>
        ))}
        
        </div>
        
    </div>
    )
  }