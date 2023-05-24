import React,{useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './sidebar.css'; 


function Sidebar() {
  const [isShow, setShow] = useState(true);

   useEffect(() => {
      function handleResize() {
        if (window.innerWidth > 992) {
          setShow(true);
         console.log("set true at"+window.innerWidth);
          
        } else {
          setShow(false);
          console.log("set false at"+window.innerWidth);
        }
         
  }
 
      window.addEventListener('resize', handleResize)
    },[])
  return (
    
      <>
      
      <div className={window.innerWidth > 992 && isShow?"offcanvas offcanvas-start sidebar-nav bg-dark text-white show "
                           :"offcanvas offcanvas-start bg-dark text-white sidebar-nav "}
       tabIndex="-1"  id="offcanvas" aria-labelledby="offcanvasLabel">
          
          <div className="offcanvas-body p-0">
            <nav className="navbar-dark">
            <ul className="navbar-nav">
              <li>
                <div className='text-muted small fw-bold text-uppercase mt-3 px-3'>
                  HOME
                </div>
              </li>
              <li>
              
                <Link  to="/dashboard" href="#" className="nav-link px-3 active ">
                <span className="me-2 ">
                <i className="bi bi-speedometer2"></i>
                </span>
                <span> Dashboard</span>
                </Link>
              </li>
              <li>
                  <hr className="dropdown-divider  "/>
              </li>
              <li>
                <div className='text-muted small fw-bold text-uppercase mt-3 px-3'>
                  All Employees
                </div>
              </li>
              <li>
              <a className="nav-link px-3 text-white  sidebar-link " data-bs-toggle="collapse"
              data-bs-target="#collapseExample1" href="#collapseExample"
               role="button" aria-expanded="false" aria-controls="collapseExample">
                   <span className='me-2'><i className="bi bi-person-bounding-box"></i></span>
                   <span className='ms-1'>Manager</span>
                   <span className='right-icon ms-auto'><i className="bi bi-chevron-down "></i></span>
                  </a>
                  <div className="collapse " id="collapseExample1">
                    <ul className='navbar-nav ps-3 '>
                      <li>
                        <a className='nav-link px-3  text-white ' href="#" > 
                        <span className='ms-1'>List</span>
                        </a>
                      </li>
                      <li>
                        <a className='nav-link px-3  text-white ' href="#"> 
                        <span className='ms-1'>Create</span>
                        </a>
                      </li>
                     

                    </ul>
                  </div>
              </li>
              
              <li>
              <a className="nav-link px-3 text-white  sidebar-link " data-bs-toggle="collapse"
              data-bs-target="#collapseExample2" href="#collapseExample"
               role="button" aria-expanded="false" aria-controls="collapseExample2">
                   <span className='me-2'><i className="bi bi-person-circle"></i></span>
                   <span className='ms-1'>Admin</span>
                   <span className='right-icon ms-auto'><i className="bi bi-chevron-down "></i></span>
                  </a>
                  <div className="collapse " id="collapseExample2">
                    <ul className='navbar-nav ps-3 '>
                      <li>
                        <a className='nav-link px-3  text-white ' href="#"> 
                        <span className='ms-1'>List</span>
                        </a>
                      </li>
                      <li>
                        <a className='nav-link px-3  text-white ' href="#"> 
                        <span className='ms-1'>Create</span>
                        </a>
                      </li>
                    
                    </ul>
                  </div>
              </li>

              <li>
              <a className="nav-link px-3 text-white  sidebar-link" data-bs-toggle="collapse" href="#collapseExample"
               data-bs-target="#collapseExample3" role="button" aria-expanded="false" aria-controls="collapseExample3">
                   <span className='me-2'><i className="bi bi-person-check-fill"></i></span>
                   <span className='ms-1'>Employee.SR</span>
                   <span className='right-icon ms-auto'><i className="bi bi-chevron-down "></i></span>
                  </a>
                  <div className="collapse " id="collapseExample3">
                    <ul className='navbar-nav ps-3 '>
                      <li>
                        <a className='nav-link px-3  text-white ' href="#"> 
                        <span className='ms-1'>List</span>
                        </a>
                      </li>
                      <li>
                        <a className='nav-link px-3  text-white ' href="#"> 
                        <span className='ms-1'>Create</span>
                        </a>
                      </li>
                      
                    </ul>
                  </div>
              </li>

              <li>
              <a className="nav-link px-3 text-white  sidebar-link" data-bs-toggle="collapse" href="#collapseExample"
              data-bs-target="#collapseExample4" role="button" aria-expanded="false" aria-controls="collapseExample4">
                   <span className='me-2'><i className="bi bi-person"></i></span>
                   <span className='ms-1'>Employee.JR</span>
                   <span className='right-icon ms-auto'><i className="bi bi-chevron-down "></i></span>
                  </a>
                  <div className="collapse " id="collapseExample4">
                    <ul className='navbar-nav ps-3 '>
                      <li>
                        <a className='nav-link px-3  text-white ' href="#"> 
                        <span className='ms-1'>List</span>
                        </a>
                      </li>
                      <li>
                        <a className='nav-link px-3  text-white ' href="#"> 
                        <span className='ms-1'>Create</span>
                        </a>
                      </li>
                  
                    </ul>
                  </div>
              </li>
              
            </ul>
            </nav>
            
          </div>
     </div>
        
      </>
          
  );
}

export default Sidebar;
