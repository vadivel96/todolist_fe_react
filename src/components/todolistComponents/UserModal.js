import '../../css/UserModal.css';
import React, { useEffect } from 'react'
import {url} from '../../App'
import { toast } from 'react-toastify';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


function UserModal(props) {

  let navigate=useNavigate();

  useEffect(()=>{
    console.log(props.data);
  },[])
const editUserValidation = Yup.object().shape({
  
  firstName:Yup.string().required('Required'),
  lastName:Yup.string().required('Required'),
  email:Yup.string().email("invalid Email").required('required'),
  password:Yup.string().required('required'),
  confirmPassword:Yup.string()
  .oneOf([Yup.ref('password'), null], 'Passwords must match')
  .required('Confirm Password is required')

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

            if(refreshToken!==null || undefined || 'undefined'){
                
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


  const handleSubmit=async(data)=>{
    try {
      let accessToken = sessionStorage.getItem('accessToken');
        let res = await axios.patch(`${url}/user/${props.data._id}`,data,{
            headers:{
                authorization:`Bearer ${accessToken}`
            }
        })

        if(res.status==201 || 200)
        {
         console.log("response",res);
            toast.success("user Updated !!"); 
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
                  await handleSubmit(data)
              }else{

                  toast.error(error.response.data.message)
                  handleLogout();
              }
            
           }

   
  }
  const handleCancel=async()=>{
    props.closeModal()
  }

  return (
    <div className='userModal-container' onClick={(e)=>{
        if(e.target.className==="userModal-container")props.closeModal()} }>
        <div className='userModal' >
            
<div className="container">
      <div className="row justify-content-center  ">
        <div className="col mb-3">
        <h2 className="mainTitle text-center mt-5"><b><p>Edit User</p></b></h2>       
        <Formik
      initialValues={{
        firstName:props.data.firstName,
        lastName:props.data.lastName,
        email:props.data.email,
        password: '',
       confirmPassword:'',
      }}
      validationSchema={editUserValidation}
      onSubmit={handleSubmit}
      onReset={handleCancel}
      >

      <Form className='form-control mb-3 '>
        <div className="form-group mb-3">
          <label htmlFor="firstName"><b className="loginTitle">First Name:</b></label>
          <Field
            className="form-control  "
            id='firstName'
            name='firstName'
            placeholder='First Name'
          />
          <div style={{color:"red"}}><ErrorMessage name='firstName'/></div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="lastName"><b className="loginTitle">Last Name:</b></label>
          <Field
            className="form-control  "
            id='lastName'
            name='lastName'
            placeholder='lastName'
          />
          <div style={{color:"red"}}><ErrorMessage name='lastName'/></div>
        </div>
 
        <div className="form-group mb-3">
          <label htmlFor="email"><b className="loginTitle">E-mail:</b></label>
          <Field
            className="form-control  "
            id='email'
            name='email'
            placeholder='Email'
          />
          <div style={{color:"red"}}><ErrorMessage name='email'/></div>
        </div>

        <div className="form-group mb-3 ">
          <label htmlFor="password"><b className="loginTitle">New Password:</b></label>
          <Field
            className="form-control "
            id="password"
            name='password'
            type="password"
            placeholder='password'
          />
          <div style={{color:"red"}}><ErrorMessage name='password'/></div>
          
        </div>

        <div className="form-group mb-3 ">
          <label htmlFor="confirmPassword"><b className="loginTitle">Confirm New Password:</b></label>
          <Field
            className="form-control "
            id="confirmPassword"
            name='confirmPassword'
            type='password'
            placeholder='Confirm password'
          />
          <div style={{color:"red"}}><ErrorMessage name='confirmPassword'/></div>
          
        </div>

        <br/>
          
        <button type="submit" className="btn btn-primary">Submit</button>&nbsp;&nbsp;&nbsp;
        <button type="reset" onClick={handleCancel} className="btn btn-danger">Cancel</button>
      </Form>
    
    
      </Formik>

        </div>
      </div>
     
    </div>
        </div>
    </div>
  )
}

export default UserModal