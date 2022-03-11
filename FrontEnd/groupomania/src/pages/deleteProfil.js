import React from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function DeleteProfil() {
    const navigate = useNavigate();  
    const user = JSON.parse(localStorage.getItem("user"));
    const token = user.token;
    const id = user.userId;

const deleteAccount = (e) =>{
    e.preventDefault();
    axios.delete(`http://localhost:3000/api/auth/${id}`,{ headers: {"Authorization" : `Bearer ${token}`} })
    .then(() => {
      window.localStorage.clear();
      alert("Votre Compte a été supprimé avec succès !");
      navigate("../", { replace: true });
      window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
      });
     
    };
    return (
        <div className="deleteButton">
             <Button className="button" onClick={deleteAccount} type="submit" variant="contained" color="error">Supprimer Compte</Button>
           </div>

        );
}

export default DeleteProfil;


