import  React, {useState}  from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [mail, setMail] = useState();
    const [password, setPassword] = useState();
    


    const login = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/api/auth/login", { 
            mail,
            password,
           
            
        })
        .then((response) => {
           console.log(response);
           localStorage.setItem('user', JSON.stringify(response.data));
           navigate("../userBoard", { replace: true });
           window.location.reload(false);
           
           
        })
        .catch(function (error) {
          alert("Aucun Compte Trouvé !")
          console.log(error);
        });
          
        
      }

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
    
    <FormControl >
    <TextField
          required
          id="mail"
          label="Mail"
          type="text"
          onChange={(event) => {
            setMail(event.target.value);
          }}
        />
        
        <TextField
          required
          id="login-password"
          label="Password"
          type="password"
          autoComplete="current-password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        <Stack direction="row" alignItems="center">

            <Button onClick={login} className="login-button" type="submit" variant="contained">Se Connecter</Button>
    
        </Stack>
    </FormControl>
        
      
     
     
     
      
    </Box>
  );
}
