import React,{ createContext, useContext, useState } from "react"

const ProfileContext=createContext();

export const ProfileProvider=({children})=>
{
  const[Profile]=useState(false);
  return(

    <ProfileContext.Provider value={Profile}>
   {children}
  </ProfileContext.Provider>
); 
};

export const Useprofile=()=>useContext(ProfileContext);   