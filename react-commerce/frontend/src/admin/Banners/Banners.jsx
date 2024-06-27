import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NotificationContainer } from 'react-notifications'
import { Link, useNavigate } from 'react-router-dom'
import { DeleteEntity } from '../CRUDENTITY/DeleteEntity';
import { StatusEntity } from '../CRUDENTITY/StatusEntity';

const Banners = () => {
    const [bannerData,setbannerData]=useState([]);
    const navigate=useNavigate();

    useEffect(()=>{
      document.title='Banners';
        BannerData();
    },[]);

    const BannerData=async()=>{
        try {
            const response=await axios.get("http://localhost:8081/getAllBanners");
            setbannerData(response.data);
            // console.log(bannerData)
            
        } catch (error) {
            console.log(error)
        }
    }

    const BannersAddEdit=(id)=>{
      // alert(id)
      if(id){
        // alert(id)
        navigate('/addeditbanners',{state :{id:id}}); //pass an object with single object property id 
      }else{
        navigate('/addeditbanners');
      }
    }

    // banner delete
    const BannerDelete=async(id)=>{
      const data=await DeleteEntity('Banner',id);
      const response=await axios.get("http://localhost:8081/getAllBanners");
      setbannerData(response.data);
      
    }

    const BannerStatusChange=async(id,status)=>{
        await StatusEntity('BannerStatus',id,status,setbannerData,bannerData);
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
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              <i className="fas fa-bars" />
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="index3.html" className="nav-link">
              Home
            </a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <button className="nav-link">Logout</button>
          </li>
        </ul>
        {/* Right navbar links */}
        <ul className="navbar-nav ml-auto">
          {/* Navbar Search */}
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="navbar-search"
              href="#"
              role="button"
            >
              <i className="fas fa-search" />
            </a>
            <div className="navbar-search-block">
              <form className="form-inline">
                <div className="input-group input-group-sm">
                  <input
                    className="form-control form-control-navbar"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-navbar" type="submit">
                      <i className="fas fa-search" />
                    </button>
                    <button
                      className="btn btn-navbar"
                      type="button"
                      data-widget="navbar-search"
                    >
                      <i className="fas fa-times" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>
          {/* Messages Dropdown Menu */}
          <li className="nav-item dropdown">
            <a className="nav-link" data-toggle="dropdown" href="#">
              <i className="far fa-comments" />
              <span className="badge badge-danger navbar-badge">3</span>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <a href="#" className="dropdown-item">
                {/* Message Start */}
                <div className="media">
                  <img
                    src="dist/img/user1-128x128.jpg"
                    alt="User Avatar"
                    className="img-size-50 mr-3 img-circle"
                  />
                  <div className="media-body">
                    <h3 className="dropdown-item-title">
                      Brad Diesel
                      <span className="float-right text-sm text-danger">
                        <i className="fas fa-star" />
                      </span>
                    </h3>
                    <p className="text-sm">Call me whenever you can...</p>
                    <p className="text-sm text-muted">
                      <i className="far fa-clock mr-1" /> 4 Hours Ago
                    </p>
                  </div>
                </div>
                {/* Message End */}
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                {/* Message Start */}
                <div className="media">
                  <img
                    src="dist/img/user8-128x128.jpg"
                    alt="User Avatar"
                    className="img-size-50 img-circle mr-3"
                  />
                  <div className="media-body">
                    <h3 className="dropdown-item-title">
                      John Pierce
                      <span className="float-right text-sm text-muted">
                        <i className="fas fa-star" />
                      </span>
                    </h3>
                    <p className="text-sm">I got your message bro</p>
                    <p className="text-sm text-muted">
                      <i className="far fa-clock mr-1" /> 4 Hours Ago
                    </p>
                  </div>
                </div>
                {/* Message End */}
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                {/* Message Start */}
                <div className="media">
                  <img
                    src="dist/img/user3-128x128.jpg"
                    alt="User Avatar"
                    className="img-size-50 img-circle mr-3"
                  />
                  <div className="media-body">
                    <h3 className="dropdown-item-title">
                      Nora Silvester
                      <span className="float-right text-sm text-warning">
                        <i className="fas fa-star" />
                      </span>
                    </h3>
                    <p className="text-sm">The subject goes here</p>
                    <p className="text-sm text-muted">
                      <i className="far fa-clock mr-1" /> 4 Hours Ago
                    </p>
                  </div>
                </div>
                {/* Message End */}
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item dropdown-footer">
                See All Messages
              </a>
            </div>
          </li>
          {/* Notifications Dropdown Menu */}
          <li className="nav-item dropdown">
            <a className="nav-link" data-toggle="dropdown" href="#">
              <i className="far fa-bell" />
              <span className="badge badge-warning navbar-badge">15</span>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <span className="dropdown-item dropdown-header">
                15 Notifications
              </span>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                <i className="fas fa-envelope mr-2" /> 4 new messages
                <span className="float-right text-muted text-sm">
                  3 mins
                </span>
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                <i className="fas fa-users mr-2" /> 8 friend requests
                <span className="float-right text-muted text-sm">
                  12 hours
                </span>
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item">
                <i className="fas fa-file mr-2" /> 3 new reports
                <span className="float-right text-muted text-sm">
                  2 days
                </span>
              </a>
              <div className="dropdown-divider" />
              <a href="#" className="dropdown-item dropdown-footer">
                See All Notifications
              </a>
            </div>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="fullscreen"
              href="#"
              role="button"
            >
              <i className="fas fa-expand-arrows-alt" />
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="control-sidebar"
              data-controlsidebar-slide="true"
              href="#"
              role="button"
            >
              <i className="fas fa-th-large" />
            </a>
          </li>
        </ul>
      </nav>
      {/* /.navbar */}
      {/* Main Sidebar Container */}

      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* banner Logo */}
        <Link to={"/admindashboard1"} className="banner-link">
          <img
            src="dist/img/AdminLTELogo.png"
            alt="AdminLTE Logo"
            className="banner-image img-circle elevation-3"
            style={{ opacity: ".8" }}
          />
          <span className="banner-text font-weight-light">AdminLTE 3</span>
        </Link>
        {/* Sidebar */}
        <div className="sidebar">
          {/* Sidebar user panel (optional) */}
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">===========</div>
            ===========
            <div className="info">
              <a href="#" className="d-block"></a>
            </div>
          </div>
          {/* SidebarSearch Form */}
          <div className="form-inline">
            <div className="input-group" data-widget="sidebar-search">
              <input
                className="form-control form-control-sidebar"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <div className="input-group-append">
                <button className="btn btn-sidebar">
                  <i className="fas fa-search fa-fw" />
                </button>
              </div>
            </div>
          </div>
          {/* Sidebar Menu */}
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              {/* Add icons to the links using the .nav-icon class
        with font-awesome or any other icon font library */}
              <li className="nav-item menu-open">
                <a href="#" className="nav-link active">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>
                    Admin Management
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <Link to={"/registeruser"} className="nav-link ">
                      <i className="far fa-circle nav-icon" />
                      <p>Registered User</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/subadmins"} className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Subadmins</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/cmspages"} className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>CmsPages</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/categories"} className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Categories</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/products"} className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Products</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/productsimage"} className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>ProductsImage</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/brands"} className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Brands</p>
                    </Link>
                </li>
                  <li className="nav-item">
                    <Link to={"/banners"} className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p>Banner</p>
                    </Link>
                </li>
                </ul>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside>
      {/* Content Wrapper. Contains page content */}
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-12">
                <h1 className="m-0 float-start">banners Table</h1>
                <Link  className="breadcrumb-item float-right" to={"/admindashboard1"}>
                    Home
                </Link>
                <br />
                
              </div>
              <form className='d-flex align-items-center justify-content-end'>
                <div className="input-group">
                  <input className="form-control mr-2" type="search" placeholder="Search using banner Name" aria-label="Search"   />
                  <div className="input-group-append">
                      <NotificationContainer />
                      <button className='btn btn-primary ' onClick={()=>BannersAddEdit()}>Add</button>
                      
                  </div>
                 </div>
            </form>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  
                 
                </ol>
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
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <table className="table table-bordered table-striped">
                      <thead>
                        <tr>
                          <th className="bg-dark text-light">Sl No.</th>
                          <th className="bg-dark text-light"> TYPE</th>
                          <th className="bg-dark text-light">IMAGE</th>
                          <th className="bg-dark text-light" style={{height:'20px' ,width:"20px"}}>LINK</th>
                          <th className="bg-dark text-light">ALT</th>
                          <th className="bg-dark text-light">SORT</th>
                          <th className="bg-dark text-light">STATUS</th>
                          <th className="bg-dark text-light">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                      {bannerData.map((item, index) => (
                        <tr key={index}>
                          <td>{index+1}</td>
                          <td>{item.type}</td>
                          
                          <td>
                                <Link to={`http://localhost:8081/bannerImage/`+  item.image} target="_blank" id='image-constrained'>
                                    <img src={`http://localhost:8081/bannerImage/` + item.image} width={50} height={50} alt="" />
                                </Link>
                          </td>
                          
                          <td><Link to={item.link} target='_blank'>{item.link}</Link> </td>
                          <td>{item.alt} </td>
                          <td>{item.sort} </td>
                          <td><span className={`badge badge-${item.status === 1 ? 'success' : 'danger'}`}>{item.status === 1 ? 'Active' : 'Inactive'}</span> </td>
                          <td>
                          <NotificationContainer />
                          <button className='btn btn-success btn-sm  mr-1'onClick={()=>BannersAddEdit(item.id)} ><i className='fas  fa-pencil-alt'></i></button>
                          <button className='btn btn-dark btn-sm  mr-1' onClick={()=>BannerStatusChange(item.id,item.status)}><i className={item.status === 1 ? 'fas fa-toggle-on' : 'fas fa-toggle-off'}></i></button>
                          <button className='btn btn-danger btn-sm ' onClick={()=>BannerDelete(item.id)}><i className='fas fa-trash'></i></button>
                          </td>
                        </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* /.content-wrapper */}
      <footer className="main-footer">
        <strong>
          Copyright © 2014-2021{" "}
          <a href="https://adminlte.io">AdminLTE.io</a>.
        </strong>
        All rights reserved.
        <div className="float-right d-none d-sm-inline-block">
          <b>Version</b> 3.2.0
        </div>
      </footer>
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

export default Banners