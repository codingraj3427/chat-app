import React from 'react'
import ChatTop from '../../Components/chat-window/top';
import ChatBottom  from '../../Components/chat-window/bottom';
import Messages from '../../Components/chat-window/messages';
import { useParams } from 'react-router';
import { Loader } from 'rsuite';
import { useRooms } from '../../context/rooms.context';
import { CurrentRoomProvider } from '../../context/current-room.context';

const Chat = () => {

  const{chatId}=useParams();

  const rooms=useRooms();

  if(!rooms)
  {
    return <Loader center vertical size="md" content=" Loading" speed="slow"/>
  }

  const currentRoom= rooms.find(room=>room.id===chatId);
  if(!currentRoom)
  {
    return <h6 className='text-center mt-page'>Chat { chatId} not found </h6>
  }


  const {name,description}=currentRoom; 



  const currentRoomData= 
  {
    name,
    description
    
  };

  
  return (
    <CurrentRoomProvider data={currentRoomData}>
        <div className='chat-top'>
          <ChatTop/>
          </div> 


          <div className='chat-middle'>
            <Messages/>
          </div>


          <div className='chat-bottom'>
            <ChatBottom/>
          </div>
    </CurrentRoomProvider>
  )
}

export default Chat
