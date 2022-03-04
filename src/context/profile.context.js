import React,{ createContext, useContext, useEffect, useState } from "react"
import { auth,database} from "../misc/firebase";

const ProfileContext=createContext();

export const ProfileProvider=({children})=>
{
  const[Profile,setProfile]=useState(null);
  const[isLoading,setisLoading]=useState(true);

  useEffect(()=>
  {
     let useref;
     
   const authUnsub= auth.onAuthStateChanged(authObj=>
      {
        if(authObj)

        {    
             
          useref=database.ref(`/profiles/${authObj.uid}`)

            useref.on('value',(snap)=>{
              const {name,createdAt}=snap.val();
              const data={
                name,
                createdAt,
                uid:authObj.uid,
                email:authObj.email
    
              };
              
              setProfile(data ); 
              setisLoading(false);

            });

         
          
        }


        else
        {
          if(useref)
          {
            useref.off();
          }

            setProfile(null);
            setisLoading(false);
        }
      });
      return ()=>
      { 
        if(useref)
        {
          useref.off();
        }
        authUnsub();
      }
  },[]);
    
  return(

    <ProfileContext.Provider value={{isLoading,Profile}}>
   {children}
  </ProfileContext.Provider>
); 
};

export const UseProfile=()=>useContext(ProfileContext);   