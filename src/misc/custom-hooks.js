import { useCallback, useState } from "react";


export function useModalState(defaultValue=false){

  const[isOpen,setIsOPen]=useState(defaultValue);

  const open=useCallback(()=>setIsOPen(true),[]);
  const close=useCallback(()=>setIsOPen(false), []);
  
  return{isOpen,close,open};
}