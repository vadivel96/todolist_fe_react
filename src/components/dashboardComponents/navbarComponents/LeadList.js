import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {url} from '../../../App'
import { toast } from 'react-toastify';



function LeadList() {

  let token = sessionStorage.getItem('token')
  let [users,setUsers] = useState([]);
  let navigate = useNavigate()
  
  let getData = async()=>{
      try {
        
          let res = await axios.get(`${url}/lead/`,{
              headers:{
                  authorization:`Bearer ${token}`
              }
          })
        
          if(res.status===201)
          {
              setUsers(res.data.lead);
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
    else{
    let error="timed out...login required!!";
    console.log(error);
        handleLogout(error)}
},[])

let handleLogout = async(error)=>{
  toast.error(error);
  sessionStorage.clear()
  navigate('/login')
}

  return (
    <div className="" style={{marginTop:"100px"}}>LeadList
      
     <div className="table-responsive m-3 p-3">
     <table className="table table-bordered table-secondary table-hover ">
  <thead>
    <tr>
      <th scope="col">S.No</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Contact.No</th>
      <th scope="col">Occupation</th>
      <th scope="col">Lead Reliability</th>
      <th scope="col">Lead Risk</th>
      <th scope="col">Status</th>
      <th scope="col">Lead Source</th>
      <th scope="col">Call</th>
      <th scope="col">Update/Delete</th>
    </tr>
  </thead>
  <tbody>
 { 
      users.map((e,i)=>{
                    return <tr key={i}>
                        <td>{i+1}</td>
                        <td>{e.firstName}</td>
                        <td>{e.email}</td>
                        <td>{e.mobileNumber}</td>
                        <td>{e.occupation}</td>
                        <td>{e.leadReliability}</td>
                        <td>{e.leadRisk}</td>
                        <td>{e.status}</td>
                        <td>{e.leadSource}</td>
                        <td>{e.call}</td>
                        <td>update/delete</td>
                    </tr>
                    })
  }
    
    
  </tbody>
</table>
   </div>

    </div>
  )
}

export default LeadList