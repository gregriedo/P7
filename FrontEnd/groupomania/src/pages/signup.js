import  React, {useState}  from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import Stack from '@mui/material/Stack';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';





export default function CreateAccount() {
    const navigate = useNavigate();
    
    const [mail, setMail] = useState();
    const [password, setPassword] = useState();
    const [username, setUsername] = useState();
    const [imageProfil, setImgprofil] = useState({ preview: '', data: '' });
    const [status, setStatus] = useState('')
    const [isAdmin] = useState(false);

   /* const handleSubmit = async (e) => {
      e.preventDefault()
      let formData = new FormData()
      formData.append('file', imageProfil.data)
      const response = await fetch('http://localhost:3000/images', {
        method: 'POST',
        body: formData,
      })
      if (response) setStatus(response.statusText)
    }*/
  
    const handleFileChange = (e) => {
      const img = {
        preview: URL.createObjectURL(e.target.files[0]),
        data: e.target.files[0],
      }
      setImgprofil(img)
    }

    const signup = (e) =>{
      e.preventDefault();
      let form = document.getElementById('form');
      let formData = new FormData(form)
      
      formData.append('mail', mail.data)
      formData.append('password', password.data)
      formData.append('username', username.data)
      formData.append('userpic', imageProfil.data)
      formData.append('isAdmin', isAdmin.data)
      
      console.log(formData);
     
    axios.post("http://localhost:3000/api/auth/signup",{
       
        headers: {
          "Content-Type": "multipart/form-data",

        }, formData,
      })
        .then((response) => {
          setStatus(response.statusText)
           console.log(response);
           navigate("../", { replace: true });
           alert("Votre Compte a bien été crée !")
           
        })
        .catch(function (error) {
          console.log(error);
        });
    };
        
          
  return (
    <Box
      sx={{
        '& > :not(style)': { m: 1 },
      }}
      noValidate
      autoComplete="off"
      onSubmit={signup}
      
    >
      <form id='form'>
      <FormControl variant="standard">
        <InputLabel htmlFor="component-simple">Mail</InputLabel>
        <Input  id="component-simple" onChange={(event) => {
            setMail(event.target.value);
          }} />
      </FormControl>
      <FormControl variant="standard">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <Input  type="password" id="component-simple"  onChange={(event) => {
            setPassword(event.target.value);
          }} />
      </FormControl>
      <FormControl variant="standard">
        <InputLabel htmlFor="component-simple">Username</InputLabel>
        <Input  id="component-simple"  onChange={(event) => {
            setUsername(event.target.value);
          }} />
      </FormControl>



    <FormControl >
    
        
        <Stack direction="row" alignItems="center" spacing={2}>
      
             <label htmlFor="icon-button-file">
              <Input  accept="image/*" onChange={handleFileChange} id="icon-button-file" type="file" />
              <IconButton color="primary" aria-label="upload picture" component="span">
             
              {imageProfil.preview && <img src={imageProfil.preview} alt="Profil Pic" width='100' height='100' />}
              
              </IconButton>
              
              
              
             </label>
          <Button   type="submit" variant="contained">Créer Son Compte</Button>
    
         </Stack>
         {status && <h4>{status}</h4>}
         

    </FormControl>
      </form>
      
    
       
      

       
       
        

         
        
    
      
     
     
     
      
    </Box>
        
        
    
  );
};


