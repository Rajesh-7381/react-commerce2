import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Log/Login.jsx';
import ForgotPassword from './Log/ForgotPassword.jsx';
import SetNewPassword from './Log/SetNewPassword.jsx';
import SendOTP from './Log/SendOTP.jsx';
import OtpVerfication from './Log/OtpVerfication.jsx';
import DashBoard from './DashBoard.jsx';
import CourseList from './Courses/CourseList.jsx';
import CreateCourse from './Courses/CreateCourse.jsx';
import JobsList from './Jobs/JobsList.jsx'
import CreateJobs from './Jobs/CreateJobs.jsx'
import MaterialList from './Material/MaterialList.jsx'
import CreateMaterial from './Material/CreateMaterial.jsx'
import ProductList from './Product/ProductList.jsx'
import CreateProduct from './Product/CreateProduct.jsx'
import AddRoles from './Roles/AddRoles.jsx'
import ServiceList from './Service/ServiceList.jsx'
import CreateService from './Service/CreateService.jsx'
import ServiceProviderList from './ServiceProvider/ServiceProviderList.jsx'
import CreateServiceProvider from './ServiceProvider/CreateServiceProvider.jsx'
import UserList from './Users/UserList.jsx'
import CreateUser from './Users/CreateUser.jsx'
import RoleList from './Roles/RoleList.jsx';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/forgotPassword' element={<ForgotPassword />}></Route>
          <Route path='/sendOTP' element={<SendOTP />}></Route>
          <Route path='/sendOTP' element={<SendOTP />}></Route>
          <Route path='/otpVerfication' element={<OtpVerfication />}></Route>
          <Route path='/setNewPassword' element={<SetNewPassword />}></Route>

          <Route path='/dashBoard' element={<DashBoard />}></Route>
          <Route path='/courseList' element={<CourseList />}></Route>
          <Route path='/createCourse' element={<CreateCourse />}></Route>
          <Route path='/jobsList' element={<JobsList />}></Route>
          <Route path='/createJobs' element={<CreateJobs />}></Route>

          <Route path='/materialList' element={<MaterialList />}></Route>
          <Route path='/createMaterial' element={<CreateMaterial />}></Route>
          <Route path='/productList' element={<ProductList />}></Route>
          <Route path='/createProduct' element={<CreateProduct />}></Route>
          <Route path='/addRoles' element={<AddRoles />}></Route>
          <Route path='/rolesList' element={<RoleList />}></Route>

          <Route path='/serviceList' element={<ServiceList />}></Route>
          <Route path='/createService' element={<CreateService />}></Route>
          <Route path='/serviceProviderList' element={<ServiceProviderList />}></Route>
          <Route path='/createServiceProvider' element={<CreateServiceProvider />}></Route>

          <Route path='/userList' element={<UserList />}></Route>
          <Route path='/createUser' element={<CreateUser />}></Route>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
