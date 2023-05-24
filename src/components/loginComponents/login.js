import React, { useState } from 'react';
import './login.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {url} from '../../App';
import { toast } from 'react-toastify';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


  
const loginValidation = Yup.object().shape({
  
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});





function LoginPage() {
 
  let navigate = useNavigate();
  
const handleSubmit = async(event) => {
   console.log(event);
  
  try {
    let res = await axios.post(`${url}/`,event)
    console.log(typeof res);
    console.log(res);
    if(res.status===200){
        sessionStorage.setItem('token',res.data.token)
        toast.success(res.data.message)
        if(res.data.role=="employee"){

          navigate('/dashboard')
        }
        if(res.data.role=="customer"){
          navigate('/customerPage')
        }
       
    }
    else{
      console.log(res);
    }
    
    
} catch (error) {
  console.log(error.response.data.message)
    toast.error(error.response.data.message)
}

};

const forgetPassword=async(event)=>{
  navigate('/forget-password');
};

const register=async(event)=>{
  navigate('/register');
}
       
  return (
    <>
    
    <div className="background-image  ">
    <div className="position-absolute top-50 start-50 translate-middle layer p-3">
    <div className="container ">
      <div className="row ">
        
        <div className="col">
        <h2 className="mainTitle text-center"><b><p>Customer Relationship Management</p></b></h2>
        <h3 className='text-center'><b>Login</b></h3>
        
        <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={loginValidation}
      onSubmit={handleSubmit}>

      <Form >
        <div className="form-group mb-1">
          <label htmlFor="email"><b className="loginTitle">E-mail:</b></label>
          <Field
            className="form-control mb-2 "
            id='email'
            name='email'
            type='email'
            placeholder='email'
          />
          <div style={{color:"red"}}><ErrorMessage name='email'/></div>
        </div>
        <div className="form-group ">
          <label htmlFor="password"><b className="loginTitle">password:</b></label>
          <Field
            className="form-control mb-2 "
            id="password"
            name='password'
            type='password'
            placeholder='password'
          />
          <div style={{color:"red"}}><ErrorMessage name='password'/></div>
          
           
          <a className="" href="#" onClick={forgetPassword}>forget password</a><br/><br/>
          <a className="" href="#" onClick={register}>not a user? register here</a>
        </div>
        <br/>
          
        <button type="submit" className="btn btn-primary">Submit</button>
      </Form>
    
    
      </Formik>

    
   
      
        </div>
      </div>
     
    </div>
    </div>
    </div>
    
    
    </>
   
  );
}

export default LoginPage;





