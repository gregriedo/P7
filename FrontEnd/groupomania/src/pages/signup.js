import  React, {useState}  from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Input = styled('input')({
    
  });



export default function CreateAccount() {
    const navigate = useNavigate();
    const [mail, setMail] = useState();
    const [password, setPassword] = useState();
    const [username, setUsername] = useState();
    const [imageProfil, setImgprofil] = useState({ preview: '', data: '' });
    const [status, setStatus] = useState('')
    const [isAdmin] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault()
      let formData = new FormData()
      formData.append('file', imageProfil.data)
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
      setImgprofil(img)
    }

    const signup = (e) =>{
      e.preventDefault();
      axios.post("http://localhost:3000/api/auth/signup",{ headers: {"content-type" : 'multipart/form-data'},  
      
            
            mail,
            password,
            username,
            imageProfil,
            isAdmin,
      
            
        })
        .then((response) => {
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
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
    <FormControl onSubmit={signup}>
    <TextField
          required
            id="mail"
            type="mail"
            label=" Email"
            title="Ex: groupomania@gmail.com, ..."
            onChange={(event) => {
              setMail(event.target.value);
            }}
            
            
        />
       
        <TextField
        required
          id="password"
          label=" Password"
          type="password"  
          title='Doit contenir min 1 chiffre'
          onChange={(event) => {
            setPassword(event.target.value);
          }}
           
            
        />
          <TextField
          required
              id="username"
              type="text"
              label="Username"
              title="Ex: SuperMario, Jo ..."
              onChange={(event) => {
                setUsername(event.target.value);
               }}
              
              
        />
        
        <Stack direction="row" alignItems="center" spacing={2}>
      
             <label htmlFor="icon-button-file">
              <Input accept="image/*" onChange={handleFileChange} id="icon-button-file" type="file" />
              <IconButton color="primary" aria-label="upload picture" component="span">
              <PhotoCamera />
              {imageProfil.preview && <img src={imageProfil.preview} alt="Profil Pic" width='100' height='100' />}
              
              </IconButton>
              
              
              
             </label>
          <Button  onClick={handleSubmit} type="submit" variant="contained">Créer Son Compte</Button>
    
         </Stack>
         {status && <h4>{status}</h4>}
         

    </FormControl>
    
       
      

       
       
        

         
        
    
      
     
     
     
      
    </Box>
        
        
    
  );
};


