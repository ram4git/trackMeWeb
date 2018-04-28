import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import HomeIcon from '@material-ui/icons/Home';
import BookIcon from '@material-ui/icons/Book';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';
import SettingsIcon from '@material-ui/icons/Settings';
import ContentPasteIcon from '@material-ui/icons/ContentPaste';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import LogoutIcon from '@material-ui/icons/PowerSettingsNew';

import GavelIcon from '@material-ui/icons/Launch';


import { Link } from 'react-router-dom'



export const mailFolderListItems = (
  <div style={{marginLeft:'20px', marginTop:'60px'}}>
    <ListItem button onClick={()=>{window.location.href="/"}} >
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home"/>
    </ListItem>
    <ListItem button onClick={()=>{window.location.href="/jobcards"}}>
      <ListItemIcon>
        <BookIcon />
      </ListItemIcon>
      <ListItemText primary="Job Cards" />
    </ListItem>
    <ListItem button onClick={()=>{window.location.href="/indents"}}>
      <ListItemIcon>
        <ContentPasteIcon />
      </ListItemIcon>
      <ListItemText primary="Indents" />
    </ListItem>
    <ListItem button onClick={()=>{window.location.href="/lorries"}}>
      <ListItemIcon>
        <DirectionsCarIcon />
      </ListItemIcon>
      <ListItemText primary="Lorries" />
    </ListItem>

  </div>
);

export const otherMailFolderListItems = (
  <div style={{marginLeft:'20px', marginTop:'10px'}}>
    <ListItem button onClick={()=>{window.location.href="/requests"}}>
      <ListItemIcon>
        <GavelIcon />
      </ListItemIcon>
      <ListItemText primary="Requests" />
    </ListItem>
    <ListItem button onClick={()=>{window.location.href="/"}}>
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItem>
    <ListItem button onClick={() => {logout()}}>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  </div>
);

const logout = () => {
  const localStorage = window.localStorage;
 try {
     localStorage.removeItem('email');
     localStorage.removeItem('token');
     localStorage.removeItem('role');
     localStorage.removeItem('jobCards');


     let arr=[];

     for (var i = 0; i < localStorage.length; i++){
       if (localStorage.key(i).substring(0,8) == 'firebase') {
           arr.push(localStorage.key(i));
       }
     }

     // Iterate over arr and remove the items by key
     for (var i = 0; i < arr.length; i++) {
         localStorage.removeItem(arr[i]);
     }
   } catch (e) {
     // ignore
   }
  window.location.href = '/login';
}
