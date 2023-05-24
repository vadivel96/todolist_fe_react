import React from 'react'
import {url} from '../../../App'
import { toast } from 'react-toastify';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const leadValidation = Yup.object().shape({
  
  firstName:Yup.string().required('required'),
  lastName:Yup.string().required('required'),
  email: Yup.string().email('Invalid email').required('Required'),
  mobileNumber:Yup.string().required('required'),
  occupation:Yup.string().required('required'),
  leadReliability:Yup.string().required('required'),
  leadRisk:Yup.string().required('required'),
  status:Yup.string().required('required'),
  leadSource:Yup.string().required('required'),
  call:Yup.string().required('required'),
});

const handleSubmit=async(event)=>{
  console.log(event)
  try {
    let token = sessionStorage.getItem('token')
      let res = await axios.post(`${url}/lead/createlead`,event,{
        headers:{
            authorization:`Bearer ${token}`
        }
    })
      if(res.status===201){
         toast.success(res.data.message); 
      }
      
  } catch (error) {
    toast.error(error.response.data.message)
  }
}

function CreateLead() {
  return (
    <div style={{marginTop:"100px"}}>
        <div className="container">
      <div className="row justify-content-center  ">
        
        <div className="col-md-6 mb-3">
        <h2 className="mainTitle text-center mt-5"><b><p>Create lead</p></b></h2>       
        <Formik
      initialValues={{
        firstName:'',
        lastName:'',
        email: '',
        mobileNumber:'',
        occupation:'',
        leadReliability:'',
        leadRisk:'',
        status:'',
        leadSource:'',
        call:'',
      }}
      validationSchema={leadValidation}
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
          <label htmlFor="occupation"><b className="loginTitle">occupation:</b></label>
          <Field
            className="form-control  "
            id='occupation'
            name='occupation'
            placeholder='occupation'
          />
          <div style={{color:"red"}}><ErrorMessage name='occupation'/></div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="leadReliability"><b className="loginTitle">leadReliability:</b></label>
          <Field
            className="form-control  "
            id='leadReliability'
            name='leadReliability'
            placeholder='leadReliability'
          />
          <div style={{color:"red"}}><ErrorMessage name='leadReliability'/></div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="leadRisk"><b className="loginTitle">leadRisk:</b></label>
          <Field
            className="form-control  "
            id='leadRisk'
            name='leadRisk'
            placeholder='leadRisk'
          />
          <div style={{color:"red"}}><ErrorMessage name='leadRisk'/></div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="status"><b className="loginTitle">status:</b></label>
          <Field
            className="form-control  "
            id='status'
            name='status'
            placeholder='status'
          />
          <div style={{color:"red"}}><ErrorMessage name='status'/></div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="leadSource"><b className="loginTitle">leadSource:</b></label>
          <Field
            className="form-control  "
            id='leadSource'
            name='leadSource'
            placeholder='leadSource'
          />
          <div style={{color:"red"}}><ErrorMessage name='leadSource'/></div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="call"><b className="loginTitle">Call:</b></label>
          <Field
            className="form-control  "
            id='call'
            name='call'
            placeholder='call'
          />
          <div style={{color:"red"}}><ErrorMessage name='call'/></div>
        </div>
       
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

export default CreateLead