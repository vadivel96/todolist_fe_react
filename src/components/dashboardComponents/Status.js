import React from 'react'

function Status() {
  return (
    <div>
        <div className="container-fluid row ">
          <div className="dashboard-header row ">Dashboard
           <p>
            Have a Look at lead status and service status
           </p>
          </div>
          <div className="col">
            <h3 style={{textAlign:"center"}}>Lead Status</h3>
            <div className="row row-cols-1 row-cols-md-2  ">
  <div className="col">
  <div className="card border-info mb-3" style={{maxWidth:"18rem"}}>
  <div className="card-header">Lead New</div>
  </div>
  </div>
  <div className="col">
  <div className="card border-info mb-3" style={{maxWidth:"18rem"}}>
  <div className="card-header">Lead Contacted</div>
  </div>
  </div>
  <div className="col">
  <div className="card border-info mb-3" style={{maxWidth:"18rem"}}>
  <div className="card-header">Lead Qualified</div>
  </div>
  </div>
  <div className="col">
  <div className="card border-info mb-3" style={{maxWidth:"18rem"}}>
  <div className="card-header">Lead Lost</div>
  </div>
  </div>
  <div className="col">
  <div className="card border-info mb-3" style={{maxWidth:"18rem"}}>
  <div className="card-header">Lead Cancelled</div>
  </div>
  </div>
  <div className="col">
  <div className="card border-info mb-3" style={{maxWidth:"18rem"}}>
  <div className="card-header">Lead Converted</div>
  </div>
  </div>
  
 
 
</div>
</div>
         
          <div className="col">
          <h3 style={{textAlign:"center"}}>Service Status</h3>
          <div className="row row-cols-1 row-cols-md-2 ">
  <div className="col">
  <div className="card border-warning mb-3" style={{maxWidth:"18rem"}}>
  <div className="card-header">Service Created</div>
  </div>
  </div>
 
  <div className="col">
  <div className="card border-warning mb-3" style={{maxWidth:"18rem"}}>
  <div className="card-header">Service Opened</div>
  </div>
  </div>
  <div className="col">
  <div className="card border-warning mb-3" style={{maxWidth:"18rem"}}>
  <div className="card-header">Service In Process</div>
  </div>
  </div>
  <div className="col">
  <div className="card border-warning mb-3" style={{maxWidth:"18rem"}}>
  <div className="card-header">Service Completed</div>
  </div>
  </div>
  <div className="col">
  <div className="card border-warning mb-3" style={{maxWidth:"18rem"}}>
  <div className="card-header">Service Cancelled</div>
  </div>
  </div>
  <div className="col">
  <div className="card border-warning mb-3" style={{maxWidth:"18rem"}}>
  <div className="card-header">Service Released</div>
  </div>
  </div>
  
 
 
</div>
          </div>
        </div>
    </div>
  )
}

export default Status