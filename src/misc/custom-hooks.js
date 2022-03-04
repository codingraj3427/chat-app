import { useCallback, useState,useEffect } from "react";


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
