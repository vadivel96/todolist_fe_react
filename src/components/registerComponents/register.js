import React from 'react'
import'./register.css';
import {url} from '../../App'
import { toast } from 'react-toastify';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

  
const registerValidation = Yup.object().shape({
  
  firstName:Yup.string().required('Required'),
  lastName:Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
  .min(2, 'Too Short!')
  .max(50, 'Too Long!')
  .required('Required'),
  confirmPassword:Yup.string()
  .oneOf([Yup.ref('password'), null], 'Passwords must match')
  .required('Confirm Password is required'),
});


function Register() {
    let navigate=useNavigate();

 let handleSubmit = async(event)=>{
   let data={firstName:event.firstName,lastName:event.lastName,email:event.email,
  password:event.password}
    try {
        let res = await axios.post(`${url}/auth/createUser`,data)
            console.log(res);
            if(res.data==="already user exists!!"){
              console.log(res.data)
              alert("This email ID already taken !!, please use another email ");
              return
            }
        if(res.status===201 || 200){
          sessionStorage.setItem('accesToken',res.data.accesToken);
          sessionStorage.setItem('refreshToken',res.data.refreshToken);
           alert(res.statusText +"!! Now, you can go back to login page to login!!!!!"); 
        }
        
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
}

let handleCancel=()=>{
  console.log("handleCancel clicked")
    navigate('/login');
}

  
  

  return (
    <div className='background-registration '>

<div className="container">
      <div className="row justify-content-center  ">
        
        <div className="col-md-6 mb-3">
        <h2 className="mainTitle text-center mt-5"><b><p>User Registration</p></b></h2>       
        <Formik
      initialValues={{
        firstName:'',
        lastName:'',
        email:'',
        password: '',
       confirmPassword:'',
      }}
      validationSchema={registerValidation}
      onSubmit={handleSubmit}
      onReset={handleCancel}>

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
          <label htmlFor="password"><b className="loginTitle">password:</b></label>
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
          <label htmlFor="confirmPassword"><b className="loginTitle">Confirm password:</b></label>
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
        <button type="reset" onClick={handleCancel} className="btn btn-danger">Go back to Login page</button>
      </Form>
    
    
      </Formik>

    
   
      
        </div>
      </div>
     
    </div>
  
    </div>
  )
}

export default Register