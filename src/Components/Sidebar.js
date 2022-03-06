import React from 'react'
import CreateRoomBtnModal from './dasboard/CreateRoomBtnModal';
import DashboardToggle from './dasboard/DashboardToggle';


const Sidebar = () => {
  return (
    <div className='h-100 pt-2'>

      <div>
       <DashboardToggle/>
       <CreateRoomBtnModal/>
      </div>

      bottom
      
    </div>
  );
};

export default Sidebar
