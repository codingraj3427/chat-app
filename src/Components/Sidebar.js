import React,{useRef,useState,useEffect} from 'react';
import { Divider } from 'rsuite';
import CreateRoomBtnModal from './dasboard/CreateRoomBtnModal';
import DashboardToggle from './dasboard/DashboardToggle';
import ChatRoomList from './rooms/ChatRoomList';


const Sidebar = () => {

  const topSidebarRef=useRef();
  const[height,setHeight]=useState(null);

  useEffect(()=>
  {
   if(topSidebarRef.current)
   {
      setHeight(topSidebarRef.current.scrollHeight)
   }
  },[topSidebarRef])



  return (
    <div className="h-100 pt-2">

      <div ref={topSidebarRef}>
       <DashboardToggle/>
       <CreateRoomBtnModal/>
       <Divider>Join The Conversesions</Divider>
      </div>

       <ChatRoomList aboveElHeight={height}/>
      
    </div>
  );
};

export default Sidebar
