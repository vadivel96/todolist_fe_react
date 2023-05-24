import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {url} from '../../../App'
import { toast } from 'react-toastify';

function ServicesList() {

  let token = sessionStorage.getItem('token')
  let [users,setUsers] = useState([]);
  let navigate = useNavigate();

    
  let getData = async()=>{
    try {
      
        let res = await axios.get(`${url}/service/`,{
            headers:{
                authorization:`Bearer ${token}`
            }
        })
      
        if(res.status===201)
        {
          
            setUsers(res.data.service);
        }
    } catch (error) {
        toast.error(error.response.data.message)
        if(error.response.status===401)
           
           {
             handleLogout()
           }
    }
}

useEffect(()=>{
  
  if(token)
      getData()
  else
      handleLogout()
},[])

let handleLogout = async()=>{
sessionStorage.clear()
navigate('/login')
}

  return (
    <div className="serviceList" style={{marginTop:"100px"}}>
         <div className="mt-5">ServicesList
      
      <div className="table-responsive mt-5 p-3">
     <table className="table table-bordered table-success align-middle table-hover ">
  <thead className="align-middle">
    <tr>
      <th scope="col">S.No</th>
      <th scope="col">Customer Name</th>
      <th scope="col">Service Category</th>
      <th scope="col">Service Name</th>
      <th scope="col">Service Description</th>
      <th scope="col">Email</th>
      <th scope="col">Contact.No</th>
      <th scope="col">Status</th>
      <th scope="col">Created By</th>
      <th scope="col">Assigned to</th>
      <th scope="col">Update/Delete</th>
    </tr>
  </thead>
  <tbody>
  { 
      users.map((e,i)=>{
                    return <tr key={i}>
                        <td>{i+1}</td>
                        <td>{e.customerName}</td>
                        <td>{e.serviceCategory}</td>
                        <td>{e.serviceName}</td>
                        <td>{e.serviceDescription}</td>
                        <td>{e.email}</td>
                        <td>{e.mobileNumber}</td>
                        <td>{e.status}</td>
                        <td>{e.createdBy}</td>
                        <td>{e.assignedTo}</td>
                        <td>update/delete</td>

                        
                        
                    </tr>
                    })
  }
    
    
  </tbody>
</table>
</div>

    </div>
    </div>

  )
}

export default ServicesList