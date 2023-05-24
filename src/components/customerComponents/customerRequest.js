import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {url} from '../../App'
import { toast } from 'react-toastify';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function CustomerRequest() {
  let navigate=useNavigate();
  let token = sessionStorage.getItem('token')


  let [firstName,setFirstName]=useState('')
  let [lastName,setLastName]=useState('')
  let [carBrand,setCarBrand]=useState('')
  let [carModel,setCarModel]=useState('')
  let [carType,setCarType]=useState('')
  let [serviceCategory,setServiceCategory]=useState('')
  let [serviceName,setServiceName]=useState('')
  let [subServiceName,setSubServiceName] = useState('')
  let [mobileNumber,setMobileNumber] = useState('')
  let [email,setEmail] = useState('')
  let [preferredLocation,setPreferredLocation] = useState('')
  let [customerExistingAddress,setCustomerExistingAddress] = useState('')
  let [address1,setAddress1] = useState('')
  let [address2,setAddress2] = useState('')
  let [address3,setAddress3] = useState('')
  let [address4,setAddress4] = useState('')
  let [address5,setAddress5] = useState('')
  let [pinCode,setPinCode] = useState('')
  let [customerDayAvailability,setCustomerDayAvailability] = useState('')
  let [customerTiming,setCustomerTiming] = useState('')

  let data={firstName,lastName,carBrand,carModel,carType,serviceCategory,serviceName,subServiceName,
    mobileNumber,email,preferredLocation,customerExistingAddress,
    address1,address2,address3,address4,address5,pinCode,customerDayAvailability,customerTiming
  }

  let handleSubmit=async()=>{
    try {
      let res = await axios.post(`${url}/customer/createCustomerRequest`,data,{
        headers:{
        authorization:`Bearer ${token}`
    }})
          console.log(res)
      if(res){
         alert(res.data.message);
          navigate('/customerPage');
      }
      
  } catch (error) {
      toast.error(error.response.data.message)
  }
}

  
  let handleCancel=async()=>{
    navigate('/login');
  }

 
  

  return (
    <div className='container'>
         <div className='row justify-content-md-center '>
          <div className="col col-md-6">
          
<Form className="  form-control m-3  fs-5 ">

<h1 className='fs-3'>Create your Service </h1>

<Form.Group className="mb-3 " controlId="formBasicFirstName">
<Form.Label>First Name</Form.Label>
<Form.Control type="text" placeholder="Enter first name"  onChange={(event) => setFirstName(event.target.value)}/>
</Form.Group>

<Form.Group className="mb-3 " controlId="formBasiclastName">
<Form.Label> lastName</Form.Label>
<Form.Control type="text " placeholder="Enter lastName"  onChange={(event) => setLastName(event.target.value)}/>
</Form.Group>

<Form.Group className="mb-3 " controlId="formBasicCarBrand">
<Form.Label>CarBrand </Form.Label>
<Form.Control type="text" placeholder="Enter CarBrand "  onChange={(event) => setCarBrand(event.target.value)}/>
</Form.Group>


<Form.Group className="mb-3 " controlId="formBasicCarModel">
<Form.Label>CarModel </Form.Label>
<Form.Control type="text" placeholder="Enter CarModel "  onChange={(event) => setCarModel(event.target.value)}/>
</Form.Group>


<Form.Group className="mb-3 " controlId="formBasicCarType">
<Form.Label>CarType </Form.Label>
<Form.Control type="text" placeholder="Enter CarType "  onChange={(event) => setCarType(event.target.value)}/>
</Form.Group>


<Form.Group className="mb-3 " controlId="formBasicServiceCategory">
<Form.Label>ServiceCategory </Form.Label>
<Form.Control type="text" placeholder="Enter ServiceCategory "  onChange={(event) => setServiceCategory(event.target.value)}/>
</Form.Group>


<Form.Group className="mb-3 " controlId="formBasicServiceName">
<Form.Label>ServiceName </Form.Label>
<Form.Control type="text" placeholder="Enter ServiceName "  onChange={(event) => setServiceName(event.target.value)}/>
</Form.Group>


<Form.Group className="mb-3 " controlId="formBasicSubServiceName">
<Form.Label>SubServiceName </Form.Label>
<Form.Control type="text" placeholder="Enter SubServiceName "  onChange={(event) => setSubServiceName(event.target.value)}/>
</Form.Group>


<Form.Group className="mb-3 " controlId="formBasicEmail">
<Form.Label>Email </Form.Label>
<Form.Control type="email" placeholder="Enter Email "  onChange={(event) => setEmail(event.target.value)}/>
</Form.Group>

<Form.Group className="mb-3 " controlId="formBasicMobileNumber">
<Form.Label>MobileNumber </Form.Label>
<Form.Control type="text" placeholder="Enter MobileNumber "  onChange={(event) => setMobileNumber(event.target.value)}/>
</Form.Group>


<Form.Group className="mb-3 " controlId="formBasicPreferredLocation">
<Form.Label>PreferredLocation </Form.Label>
<Form.Control type="text" placeholder="Enter PreferredLocation "  onChange={(event) => setPreferredLocation(event.target.value)}/>
</Form.Group>


<Form.Group className="mb-3 " controlId="formBasicCustomerExistingAddress">
<Form.Label>CustomerExistingAddress </Form.Label>
<Form.Control type="text" placeholder="Enter CustomerExistingAddress "  
onChange={(event) => setCustomerExistingAddress(event.target.value)}/>
</Form.Group>

<Form.Group className="mb-3 " controlId="formBasic1Address1">
<Form.Label> Address1</Form.Label>
<Form.Control type="text" placeholder="Enter Address1  "  onChange={(event) => setAddress1(event.target.value)}/>
</Form.Group>

<Form.Group className="mb-3 " controlId="formBasicAddress2">
<Form.Label>Address2 </Form.Label>
<Form.Control type="text" placeholder="Enter Address2 "  onChange={(event) => setAddress2(event.target.value)}/>
</Form.Group>

<Form.Group className="mb-3 " controlId="formBasicAddress3">
<Form.Label> address3</Form.Label>
<Form.Control type="text" placeholder="Enter Address3 "  onChange={(event) => setAddress3(event.target.value)}/>
</Form.Group>

<Form.Group className="mb-3 " controlId="formBasicAddress4">
<Form.Label> Address4</Form.Label>
<Form.Control type="text" placeholder="Enter Address4 "  onChange={(event) => setAddress4(event.target.value)}/>
</Form.Group>

<Form.Group className="mb-3 " controlId="formBasicAddress5">
<Form.Label> address5</Form.Label>
<Form.Control type="text" placeholder="Enter Address5 "  onChange={(event) => setAddress5(event.target.value)}/>
</Form.Group>

<Form.Group className="mb-3 " controlId="formBasicpincode">
<Form.Label> pincode</Form.Label>
<Form.Control type="text" placeholder="Enter  pincode"  onChange={(event) => setPinCode(event.target.value)}/>
</Form.Group>


<Form.Group className="mb-3 " controlId="formBasicCustomerDayAvailability">
<Form.Label>CustomerDayAvailability </Form.Label>
<Form.Control type="text" placeholder="Enter CustomerDayAvailability "  
onChange={(event) => setCustomerDayAvailability(event.target.value)}/>
</Form.Group>


<Form.Group className="mb-3 " controlId="formBasicCustomerTiming">
<Form.Label>CustomerTiming </Form.Label>
<Form.Control type="text" placeholder="Enter CustomerTiming "  onChange={(event) => setCustomerTiming(event.target.value)}/>
</Form.Group>


<Button  className="mb-3 " variant="primary" onClick={handleSubmit} >
Submit
</Button> &nbsp;&nbsp;
<Button  className="mb-3 " variant="danger" onClick={handleCancel} >
cancel
</Button>
</Form>

          </div>

</div>

    </div>
  )
}

export default CustomerRequest