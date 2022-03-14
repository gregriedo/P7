import React, {useEffect, useState} from "react";
import '../styles/home.css';
import Login from '../pages/login';
import LabelBottomNavigation from "../components/Footer";



export default function Home() {
    const [islogin, setIslogin] = useState(false);

    

    useEffect(()=>{
        let user = localStorage.getItem('user');
        if(user){
          setIslogin(true);
          
        }
        
      }, [ islogin]);


    return (

        <div className="container">
            <div className="text">
                <h1>Bienvenue Sur L'Application Groupomania !</h1>
                <h2>Ici Vous pouvez discuter pleinement avec vos collègues</h2>
                <h3>
                    Pour cela il vous suffit simplement de vous connecter avec vos identifiants <br />
                    <Login />
                </h3>
                <p>
                    Vous n'avez pas de compte ? Créez en un en cliquant</p> <a href="/signup">Ici</a>
            </div>

            {islogin ?(
                <footer>
                    <LabelBottomNavigation />
                </footer> 
                ): (
                  <>
                  </>
          )}
        </div>
    );
} 

 