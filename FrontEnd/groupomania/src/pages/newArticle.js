import  React, {useState}  from 'react';
import LabelBottomNavigation from "../components/Footer";
import "../styles/newArticle.css";
import { styled } from '@mui/material/styles';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Input = styled('input')({
    display: 'none',
  });

export default function NewPost() {
    const navigate = useNavigate();
    const [title, setTitle] = useState();
    const [message, setMessage] = useState();
    const [imageArticle, setImageArticle] = useState({ preview: '', data: '' });
    const [status, setStatus] = useState();


 
    
    
      const handleFileChange = (e) => {
        const img = {
          preview: URL.createObjectURL(e.target.files[0]),
          data: e.target.files[0],
        }
        setImageArticle(img)
      }
  

    
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user.token;
      const id = user.userId;

    if(user){
        axios.defaults.headers.common['authorization'] = 'Bearer ' + token;
      }
      const createArticle = (e) => {
        e.preventDefault();
        let newArticle = document.getElementById('newArticle');
        let formData = new FormData(newArticle);

        formData.append('title', title)
        formData.append('message', message)
        formData.append('user_id', id)
        formData.append('image', imageArticle)
        axios
          .post("http://localhost:3000/api/articles/",formData,{
       
            headers: {
              "Content-Type": "multipart/form-data",
             
    
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
          }); 
      };

      
   

  return (
    <form className='newarticle' id='newArticle' onSubmit={createArticle}>
      <FormControl >
        <TextField
          id="standard-multiline-flexible"
          label="Titre"
          name="title"
          multiline
          maxRows={4}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        />
       </FormControl> 
       <FormControl>
        <TextField
          
          id="standard-multiline-static"
          label="Message"
          name="message"
          multiline
          rows={4}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
        </FormControl>
        <FormControl>

      <Stack direction="row" alignItems="center" spacing={2}>
      
      <label htmlFor="icon-button-file">
       <Input accept="image/*" onChange={handleFileChange} id="icon-button-file" type="file" name='image'/>
       <IconButton color="primary" aria-label="upload picture" component="span">
       <PhotoCamera />
       {imageArticle.preview && <img src={imageArticle.preview} alt="" width='100' height='100' />}
       
       </IconButton>
       
       
      </label>
      
    
        
      <Button
        onClick={createArticle}
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