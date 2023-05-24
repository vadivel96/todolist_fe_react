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
  gender:Yup.string().required('Required'),
  age:Yup.string().required('Required'),
  dateOfBirth:Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  mobileNumber:Yup.string().required('Required'),
  address1:Yup.string().required('Required'),
  address2:Yup.string().required('Required'),
  address3:Yup.string().required('Required'),
  state:Yup.string().required('Required'),
  nationality:Yup.string().required('Required'),
  pinCode:Yup.string().required('Required'),
  password: Yup.string()
  .min(2, 'Too Short!')
  .max(50, 'Too Long!')
  .required('Required'),
  // confirmPassword:Yup.string()
  // .min(2, 'Too Short!')
  // .max(50, 'Too Long!')
  // .required('Required')
});


function Register() {
    let navigate=useNavigate();

 let handleSubmit = async(event)=>{
   console.log(event)
    try {
        let res = await axios.post(`${url}/customer/createCustomer`,event)
            console.log(res)
        if(res.status===201){
           alert(res.data.message+"Now, you can go back to login page to login!!!!!"); 
        }
        
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
}

let handleCancel=()=>{
    navigate('/login');
}

  
  

  return (
    <div className='background-registration '>

<div className="container">
      <div className="row justify-content-center  ">
        
        <div className="col-md-6 mb-3">
        <h2 className="mainTitle text-center mt-5"><b><p>Customer Registration</p></b></h2>       
        <Formik
      initialValues={{
        firstName:'',
        lastName:'',
        gender:'',
        age:'',
        dateOfBirth:'',
        email:'',
        mobileNumber:'',
        address1:'',
        address2:'',
        address3:'',
        state:'',
        nationality:'',
        pinCode:'',
        password: '',
       // confirmPassword:'',
      }}
      validationSchema={registerValidation}
      onSubmit={handleSubmit}>

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
          <label htmlFor="gender"><b className="loginTitle">gender:</b></label>
          <Field
            className="form-control  "
            id='gender'
            name='gender'
            placeholder='gender'
          />
          <div style={{color:"red"}}><ErrorMessage name='email'/></div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="age"><b className="loginTitle">age:</b></label>
          <Field
            className="form-control  "
            id='age'
            name='age'
            placeholder='age'
          />
          <div style={{color:"red"}}><ErrorMessage name='age'/></div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="dateOfBirth"><b className="loginTitle">Date Of Birth:</b></label>
          <Field
            className="form-control  "
            id='dateOfBirth'
            name='dateOfBirth'
            placeholder='Date Of Birth'
          />
          <div style={{color:"red"}}><ErrorMessage name='dateOfBirth'/></div>
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
        <div className="form-group mb-3">
          <label htmlFor="mobileNumber"><b className="loginTitle">Mobile Number:</b></label>
          <Field
            className="form-control  "
            id='mobileNumber'
            name='mobileNumber'
            placeholder='Mobile Number'
          />
          <div style={{color:"red"}}><ErrorMessage name='mobileNumber'/></div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="address1"><b className="loginTitle">address1:</b></label>
          <Field
            className="form-control  "
            id='address1'
            name='address1'
            placeholder='apartment/house no,street Name'
          />
          <div style={{color:"red"}}><ErrorMessage name='address1'/></div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="address2"><b className="loginTitle">address2:</b></label>
          <Field
            className="form-control  "
            id='address2'
            name='address2'
            placeholder='Area/locality'
          />
          <div style={{color:"red"}}><ErrorMessage name='address2'/></div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="address3"><b className="loginTitle">address3:</b></label>
          <Field
            className="form-control  "
            id='address3'
            name='address3'
            placeholder='District'
          />
          <div style={{color:"red"}}><ErrorMessage name='address3'/></div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="state"><b className="loginTitle">state:</b></label>
          <Field
            className="form-control  "
            id='state'
            name='state'
            placeholder='state'
          />
          <div style={{color:"red"}}><ErrorMessage name='state'/></div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="nationality"><b className="loginTitle">nationality:</b></label>
          <Field
            className="form-control  "
            id='nationality'
            name='nationality'
            placeholder='nationality'
          />
          <div style={{color:"red"}}><ErrorMessage name='nationality'/></div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="pinCode"><b className="loginTitle">Pin Code:</b></label>
          <Field
            className="form-control  "
            id='pinCode'
            name='pinCode'
            placeholder='Pin Code'
          />
          <div style={{color:"red"}}><ErrorMessage name='pinCode'/></div>
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

        {/* <div className="form-group mb-3 ">
          <label htmlFor="confirmPassword"><b className="loginTitle">Confirm password:</b></label>
          <Field
            className="form-control "
            id="confirmPassword"
            name='confirmPassword'
            type='password'
            placeholder='Confirm password'
          />
          <div style={{color:"red"}}><ErrorMessage name='confirmPassword'/></div>
          
        </div> */}
        <br/>
          
        <button type="submit" className="btn btn-primary">Submit</button>
      </Form>
    
    
      </Formik>

    
   
      
        </div>
      </div>
     
    </div>
  
    </div>
  )
}

export default Register