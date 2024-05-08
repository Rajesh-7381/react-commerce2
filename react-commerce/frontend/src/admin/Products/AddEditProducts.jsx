import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { NotificationManager,NotificationContainer } from 'react-notifications';

const AddEditProducts = () => {
    const navigate=useNavigate();
    const location=useLocation();
    const id=location.state ? location.state.id : null;
    const {register,handleSubmit,setValue,formState: { errors }}=useForm();
    const [data,setData]=useState({});
    
    useEffect(()=>{
        document.title="Addeditproduct";
        if(id){
            handleProductUpdate(id);
        }
    },[id]);

    const handleProductUpdate=async(id)=>{
        try {
            const response = await axios.get(`http://localhost:8081/productedit/${id}`);
            const productdata=response.data.data;
            setData(productdata);
            setValue('product_name', productdata.product_name);
            setValue('product_code', productdata.product_code);
            setValue('family_color', productdata.family_color);
            setValue('group_code', productdata.group_code);
            setValue('product_price', productdata.product_price);
            setValue('product_weight', productdata.product_weight);
            setValue('product_discount', productdata.product_discount);
            setValue('discount_type', productdata.discount_type);
            setValue('final_price', productdata.final_price);
            setValue('product_video', productdata.product_video);
            setValue('description', productdata.description);
            setValue('washcare', productdata.washcare);
            setValue('keywords', productdata.keywords);
            setValue('fabric', productdata.fabric);
            setValue('pattern', productdata.pattern);
            setValue('sleeve', productdata.sleeve);
            setValue('fit', productdata.fit);
            setValue('meta_keywords', productdata.meta_keywords);
            setValue('meta_description', productdata.meta_description);
            setValue('meta_title', productdata.meta_title);
            setValue('occassion', productdata.occassion);
            setValue('is_featured', productdata.is_featured);
        } catch (error) {
            console.error(error);
        }
    }

    const onSubmit=async(formData)=>{
      try {
        const form = new FormData();
            form.append('product_name', formData.product_name);
            form.append('product_code', formData.product_code);
            form.append('family_color', formData.family_color);
            form.append('product_color', formData.product_color);
            form.append('group_code', formData.group_code);
            form.append('product_price', formData.product_price);
            form.append('product_weight', formData.product_weight);
            form.append('product_discount', formData.product_discount);
            form.append('discount_type', formData.discount_type);
            form.append('final_price', formData.final_price);
            //form.append('product_video', formData.product_video);
            form.append('description', formData.description);
            form.append('washcare', formData.washcare);
            form.append('keywords', formData.keywords);
            form.append('fabric', formData.fabric);
            form.append('pattern', formData.pattern);
            form.append('sleeve', formData.sleeve);
            form.append('fit', formData.fit);
            form.append('meta_keywords', formData.meta_keywords);
            form.append('meta_description', formData.meta_description);
            form.append('meta_title', formData.meta_title);
            form.append('occassion', formData.occassion);
            form.append('is_featured', formData.is_featured ? 'Yes' : 'No');
            form.append('product_video', formData.product_video[0]);

        if(id){
            const response=await axios.put(`http://localhost:8081/updateproducts/${id}`,form,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            });

            NotificationManager.success("product updated successfully!");
            navigate("/products");
        }else{
            const response=await axios.post(`http://localhost:8081/addproducts`,form,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            });
            NotificationManager.success("product added successfully!");
            navigate("/products");
        }
      } catch (error) {
            console.error(error)
      }
    }

    return (
        <div>
            <div className="wrapper">
                <div className="content-wrapper">
                    <section className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-6"></div>
                                <div className="col-sm-6">
                                    <ol className="breadcrumb float-sm-right">
                                        <li className="breadcrumb-item"><Link to={"/admindashboard1"}>Home</Link></li>
                                        <li className="breadcrumb-item"><Link to={"/products"}>Back</Link></li>
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
                                            {id ? 'Update Products' : 'Add Products'}
                                        </h3>
                                    </div>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="card-body">
                                                    <div className="form-group text-start">
                                                        <label htmlFor="exampleInputProductName">Product Name <span className='text-danger'>*</span></label>
                                                        <input type="text" className="form-control" id="exampleInputProductName" name='product_name' {...register('product_name', { required: true })} defaultValue={data.product_name} />
                                                        {errors.product_name && <span className="text-danger">Product Name is required </span>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="card-body">
                                                    <div className="form-group text-start">
                                                        <label htmlFor="exampleInputProductcode">Product code<span className='text-danger'>*</span></label>
                                                        <input type="text" className="form-control" id="exampleInputProductcode" name='product_code' {...register('product_code', { required: true })} defaultValue={data.product_code} />
                                                        {errors.product_code && <span className="text-danger">product code is required </span>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="card-body">
                                                    <div className="form-group text-start">
                                                        <label htmlFor="exampleInputProductselectid">product color <span className='text-danger'>*</span></label>
                                                        <input type="text" className="form-control" id="exampleInputProductcode" name='product_color' {...register('product_color', { required: true })} defaultValue={data.product_color} />
                                                        {errors.product_color && <span className="text-danger">product color is required </span>}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="card-body">
                                                    <div className="form-group text-start">
                                                        <label htmlFor="exampleInputProductColor">Family Color <span className='text-danger'>*</span></label>
                                                        <input type="text" className="form-control" id="exampleInputProductColor" name='family_color' {...register('family_color', { required: true })} defaultValue={data.family_color} />
                                                        {errors.family_color && <span className="text-danger">family color is required </span>}

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="card-body">
                                                    <div className="form-group text-start">
                                                        <label htmlFor="exampleInputProductCode">Group Code <span className='text-danger'>*</span></label>
                                                        <input type="text" className="form-control" id="exampleInputProductCode" name='group_code' {...register('group_code', { required: true })} defaultValue={data.group_code} />
                                                        {errors.group_code && <span className="text-danger">group code is required </span>}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="card-body">
                                                    <div className="form-group text-start">
                                                        <label htmlFor="exampleInputProductPrice">Product Price <span className='text-danger'>*</span></label>
                                                        <input type="text" className="form-control" id="exampleInputProductPrice" name='product_price' {...register('product_price', { required: true })} defaultValue={data.product_price} />
                                                        {errors.product_price && <span className="text-danger">product price is required </span>}

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="card-body">
                                                    <div className="form-group text-start">
                                                        <label htmlFor="exampleInputProductWeight">Product Weight <span className='text-danger'>*</span></label>
                                                        <input type="text" className="form-control" id="exampleInputProductWeight" name='product_weight' {...register('product_weight', { required: true })} defaultValue={data.product_weight} />
                                                        {errors.product_weight && <span className="text-danger">product weight is required </span>}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="card-body">
                                                    <div className="form-group text-start">
                                                        <label htmlFor="exampleInputProductDiscount">Product Discount <span className='text-danger'>*</span></label>
                                                        <input type="text" className="form-control" id="exampleInputProductDiscount" name='product_discount' {...register('product_discount', { required: true })} defaultValue={data.product_discount} />
                                                        {errors.product_discount && <span className="text-danger">Product Discount is required </span>}

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="card-body">
                                                    <div className="form-group text-start">
                                                        <label htmlFor="exampleInputProductType">Discount Type<span className='text-danger'>*</span></label>
                                                        <input type="text" className="form-control" id="exampleInputProductType" name='discount_type' {...register('discount_type', { required: true })} defaultValue={data.discount_type} />
                                                        {errors.discount_type && <span className="text-danger">discount type is required </span>}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="card-body">
                                                    <div className="form-group text-start">
                                                        <label htmlFor="exampleInputProductPrice">Final Price <span className='text-danger'>*</span></label>
                                                        <input type="text" className="form-control" id="exampleInputProductPrice" name='final_price' {...register('final_price', { required: true })} defaultValue={data.final_price} />
                                                        

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="card-body">
                                                    <div className="form-group text-start">
                                                        <label htmlFor="exampleInputProductVideo">Product Video<span className='text-danger'>*</span></label>
                                                        <input type="file" className="form-control" id="exampleInputProductVideo" name='product_video'   {...register('product_video')} />
                                                        {errors.product_video && <span className="text-danger">product video is required </span>}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="card-body">
                                                    <div className="form-group text-start">
                                                        <label htmlFor="exampleInputProductDescription">Description <span className='text-danger'>*</span></label>
                                                        <input type="text" className="form-control" id="exampleInputProductDescription" name='description' {...register('description', { required: true })} defaultValue={data.description} />
                                                        {errors.description && <span className="text-danger">description is required </span>}

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="card-body">
                                                    <div className="form-group text-start">
                                                        <label htmlFor="exampleInputProductWashCare">WashCare<span className='text-danger'>*</span></label>
                                                        <input type="text" className="form-control" id="exampleInputProductWashCare" name='washcare' {...register('washcare', { required: true })} defaultValue={data.washcare} />
                                                        {errors.washcare && <span className="text-danger">washcare is required </span>}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="card-body">
                                                    <div className="form-group text-start">
                                                        <label htmlFor="exampleInputProductKeyWords">KeyWords <span className='text-danger'>*</span></label>
                                                        <input type="text" className="form-control" id="exampleInputProductKeyWords" name='keywords' {...register('keywords', { required: true })} defaultValue={data.keywords} />
                                                        {errors.keywords && <span className="text-danger">keywords is required </span>}

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="card-body">
                                                    <div className="form-group text-start">
                                                        <label htmlFor="exampleInputProductFabric">Fabric<span className='text-danger'>*</span></label>
                                                        <input type="text" className="form-control" id="exampleInputProductFabric" name='fabric' {...register('fabric', { required: true })} defaultValue={data.fabric} />
                                                        {errors.fabric && <span className="text-danger">fabric is required </span>}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="card-body">
                                                    <div className="form-group text-start">
                                                        <label htmlFor="exampleInputProductPattern">Pattern <span className='text-danger'>*</span></label>
                                                        <input type="text" className="form-control" id="exampleInputProductPattern" name='pattern' {...register('pattern', { required: true })} defaultValue={data.pattern} />
                                                        {errors.pattern && <span className="text-danger">pattern is required </span>}

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="card-body">
                                                    <div className="form-group text-start">
                                                        <label htmlFor="exampleInputProductsleeve">Sleeve<span className='text-danger'>*</span></label>
                                                        <input type="text" className="form-control" id="exampleInputProductsleeve" name='sleeve' {...register('sleeve', { required: true })} defaultValue={data.sleeve} />
                                                        {errors.sleeve && <span className="text-danger">sleeve is required </span>}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="card-body">
                                                    <div className="form-group text-start">
                                                        <label htmlFor="exampleInputProductfit">Fit <span className='text-danger'>*</span></label>
                                                        <input type="text" className="form-control" id="exampleInputProductfit" name='fit' {...register('fit', { required: true })} defaultValue={data.fit} />
                                                        {errors.fit && <span className="text-danger">fit is required </span>}

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="card-body">
                                                    <div className="form-group text-start">
                                                        <label htmlFor="exampleInputProductoccassion">Occasion<span className='text-danger'>*</span></label>
                                                        <input type="text" className="form-control" id="exampleInputProductoccassion" name='occassion' {...register('occassion', { required: true })} defaultValue={data.occassion} />
                                                        {errors.occassion && <span className="text-danger">occassion is required </span>}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="card-body">
                                                    <div className="form-group text-start">
                                                        <label htmlFor="exampleInputProductmeta_title">Meta Title <span className='text-danger'>*</span></label>
                                                        <input type="text" className="form-control" id="exampleInputProductmeta_title" name='meta_title' {...register('meta_title', { required: true })} defaultValue={data.meta_title} />
                                                        {errors.meta_title && <span className="text-danger">meta title is required </span>}

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="card-body">
                                                    <div className="form-group text-start">
                                                        <label htmlFor="exampleInputProductmeta_description">Meta Description<span className='text-danger'>*</span></label>
                                                        <input type="text" className="form-control" id="exampleInputProductmeta_description" name='meta_description' {...register('meta_description', { required: true })} defaultValue={data.meta_description} />
                                                        {errors.meta_description && <span className="text-danger">meta description is required </span>}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="card-body">
                                                    <div className="form-group text-start">
                                                        <label htmlFor="exampleInputProductmeta_title">Meta Keywords <span className='text-danger'>*</span></label>
                                                        <input type="text" className="form-control" id="exampleInputProductmeta_title" name='meta_keywords' {...register('meta_keywords', { required: true })} defaultValue={data.meta_keywords} />
                                                        {errors.meta_keywords && <span className="text-danger">Meta Keywords is required </span>}

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="card-body">
                                                    <div className="form-group text-start">
                                                        <label htmlFor="exampleInputProductis_featured">Is Featured<span className='text-danger'>*</span></label>
                                                        <input type="checkbox" id="exampleInputProductis_featured" name='is_featured' {...register('is_featured')} checked={data.is_featured === 'Yes'} />                                                    {errors.name && <span className="text-danger">Name is required </span>}
                                                        {errors.is_featured && <span className="text-danger">Feature is required </span>}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='text-start'>
                                            <button type="submit" className='btn btn-primary'>{id ? 'Update ' : 'Submit'}</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default AddEditProducts;
