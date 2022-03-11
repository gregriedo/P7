import React, {useEffect, useState} from "react";
import '../styles/userBoard.css'
import Avatar from '@mui/material/Avatar';
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
            alt="T"
            src="{userR.imageProfil}"
            sx={{ width: 150, height: 150 }}
            />
           <div className="userUsername">
            {userR.username}
           </div>
           
        
           </div>
           <div className="newPost">
               <a href="/newArticle">Créer un Nouvel Article</a>
           </div>
           <div className="modify-user">
               <a href="/modifyProfil">Paramètres du Compte</a>
           </div>
           
           
           </aside>
        
             
           <div>
               <Feed />
           </div>
        
          
           
        </div>
            
              
        

           
       
    );
}

export default UserBoard;