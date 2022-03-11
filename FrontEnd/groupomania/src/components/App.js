import React from 'react'
import Banner from './Banner'
import Home from '../pages/home'
import CreateAccount from '../pages/signup'
import UserBoard from '../pages/userBoard'
import NewPost from'../pages/newArticle'
import  ModifyProfil from '../pages/modifyProfil'

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";




function App() {
  return (
    <BrowserRouter>
      <Banner />
      <Routes>
        
        <Route path="/newArticle" element={<NewPost />} /> 
        <Route path="/modifyProfil" element={<ModifyProfil />} />
        <Route path="/userBoard" element={<UserBoard />} />
        <Route path="/signup" element={<CreateAccount />} />
        <Route path="/" element={<Home />} />


      </Routes>
    </BrowserRouter>
  

    

      
  );
}

export default App;
