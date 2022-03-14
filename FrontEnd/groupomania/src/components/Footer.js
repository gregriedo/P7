
import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import PersonIcon from '@mui/icons-material/Person';

export default function LabelBottomNavigation() {


  

  return (
    <BottomNavigation sx={{ width: 500 }} >
      <BottomNavigationAction
        label="Home"
        value="Home"
        icon={<HomeIcon />}
        href='../'
      />
      <BottomNavigationAction
        label="User Page"
        value="User Page"
        icon={<PersonIcon />}
        href='../userBoard'
      />
      <BottomNavigationAction
        label="Contact"
        value="Contact"
        icon={<ContactMailIcon />}
        href='mailto:groupomania@gmail.com'
      />
    </BottomNavigation>
  );
}
