import React,{useState} from 'react';
import CustomerRequest from './customerRequest';

function CustomerPage() {
  
  return (
    <div>customerPage<br/>
      create customer service<br/>
       <CustomerRequest/>
     
      check your service status<br/>
      service list<br/>
      enquire for others<br/>
    </div>
  )
}

export default CustomerPage