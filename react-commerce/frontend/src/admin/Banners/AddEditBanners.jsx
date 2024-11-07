import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddEditBanners = () => {
  const BASE_URL=process.env.REACT_APP_BASE_URL
  const location = useLocation(); 
  const id = location.state ? location.state.id : null;
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [bannerData, setBannerData] = useState({});
  const navigate = useNavigate();
  const [loading,setloading]=useState(false)

  useEffect(() => {
    document.title="AddEditBanners"
    if (id) {
      GetBannerDetails(id);
    }
  }, [id]);

  const GetBannerDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8081/api/EditBannerDetails/${id}`);
      // const response = await axios.get(`${BASE_URL}/api/EditBannerDetails/${id}`,{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}});
      const data = response.data.data[0];
      console.log(data)
      setBannerData(data);
      setValue("type", data.type);
      setValue("link", data.link);
      setValue("alt", data.alt);
    } catch (error) {
      console.error("Error fetching banner details:", error);
    }
  };

  const onSubmit = async (formData) => {
    setloading(true);
    
    try {
      const form = new FormData();
      form.append('type', formData.type);
      form.append('link', formData.link);
      form.append('alt', formData.alt);
      form.append('AdminUser_id',localStorage.getItem('id'))
      if (formData.BannerImage?.[0]) {
        form.append('BannerImage', formData.BannerImage[0]);
      }
  
      const url = id ? `${BASE_URL}/api/UpdateBanners/${id}` : `${BASE_URL}/api/AddBanners`;
      const method = id ? 'put' : 'post';
  
      await axios[method](url, form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
  
      toast.success(`Banner ${id ? "updated" : "added"} successfully!`, { position: "bottom-right" });
      setTimeout(() => navigate("/banners"), 3000);
  
    } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Form submission failed!",{position:"bottom-left"});
    } finally {
        setloading(false);
    }
  };
  
  return (
    <div>
    <Header />
        <div className="wrapper">
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6"></div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><Link to={"/admindashboard1"}>Home</Link></li>
                                <li className="breadcrumb-item"><Link to={"/Banners"}>Back</Link></li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="card card-primary">
                            <div className="card-header">
                                <h3 className="card-title" style={{ width: "100%", fontWeight: "bold" }}>
                                    {id ? "Update Banner Form" : "Add Banner Form"}
                                </h3>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="card-body">
                                            <div className="form-group text-start">
                                                <label htmlFor="exampleInputBannerName">Type <span className='text-danger'>*</span></label>
                                                <input type="text" className="form-control" id="exampleInputBannerName" name='type' {...register('type', { required: true })} defaultValue={bannerData ? bannerData.type : ""} />
                                                {errors.type && <span className="text-danger">This field is required</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card-body">
                                            <div className="form-group text-start">
                                                <label htmlFor="exampleInputBannerfile">Banner BannerImage<span className='text-danger'>*</span></label>
                                                <input type="file" className="form-control" id="exampleInputBannerfile" name='BannerImage' {...register('BannerImage', { required: id ? false : true })} />
                                                {errors.BannerImage && <span className="text-danger">This field is required</span>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="card-body">
                                            <div className="form-group text-start">
                                                <label htmlFor="exampleInputBannerDiscount">Link <span className='text-danger'>*</span></label>
                                                <input type="text" className="form-control" id="exampleInputBannerDiscount" name='link' {...register('link', { required: true })} defaultValue={bannerData ? bannerData.link : ''} />
                                                {errors.link && <span className="text-danger">This field is required</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card-body">
                                            <div className="form-group text-start">
                                                <label htmlFor="exampleInputBannerDescription">Alt <span className='text-danger'>*</span></label>
                                                <input type="text" className="form-control" id="exampleInputBannerDescription" name='alt' {...register('alt', { required: true })} defaultValue={bannerData ? bannerData.alt : ''} />
                                                {errors.alt && <span className="text-danger">This field is required</span>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                
                                <div className="row">
                                    
                                    <div className="col-md-6">
                                        <div className="card-body">
                                            <div className="form-group text-start">
                                                <label htmlFor="exampleInputBannercheckbox">Status <span className='text-danger'>*</span></label>
                                                <input type="checkbox" id="exampleInputBannercheckbox" name='status' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='text-start'>
                                <ToastContainer />
                                {loading ? (
                                  <div>
                                    <button type="submit" className="btn btn-success" disabled  style={{ position: 'relative', zIndex: 0 }} >   <i className="fas fa-spinner fa-spin" /> Update </button>
                                     <div style={{   position: 'absolute',   top: 0,   left: 0,   width: '100%',   height: '100%',   zIndex: 1,   cursor: 'not-allowed' }} /> </div>
                                ) : (
                                  <button type="submit" className="btn btn-primary">Submit</button>
                                )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        </div>
    <Footer></Footer>    
    </div>
  )
}

export default AddEditBanners
