import React from 'react'
import {url} from '../../../App'
import { toast } from 'react-toastify';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const serviceValidation = Yup.object().shape({
  
  customerName:Yup.string().required('required'),
  serviceCategory:Yup.string().required('required'),
  serviceName:Yup.string().required('required'),
  serviceDescription:Yup.string().required('required'),
  email: Yup.string().email('Invalid email').required('Required'),
  mobileNumber:Yup.string().required('required'),
  status:Yup.string().required('required'),
  
  
});



const handleSubmit=async(event)=>{
  console.log("consoled");
  console.log("hi");
  let token = sessionStorage.getItem('token')
  try {
      let res = await axios.post(`${url}/service/createService`,event,{
        headers:{
            authorization:`Bearer ${token}`
        }
    })
          console.log(res)
      if(res.status===201){
        toast.success(res.data.message); 
         
      }
      
  } catch (error) {
    toast.error(error.response.data.message)
    console.log(error)
  }
}

function CreateServices() {
  return (
    <div style={{marginTop:"100px"}}>
    <div className="container">
  <div className="row justify-content-center  ">
    
    <div className="col-md-6 mb-3">
    <h2 className="mainTitle text-center mt-5"><b>Create Services</b></h2>       
    <Formik
  initialValues={{
    customerName:'',
    serviceCategory:'',
    serviceName:'',
    serviceDescription:'',
    email: '',
    mobileNumber:'',
    status:'',
    
    
  }}
  validationSchema={serviceValidation}
  onSubmit={handleSubmit}>

  <Form className='form-control mb-3 '>
    <div className="form-group mb-3">
      <label htmlFor="customerName"><b className="loginTitle">Customer Name:</b></label>
      <Field
        className="form-control  "
        id='customerName'
        name='customerName'
        placeholder='Customer Name'
      />
      <div style={{color:"red"}}><ErrorMessage name='customerName'/></div>
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
      <label htmlFor="serviceCategory"><b className="loginTitle">serviceCategory:</b></label>
      <Field
        className="form-control  "
        id='serviceCategory'
        name='serviceCategory'
        placeholder='service category'
      />
      <div style={{color:"red"}}><ErrorMessage name='serviceCategory'/></div>
    </div>
    <div className="form-group mb-3">
      <label htmlFor="serviceName"><b className="loginTitle">serviceName:</b></label>
      <Field
        className="form-control  "
        id='serviceName'
        name='serviceName'
        placeholder='service name'
      />
      <div style={{color:"red"}}><ErrorMessage name='serviceName'/></div>
    </div>
    <div className="form-group mb-3">
      <label htmlFor="serviceDescription"><b className="loginTitle">serviceDescription:</b></label>
      <Field
        className="form-control  "
        id='serviceDescription'
        name='serviceDescription'
        placeholder='service description'
      />
      <div style={{color:"red"}}><ErrorMessage name='serviceDescription'/></div>
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

export default CreateServices