import React,{useEffect, useState} from 'react'
import {Outlet} from 'react-router-dom';
import Navbar from './navbar'
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import UserModal from './UserModal';


function Todolist() {

  const [userModal,setUserModal]=useState(false);
  const[userUpdate,setUserUpdate]=useState([]);
  
  return (
    <div>
      
        <Navbar data={setUserUpdate} openModal={()=>setUserModal(true)} />
        {userModal && <UserModal data={userUpdate} closeModal={()=>{setUserModal(false)}}/>}
       
        
        <Outlet/>
    </div>
  )
}

export default Todolist