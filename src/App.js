import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/loginComponents/login";
import Dashboard from "./components/dashboardComponents/dashboard";
import CustomerPage from "./components/customerComponents/customerPage";
import ForgetPassword from './components/loginComponents/forgetPassword';
import Register from './components/registerComponents/register';
import CreateLead from './components/dashboardComponents/navbarComponents/CreateLead';
import ServicesList from './components/dashboardComponents/navbarComponents/ServicesList';
import LeadList from './components/dashboardComponents/navbarComponents/LeadList';
import CreateServices from './components/dashboardComponents/navbarComponents/CreateServices';
import Status from './components/dashboardComponents/Status';
import ResetPassword from './components/loginComponents/ResetPassword';


export const url = 'http://localhost:8000';
function App() {
  return <>
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
        <Route path='/dashboard' element ={<Dashboard/>}>
          <Route index element={<Status/>}/>
          <Route path="createLead" element={<CreateLead/>}/>
          <Route path="leadList" element={<LeadList/>}/>
          <Route path="CreateServices" element={<CreateServices/>}/>
          <Route path="servicesList" element={<ServicesList/>}/>
          <Route path='*' element={<Navigate to="" />}/>
        </Route>
      <Route path="/customerPage" element={<CustomerPage/>}/>
      <Route path="/forget-password" element={<ForgetPassword/>}/>
      <Route path="/reset-password/:email" element={<ResetPassword/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path='*' element={<Navigate to='/login'/>}/>
    </Routes>
  </BrowserRouter>
  </>
}

export default App;