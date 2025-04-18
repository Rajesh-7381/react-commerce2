// import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import zxcvbn from 'zxcvbn';
import ReCAPTCHA from 'react-google-recaptcha';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { SpinnerCircular } from 'spinners-react';


const Register = () => {
    
    const BASE_URL=process.env.REACT_APP_BASE_URL
    const navigate = useNavigate();
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [cap,setcap]=useState(null);
    const [loading,setloading]=useState(false)
    
    useEffect(()=>{
        document.title="Registration";
    })

    const initialValues = {
        name: "",
        mobile: "",
        email: "",
        password: "",
        image: null,
    };

    const validationSchema = Yup.object({
        name: Yup.string().max(100).min(3).matches(/^[a-zA-Z ]+$/,"Please remove digits and special characters!").required("Please enter your name!"), //+ means(greedy quantifier) matches one or more of these letters and $ means  end of the string
        mobile: Yup.string().max(10).min(10).matches(/^[0-9]{10}$/,"Mobile number must be 10 digits!").required("Mobile number required!"),
        email: Yup.string().max(100).min(2).email("Invalid Email Format!").required("Please enter your email!"),
        password: Yup.string().max(25).min(8)
                .matches(/^[a-zA-Z0-9#?!@$%^&*\\-]{8,25}$/, "Password must be 8-25 characters and can contain letters, numbers, and special characters").required("Please enter your password!"),
        image: Yup.mixed()
            .test("fileFormat","supported file format is png,webp,jpeg and jpg",(value)=>{ //to contain file details
                // console.log(value)
                if(value){ //if file exist
                    const supportedfileformat =["image/png", "image/webp", "image/jpeg", "image/jpg"];
                    return supportedfileformat.includes(value.type); //value also contain value.name and value.size
                }
                return true;
            })
            .test("fileSize","File size must be less than 500KB",(value)=>{
                if(value){
                    return value.size < 0.5 * 1024 * 1024; //500kb
                }
                return true;
            })
            .required("Please upload your image!"),
    });

    const onSubmitForm = async (values, action) => {
        if (passwordStrength !== 4) {
          NotificationManager.error("Password strength is not strong enough!");
          return;
        }
      
        try {
            setloading(true)
          const { email, mobile } = values; // Destructuring values
      
          const Emailresponse = await axios.get(`${BASE_URL}/api/checkemail/${email}`);
          const Mobileresponse = await axios.get(`${BASE_URL}/api/checkmobile/${mobile}`);
      
          if (Emailresponse.data.emailExists) { 
            NotificationManager.error("This email is already registered!");
          } else if (Mobileresponse.data.mobileExists) { 
            NotificationManager.error("This mobile is already registered!");
          } else {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('mobile', values.mobile);
            formData.append('email', values.email);
            formData.append('password', values.password);
            formData.append('image', values.image);
      
            await axios.post(`${BASE_URL}/api/register`, formData, {
              headers: {
                'Content-Type': 'multipart/form-data'                
              }
            });
      
            NotificationManager.success("Form submitted successfully!");
            setTimeout(() => {
              action.resetForm();
            //   here add loader 
              navigate("/");
            }, 3000);
          }
        } catch (error) {
          console.log("Error submitting form", error);
          NotificationManager.error("Form submission was not successful!");
        }finally{
            setloading(false)
        }
      };
      
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: onSubmitForm
    });

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!passwordVisibility);
    };

    const calculatePasswordStrength = (password) => {
        const result = zxcvbn(password);
        setPasswordStrength(result.score);
    };

    const recaptchaRef = React.createRef();

    return (
        <div>
            <div className="u-s-p-b-60">
                <div className="section__intro u-s-m-b-60">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="section__text-wrap">
                                    <h1 className="section__heading u-c-secondary">CREATE AN ACCOUNT</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section__content">
                    <div className="container">
                        <div className="row row--center ">
                            <div className="col-lg-6 col-md-8 u-s-m-b-30">
                                <div className="l-f-o">
                                    <div className="l-f-o__pad-box" style={{ boxShadow: "10px 10px 5px 12px lightblue" }}>
                                        <h1 className="gl-h1">PERSONAL INFORMATION</h1>
                                        <form className="l-f-o__form" onSubmit={formik.handleSubmit}>
                                            <div className="u-s-m-b-30">
                                                <label className="gl-label text-start" htmlFor="reg-name">NAME <span className='text-danger'>*</span></label>
                                                <input className="input-text input-text--primary-style" type="text" id="reg-name" placeholder="Name" name='name' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
                                                {formik.touched.name && formik.errors.name ? (
                                                    <div className="text-danger">{formik.errors.name}</div>
                                                ) : null}
                                            </div>
                                            <div className="u-s-m-b-30">
                                                <label className="gl-label text-start" htmlFor="reg-image">IMAGE <span className='text-danger'>*</span></label>
                                                <input className="form-control" type="file" id="reg-image" name='image' onChange={(event) => {
                                                    formik.setFieldValue('image', event.currentTarget.files[0]);
                                                }} />
                                                {formik.touched.image && formik.errors.image ? (
                                                    <div className="text-danger">{formik.errors.image}</div>
                                                ) : null}
                                            </div>
                                            <div className="u-s-m-b-30">
                                                <label className="gl-label text-start" htmlFor="reg-mobile">MOBILE <span className='text-danger'>*</span></label>
                                                <input className="input-text input-text--primary-style" type="text" id="reg-mobile" placeholder="MOBILE" name='mobile' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.mobile} />
                                                {formik.touched.mobile && formik.errors.mobile ? (
                                                    <div className="text-danger">{formik.errors.mobile}</div>
                                                ) : null}
                                            </div>
                                            <div className="u-s-m-b-30">
                                                <label className="gl-label text-start" htmlFor="reg-email">E-MAIL <span className='text-danger'>*</span></label>
                                                <input className="input-text input-text--primary-style" type="text" id="reg-email" placeholder="Enter E-mail" name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                                                {formik.touched.email && formik.errors.email ? (
                                                    <div className="text-danger">{formik.errors.email}</div>
                                                ) : null}
                                            </div>
                                            <div className="u-s-m-b-30">
                                                <label className="gl-label text-start" htmlFor="reg-password">PASSWORD <span className='text-danger'>*</span></label>
                                                <div className="position-relative">
                                                    <input className="input-text input-text--primary-style" type={passwordVisibility ? 'text' : 'password'} id="reg-password" placeholder="Enter Password" name='password' autoComplete='current-password' onChange={(e) => {
                                                        formik.handleChange(e);
                                                        calculatePasswordStrength(e.target.value);
                                                    }} onBlur={formik.handleBlur} value={formik.values.password} />
                                                    <p style={{ position: "absolute", top: "50%", right: "9px", transform: "translateY(-40%)", cursor: "pointer" }} onClick={togglePasswordVisibility}>
                                                        {passwordVisibility ? <i className='fas fa-solid fa-eye-slash'></i> : <i className='fas fa-eye'></i>}
                                                    </p>
                                                </div>
                                                {formik.touched.password && formik.errors.password ? (
                                                    <div className="text-danger">{formik.errors.password}</div>
                                                ) : null}
                                                <div className="progress mt-2">
                                                    <div
                                                        className={`progress-bar ${passwordStrength === 0 ? 'bg-danger' : passwordStrength === 1 ? 'bg-warning' : passwordStrength === 2 ? 'bg-info' : passwordStrength === 3 ? 'bg-primary' : 'bg-success'}`}
                                                        role="progressbar"
                                                        style={{ width: `${(passwordStrength ) * 25}%` }}
                                                        aria-valuenow={(passwordStrength ) * 25}
                                                        aria-valuemin="0"
                                                        aria-valuemax="100">
                                                        {passwordStrength === 0 && "0%"}
                                                        {passwordStrength === 1 && "25%"}
                                                        {passwordStrength === 2 && "50%"}
                                                        {passwordStrength === 3 && "75%"}
                                                        {passwordStrength === 4 && "100%"}
                                                    </div>
                                                </div>
                                            </div>
                                            <div  className="u-s-m-b-15">
                                                <ReCAPTCHA
                                                    ref={recaptchaRef}
                                                    sitekey={process.env.REACT_APP_API_ReCAPTCHA_SITEKEY} //r........2@gm....com
                                                    onChange={(val)=>setcap(val)}
                                                />
                                                <NotificationContainer />
                                                <button className="btn btn--e-transparent-brand-b-2 btn-outline-primary w-75"  disabled={!cap || loading}  type="submit">{loading ? <span>CREATE <SpinnerCircular thickness={180} speed={169} size={39}  color="rgba(57, 162, 172, 1)" secondaryColor='rgba(172, 57, 59, 0.86)' /></span> : "CREATE"}</button>
                                            </div>                                                                                                                       
                                            <Link className="gl-link"  to={'/'}>Already have an Account? Login Now</Link>
                                        </form> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
