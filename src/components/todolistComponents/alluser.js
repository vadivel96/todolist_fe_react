import axios from 'axios';
import{ React,useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { url } from '../../App';

function AllUser() {

  
  let accessToken = sessionStorage.getItem('accessToken');
   
  let [users,setUsers] = useState([]);
  let navigate = useNavigate();
  
  let getData = async(token)=>{
      try {
        let accessToken = sessionStorage.getItem('accessToken');
          let res = await axios.get(`${url}/auth/getUser`,{
              headers:{
                  authorization:`Bearer ${accessToken}`
              }
          })
          
         
          if(res.status===(200 || 201))
          {
              setUsers(res.data);
          }
          else{
            console.log("response",res);
          }
      } catch (error) {
        console.log("error occured",error);
          if(error.response.status===401 || 400)
             {
                let refreshToken=sessionStorage.getItem('refreshToken');

                if(refreshToken){
                    console.log("refreshToken",refreshToken)
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
                    await getData()
                }else{
                  let error="unauthorized access detected"
                    handleLogout(error);
                }
              
             }
      }
  }

  useEffect(()=>{
   
    if(accessToken){
        getData()
    }   
    else{
    let error="login required!!";
     handleLogout(error)
    }
},[])


let handleLogout = async(error)=>{
  if(error){toast.error(error);}
  sessionStorage.clear();
  navigate('/login');
}









  return (
    <div>AllUser
       <div>
         <div className="" style={{marginTop:"10px"}}>
      
      <div className="table-responsive m-3 p-3">
      <table className="table table-bordered table-secondary table-hover ">
   <thead>
     <tr>
       <th scope="col">S.No</th>
       <th scope="col">First Name</th>
       <th scope="col">Last Name</th>
       <th scope="col">Email</th>
     </tr>
   </thead>
   <tbody>
  { 
       users.map((e,i)=>{
                     return <tr key={i}>
                         <td>{i+1}</td>
                         <td>{e.firstName}</td>
                         <td>{e.lastName}</td>
                         <td>{e.email}</td>
                     </tr>
                     })
   }
     
     
   </tbody>
 </table>
    </div>
 
     </div>
    </div>
    </div>
  )
}

export default AllUser