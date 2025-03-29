import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {  NotificationContainer } from 'react-notifications';
import { DeleteEntity } from '../CRUDENTITY/DeleteEntity';
import { StatusEntity } from '../CRUDENTITY/StatusEntity';
import Footer from '../Components/Footer';
import Header from '../Components/Header';


const ProductImages = () => {
    const BASE_URL=process.env.REACT_APP_BASE_URL
    const [productsimage,setproductsimage]=useState([]);
    const [filterdata,setfilterdata]=useState([]);
    useEffect(()=>{
        document.title='ProductImages';
        productsimagetabledata();
    },[]);

    const productsimagetabledata=async()=>{
        const response=await axios.get(`${BASE_URL}/api/getAllproductsImages`,{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}});
        // console.log(response.data)
        setproductsimage(response.data);
        setfilterdata(response.data);
    }
    
    // delete
    const HandleProductsImageDelete=async(id)=>{
        await DeleteEntity('ProductsImage',id);
        // Fetch the updated data from the server and update the local state
        // Update the state immediately
        // after successfully deleting the item from the server, we immediately update the state using setfilterdata and setproductsimage to filter out the deleted item.
        //  This ensures that the UI reflects the deletion instantly without needing to refresh the page.
        setfilterdata(filterdata.filter(item => item.id !== id));
        setproductsimage(productsimage.filter(item => item.id !== id));            
    }
    // status change
    const handleProductsToggleStatus=async(id,status)=>{
        await StatusEntity('ProductsImageStatus', id, status, setfilterdata, filterdata);
    }

  return (
    <div>
        <div>
        <div className="wrapper">
        {/* Preloader */}
            <div className="preloader flex-column justify-content-center align-items-center">
                <img className="animation__shake" src="dist/img/AdminLTELogo.png" alt="AdminLTELogo" height={60} width={60} />
            </div>
        {/* Navbar */}
            <Header></Header>
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                    <div className="col-sm-12">
                        <h1 className="m-0 float-start">ProductsImage Table</h1>
                        <Link  className="breadcrumb-item float-right" to={"/admindashboard1"}>  Home </Link>
                        <br />
                        
                    </div>
                    
                    {/* /.col */}
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right"> </ol>
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
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered table-striped">
                                            <thead>
                                                <tr>
                                                    <th className='bg-dark text-light'>SL NO.</th>
                                                    <th className='bg-dark text-light'>Image</th>
                                                    <th className='bg-dark text-light'>PRODUCTID</th>
                                                    <th className='bg-dark text-light'>Image_SORT</th>
                                                    <th className='bg-dark text-light'>STATUS</th>
                                                    <th className='bg-dark text-light'>ACTIONS</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    filterdata && filterdata.length > 0 ?  filterdata.map((item,index)=>(
                                                        <tr  key={item.id}>
                                                            <td > {index+1}</td>
                                                            <td >
                                                                <Link to={item.image} target="_blank" id='image-constrained'>
                                                                    {item.image && item.image.trim() !=='' ? (
                                                                        <img src={item.image} alt="" height={50} width={50} loading='lazy' onError={(e)=>{
                                                                            if(e.target.src !== 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'){
                                                                                e.target.src='https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'
                                                                            }
                                                                        }}/>
                                                                    ):(
                                                                        <img src={'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'} alt="" loading='lazy' height={50} width={50} />
                                                                    )}
                                                                </Link>
                                                            </td>

                                                            <td > {item.product_id}</td>
                                                            <td > {item.image_sort}</td>
                                                            <td > <span className={`badge badge-${item.status === 1 ? 'success' : 'danger'}`}>{item.status === 1 ? 'Active' : 'Inactive'}</span></td>
                                                            <td >
                                                                <NotificationContainer />
                                                                <button className='btn btn-sm btn-danger mr-1' title='delete' onClick={()=>HandleProductsImageDelete(item.id)}><i className='fas fa-trash'></i></button>
                                                                <button className='btn btn-sm btn-dark' title='toggle off/on' onClick={()=>handleProductsToggleStatus(item.id,item.status)}><i className={item.status === 1 ? 'fas fa-toggle-on' : 'fas fa-toggle-off'}></i></button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                    :
                                                    <tr>
                                                        <td colSpan={6}>No data found</td>
                                                    </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </section>
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
  )
}

export default ProductImages