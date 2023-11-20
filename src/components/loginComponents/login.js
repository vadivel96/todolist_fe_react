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
    //.min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});





function LoginPage() {
 

  let navigate = useNavigate();
  
const handleSubmit = async(event) => {
   
  
  try {
    let res = await axios.post(`${url}/auth/loginUser`,event)
    console.log(event.email);
    if(res.status===201 || 200){
        sessionStorage.setItem('accessToken',res.data.accessToken);
        sessionStorage.setItem('refreshToken',res.data.refreshToken);
        localStorage.setItem('id',res.data.id);
        toast.success(" login successfull !!")
        navigate('/todolist')      
    }
    else{
      console.log(res);
    }
    
    
} catch (error) {
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
    
    <div className="background-image ">
    <div className="position-absolute top-50 start-50 translate-middle layer   p-3">
    <div className="container  ">
      <div className="row ">
        
        <div className="col">
        <h2 className="mainTitle text-center"><b><p>Todolist App</p></b></h2>
        <h3 className='text-center'><b>Login</b></h3>
        
        <Formik className=""
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={loginValidation}
      onSubmit={handleSubmit}>

      <Form className='' >
        <div className="form-group  mb-1">
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





