import  React, {useState}  from 'react';
import LabelBottomNavigation from "../components/Footer";
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import "../styles/newComment.css";
import axios from 'axios';

const Input = styled('input')({
    display: 'none',
  });

export default function NewComment() {
    const navigate = useNavigate();
    const [comment, setComment] = useState();
    const [imageComment, setImageComment] = useState({ preview: '', data: '' });
    const [status, setStatus] = useState();


 
    
    
      const handleFileChange = (e) => {
        const img = {
          preview: URL.createObjectURL(e.target.files[0]),
          data: e.target.files[0],
        }
        setImageComment(img)
      }
  

    
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user.token;
      const id = user.userId;

    if(user){
        axios.defaults.headers.common['authorization'] = 'Bearer ' + token;
      }
      const createComment = (e) => {
        e.preventDefault();
        let newComment = document.getElementById('newComment');
        let formData = new FormData(newComment);

        formData.append('comment', comment)
        formData.append('user_id', id)
        formData.append('article_id', 61)
        formData.append('image', imageComment)
        axios
          .post("http://localhost:3000/api/comments/",formData,{
       
            headers: {
              "Content-Type": "multipart/form-data",
              "Accept" : "/",
    
            }
          })
          .then((response) => {
            setStatus(response.statusText)
            console.log(response);
            navigate("../userBoard", { replace: true });
           window.location.reload(false);
           
          })
          .catch(function (error) {
            console.log(error);
            console.error(error.response.data)
          }); 
      };

      
   

  return (
     

     <form className='newcomment' id='newComment' onSubmit={createComment}>
     <FormControl >
        <TextField
          id="standard-multiline-flexible"
          label="Comment"
          name='comment'
          multiline
          maxRows={4}
          onChange={(event) => {
            setComment(event.target.value);
          }}
        />
       </FormControl> 
        <FormControl>

      <Stack direction="row" alignItems="center" spacing={2}>
      
      <label htmlFor="icon-button-file">
       <Input accept="image/*" onChange={handleFileChange} id="icon-button-file" type="file" name='image' />
       <IconButton color="primary" aria-label="upload picture" component="span">
       <PhotoCamera />
       {imageComment.preview && <img src={imageComment.preview} alt="" width='100' height='100' />}
       
       </IconButton>
       
       
      </label>
      
    
        
      <Button
       
        type="submit"
        variant="contained"
        color="primary"
      >
        Publier
      </Button>
      </Stack>
         {status && <h4>{status}</h4>}
      </FormControl>  

      <footer>
          <LabelBottomNavigation />
          </footer>
    
       </form>    
      
        
    

  );
};