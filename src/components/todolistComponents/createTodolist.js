import axios from 'axios';
import '../../css/TodolistModal.css'
import{ React,useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { url } from '../../App';
import Todolist from './todolist';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TodolistModal from './TodolistModal';

function CreateTodolist() {
  let accessToken = sessionStorage.getItem('accessToken');
  let [users,setUsers] = useState([]);
  let [updateTodo,setUpdateTodo]=useState([])
  const [todoModal,setTodoModal]=useState(false);
  let [data,setData]=useState([])
  let [update,setUpdate]=useState(false);
  let navigate = useNavigate();

 
  useEffect(()=>{
    if(accessToken){
        getData()
    }   
    else{
    let error="login required!!";
    console.log(error);
     handleLogout(error)
    }
},[])



  let handleLogout = async(error)=>{
    if(error){toast.error(error);}
    sessionStorage.clear();
    navigate('/login');
  }

  const handleUpdateClick = (e) => {
    setTodoModal(true);
    setUpdateTodo(e)
  };
  
  
  const todoValidation = Yup.object().shape({
  
    title: Yup.string().required('Required'),
    description: Yup.string()
      .min(5, 'Too Short!')
      .max(200, 'Too Long!')
      .required('Required'),
  });

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

    let getData = async(token)=>{
      try {
        let accessToken = sessionStorage.getItem('accessToken');
          let res = await axios.get(`${url}/to-do-list/getAllTodolist`,{
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
                await updateToken();
                  await getData()
                }else{

                    toast.error(error.response.data.message)
                    handleLogout();
                }
              
            }
      }

     let postData=async(data)=>{
       try {
                  let accessToken = sessionStorage.getItem('accessToken');
                    let res = await axios.post(`${url}/to-do-list/createTodolist`,data,{
                        headers:{
                            authorization:`Bearer ${accessToken}`
                        }
                    })

                    if(res.status===201)
                    {
                     console.log("response",res);
                        toast.success("todo created !!");
                        getData()

                    }
                    else{
                      console.log("other response",res);
                    }

                } catch (error) {
                  console.log("error occured",error);
                    if(error.response.status=== 401 || 400)
                       {
                              await updateToken()
                              await postData(data)
                          }else{
          
                              toast.error(error.response.data.message)
                              handleLogout();
                          }
                        
                       }
      }

     let deleteData=async(id)=>{
        try {
         
          let accessToken = sessionStorage.getItem('accessToken');
            let res = await axios.delete(`${url}/to-do-list/deleteTodolist/${id}`,{
                headers:{
                    authorization:`Bearer ${accessToken}`
                }
            })
  
            if(res.status===201 || 200)
            {
             console.log("response",res);
                toast.error("todo deleted !!");
                getData();
  
            }
            else{
              console.log("other response",res);
            }
  
        } catch (error) {
          console.log("error occured",error);
            if(error.response.status=== 401 || 400)
               {
                      await updateToken();
                      console.log("token updated")
                      await deleteData(id);
                  }else{
  
                      toast.error(error.response.data.message)
                      handleLogout();
                  }
                
               }
      
     
         
     }



  return (
    <div>hey create your Todo!!! I will remember for you 
     
         <div className="" style={{marginTop:"10px"}}>
         <Formik
      initialValues={{
        title: '',
        description: '',
      }}
       validationSchema={todoValidation}
       onSubmit={(data)=>postData(data)}
      >
        
           <div className='d-flex align-items-center flex-column todoCreate '>
            <Form>
            <div class="mb-3 col  ">
            <label for="exampleFormControlInput1" class="form-label fs-1 " >Todo Title</label>
            <Field type="text" class="form-control " id="title" name="title" placeholder="title" />
          </div>
          <div style={{color:"red"}}><ErrorMessage name='title'/></div>

          <div class="mb-3 col ">
            <label for="exampleFormControlTextarea1" class="form-label fs-1 ">Todo Description</label>
            <Field as="textarea" class="form-control" id="description" name="description" placeholder="description" rows="4"></Field>
         </div>
         <div style={{color:"red"}}><ErrorMessage name='description'/></div>
              <br/>
           <button type='submit' className='btn btn-primary '>create</button>
            </Form>

           </div>
        </Formik>
      
      <div className="table-responsive m-3 p-3">
      <table className="table table-bordered table-secondary table-hover ">
   <thead>
     <tr>
       <th scope="col">S.No</th>
       <th scope="col">Todo Title</th>
       <th scope="col">Todo Description</th>
       <th scope="col">Update/Delete</th>
     </tr>
   </thead>
   <tbody>
  { 
       users.map((e,i)=>{
        
                     return <tr key={i}>
                         <td>{i+1}</td>
                         <td>{e.title}</td>
                         <td>{e.description}</td>
                         <td>
                         <button className='btn btn-secondary btn-sm mt-1' 
                         onClick={()=>handleUpdateClick(e)}>update</button>&nbsp;&nbsp;&nbsp;
                           {todoModal && <TodolistModal user={setUsers} data={updateTodo} closeModal={()=>setTodoModal(false)}/>}
                         <button className='btn btn-danger btn-sm mt-1' onClick={async()=>deleteData(e._id)} >delete</button>
                         </td>
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

export default CreateTodolist 