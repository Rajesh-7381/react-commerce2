import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { SpinnerCircular } from 'spinners-react';
import { NotificationContainer, NotificationManager } from 'react-notifications';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap

const Login = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Login";
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      check: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please enter your email!"),
      password: Yup.string().required("Please enter your password!"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await axios.post(`${BASE_URL}/api/login`, values);
        const data = response.data;

        localStorage.setItem('token', data.token);
        localStorage.setItem('email', data.email);
        sessionStorage.setItem('id', data.id);
        sessionStorage.setItem('role', data.role);


        if (data.status === 1) {
          NotificationManager.success("Login successful!");
          setTimeout(() => {
            navigate(`/${data.role === 'admin' ? 'admindashboard1' : 'userdashboard2'}`);
          }, 1000);
        } else {
          NotificationManager.error("Invalid email or password");
        }
      } catch (error) {
        NotificationManager.error("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  const SocialHandler = (social) => {
    window.location.href = `${BASE_URL}/auth/${social}`;
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-12">
          <div className="card shadow-lg">
            <div className="row no-gutters">
              {/* Left side image */}
              <div className="col-md-6 d-sm-block">
                <img
                  src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg" 
                  alt="Login Side"
                  className="img-fluid rounded-start"
                  style={{ height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Right side - form */}
              <div className="col-md-6">
                <div className="card-body p-5">
                 {/* <h3 className="card-title text-center mb-4 ">Login</h3> */}

                  {/* Form */}
                  <form onSubmit={formik.handleSubmit}>
                    <div className="form-group mb-3">
                      <label htmlFor="email" className='float-left'>Email</label>
                      <input
                        type="text"
                        id="email"
                        className={`form-control ${formik.errors.email ? 'is-invalid' : ''}`}
                        placeholder="Enter email"
                        {...formik.getFieldProps('email')}
                      />
                      {formik.errors.email && <div className="invalid-feedback">{formik.errors.email}</div>}
                    </div>

                    <div className="form-group mb-3">
                      <label htmlFor="password" className='float-left'>Password</label>
                      <input
                        type="password"
                        id="password"
                        className={`form-control ${formik.errors.password ? 'is-invalid' : ''}`}
                        placeholder="Enter password"
                        {...formik.getFieldProps('password')}
                      />
                      {formik.errors.password && <div className="invalid-feedback">{formik.errors.password}</div>}
                    </div>

                    <div className="form-group form-check mb-3 float-left">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="check"
                        {...formik.getFieldProps('check')}
                      />
                      <label className="form-check-label" htmlFor="check">Remember me</label>
                    </div>

                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                      {loading ? <SpinnerCircular size={24} /> : 'Login'}
                    </button>
                      <div className="u-s-m-b-30 float-left">
                        <Link className="gl-link" to={"/forgotpassword"}>Lost Your Password?</Link>
                      </div>
                
                  </form>

                  <hr className="my-4" />
                  <div className="">
                    <p className=" text-center float-left">Or login with:</p>
                    <button className="btn btn-dark w-100 mt-2" onClick={() => SocialHandler('google')}>
                      <svg  xmlns="http://www.w3.org/2000/svg"    width="24"    height="24"    viewBox="0 0 48 48"    style={{ marginRight: '8px' }} >
                        <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                        <path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                        <path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                        <path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                      </svg>
                      Login with Google
                    </button>
                    <button  className="btn btn-dark  w-100 mt-2"  onClick={() => SocialHandler('facebook')}>
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        className="me-2"
                      >
                        <path 
                          fill="#3b5998" 
                          d="M22.675 0h-21.35C.601 0 0 .601 0 1.342v21.315C0 23.399.601 24 1.325 24h21.35c.724 0 1.325-.601 1.325-1.343V1.342C24 .601 23.399 0 22.675 0zM12 24V12H9v-3h3V7.5c0-2.5 1.5-4 4-4 1.125 0 2.125.083 2.5.125v3h-2c-1 0-1.5.5-1.5 1.5V9h3l-1 3h-2v12H12z"
                        ></path>
                      </svg>
                      Login with Facebook
                    </button>
                  </div>

                  <p className="text-center mt-3">
                    Don't have an account? <Link to="/register">Sign Up</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <NotificationContainer />
    </div>
  );
};

export default Login;
