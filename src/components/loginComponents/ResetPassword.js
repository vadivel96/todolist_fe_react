import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {url} from '../../App';
import { toast } from 'react-toastify';
import axios from 'axios'
import { useNavigate,useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

  
const resetValidation = Yup.object().shape({
    password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    confirmPassword: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});


function ResetPassword() {

  let navigate = useNavigate();
  let params=useParams();
  let {email}=params;
  console.log(email);
  const handleSubmit = async (event) => {
  console.log(event);
  console.log('im working')
  try {
    let res = await axios.post(`${url}/password/reset-password/${email}`,event)
   console.log(res.data.message);
   toast.success(res.data.message);
   let confirm=confirm("Press a button!");
   if (confirm==true) {
     navigate('/login');
   } 
   
     
} catch (error) {
    toast.error(error)
}
}


  return (
    <div>
            <div className="background-image  ">
    <div className="position-absolute top-50 start-50 translate-middle layer p-3">
    <div className="container ">
      <div className="row ">
        
        <div className="col">
        <h2 className="mainTitle text-center"><b><p>Reset Password</p></b></h2>
        <h5 className='text-center'>Enter new password</h5>
        
        <Formik
      initialValues={{
        password: '',
        confirmPassword:'',
      }}
      validationSchema={resetValidation}
      onSubmit={handleSubmit}
      >

      <Form >
      
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

        </div>
        <div className="form-group ">
          <label htmlFor="confirmPassword"><b className="loginTitle">confirm password:</b></label>
          <Field
            className="form-control mb-2 "
            id="confirmPassword"
            name='confirmPassword'
            type='password'
            placeholder='Confirm Password'
          />
          <div style={{color:"red"}}><ErrorMessage name='confirmPassword'/></div>

        </div>
        <br/>
          
        <button type="submit"  className="btn btn-primary">Submit</button>
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

export default ResetPassword









