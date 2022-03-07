import { useCallback, useState,useEffect } from "react";
import { database } from "./firebase";

export function useModalState(defaultValue=false){

  const[isOpen,setIsOPen]=useState(defaultValue);

  const open=useCallback(()=>setIsOPen(true),[]);
  const close=useCallback(()=>setIsOPen(false), []);
  
  return{isOpen,close,open};
}



export const useMediaQuery = query => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const queryList = window.matchMedia(query);
    setMatches(queryList.matches);

    const listener = evt => setMatches(evt.matches);

    queryList.addListener(listener);
    return () => queryList.removeListener(listener);
  }, [query]);

  return matches;
};



export function usePresence(uid)
{
  const[presence,setPresence]=useState(null);
  useEffect(()=>
  {
     const userStatusRef=database.ref (`/status/${uid}`)
     
     userStatusRef.on('value',(snap)=>
     {
       if(snap.exists())
       {
         const data=snap.val();
         setPresence(data);
       }
     })



     return ()=>
     {
       userStatusRef.off()
     }
  },[uid]);

  return presence;
}
