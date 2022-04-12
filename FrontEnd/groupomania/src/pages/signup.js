import  React, {useState}  from 'react';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/signup.css';


export default function CreateAccount() {
    const navigate = useNavigate();
    const [status, setStatus] = useState('')  
    const [mail, setMail] = useState();
    const [password, setPassword] = useState();
    const [username, setUsername] = useState();
    const [imageProfil, setImageprofil] = useState();
    const [isAdmin] = useState(0);
   
    const signup = async event =>{
      event.preventDefault();
       
      let formData = new FormData();
      formData.append('mail', mail)
      formData.append('password', password)
      formData.append('username', username)
      formData.append('image', imageProfil)
      formData.append('isAdmin', isAdmin)
  
    axios.post("http://localhost:3000/api/auth/signup", formData,{   
      headers: { "Content-Type": "multipart/form-data" } 
    })
       
        .then((response) => {
          setStatus(response.statusText)
           console.log(response);
           navigate("../", { replace: true });
           alert("Votre Compte a bien été crée !")
           
        })
        .catch(function (error) {
          console.log(error);
          console.error(error.response.data)
        });
    };
        
          
  return (
    <div className="App">
      <form id="myForm" name="myForm" encType="multipart/form-data" >
      <FormControl variant="standard">
        <InputLabel htmlFor="component-simple">Mail</InputLabel>
        <Input id="mail"
              type="mail"
              name="mail"
              placeholder=" Email"
              required pattern="[a-zâäàéèùêëîïôöçñA-Z0-9.-_]+[@]{1}[a-zA_Z0-9.-_]+[.]{1}[a-z]{2,4}" 
              title="Ex: groupomania@gmail.com, ..."
              onChange={(event) => {
                setMail(event.target.value);
              }}
             aria-describedby="standard-mail-helper-text"
              inputProps={{
                "aria-label": "mail",
             }} />
      </FormControl>
    <FormControl variant="standard">
        <InputLabel htmlFor="component-simple">Password</InputLabel>
        <Input   id="password"
            type="password"
            name="password"
            placeholder=" Password"
            title='Doit contenir min 2 chiffres'
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            />
      </FormControl>
    <FormControl variant="standard">
        <InputLabel htmlFor="component-simple">Username</InputLabel>
        <Input id="username"
              type="text"
              name="username"
              placeholder=" Username"
              required pattern="[a-zâäàéèùêëîïôöçñA-Z\s]{3,30}" 
              title="Ex: SuperMario, Jo ..."
              onChange={(event) => {
                setUsername(event.target.value);
               }}
              aria-describedby="standard-mail-helper-text"
              inputProps={{
                 "aria-label": " Username",
              }} />
      </FormControl>
    
       <label htmlFor="icon-button-file">
        <Input accept="image/*" className="input" id="icon-button-file" type="file" name="image" filename={imageProfil} 
          onChange={e => setImageprofil(e.target.files[0])} />
          
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
      
  
       <Button variant="contained" type="Submit" onClick={signup}>Créer Votre Compte</Button>
    
      </form>
       
    </div>
      
    
  )
}


