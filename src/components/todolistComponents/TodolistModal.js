import '../../css/TodolistModal.css';
import React, { useEffect } from 'react'
import {url} from '../../App'
import { toast } from 'react-toastify';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


function TodolistModal(props) {

  let navigate=useNavigate()

  useEffect(()=>{
    console.log(props)
  },[])

const todolistValidation = Yup.object().shape({
  
  title:Yup.string().required('Required'),
  description:Yup.string().required('Required'),

});



let handleLogout = async(error)=>{
  if(error){toast.error(error);}
  sessionStorage.clear();
  navigate('/login');
}


let updateToken=async()=>{
  let refreshToken=await sessionStorage.getItem('refreshToken');
  console.log("refreshToken type",typeof refreshToken);
  console.log("refreshToken..",refreshToken);

            if(refreshToken!=(null || undefined || 'undefined')){
                
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
          props.user(res.data);
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

const patchData=async(data)=>{
try {
  let accessToken = sessionStorage.getItem('accessToken');
  console.log("data entered!!")
  console.log(data)
    let res = await axios.put(`${url}/to-do-list/updateTodolist/${props.data._id}`,data,{
        headers:{
            authorization:`Bearer ${accessToken}`
        }
    })

    if(res.status===201 || 200)
    {
     console.log("response",res);
        toast.success("todo updated !!");
        await getData();
        props.closeModal();

    }
    else{
      console.log("other response",res);
    }

} catch (error) {
  console.log("error occured",error);
    if(error.response.status=== 401 || 400)
       {
              await updateToken()
              await patchData(data)
          }else{

              toast.error(error.response.data.message)
              handleLogout();
          }
        
       }
}

  return (
   
      <div className='todolistModal-container' onClick={(e)=>{
      if(e.target.className==="todolistModal-container")props.closeModal()} }>
      <div className='todolistModal' >
          
<div className="container">
    <div className="row justify-content-center  ">
      <div className="col mb-3">
      <h2 className="mainTitle text-center mt-5"><b><p>Edit Todo</p></b></h2>       
      <Formik
    initialValues={{
      title:props.data.title,
      description:props.data.description,

    }}
     validationSchema={todolistValidation}
    onSubmit={patchData}
    onReset={props.closeModal}
    >

    <Form className='form-control mb-3 '>
      <div className="form-group mb-3">
        <label htmlFor="title"><b className="loginTitle">Title:</b></label>
        <Field
          className="form-control  "
          id='title'
          name='title'
        />
        <div style={{color:"red"}}><ErrorMessage name='title'/></div>
      </div>
      <div className="form-group mb-3">
        <label htmlFor="description"><b className="loginTitle">description:</b></label>
        <Field
          className="form-control  "
          id='description'
          name='description'
        />
        <div style={{color:"red"}}><ErrorMessage name='description'/></div>
      </div>
 
      <br/>
        
      <button type="submit" className="btn btn-primary">Submit</button>&nbsp;&nbsp;&nbsp;
      <button type="reset" onClick={props.closeModal} className="btn btn-danger">cancel</button>
    </Form>
  
  
    </Formik>

      </div>
    </div>
   
  </div>
      </div>
  </div>
 
  )
}

export default TodolistModal