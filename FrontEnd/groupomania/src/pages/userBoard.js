import React, {useEffect, useState} from "react";
import '../styles/userBoard.css'
import LabelBottomNavigation from '../components/Footer'
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import axios from "axios";
import Feed from "../pages/feed";



function UserBoard() {
   
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;
  const [userR, setUserR] = useState([]);
  const id = user.userId;

  

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/auth/${id}`,{ headers: {"Authorization" : `Bearer ${token}`} })
      
      .then((response) => {
        console.log(response.data);
        setUserR(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, token]);

  
    return (

        <div className="body">
            <aside className="groupo-nav">
           
           <div className="userProfil">
           <Avatar
            alt={userR.username}
            src="{userR.imageProfil}"
            sx={{ width: 150, height: 150 }}
            />
           <div className="userUsername">
            {userR.username}
           </div>
           
        
           </div>
           <div className="newPost">
           <Link href="/newArticle" color="inherit">Créer un Nouvel Article</Link>
           </div>
           <div className="modify-user">
           <Link href="/modifyProfil" color="inherit">Paramètres du Compte</Link>
           </div>
           
           
           </aside>
        
             
           <div className="groupo-feed">
               <Feed />
           </div>
           <footer>
             <LabelBottomNavigation />
           </footer>
        
          
           
        </div>
            
              
        

           
       
    );
}

export default UserBoard;