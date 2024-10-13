import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { SpinnerCircular } from 'spinners-react';
import { NotificationContainer, NotificationManager } from 'react-notifications';

const Login = () => {
  const BASE_URL=process.env.REACT_APP_BASE_URL
  const loginwithgoogle=()=>{
    window.open(`${BASE_URL}/auth/google/callback`,"_self")
  }
  const navigate = useNavigate();
  const [pass, setPass] = useState(false);
  const [loading, setloading] = useState(false);

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
      setloading(true)
      try {
        // const response = await axios.post(`http://localhost:8081/api/login`, values,{headers:{ Authorization: `Bearer ${localStorage.getItem("token")}` }});
        const response = await axios.post(`${BASE_URL}/api/login`, values,{headers:{ Authorization: `Bearer ${localStorage.getItem("token")}` }});

        const data = response.data;
        localStorage.setItem('token',data.token)
        localStorage.setItem('email',data.email)
        sessionStorage.setItem('id',data.id)
        sessionStorage.setItem('role',data.role)
        // console.log(data)
        
        // if(formik.check){
          // localStorage.setItem('token',response.data.token); // after 1day  token will be expired and redirect to login page
          // localStorage.setItem=`token=${response.data.token}; expires=${new Date(Date.now() + 86400).toUTCString}; path=/`; // after 1day  token will be expired and redirect to login page
          // console.log(response.data.token)
        // }
        if (data.status === 1) {
          // console.log(1)
          // sessionStorage.setItem('id',data.id);
          // localStorage.setItem('token',response.data.token);
          if (values.check) {
            sessionStorage.setItem('email', values.email);
            // sessionStorage.setItem('password', values.password);
          }
          // console.log(data.role)
          switch (data.role) {
            
            case 'admin':
            case 'subadmin':
              
              setTimeout(() => {
                navigate("/admindashboard1");
              }, 1000);
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
          if(error.response){
            switch (error.response.status){
              case 400:
                NotificationManager.error("Bad Request. Please check the data you have entered.");
                break;
              case 401:
                  NotificationManager.error("Unauthorized access. Invalid email or password.");
                  break;
              case 403:
                  NotificationManager.error("You do not have permission to perform this action.");
                  break;
              case 404:
                  NotificationManager.error("Requested resource not found.");
                  break;
              case 500:
                  NotificationManager.error("Internal Server Error. Please try again later.");
                  break;  
              default:
                NotificationManager.error("An unexpected error occurred. Please try again.");
            } 
          }else if(error.request){
              NotificationManager.error("No response from the server. Please check your network connection.");

          }else{
            NotificationManager.error("An unexpected error occurred. Please try again.");

          }
      }finally{
        setloading(false)
      }
    }
  });
  const SocialHandler=async(social)=>{
    window.location.href=`${BASE_URL}/auth/${social}`
  }

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
                          <p style={{ position: "absolute", top: "54%", right: "39px", transform: "translateY(-40%)", cursor: "pointer" }} onClick={() => setPass(!pass)}>{(pass) ? <i className='fas fa-solid fa-eye-slash'></i> : <i className='fas fa-eye'></i>}</p>
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
                            <button className="btn btn--e-transparent-brand-b-2 btn-outline-primary w-75" type="submit" >{loading ? <span>Login  <SpinnerCircular thickness={180} speed={169} size={39}  color="rgba(57, 162, 172, 1)" secondaryColor='rgba(172, 57, 59, 0.86)' /></span> : "LOGIN"}</button>
                          </div>
                          <div className="u-s-m-b-30">
                            <Link className="gl-link" to={"/forgotpassword"}>Lost Your Password?</Link>
                          </div>
                        </div>
                      </form>
                      <div className="social-login">
                        <Link onClick={()=>SocialHandler("google")}  className="social-btn google-btn" style={{textDecoration:"none",   backgroundColor: 'blue',color:"white",   border: '1px solid #ddd',   padding: '10px 20px',   borderRadius: '5px',   cursor: 'pointer',   display: 'inline-block',   margin: '10px 0' }}>
                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6WwgH7Nl5_AW9nDCnR2Ozb_AU3rkIbSJdAg&s" alt="Google" height={20} width={20} />
                          Sign in with Google
                        </Link>
                        <br />
                        OR
                        <br />
                        <Link onClick={()=>{SocialHandler('facebook')}} className="social-btn facebook-btn" style={{textDecoration:"none",   backgroundColor: '#3b5998',   border: '1px solid #3b5998',   padding: '10px 20px',   borderRadius: '5px',   cursor: 'pointer',   display: 'inline-block',   margin: '10px 0',   color: '#fff' }}>
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Facebook_icon_2013.svg/120px-Facebook_icon_2013.svg.png?20161223201621" alt="facebook" height={20} width={20} />
                          Sign in with FaceBook
                        </Link>
                        <br />
                        OR
                        <br />
                        <Link onClick={()=>{SocialHandler('github')}} className="social-btn facebook-btn" style={{textDecoration:"none",   backgroundColor: '#3b5998',   border: '1px solid #3b5998',   padding: '10px 20px',   borderRadius: '5px',   cursor: 'pointer',   display: 'inline-block',   margin: '10px 0',   color: '#fff' }}>
                          <img src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" alt="facebook" height={20} width={20} />
                          Sign in with GitHub
                        </Link>
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

