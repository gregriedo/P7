import  React, {useState}  from 'react';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';





export default function CreateAccount() {
    const navigate = useNavigate();
    const [values, setValues] = React.useState({
      showPassword: false,
    });
    const handleClickShowPassword = () => {
      setValues({
        ...values,
        showPassword: !values.showPassword,
      });
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    const [status, setStatus] = useState('')
    
    const [mail, setMail] = useState();
    const [password, setPassword] = useState();
    const [username, setUsername] = useState();
    const [imageProfil, setImageprofil] = useState({ preview: '', data: '' });
    const [isAdmin] = useState(false);

  
    const handleFileChange = (e) => {
      const img = {
        preview: URL.createObjectURL(e.target.files[0]),
        data: e.target.files[0],
      }
      setImageprofil(img)
    }

    const signup = (e) =>{
      e.preventDefault();
      let myForm = document.getElementById('myForm');
      let formData = new FormData(myForm);
     
      formData.append('mail', mail)
      formData.append('password', password)
      formData.append('username', username)
      formData.append('image', imageProfil)
      formData.append('isAdmin', isAdmin)
      
      console.log(formData);
     
    axios.post("http://localhost:3000/api/auth/signup",formData,{
       
        headers: {
          "Content-Type": "multipart/form-data",

        }
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
    
      <form id="myForm" name="myForm" encType="multipart/form-data" onSubmit={signup}>
      <div>
      <FormControl variant="standard">
        <InputLabel htmlFor="component-simple">Mail</InputLabel>
        <Input id="mail"
              type="mail"
              name="mail"
              placeholder=" Email"
              required pattern="[a-zâäàéèùêëîïôöçñA-Z0-9.-_]+[@]{1}[a-zA_Z0-9.-_]+[.]{1}[a-z]{2,4}" 
              title="Ex: groupomania@gmail.com, ..."
              value={values.mail}
              onChange={(event) => {
                setMail(event.target.value);
              }}
             aria-describedby="standard-mail-helper-text"
              inputProps={{
                "aria-label": "mail",
             }} />
      </FormControl>
    </div>
    <div>
    <FormControl variant="standard">
        <InputLabel htmlFor="component-simple">Password</InputLabel>
        <Input   id="password"
            type={values.showPassword ? "text" : "password"}
            name="password"
            placeholder=" Password"
            title='Doit contenir min 2 chiffres'
            value={values.password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
              }
            />
      </FormControl>
    </div>
    <div>
    <FormControl variant="standard">
        <InputLabel htmlFor="component-simple">Username</InputLabel>
        <Input id="username"
              type="text"
              name="username"
              placeholder=" Username"
              required pattern="[a-zâäàéèùêëîïôöçñA-Z\s]{3,30}" 
              title="Ex: SuperMario, Jo ..."
              value={values.username}
              onChange={(event) => {
                setUsername(event.target.value);
               }}
              aria-describedby="standard-mail-helper-text"
              inputProps={{
                 "aria-label": " Username",
              }} />
      </FormControl>
    </div>
    <div>
    {imageProfil.preview && <img src={imageProfil.preview} alt="UserPic" width='100' height='100' />}
      
    <label htmlFor="icon-button-file">
  <Input accept="image/*" id="icon-button-file" type="file" name="image" onChange={handleFileChange} />
  <IconButton color="primary" aria-label="upload picture" component="span">
    <PhotoCamera />
  </IconButton>
</label>
    </div>
    <Button variant="contained" type="Submit">Créer Votre Compte</Button>
    {status && <h4>{status}</h4>}
  </form>
   
    
  
    
  );
};


