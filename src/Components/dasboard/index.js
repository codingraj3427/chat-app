import React from 'react';
import {Drawer,Button, Divider, Alert } from 'rsuite';
import {useProfile} from '../../context/profile.context';
import { database } from '../../misc/firebase';
import EditableInput from '../EditableInput';

const Dashboard = ({onSignOut}) => {

const onSave= async newData=>
{
     const userNicknameRef= database.ref(`profiles/${profile.uid}`).child('name');

     try {
       await userNicknameRef.set(newData);
       Alert.success('Nick name has been updated',4000);
     } catch (err) {
       Alert.error(err.message,4000)
       
     }
}; 


  const {profile}=useProfile();
  return (
    <>

    <Drawer.Header> 

      <Drawer.Title>
        Dashboard
      </Drawer.Title>
    </Drawer.Header>


    <Drawer.Body>
       <h3>Hey, {profile.name}</h3>
       <Divider/>  
       <EditableInput

       name='nickname'
       initialvalue={profile.name}
       onSave={onSave}
       label={<h6 className='mb-2'>Nickname</h6>}
       
       />
    </Drawer.Body>

    <Drawer.Footer>

      <Button block color="red" onClick={onSignOut}>

        Sign Out
      </Button>

    </Drawer.Footer>
    </>     
  );
};

export default Dashboard; 
