import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NotificationManager } from 'react-notifications';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const AddEditBanners = () => {
  const BASE_URL=process.env.REACT_APP_BASE_URL
  const location = useLocation(); 
  const id = location.state ? location.state.id : null;
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [bannerData, setBannerData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    document.title="AddEditBanners"
    if (id) {
      GetBannerDetails(id);
    }
  }, [id]);

  const GetBannerDetails = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/EditBannerDetails/${id}`,{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}});
      const data = response.data.data[0];
      setBannerData(data);
      setValue("type", data.type);
      setValue("link", data.link);
      setValue("alt", data.alt);
    } catch (error) {
      console.error("Error fetching banner details:", error);
    }
  };

  const onSubmit = async (formData) => {
    try {
      const form = new FormData();
      form.append('type', formData.type);
      form.append('link', formData.link);
      form.append('alt', formData.alt);

      if (formData.BannerImage && formData.BannerImage[0]) {
        form.append('BannerImage', formData.BannerImage[0]);
      }

      if (id) {
        await axios.put(`${BASE_URL}/api/UpdateBanners/${id}`, form, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        NotificationManager.success("Banner updated successfully!");
      } else {
        await axios.post(`${BASE_URL}/api/AddBanners`, form, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        NotificationManager.success("Banner added successfully!");
      }
      navigate("/banners");
    } catch (error) {
      console.error("Error submitting form:", error);
      NotificationManager.error("Form submission failed!");
    }
  };
  return (
    <div>
    <Header></Header>
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
                                    <button type="submit" className='btn btn-outline-primary'>{id ? "Update" : "Submit"}</button>
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
