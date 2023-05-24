import React from 'react'
import{Link}from'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  let navigate=useNavigate();
  let handleLogout = async(error)=>{
    sessionStorage.clear()
    navigate('/login')
  }
  return (
    <div>
        <nav className="navbar  navbar-dark   bg-secondary navbar-expand-lg   bg-body-tertiary fixed-top " >
        
  <div className="container-fluid  ">

  <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvas" aria-controls="offcanvas">
  <span className="navbar-toggler-icon  "></span>
    </button>  

    <Link to="/dashboard" className="navbar-brand " href="#">CRM</Link>
    <button className="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon  "></span>
    </button>
    <div className="collapse navbar-collapse  justify-content-end  " id="navbarSupportedContent">
      <ul className="navbar-nav   mb-2 mb-lg-0">
        <li className="nav-item ">
          <Link to="createLead" className="nav-link active me-5  " aria-current="page" href="#">Create Leads</Link>
        </li>
        
        <li className="nav-item ">
          <Link to="leadList" className="nav-link active me-5 " aria-current="page" href="#">Lead List</Link>
        </li>

        <li className="nav-item ">
          <Link to="createServices" className="nav-link active me-5  " aria-current="page" href="#">Create Services</Link>
        </li>

        <li className="nav-item ">
          <Link to="servicesList" className="nav-link active me-5  " aria-current="page" href="#">Services List</Link>
        </li>

      </ul>
      <button type="button" onClick={handleLogout} className="btn btn-primary btn-sm ">Logout</button>

    </div>
    
  </div>
  
</nav>
    </div>
  )
}

export default Navbar