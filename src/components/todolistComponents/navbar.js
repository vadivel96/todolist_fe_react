import {React,useState} from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify'
import { url } from '../../App';
import axios from 'axios';



function Navbar(props) {

  let Navigate=useNavigate()
 
let handleLogout = async(error)=>{
  
  if(error){toast.error(error);}
  sessionStorage.clear();
  Navigate('/login');
  }

  
  let updateToken=async()=>{
    let refreshToken=await sessionStorage.getItem('refreshToken');
    console.log("refreshToken type",typeof refreshToken);
    console.log("refreshToken..",refreshToken);

              if(refreshToken!==(null || undefined || 'undefined')){
                  
                  let res = await axios.post(`${url}/auth/refreshToken`,{},{
                      headers:{
                          "Content-Type": "application/json; charset=utf-8",
                          authorization:`Bearer ${refreshToken}`,
                          
                      }
                  });
                  
                  console.log("old",sessionStorage);
                  sessionStorage.clear()
                  sessionStorage.setItem("accessToken",res.data.newAccessToken);
                  sessionStorage.setItem("refreshToken",res.data.newRefreshToken);
                
                  console.log("new",sessionStorage);

                  return "new token generation success!!"
              }
              else{
                let error="login expired"
                handleLogout(error);
              }

}

  let handleDeleteUser=async()=>{
  let confirm=window.confirm('Do you wish to delete your Account? All your Todo List too will be deleted and new Registration required..!!')
if(confirm==true){  
  try {
  let id=localStorage.getItem('id');
  console.log(id);
  if(!id){
    let error="login required!! ";
    handleLogout(error);         
}
  let accessToken=sessionStorage.getItem('accessToken');
  console.log(accessToken);
  let res=await axios.delete(`${url}/user/${id}`,{
    headers:{
        authorization:`Bearer ${accessToken}`
    }
})
       
       if(res.status=200){
        console.log(res);
        toast.error("Your Current account deleted!!");
        Navigate('/login');
       }
       else{
        console.log("other response",res)
       }
  
 } catch (error) {
  console.log("error occured",error);
  if(error.response.status===401 || 400)
    {
        await updateToken();
          await handleDeleteUser()
        }else{

            toast.error(error.response.data.message)
            handleLogout();
        }
      
 }}else{
  console.log("delete option halted")
 }

  }

  let handleEditUser=async()=>{
    try {
      
      let id=localStorage.getItem('id');
      console.log(id);
      if(!id){
        let error="login required!! ";
        handleLogout(error);         
    }
      let accessToken=sessionStorage.getItem('accessToken');
      console.log(accessToken);
      let res=await axios.get(`${url}/user/${id}`,{
        headers:{
            authorization:`Bearer ${accessToken}`
        }
    })
           
             props.data(res.data);
             props.openModal();
    
      
    } catch (error) {
      console.log("error occured",error);
        if(error.response.status===401 || 400)
          {
              await updateToken();
                await handleEditUser()
              }else{

                  toast.error(error.response.data.message)
                  handleLogout();
              }
            
          }
   

  }

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <Link to="/todolist" class="navbar-brand" href="#"><i class="bi bi-house-door-fill"></i></Link>
    <Link to="/todolist" class="navbar-brand" href="#">Todolist</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse " id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto p-3 mb-2 mb-lg-0">
        
        <li class="nav-item dropdown">
          <Link class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
         <i class="bi bi-person-circle"></i>
           User
          </Link>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><Link to="/todolist" class="dropdown-item" href="#">home</Link></li>       
            <li><Link  class="dropdown-item" onClick={handleEditUser} 
            href="#">Edit User</Link></li>
            <li><Link  class="dropdown-item" onClick={handleDeleteUser} href="#">Delete User</Link></li>
            <li><Link to="alluser" class="dropdown-item" href="#">All User</Link></li>
            <li><hr class="dropdown-divider"/></li>
            <li><Link class="dropdown-item" href="#">Support</Link></li>
          </ul>
        </li>
        
      </ul>
      <form class="d-flex">
        <button class="btn btn-outline-success" onClick={handleLogout} type="submit">Logout</button>
      </form>
    </div>
  </div>
</nav>

    </div>

  )
}

export default Navbar