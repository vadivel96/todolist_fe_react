import React, { useState } from 'react';
import './login.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {url} from '../../App';
import { toast } from 'react-toastify';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

 
const forgetPasswordValidation = Yup.object().shape({
  
  email: Yup.string().email('Invalid email').required('Required')
});

function ForgetPassword() {
  const[message,setMessage]=useState(" ");
  const[show,setShow]=useState(false)
  let navigate = useNavigate();
  
  const handleSubmit = async(event) => {
     console.log(event);
    
    try {
      let res = await axios.post(`${url}/password/forget-password`,event)
      console.log(res.data.message);
      setMessage(res.data.message);
      setShow(true);
       
  } catch (error) {
    console.log(error.response.data.message)
      toast.error(error.response.data.message)
  }
   
  };


  
 
  return (
    <div>
       <div className="background-image  ">
    <div className="position-absolute top-50 start-50 translate-middle layer p-3">
    <div className="container ">
      <div className="row ">
        
        <div className="col">
        <h2 className="mainTitle text-center"><b><p>Forget Password</p></b></h2>
        
        
        <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={forgetPasswordValidation}
      onSubmit={handleSubmit}>

      <Form >
        <div className="form-group mb-1">
          <label htmlFor="email"><b className="loginTitle">
            <h5 className='text-center'>Enter your registered E-mail</h5></b></label>
          <Field
            className="form-control mb-2 "
            id='email'
            name='email'
            placeholder='email'
          />
          <div style={{color:"red"}}><ErrorMessage name='email'/></div>
        </div>
       { show?<p>{message}</p>:<button type="submit" className="btn btn-primary">Submit</button>}
        
          
        
       
      </Form>
    
    
      </Formik>

    
   
      
        </div>
      </div>
     
    </div>
    </div>
    </div>
    
    </div>
  )
}

export default ForgetPassword




  












