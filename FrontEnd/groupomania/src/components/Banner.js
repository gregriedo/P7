import  React, {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';

let user = localStorage.getItem('user');

export default function Banner() {
  const [islogin, setIslogin] = useState(false);

    const navigate = useNavigate();
    
    
    const OnLogout = () => {
      window.localStorage.clear();
      navigate("../", { replace: true });
      window.location.reload(false);
    }
    
    useEffect(()=>{

      if(user){
        setIslogin(true);
        
      }
      
    }, [ islogin]);
    
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
        
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Groupomania
          </Typography>
          {islogin ?(
                <Link onClick={OnLogout} href="/" color="inherit">Déconnexion</Link>
              ): (
                <>
          <Link href="/signup" color="inherit">Créer un Compte</Link>
          </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}