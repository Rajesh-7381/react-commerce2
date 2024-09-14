import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Header from './Components/Header';
import Footer from './Components/Footer';

const SubAdminAddEdit = () => {
    const navigate = useNavigate();
    const location = useLocation();
    // const [editdata, setEditdata] = useState(null);
    const [visible, setVisible] = useState(false);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [role, setRole] = useState('');

    const id = location.state ? location.state.id : null;

    useEffect(() => {
        document.title='SubAdminAddEdit';
        if (id) {
            handledit(id);
        }
    }, [id]);

    const handledit = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8081/api/editdata/${id}`);
            // console.log(response.data.result[0])
            const userData = response.data.result[0];
            // setEditdata(userData);
            // console.log(editdata)
            setRole(userData.role);

            // Set form values
            setValue('name', userData.name);
            setValue('mobile', userData.mobile);
            setValue('email', userData.email);
            setValue('password', userData.password);
            setValue('role', userData.role);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    const toggleRole = () => {
        const newRole = role === 'subadmin' ? 'user' : 'subadmin';
        setRole(newRole);
    };

    const handlesubmit = async (formData) => {
        try {
             await axios.put(`http://localhost:8081/api/update/${id}`, formData);
            // console.log(response.data.message); // Log success message
            NotificationManager.success("form updated successfully!")
            setTimeout(()=>navigate("/subadmins"),2000);
            // navigate("/subadmins");

            
        } catch (error) {
            console.error("Error updating data", error);
        }
    }

    return (
        <div>
        <div>
        <div className="wrapper">
          {/* Preloader */}
          <div className="preloader flex-column justify-content-center align-items-center">
            <img
              className="animation__shake"
              src="dist/img/AdminLTELogo.png"
              alt="AdminLTELogo"
              height={60}
              width={60}
            />
          </div>
          {/* Navbar */}
          <Header></Header>
          <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <div className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-12">
                    <h1 className="m-0 float-start">Edit/Update By SubAdmin</h1>
                    <section className="content-header">
                      <div className="container-fluid">
                        <div className="row mb-2">
                          <div className="col-sm-6"></div>
                          <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                              <li className="breadcrumb-item ">
                                <Link to={"/admindashboard1"}>Home</Link>
                              </li>
                              <li className="breadcrumb-item">
                                <Link to={"/subadmins"}>Back</Link>
                              </li>
                            </ol>
                          </div>
                        </div>
                      </div>
                    </section>
                    <br />
                  </div>

                  {/* /.col */}
                  <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right"></ol>
                  </div>
                  {/* /.col */}
                </div>
                {/* /.row */}
              </div>
              {/* /.container-fluid */}
            </div>
            {/* /.content-header */}
            {/* Main content */}
            <section className="content">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-3 col-6"></div>
                </div>
              </div>
            </section>
            {/* /.content */}

            <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card card-primary">
                                        <div className="card-header">
                                            <h3 className="card-title" style={{ width: "100%", fontWeight: "bold" }}>Update Form</h3>
                                        </div>
                                        <form onSubmit={handleSubmit(handlesubmit)}>
                                            <div className="card-body">
                                                <div className="form-group text-start">
                                                    <label htmlFor="exampleInputName"><i className='fas fa-user'></i> Name <span className='text-danger'>*</span></label>
                                                    <input type="text" className="form-control" id="exampleInputName" {...register("name", { required: true, minLength: 3, maxLength: 100 })} placeholder="Enter name" autoComplete='username' />
                                                    {errors.name && <span className="text-danger">Name is required </span>}
                                                </div>
                                                <div className="form-group text-start">
                                                    <label htmlFor="exampleInputMobile"><i className='fas fa-phone'></i> Mobile <span className='text-danger'>*</span></label>
                                                    <input type="text" className="form-control" id="exampleInputMobile" {...register("mobile", { required: true, minLength: 10, maxLength: 10 })} placeholder="Enter mobile number" />
                                                    {errors.mobile && <span className="text-danger">Mobile number required</span>}
                                                </div>
                                                <div className="form-group text-start">
                                                    <label htmlFor="exampleInputEmail1"><i className='fas fa-envelope'></i> Email <span className='text-danger'>*</span></label>
                                                    <input type="email" className="form-control" id="exampleInputEmail1" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} placeholder="Enter email" autoComplete='username' />
                                                    {errors.email && <span className="text-danger">Please enter a valid email address</span>}
                                                </div>
                                                <div className="form-group text-start">
                                                    <label htmlFor="exampleInputPassword1"><i className='fas fa-lock'></i> Password <span className='text-danger'>*</span></label>
                                                    <input type={visible ? 'text' : 'password'} className="form-control" id="exampleInputPassword1" {...register("password", { required: true, minLength: 6 })} placeholder="Enter password" autoComplete='current-password' />
                                                    <p style={{ position: "absolute", top: "66%", right: "23px", transform: "translateY(-40%)", cursor: "pointer" }} onClick={() => setVisible(!visible)}>{visible ? <i className='fas fa-eye-slash'></i> : <i className='fas fa-eye'></i>}</p>
                                                    {errors.password && <span className="text-danger">Password must be at least 6 characters</span>}
                                                </div>
                                                <div className="form-group text-start">
                                                    <label><i className='fas fa-user'></i> Role<span className='text-danger'>*</span></label>
                                                    <select className="form-control select2 select2-danger" data-dropdown-css-class="select2-danger" {...register('role')} style={{ width: '100%' }} value={role} onChange={toggleRole}>
                                                        <option value="subadmin">SubAdmin</option>
                                                        <option value="user">User</option>
                                                    </select>
                                                </div>

                                            </div>
                                            <div className="card-footer text-start">
                                                <NotificationContainer />
                                                 <button type="submit" className="btn btn-success">Update</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
          </div>

          {/* /.content-wrapper */}
          <Footer></Footer>
        </div>
        {/* ./wrapper */}
        </div>
        </div>
    )
}

export default SubAdminAddEdit;
