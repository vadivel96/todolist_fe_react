import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/loginComponents/login";
import ForgetPassword from './components/loginComponents/forgetPassword';
import Register from './components/registerComponents/register';
import ResetPassword from './components/loginComponents/ResetPassword';
import Todolist from './components/todolistComponents/todolist';
import AllUser from './components/todolistComponents/alluser';
import CreateTodolist from './components/todolistComponents/createTodolist';

export const url = 'http://localhost:4000';
function App() {
  return <>
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/todolist" element={<Todolist/>}>
         <Route index  element={<CreateTodolist/>}/>
          <Route path="alluser" element={<AllUser/>}/>    
      </Route>
      <Route path="/forget-password" element={<ForgetPassword/>}/>
      <Route path="/reset-password/:email" element={<ResetPassword/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path='*' element={<Navigate to='/login'/>}/>
    </Routes>
  </BrowserRouter>
  </>
}

export default App;