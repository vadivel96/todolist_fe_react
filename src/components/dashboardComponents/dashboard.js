import React,{useEffect} from 'react'
import {Outlet} from 'react-router-dom';
import  Navbar  from './navbarComponents/Navbar'
import Sidebar from './sidebarComponents/Sidebar';
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';



function Dashboard() {

  let token = sessionStorage.getItem('token')
  let navigate = useNavigate()

useEffect(()=>{
  if(!token) 
  {
    let error="login required!!";
    console.log(error);
      handleLogout(error)
    }
},[])

let handleLogout = async(error)=>{
toast.error(error);
sessionStorage.clear();
navigate('/login');
}

 
  return (
    <div>
     
        <Navbar/>
        <Sidebar />
        <div className="main">
        
        <Outlet/>
        </div>
        
         
      
    </div>

  )
}

export default Dashboard