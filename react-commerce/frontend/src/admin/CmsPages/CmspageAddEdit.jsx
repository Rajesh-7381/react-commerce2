import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { NotificationManager } from 'react-notifications';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Loader from '../../Loader';
import { toast, ToastContainer } from 'react-toastify';

const CmspageAddEdit = () => {
    const BASE_URL=process.env.REACT_APP_BASE_URL
    const location = useLocation();
    const navigate=useNavigate();
    const { register, handleSubmit, setValue,formState:{errors} } = useForm();
    const id = location.state ? location.state.id : null;
    const [cmspagedata, setcmspagedata] = useState([]);
    const [loading,setloading]=useState(false)

    useEffect(() => {
        document.title='AddEditCmsPages';
        if (id) {
            handleupdatecmspage(id);
        }
    }, [id])

    const handleupdatecmspage = async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/cmspageeditdata/${id}`,{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}});
            const cmsdata = response.data.data;
            setcmspagedata(cmsdata);
            setValue("title", cmsdata.title);
            setValue("description", cmsdata.description);
            setValue("url", cmsdata.url);
            setValue("meta_title", cmsdata.meta_title);
            setValue("meta_description", cmsdata.meta_description);
            setValue("meta_keywords", cmsdata.meta_keywords);
        } catch (error) {
            console.error(error)
        }
    }

    const onsubmit = async (formData) => {
        setloading(true)
        try {
            const url=id ? `${BASE_URL}/api/cmsupdatepage/${id}` : `${BASE_URL}/api/cmsaddpage`;
            const method=id ? 'put' : 'post';
            await axios[method](url,formData,{
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });

            toast.success(`CMS ${id ? 'Updated' : 'Added'} Successfully!`,{position:'bottom-right'})
            setTimeout(()=>navigate("/cmspages"),5000)
        } catch (error) {
            console.error(error)
            toast.error('Form submission failed');
        }finally{
            setloading(false)
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
                        <h1 className="m-0 float-start">Edit/Update CMS</h1>
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
                                    <Link to={"/categories"}>Back</Link>
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
                                    <div className="card card-primary">
                                        <div className="card-header">
                                            <h3 className="card-title" style={{ width: "100%", fontWeight: "bold" }}>
                                                {id ? 'Update Form' : 'Add Form'}
                                            </h3>
                                        </div>
                                        {
                                            loading ? (
                                                <Loader />
                                            ):(
                                                <form onSubmit={handleSubmit(onsubmit)}>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="card-body">
                                                        <div className="form-group text-start">
                                                            <label htmlFor="exampleInputcmspageTitle">Title<span className='text-danger'>*</span></label>
                                                            <input type="text" className="form-control" id="exampleInputcmspageTitle" name='title' {...register("title", { "required": true })} defaultValue={cmspagedata.title} />
                                                            {errors.title && <span className='text-danger'>Title Required</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="card-body">
                                                        <div className="form-group text-start">
                                                            <label htmlFor="exampleInputcmspageDescription">Description<span className='text-danger'>*</span></label>
                                                            <input type="text" className="form-control" id="exampleInputcmspageDescription" name='description'  {...register("description", { "required": true })} defaultValue={cmspagedata.description} />
                                                            {errors.description && <span className='text-danger'>Description Required</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="card-body">
                                                        <div className="form-group text-start">
                                                            <label htmlFor="exampleInputcmspageURL">URL <span className='text-danger'>*</span></label>
                                                            <input type="text" className="form-control" id="exampleInputcmspageURL" name='url' {...register("url", { "required": true })} defaultValue={cmspagedata.url} />
                                                            {errors.description && <span className='text-danger'>url Required</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="card-body">
                                                        <div className="form-group text-start">
                                                            <label htmlFor="exampleInputcmspagemeta_title">Meta Title <span className='text-danger'>*</span></label>
                                                            <input type="text" className="form-control" id="exampleInputcmspagemeta_title" name='meta_title'  {...register("meta_title", { "required": true })} defaultValue={cmspagedata.meta_title} />
                                                            {errors.description && <span className='text-danger'>Description Required</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="card-body">
                                                        <div className="form-group text-start">
                                                            <label htmlFor="exampleInputcmspagemeta_description">Meta Description <span className='text-danger'>*</span></label>
                                                            <input type="text" className="form-control" id="exampleInputcmspageexampleInputcmspagemeta_description" name='meta_description'  {...register("meta_description", { "required": true })} defaultValue={cmspagedata.meta_description} />
                                                            {errors.meta_description && <span className='text-danger'>meta description Required</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">  
                                                    <div className="card-body">
                                                        <div className="form-group text-start">
                                                            <label htmlFor="exampleInputcmspagemeta_keywords">Meta Keyword <span className='text-danger'>*</span></label>
                                                            <input type="text" className="form-control" id="exampleInputcmspagemeta_keywords" name='meta_keywords'  {...register("meta_keywords", { "required": true })} defaultValue={cmspagedata.meta_keywords} />
                                                            {errors.meta_keywords && <span className='text-danger'>meta keywords Required</span>}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='text-start'>
                                                <ToastContainer />
                                                {loading ? (
                                                    <div>
                                                      <button type="submit" className={id ? 'btn btn-success' : 'btn btn-primary'} disabled  style={{ position: 'relative', zIndex: 0 }} >   <i className="fas fa-spinner fa-spin" /> {id ? 'Update' : 'Submit'} </button>
                                                       <div style={{   position: 'absolute',   top: 0,   left: 0,   width: '100%',   height: '100%',   zIndex: 1,   cursor: 'not-allowed' }} /> </div>
                                                  ) : (
                                                    <button type="submit" className={id ? 'btn btn-success' : 'btn btn-primary'}>{id ? 'Update' : 'Submit'}</button>
                                                  )}
                                            </div>
                                        </form>
                                        )
                                        }
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

export default CmspageAddEdit;
