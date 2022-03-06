import React from 'react'
import ChatTop from '../../Components/chat-window/top';
import ChatBottom  from '../../Components/chat-window/bottom';
import Messages from '../../Components/chat-window/messages';
import { useParams } from 'react-router';
import { Loader } from 'rsuite';
import { useRooms } from '../../context/rooms.context';

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
  return (
    <div>
        <div>
          <ChatTop chat-top/>
          </div> 


          <div>
            <Messages chat-middle/>
          </div>


          <div>
            <ChatBottom chat-bottom/>
          </div>
    </div>
  )
}

export default Chat
