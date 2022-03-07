import React from 'react';
import {Drawer,Button, Divider, Alert } from 'rsuite';
import {useProfile} from '../../context/profile.context';
import { database } from '../../misc/firebase';
import { getUserUpdates } from '../../misc/helper';
import EditableInput from '../EditableInput';
import AvatarUploadBtn from './AvatarUploadBtn';
import ProviderBlock from './ProviderBlock';


const Dashboard = ({onSignOut}) => {

const onSave= async newData=>
{
    
     try {
      
       const updates=await getUserUpdates(
         profile.uid,
         'name',
         newData,
         database);

       await database.ref().update(updates)


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
       <ProviderBlock/>
       <Divider/>  
       <EditableInput

       name='nickname'
       initialvalue={profile.name}
       onSave={onSave}
       label={<h6 className='mb-2'>Nickname</h6>}
       
       />

       <AvatarUploadBtn/>
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
