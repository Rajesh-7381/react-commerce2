import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {  NotificationManager } from 'react-notifications';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';
import Header from '../Components/Header';

const AddEditBrands = () => {
    const location = useLocation();
    const id = location.state ? location.state.id : null;
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [brandData, setBrandData] = useState(null);
    const navigate = useNavigate();
    const imageRef=useRef(null);
    const imageRef2=useRef(null);
   

    useEffect(() => {
        document.title="AddEditBrands"
        if (id) {
            // alert(id)
            GetSingleBrands(id);
        }
    }, [id]);

    const GetSingleBrands = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8081/api/GetSingleBrandDetails/${id}`);
            // console.log(response.data.data)
            const brandData = response.data.data;
            // console.log(brandData)
            setBrandData(brandData);
            // Set form values
            setValue('brand_name', brandData.brand_name);
            setValue('brand_discount', brandData.brand_discount);
            setValue('description', brandData.description);
            setValue('url', brandData.url);
            setValue('meta_title', brandData.meta_title);
            setValue('meta_description', brandData.meta_descriptions);
            setValue('meta_keyword', brandData.meta_keywords);
            setValue('brand_logo', brandData.brand_logo);
        } catch (error) {
            console.log(error);
        }
    };

    const onSubmit = async (formData) => {
        try {
            const form = new FormData();
            form.append('brand_name', formData.brand_name);
            form.append('brand_discount', formData.brand_discount);
            form.append('description', formData.description);
            form.append('url', formData.url);
            form.append('meta_title', formData.meta_title);
            form.append('meta_description', formData.meta_description);
            form.append('meta_keyword', formData.meta_keyword);
            
            // Append image files
            if (formData.brand_image[0]) {
                form.append('brand_image', formData.brand_image[0]);
            }
            if (formData.brand_logo[0]) {
                form.append('brand_logo', formData.brand_logo[0]);
            }  
            
            var url= id ? `http://localhost:8081/api/UpdateBrand/${id}` : 'http://localhost:8081/api/AddBrand';
            const method=id ? 'put' : 'post';
            await axios[method](url,form,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })

            // navigate
            setTimeout(() => {
                NotificationManager.success("Created successfully!");
                navigate("/brands");

            }, 2000);
        } catch (error) {
            console.log(error);
        }
    };

    const zoom=(ref,pixel)=>{
        if(ref.current){
            const currentwidth=ref.current.clientWidth;
            const newtwidth=currentwidth+pixel;
            if(newtwidth > 50){
                ref.current.style.width=`${newtwidth}px`
                ref.current.style.height=`${newtwidth}px`
            }
        }
    }

    // zoom effect 
    const zoomIn=()=>zoom(imageRef,50);
    const zoomOut=()=>zoom(imageRef,-50);
    const zoomIn2=()=>zoom(imageRef2,50);
    const zoomOut2=()=>zoom(imageRef2,-50);

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
          {/* Content Wrapper. Contains page content */}
          <div className="wrapper">
          <div className="content-wrapper">
              <section className="content-header">
                  <div className="container-fluid">
                      <div className="row mb-2">
                          <div className="col-sm-6"></div>
                          <div className="col-sm-6">
                              <ol className="breadcrumb float-sm-right">
                                  <li className="breadcrumb-item"><Link to={"/admindashboard1"}>Home</Link></li>
                                  <li className="breadcrumb-item"><Link to={"/brands"}>Back</Link></li>
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
                                      {id ? "Update Brand Form" : "Add Brand Form"}
                                  </h3>
                              </div>
                              <form onSubmit={handleSubmit(onSubmit)}> {/* 1st submit means  HTML FORM EVENT HANDLER  and 2nd onsubmit means  that processes the form data after validation by react-hook-form(when PUT OR POST OPERATION PERFORMED)*/}
                                  <div className="row">
                                      <div className="col-md-6">
                                          <div className="card-body">
                                              <div className="form-group text-start">
                                                  <label htmlFor="exampleInputBrandName">Brand Name <span className='text-danger'>*</span></label>
                                                  <input type="text" className="form-control" id="exampleInputBrandName" name='brand_name' {...register('brand_name', { required: true })} defaultValue={brandData ? brandData.brand_name : ""} />
                                                  {errors.brand_name && <span className="text-danger">This field is required</span>}
                                              </div>
                                          </div>
                                      </div>
                                      <div className="col-md-6">
                                          <div className="card-body">
                                          <div className="form-group text-start">
                                          <label htmlFor="exampleInputBrandfile">Brand Image<span className='text-danger'>*</span></label>
                                          <input 
                                            type="file" 
                                            className="form-control" 
                                            id="exampleInputBrandfile" 
                                            name='brand_image' 
                                            {...register('brand_image', { required: id ? false : true })} 
                                          />
                                          {brandData && brandData.brand_image && (
                                            <div>
                                              <img 
                                                ref={imageRef} 
                                                src={`http://localhost:8081/api/brandimage/${brandData.brand_image}`} 
                                                width={50} 
                                                height={50} 
                                                alt="" 
                                                style={{ transition: 'width 0.5s, height 0.5s' }} 
                                              />
                                              <p className='btn btn-success mr-1' onClick={zoomIn}>+</p>
                                              <p className='btn btn-danger' onClick={zoomOut}>-</p>
                                            </div>
                                          )}
                                          {errors.brand_image && <span className="text-danger">This field is required</span>}
                                        </div>
                                          </div>
                                      </div>
                                  </div>
                                  
                                  <div className="row">
                                      <div className="col-md-6">
                                          <div className="card-body">
                                              <div className="form-group text-start">
                                                  <label htmlFor="exampleInputBrandDiscount">Brand Discount <span className='text-danger'>*</span></label>
                                                  <input type="text" className="form-control" id="exampleInputBrandDiscount" name='brand_discount' {...register('brand_discount', { required: true })} defaultValue={brandData ? brandData.brand_discount : ''} />
                                                  {errors.brand_discount && <span className="text-danger">This field is required</span>}
                                              </div>
                                          </div>
                                      </div>
                                      <div className="col-md-6">
                                          <div className="card-body">
                                              <div className="form-group text-start">
                                                  <label htmlFor="exampleInputBrandDescription">Description <span className='text-danger'>*</span></label>
                                                  <input type="text" className="form-control" id="exampleInputBrandDescription" name='description' {...register('description', { required: true })} defaultValue={brandData ? brandData.description : ''} />
                                                  {errors.description && <span className="text-danger">This field is required</span>}
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="row">
                                      <div className="col-md-6">
                                          <div className="card-body">
                                              <div className="form-group text-start">
                                                  <label htmlFor="exampleInputBrandURL">Brand URL <span className='text-danger'>*</span></label>
                                                  <input type="text" className="form-control" id="exampleInputBrandURL" name='url' {...register('url', { required: true })} defaultValue={brandData ? brandData.url : ''} />
                                                  {errors.url && <span className="text-danger">This field is required</span>}
                                              </div>
                                          </div>
                                      </div>
                                      <div className="col-md-6">
                                          <div className="card-body">
                                              <div className="form-group text-start">
                                                  <label htmlFor="exampleInputBrandTitle">Meta Title <span className='text-danger'>*</span></label>
                                                  <input type="text" className="form-control" id="exampleInputBrandTitle" name='meta_title' {...register('meta_title', { required: true })} defaultValue={brandData ? brandData.meta_title : ''} />
                                                  {errors.meta_title && <span className="text-danger">This field is required</span>}
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="row">
                                      <div className="col-md-6">
                                          <div className="card-body">
                                              <div className="form-group text-start">
                                                  <label htmlFor="exampleInputBrandDescription">Meta Description <span className='text-danger'>*</span></label>
                                                  <input type="text" className="form-control" id="exampleInputBrandDescription" name='meta_description' {...register('meta_description', { required: true })} defaultValue={brandData ? brandData.meta_description : ''} />
                                                  {errors.meta_description && <span className="text-danger">This field is required</span>}
                                              </div>
                                          </div>
                                      </div>
                                      <div className="col-md-6">
                                          <div className="card-body">
                                              <div className="form-group text-start">
                                                  <label htmlFor="exampleInputBrandKeyword">Meta Keyword <span className='text-danger'>*</span></label>
                                                  <input type="text" className="form-control" id="exampleInputBrandKeyword" name='meta_keyword' {...register('meta_keyword', { required: true })} defaultValue={brandData ? brandData.meta_keyword : ''} />
                                                  {errors.meta_keyword && <span className="text-danger">This field is required</span>}
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                  <div className="row">
                                      <div className="col-md-6">
                                          <div className="card-body">
                                              <div className="form-group text-start">
                                                  <label htmlFor="exampleInputBrandLogo">Brand Logo <span className='text-danger'>*</span></label>
                                                  <input type="file" className="form-control" id="exampleInputBrandLogo" name='brand_logo' {...register('brand_logo', { required: id ? false : true })} />
                                                  {brandData && brandData.brand_logo && (
                                                      <div>
                                                        <img 
                                                          ref={imageRef2} 
                                                          src={`http://localhost:8081/api/brandlogo/${brandData.brand_logo}`} 
                                                          width={50} 
                                                          height={50} 
                                                          alt="" 
                                                          style={{ transition: 'width 0.5s, height 0.5s' }} 
                                                        />
                                                        <p className='btn btn-success mr-1' onClick={zoomIn2}>+</p>
                                                        <p className='btn btn-danger' onClick={zoomOut2}>-</p>
                                                      </div>
                                                    )}
                                                  {errors.brand_logo && <span className="text-danger">This field is required</span>}
                                              </div>
                                          </div>
                                      </div>
                                      <div className="col-md-6">
                                          <div className="card-body">
                                              <div className="form-group text-start">
                                                  <label htmlFor="exampleInputBrandcheckbox">Status <span className='text-danger'>*</span></label>
                                                  <input type="checkbox" id="exampleInputBrandcheckbox" name='status' />
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

          {/* /.content-wrapper */}
          <Footer></Footer>
          {/* Control Sidebar */}
          <aside className="control-sidebar control-sidebar-dark">
            {/* Control sidebar content goes here */}
          </aside>
          {/* /.control-sidebar */}
        </div>
        {/* ./wrapper */}
      </div>
        </div>
    );
}

export default AddEditBrands;
