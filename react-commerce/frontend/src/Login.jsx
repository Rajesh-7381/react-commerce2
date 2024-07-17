import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { NotificationContainer, NotificationManager } from 'react-notifications';

const Login = () => {
  const loginwithgoogle=()=>{
    window.open("http://localhost:8081/auth/google/callback","_self")
  }
  const navigate = useNavigate();
  const [pass, setPass] = useState(false);

  useEffect(()=>{
    document.title="Login";
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      check: false
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please enter your email!"),
      password: Yup.string().required("Please enter your password!")
    }),
    onSubmit: async (values, action) => {
      try {
        const response = await axios.post("http://localhost:8081/login", values);
        const data = response.data;
        console.log(data)
        
        // if(formik.check){
          // localStorage.setItem('token',response.data.token); // after 1day  token will be expired and redirect to login page
          // localStorage.setItem=`token=${response.data.token}; expires=${new Date(Date.now() + 86400).toUTCString}; path=/`; // after 1day  token will be expired and redirect to login page
          // console.log(response.data.token)
        // }
        if (data.status === 1) {
          sessionStorage.setItem('id',data.id);
          localStorage.setItem('token',response.data.token);
          if (values.check) {
            sessionStorage.setItem('email', values.email);
            // sessionStorage.setItem('password', values.password);
          }
          switch (data.role) {
            case 'admin':
            case 'subadmin':
              
              navigate("/admindashboard1");
              break;
            case 'user':
              
              navigate("/userdashboard2");
              break;
            default:
              navigate("/");
          }
        } else {
          NotificationManager.error("Invalid email or password");
        }
      } catch (error) {
        NotificationManager.error("Invalid email or password");
      }
    }
  });

  return (
    <div>
      {/*====== App Content ======*/}
      <div className="app-content">
        {/*====== Section 1 ======*/}
        <div className="u-s-p-y-10">
          {/*====== Section Content ======*/}
          <div className="section__content">
            <div className="container">
              <div className="breadcrumb">
                <div className="breadcrumb__wrap">
                  <ul className="breadcrumb__list">
                    <li className="has-separator">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="is-marked">
                      <Link to={"/"}>Signin</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*====== End - Section 1 ======*/}
        {/*====== Section 2 ======*/}
        <div className="u-s-p-b-60">
          {/*====== Section Intro ======*/}
          <div className="section__intro u-s-m-b-30">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="section__text-wrap">
                    <h1 className="section__heading u-c-secondary">ALREADY REGISTERED?</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*====== End - Section Intro ======*/}
          {/*====== Section Content ======*/}
          <div className="section__content">
            <div className="container">
              <div className="row row--center">
                <div className="col-lg-6 col-md-8 u-s-m-b-30">
                  <div className="l-f-o">
                    <div className="l-f-o__pad-box">
                      <h1 className="gl-h1">I'M NEW CUSTOMER</h1>
                      <span className="gl-text u-s-m-b-30">If you don't have an account with us, please create one.</span>
                      <div className="u-s-m-b-15">
                        <Link className="l-f-o__create-link btn--e-transparent-brand-b-2" to={"register"}>CREATE AN ACCOUNT</Link>
                      </div>
                      <h1 className="gl-h1">SIGNIN</h1>
                      <span className="gl-text u-s-m-b-30">If you have an account with us, please log in.</span>
                      <p id="login-error" />
                      <form className="l-f-o__form" id="loginform" onSubmit={formik.handleSubmit}>
                        <div className="u-s-m-b-30">
                          <label className="gl-label text-start" htmlFor="login-email">E-MAIL <span className='text-danger'>*</span></label>
                          <input className="input-text input-text--primary-style" name="email" type="email" id="login-email" placeholder="Enter E-mail" autoComplete="username" onChange={formik.handleChange} />
                          {formik.touched.email && formik.errors.email ? (
                            <div className="text-danger">{formik.errors.email}</div>
                          ) : null}
                          <p className="login-email" />
                        </div>
                        <div className="u-s-m-b-30">
                          <label className="gl-label text-start" htmlFor="login-password">PASSWORD <span className='text-danger'>*</span></label>
                          <input className="input-text input-text--primary-style" name="password" type={pass ? 'text' : 'password'} id="login-password" placeholder="Enter Password" autoComplete="current-password" onChange={formik.handleChange} />
                          <p style={{ position: "absolute", top: "68%", right: "39px", transform: "translateY(-40%)", cursor: "pointer" }} onClick={() => setPass(!pass)}>{(pass) ? <i className='fas fa-solid fa-eye-slash'></i> : <i className='fas fa-eye'></i>}</p>
                          {formik.touched.password && formik.errors.password ? (
                            <div className="text-danger">{formik.errors.password}</div>
                          ) : null}
                          <p className="login-password" />
                        </div>
                        <div className="u-s-m-b-30">
                          <div className="check-box float-start">
                            <input type="checkbox" name='check' id="remember-me" onChange={formik.handleChange} checked={formik.values.check} />
                            <div className="check-box__state check-box__state--primary ">
                              <label className="check-box__label " htmlFor="remember-me">Remember Me</label>
                            </div>
                          </div>
                        </div>
                        <br></br>
                        <div className="gl-inline ">
                          <div className="u-s-m-b-30">
                            <NotificationContainer />
                            <button className="btn btn--e-transparent-brand-b-2 btn-outline-primary w-75" type="submit">LOGIN</button>
                          </div>
                          <div className="u-s-m-b-30">
                            <Link className="gl-link" to={"/forgotpassword"}>Lost Your Password?</Link>
                          </div>
                        </div>
                      </form>
                      <button type="button" className="btn btn-primary " data-bs-toggle="modal" data-bs-target="#exampleModal">
                          Social Login
                      </button>
                      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title" id="exampleModalLabel">Social Login</h5>
                              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                              <div className="card">
                                <div className="container">
                                  <div className="row mb-3">
                                    <div className="col-md-6">
                                    <div>
                                    <a href="http://localhost:8081/auth/google" className="btn btn-outline-primary"><img height={"20px"} width={"30px"} src={"data:image/jpeg;base64,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"} alt="" />Login with Google</a>
                                  </div>
                                    </div>
                                    <div className="col-md-6">
                                      <button className="btn btn-outline-primary w-100">
                                        <img height={"20px"} width={"30px"} src={"https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjk4Mi1kNS0xMF8xLnBuZw.png"} alt="" /> LinkedIn
                                      </button>
                                    </div>
                                  </div>
                                  <div className="row mb-3">
                                    <div className="col-md-6">
                                    <a href="http://localhost:8081/auth/facebook" className="btn btn-outline-primary">
                                        <img height={"30px"} width={"20px"} src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiXN9xSEe8unzPBEQOeAKXd9Q55efGHGB9BA&s"} alt="" /> Facebook
                                      </a>
                                    </div>
                                    <div className="col-md-6">
                                      <button className="btn btn-outline-primary w-100">
                                        <img height={"30px"} width={"20px"} src={"https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png"} alt="" /> GitHub
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*====== End - Section Content ======*/}
        </div>
        {/*====== End - Section 2 ======*/}
      </div>
      {/*====== End - App Content ======*/}
    </div>
  );
}

export default Login;
