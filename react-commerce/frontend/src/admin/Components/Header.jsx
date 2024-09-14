import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, NavLink } from 'react-router-dom'

const Header = () => {
    const navigate=useNavigate();
    const [userData, setUserData] = useState(null);
    const [CurrentPosition, setCurrentPosition] = useState(null);

    useEffect(() => {
      // Get the user's current location
          navigator.geolocation.getCurrentPosition(position => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          // Use LocationIQ API to reverse geocode the coordinates
          const apiUrl = `https://us1.locationiq.com/v1/reverse.php?key=pk.9af8fc17b5bd73b33cbdd1e279d0ac9d&lat=${lat}&lon=${lng}&format=json`;
            fetch(apiUrl)
            .then(response => response.json())
            .then(data => {      
              // console.log(data)      
              setCurrentPosition(data.address.city)
            });
        });
        document.title = 'Dashboard';
          // navigate("/"); 
          const id=sessionStorage.getItem("id");
          // console.log(id)
          if(id){
            fetchuserdata(id);
          }else{
            navigate("/")
          }   
        
      }, [ navigate]); 
      // const x=document.getElementById("position");
      
      const fetchuserdata=async(id)=>{
        try {
          const reponse=await axios.get(`http://localhost:8081/api/singledata/${id}`);
          setUserData(reponse.data.data);
          // console.log(reponse.data.data)
        } catch (error) {
          
        }
      }

    const handlelogout=()=>{
        sessionStorage.clear();
        navigate("/");
      }
  return (
    <div>
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
    {/* Left navbar links */}
    <ul className="navbar-nav">
      <li className="nav-item">
        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
      </li>
      <li className="nav-item d-none d-sm-inline-block">
        <Link to={"/admindashboard1"} className="nav-link">Home</Link>
      </li>
      <li className="nav-item d-none d-sm-inline-block">
        <button  onClick={handlelogout} className="nav-link">Logout</button>
      </li>
    </ul>
    {/* Right navbar links */}
    <ul className="navbar-nav ml-auto">
      {/* Navbar Search */}
      <li className="nav-item">
        <a className="nav-link" data-widget="navbar-search" href="#" role="button">
          <i className="fas fa-search" />
        </a>
        <div className="navbar-search-block">
          <form className="form-inline">
            <div className="input-group input-group-sm">
              <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
              <div className="input-group-append">
                <button className="btn btn-navbar" type="submit">
                  <i className="fas fa-search" />
                </button>
                <button className="btn btn-navbar" type="button" data-widget="navbar-search">
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
              <img src="dist/img/user1-128x128.jpg" alt="User Avatar" className="img-size-50 mr-3 img-circle" />
              <div className="media-body">
                <h3 className="dropdown-item-title">
                  Brad Diesel
                  <span className="float-right text-sm text-danger"><i className="fas fa-star" /></span>
                </h3>
                <p className="text-sm">Call me whenever you can...</p>
                <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
              </div>
            </div>
            {/* Message End */}
          </a>
          <div className="dropdown-divider" />
          <a href="#" className="dropdown-item">
            {/* Message Start */}
            <div className="media">
              <img src="dist/img/user8-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />
              <div className="media-body">
                <h3 className="dropdown-item-title">
                  John Pierce
                  <span className="float-right text-sm text-muted"><i className="fas fa-star" /></span>
                </h3>
                <p className="text-sm">I got your message bro</p>
                <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
              </div>
            </div>
            {/* Message End */}
          </a>
          <div className="dropdown-divider" />
          <a href="#" className="dropdown-item">
            {/* Message Start */}
            <div className="media">
              <img src="dist/img/user3-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />
              <div className="media-body">
                <h3 className="dropdown-item-title">
                  Nora Silvester
                  <span className="float-right text-sm text-warning"><i className="fas fa-star" /></span>
                </h3>
                <p className="text-sm">The subject goes here</p>
                <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
              </div>
            </div>
            {/* Message End */}
          </a>
          <div className="dropdown-divider" />
          <a href="#" className="dropdown-item dropdown-footer">See All Messages</a>
        </div>
      </li>
      {/* Notifications Dropdown Menu */}
      <li className="nav-item dropdown">
        <a className="nav-link" data-toggle="dropdown" href="#">
          <i className="far fa-bell" />
          <span className="badge badge-warning navbar-badge">15</span>
        </a>
        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <span className="dropdown-item dropdown-header">15 Notifications</span>
          <div className="dropdown-divider" />
          <a href="#" className="dropdown-item">
            <i className="fas fa-envelope mr-2" /> 4 new messages
            <span className="float-right text-muted text-sm">3 mins</span>
          </a>
          <div className="dropdown-divider" />
          <a href="#" className="dropdown-item">
            <i className="fas fa-users mr-2" /> 8 friend requests
            <span className="float-right text-muted text-sm">12 hours</span>
          </a>
          <div className="dropdown-divider" />
          <a href="#" className="dropdown-item">
            <i className="fas fa-file mr-2" /> 3 new reports
            <span className="float-right text-muted text-sm">2 days</span>
          </a>
          <div className="dropdown-divider" />
          <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
        </div>
      </li>
      <li className="nav-item">
        <a className="nav-link" data-widget="fullscreen" href="#" role="button">
          <i className="fas fa-expand-arrows-alt" />
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" data-widget="control-sidebar" data-controlsidebar-slide="true" href="#" role="button">
          <i className="fas fa-th-large" />
        </a>
      </li>
    </ul>
  </nav>
  {/* /.navbar */}
  {/* Main Sidebar Container */}
  
  <aside className="main-sidebar sidebar-dark-primary elevation-4">
    {/* Brand Logo */}
    <Link to={"/admindashboard1"} className="brand-link">
      <img src={"./pngtree-e-letter-logo-ecommerce-shop-store-design-png-image_4381099 (1).png"} alt="AdminLTE Logo" className="brand-image img-circle elevation-3 rounded-circle" style={{opacity: '.8'}}  />
      <span className="brand-text font-weight-light">e-Com</span>
      <p id='position' className='text-danger'>{CurrentPosition}</p>
    </Link>
    {/* Sidebar */}
    <div className="sidebar">
      {/* Sidebar user panel (optional) */}
      <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
        <img src={`http://localhost:8081/api/profile/${userData && userData.image}`} className="img-circle elevation-2" alt={userData && userData.name} />
        </div>
        <div className='text-light '>{userData && userData.name}</div>
        <div className="info">
        
          <a href="#" className="d-block"></a>
        </div>
      </div>
      {/* SidebarSearch Form */}
      <div className="form-inline">
        <div className="input-group" data-widget="sidebar-search">
          <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
          <div className="input-group-append">
            <button className="btn btn-sidebar">
              <i className="fas fa-search fa-fw" />
            </button>
          </div>
        </div>
      </div>
      {/* Sidebar Menu */}
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
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
                <NavLink to={"/registeruser"} className={({isActive})=>isActive ? "nav-link active":"nav-link"}>
                  <i className="far fa-circle nav-icon" />
                  <p>Registered User</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/subadmins"} className={({isActive})=>isActive ? "nav-link active" :"nav-link"}>
                  <i className="far fa-circle nav-icon" />
                  <p>Subadmins</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/cmspages"} className={({isActive})=>isActive ? "nav-link active" :"nav-link"}>
                  <i className="far fa-circle nav-icon" />
                  <p>CmsPages</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/categories"} className={({isActive})=>isActive ? "nav-link active" :"nav-link"}>
                  <i className="far fa-circle nav-icon" />
                  <p>Categories</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/products"} className={({isActive})=>isActive ? "nav-link active" :"nav-link"}>
                  <i className="far fa-circle nav-icon" />
                  <p>Products</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/productsimage"} className={({isActive})=>isActive ? "nav-link active" :"nav-link"}>
                  <i className="far fa-circle nav-icon" />
                  <p>ProductsImage</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/brands"} className={({isActive})=>isActive ? "nav-link active" :"nav-link"}>
                  <i className="far fa-circle nav-icon" />
                  <p>Brands</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/banners"} className={({isActive})=>isActive ? "nav-link active" :"nav-link"}>
                  <i className="far fa-circle nav-icon" />
                  <p>Banners</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/documents"} className={({isActive})=>isActive ? "nav-link active" :"nav-link"}>
                  <i className="far fa-circle nav-icon" />
                  <p>Documentation</p>
                </NavLink>
              </li>
              
            </ul>
          </li>
          
        </ul>
      </nav>
      {/* /.sidebar-menu */}
    </div>
    {/* /.sidebar */}
  </aside>
    </div>
  )
}

export default Header