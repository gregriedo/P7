import  React, {useState}  from 'react';
import LabelBottomNavigation from "../components/Footer";
import Box from '@mui/material/Box';
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


 
    const handleSubmit = async (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('file', imageArticle.data)
        const response = await fetch('http://localhost:3000/image', {
          method: 'POST',
          body: formData,
        })
        if (response) setStatus(response.statusText)
      }
    
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
        axios
          .post("http://localhost:3000/api/articles/", {
            
            title,
            message,
            imageArticle,
            user_id: id,
          })
          .then((response) => {
            
            console.log(response);
            navigate("../userBoard", { replace: true });
           window.location.reload(false);
           
          })
          .catch(function (error) {
            console.log(error);
          }); 
      };

      
   

  return (
      <Box component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
      >

         
      <FormControl >
        <TextField
          id="standard-multiline-flexible"
          label="Titre"
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
       <Input accept="image/*" onChange={handleFileChange} id="icon-button-file" type="file" />
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
    
        
    
      </Box>

  );
};