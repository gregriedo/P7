import  React, {useState}  from 'react';
import Box from '@mui/material/Box';
import LabelBottomNavigation from "../components/Footer";
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

export default function NewComment() {
    const navigate = useNavigate();
    const [comment, setComment] = useState();
    const [imageComment, setImageComment] = useState({ preview: '', data: '' });
    const [status, setStatus] = useState();


 
    const handleSubmit = async (e) => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('file', imageComment.data)
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
        axios
          .post("http://localhost:3000/api/articles/", {
            
            comment,
            imageComment,
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
          label="Comment"
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
       <Input accept="image/*" onChange={handleFileChange} id="icon-button-file" type="file" />
       <IconButton color="primary" aria-label="upload picture" component="span">
       <PhotoCamera />
       {imageComment.preview && <img src={imageComment.preview} alt="" width='100' height='100' />}
       
       </IconButton>
       
       
      </label>
      
    
        
      <Button
        onClick={createComment}
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