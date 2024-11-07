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
              <div className="col-md-6 d-none d-md-block">
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
                  <h3 className="card-title text-center mb-4 ">Login</h3>

                  {/* Form */}
                  <form onSubmit={formik.handleSubmit}>
                    <div className="form-group mb-3">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        className={`form-control ${formik.errors.email ? 'is-invalid' : ''}`}
                        placeholder="Enter email"
                        {...formik.getFieldProps('email')}
                      />
                      {formik.errors.email && <div className="invalid-feedback">{formik.errors.email}</div>}
                    </div>

                    <div className="form-group mb-3">
                      <label htmlFor="password">Password</label>
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
                      <div className="u-s-m-b-30 float-left">RajeshKumar@73812
                        <Link className="gl-link" to={"/forgotpassword"}>Lost Your Password?</Link>
                      </div>
                
                  </form>

                  <hr className="my-4" />
                  <div className="text-center">
                    <p className="mb-0">Or login with:</p>
                    <button
                      className="btn btn-outline-primary w-100 mt-2"
                      onClick={() => SocialHandler('google')}
                    >
                      <i className="fab fa-google me-2"></i>Login with Google
                    </button>
                    <button
                      className="btn btn-outline-primary w-100 mt-2"
                      onClick={() => SocialHandler('facebook')}
                    >
                      <i className="fab fa-facebook me-2"></i>Login with Facebook
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
