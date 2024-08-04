import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { NotificationManager, NotificationContainer } from 'react-notifications';
import zxcvbn from 'zxcvbn';

const ForgotPassword = () => {
    const navigate=useNavigate();
    const [passwordStrength, setPasswordStrength] = useState(0);
    const initialValues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Email is required'),
        password: Yup.string().max(25).min(8)
            .matches(/^[a-zA-Z0-9#?!@$%^&*\\-]{8,25}$/, "Password must be 8-25 characters and can contain letters, numbers, and special characters").required("Please enter your password!"),
    });

    const onSubmitForm = async (values) => {
        if (passwordStrength !== 4) {
            NotificationManager.error("Password strength is not strong enough!");
            return;
          }
        const { email, password } = values; // Destructuring values
        try {
          const response = await axios.get(`http://localhost:8081/checkemail/${email}`);
          if (response.data.exists) {
            try {
              const response = await axios.post(`http://localhost:8081/passwordforgot/${email}`, { password });
              console.log(response.data.message);
              NotificationManager.success("Password Updated Successfully!")
              setTimeout(()=>{
                // add loader logic
                navigate("/");
              },3000);
            //   navigate("/");
            } catch (error) {
                NotificationManager.error("Password Updated not Successfully!")

              console.error(error);
            }
          } else {
            NotificationManager.error("This email is not registered!")

            // alert('This email is not registered!');
          }
        } catch (error) {
          console.error(error);
        }
      }
      

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: onSubmitForm
    });
    const calculatePasswordStrength=(password)=>{
        const result=zxcvbn(password);
        setPasswordStrength(result.score);
    }

    return (
        <div>
            <div className="app">
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
                                                <Link to={"/"}>Home</Link></li>
                                            <li className="is-marked">
                                                <Link to={"/"}>Reset</Link></li>
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
                        <div className="section__intro u-s-m-b-60">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="section__text-wrap">
                                            <h1 className="section__heading u-c-secondary">FORGOT PASSWORD?</h1>
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
                                                <h1 className="gl-h1">PASSWORD RESET</h1>
                                                <span className="gl-text u-s-m-b-30">Enter your email to reset your password.</span>
                                                <form className="l-f-o__form" onSubmit={formik.handleSubmit}>
                                                    <div className="u-s-m-b-30">
                                                        <label className="gl-label float-start" htmlFor="reset-email">E-MAIL <span className='text-danger'>*</span></label>
                                                        <input
                                                            className={`input-text input-text--primary-style ${formik.errors.email && formik.touched.email && 'is-invalid'}`}
                                                            type="text"
                                                            id="reset-email"
                                                            name='email'
                                                            placeholder="Enter E-mail"
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.email}
                                                            autoComplete='username'
                                                        />
                                                        {formik.touched.email && formik.errors.email ? <div className="invalid-feedback">{formik.errors.email}</div> : null}
                                                        <p></p>

                                                    </div>
                                                    <div className="u-s-m-b-30">
                                                        <label className="gl-label float-start" htmlFor="reset-email">PASSWORD <span className='text-danger'>*</span></label>
                                                        <div className="position-relative">
                                                            <input
                                                            className={`input-text input-text--primary-style ${formik.errors.password && formik.touched.password && 'is-invalid'}`}
                                                            type="password"
                                                            name='password'
                                                            id="reset-password"
                                                            placeholder="Enter Password"
                                                            onChange={(e)=>{formik.handleChange(e);
                                                                 calculatePasswordStrength(e.target.value)}}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.password}
                                                            autoComplete='current-password'
                                                             /> 
                                                        </div>
                                                        {formik.touched.password && formik.errors.password ? <div className="invalid-feedback">{formik.errors.password}</div> : null}
                                                        <div className="progress mt-2">
                                                    <div
                                                        className={`progress-bar ${passwordStrength === 0 ? 'bg-danger' : passwordStrength === 1 ? 'bg-warning' : passwordStrength === 2 ? 'bg-info' : passwordStrength === 3 ? 'bg-primary' : 'bg-success'}`}
                                                        role="progressbar"
                                                        style={{ width: `${(passwordStrength + 1) * 25}%` }}
                                                        aria-valuenow={(passwordStrength + 1) * 25}
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
                                                    <div className="u-s-m-b-30">
                                                    <NotificationContainer />
                                                        <button className="btn btn--e-transparent-brand-b-2 btn-outline-primary float-left" type="submit">SUBMIT</button>
                                                    </div>
                                                    <div className="u-s-m-b-30">
                                                        <Link className="gl-link" to={"/"}>Back to Login</Link>
                                                    </div>
                                                </form>
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
        </div>
    )
}

export default ForgotPassword;
