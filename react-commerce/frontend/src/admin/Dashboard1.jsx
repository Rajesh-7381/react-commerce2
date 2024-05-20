import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Link, useHistory, useNavigate } from 'react-router-dom';
import Chart from 'chart.js/auto';
import { Label } from 'reactstrap';
import Cookies from 'js-cookie';



const Dashboard1 = () => {
 
  const chartref = useRef(null);
  const chartinstance = useRef(null);
  const navigate = useNavigate();
  const [usercount, setUserCount] = useState(0);
  const [admincount, setAdminCount] = useState(0);
  const [subadmincount, setSubadminCount] = useState(0);
  const [categoriescount, setcategoriesCount] = useState(0);
  const [allproductcount,setallproductcount]=useState(0);
  const [userData, setUserData] = useState(null);
  const [pdate, setPdate] = useState('');
  const [registeruserdata2, setregisteruserdata] = useState(0);
  const [registeruserdata3, setregisteruserdata3] = useState(0);
  const [fromdate, setFromDate] = useState('');
  const [todate, setToDate] = useState('');

  useEffect(() => {
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
  const fetchuserdata=async(id)=>{
    try {
      const reponse=await axios.get(`http://localhost:8081/singledata/${id}`);
      setUserData(reponse.data.data);
      // console.log(reponse.data.data)
    } catch (error) {
      
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get("http://localhost:8081/countuser");
        const adminResponse = await axios.get("http://localhost:8081/countadmin");
        const subadminResponse = await axios.get("http://localhost:8081/countsubadmin");
        const uniquecategoriesResponse =await axios.get("http://localhost:8081/uniquecategories");
        const productcountResponse=await axios.get("http://localhost:8081/allproductcount");
        setUserCount(userResponse.data.count);
        setAdminCount(adminResponse.data.Admincount);
        setSubadminCount(subadminResponse.data.subaAdmincount);
        setcategoriesCount(uniquecategoriesResponse.data.catcount)
        setallproductcount(productcountResponse.data.productcount);
        // Cookies.get("id",id);
      } catch (error) {
        console.error("Error fetching count data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(()=>{
    if(chartinstance.current){
      chartinstance.current.destroy();
    }
    const mychartref=chartref.current.getContext('2d');

    chartinstance.current=new Chart(mychartref,{
      type:"pie",
      data:{
        labels: ['Admin', 'SubAdmin', 'User','Categories','Products'],
        datasets:[
          {
            label: '',
            data: [admincount , subadmincount, usercount,categoriescount,allproductcount],
            backgroundColor: [
              'rgb(255, 205, 86)',
              'rgb(0,255,255)',
              'rgb(0,0,255)',
              'rgb(255,0,0)',
              'rgb(147,112,219)',
              
            ],
            
            hoverOffset: 4
          }
        ]
      }
    })
    return ()=>{
      if(chartinstance.current){
        chartinstance.current.destroy()
      }
    }
  })

  const UserQuery = async (pdate) => {
    try {
      const response = await axios.get(`http://localhost:8081/registerUserParticularDate/${pdate}`);
      // console.log(response.data);
      setregisteruserdata(response.data.count);
    } catch (error) {
      console.error(error);
    }
  }
  const UserQuery2 = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/registerUserfromrDateTotodate/${fromdate}/${todate}`);
      setregisteruserdata3(response.data.count);
    } catch (error) {
      console.error(error);
    }
  }
  
  // for logout
  const handlelogout=()=>{
    sessionStorage.clear();
    navigate("/");
  }
  
  return (
    
    <div>
    
   <div className="wrapper">
  {/* Preloader */}
  <div className="preloader flex-column justify-content-center align-items-center">
    <img className="animation__shake" src="dist/img/AdminLTELogo.png" alt="AdminLTELogo" height={60} width={60} />
  </div>
  {/* Navbar */}
  <nav className="main-header navbar navbar-expand navbar-white navbar-light">
    {/* Left navbar links */}
    <ul className="navbar-nav">
      <li className="nav-item">
        <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars" /></a>
      </li>
      <li className="nav-item d-none d-sm-inline-block">
        <a href="index3.html" className="nav-link">Home</a>
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
      <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
      <span className="brand-text font-weight-light">AdminLTE 3</span>
    </Link>
    {/* Sidebar */}
    <div className="sidebar">
      {/* Sidebar user panel (optional) */}
      <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
        <img src={userData && userData.image} className="img-circle elevation-2" alt={userData && userData.name} />
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
          <div className="col-sm-6">
            <h1 className="m-0">Dashboard</h1>
            
          </div>{/* /.col */}
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <Link className="breadcrumb-item" to={"/admindashboard1"}>Home</Link>
              <li className="breadcrumb-item active">Dashboard v1</li>
            </ol>
          </div>{/* /.col */}
        </div>{/* /.row */}
      </div>{/* /.container-fluid */}
    </div>
    {/* /.content-header */}
    {/* Main content */}
    <section className="content">
      <div className="container-fluid">
        {/* Small boxes (Stat box) */}
        <div className="row">
          <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-warning">
              <div className="inner">
                <h3>{admincount}</h3>
                <p>Admin Registrations</p>
                 
              </div>
              <div className="icon">
                <i className="ion ion-person-add " />
              </div>
              <Link to={"/registeruser"} className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
            </div>
          </div>
          {/* ./col */}
          <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-info">
              <div className="inner">
                <h3>{subadmincount}</h3>
                <p>Subadmin Registrations</p>
              </div>
              <div className="icon">
                <i className="ion ion-person-add" />
              </div>
              <Link to={"/subadmins"} className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
            </div>
          </div>
          {/* ./col */}
          <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-primary">
              <div className="inner">
                <h3>{usercount}</h3>
                <p>User Registrations</p>
              </div>
              <div className="icon">
                <i className="ion ion-person-add" />
              </div>
              <Link href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
            </div>
          </div>
          {/* ./col */}
          <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-danger">
              <div className="inner">
                <h3>{categoriescount}</h3>
                <p>Unique Categories</p>
              </div>
              <div className="icon">
                <i className="fas fa-shopping-cart" />
              </div>
              <Link to={"/categories"} className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
            </div>
          </div>
          {/* ./col */}
        </div>
        <div className="row">
          <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box" style={{backgroundColor:"mediumpurple"}}>
              <div className="inner">
                <h3>{allproductcount}</h3>
                <p>All Products</p>
                 
              </div>
              <div className="icon">
                <i className="ion ion-bag" />
              </div>
              <a href="#" className="small-box-footer"><span style={{color:"black"}}>More info <i className="fas fa-arrow-circle-right" /></span> </a>
            </div>
          </div>
          {/* ./col */}
          <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box" style={{backgroundColor:"teal"}}>
              <div className="inner">
                <h3>53<sup style={{fontSize: 20}}>%</sup></h3>
                <p>Bounce Rate</p>
              </div>
              <div className="icon">
                <i className="ion ion-stats-bars" />
              </div>
              <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
            </div>
          </div>
          {/* ./col */}
          <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-success">
              <div className="inner">
                <h3>45</h3>
                <p>User Registrations</p>
              </div>
              <div className="icon">
                <i className="ion ion-person-add" />
              </div>
              <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
            </div>
          </div>
          {/* ./col */}
          <div className="col-lg-3 col-6">
            {/* small box */}
            <div className="small-box bg-secondary" >
              <div className="inner">
                <h3>65</h3>
                <p>Unique Visitors</p>
              </div>
              <div className="icon">
                <i className="ion ion-pie-graph" />
              </div>
              <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
            </div>
          </div>
          {/* ./col */}
        </div>
        {/* /.row */}
        {/* Main row */}
        
      </div>{/* /.container-fluid */}
    </section>
    {/* /.content */}

    <section className="content">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Pie Chart</h3>
                    </div>
                    <div className="card-body">
                      <canvas ref={chartref} style={{ width: "100%", height: "300px" }} />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Search</h3>
                    </div>
                    <div className="card-body">
                      <div className="form-group">
                        <label htmlFor="pdate">Search by date:</label>
                        <input type="date" className="form-control" id="pdate" value={pdate} onChange={(e) => setPdate(e.target.value)} />
                        <button className="btn btn-primary mt-2" onClick={() => UserQuery(pdate)}>Search</button>
                        <p><span className="bg-warning">{registeruserdata2}</span> User(s) registered on <span className="bg-warning">{pdate}</span></p>
                      </div>
                      <hr />
                      <hr />
                      <hr />  
                      <div className="form-group">
                        <label htmlFor="fromdate">Search by date range:</label>
                        <div className="d-flex">
                          <input type="date" className="form-control mr-2" id="fromdate" value={fromdate} onChange={(e) => setFromDate(e.target.value)} />
                          <input type="date" className="form-control" id="todate" value={todate} onChange={(e) => setToDate(e.target.value)} />
                        </div>
                        <button className="btn btn-primary mt-2" onClick={UserQuery2}>Search</button>
                        <p><span className="bg-warning">{registeruserdata3}</span> User(s) registered from <span className="bg-warning">{fromdate}</span> to <span className="bg-warning">{todate}</span></p>
                      </div>
                      <hr />
                      <hr />
                      <hr />
                      <div className="form-group">
                        <label htmlFor="fromdate">Search by date range:</label>
                        <div className="d-flex">
                          <input type="date" className="form-control mr-2" id="fromdate" value={fromdate} onChange={(e) => setFromDate(e.target.value)} />
                          <input type="date" className="form-control" id="todate" value={todate} onChange={(e) => setToDate(e.target.value)} />
                        </div>
                        <button className="btn btn-primary mt-2" onClick={UserQuery2}>Search</button>
                        <p><span className="bg-warning">{registeruserdata3}</span> User(s) registered from <span className="bg-warning">{fromdate}</span> to <span className="bg-warning">{todate}</span></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="learn-bg pt-md-5">
          
            <div className="container-fluid">
              <div className="row pt-md-5">
                <div className="container text-center mt-5">
                  <div className="learn-text font-fam-bold">Learn From <span className="teacher">The Best</span></div>
                  <div className="learn-text-sm font-fam-medium pt-3">Explore the concepts with India’s most experienced
                    Teachers!</div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="container text-center pt-5">
                  <h2 className="learn-text font-fam-bold ">Why <span className="why-phy">These Store?</span></h2>
                  <div className="learn-text-sm font-fam-medium mt-4">Your One Stop Destination For Success</div>
                </div>
              </div>
              <div className="container py-5">
                <div className="row ">
                  <div className="col-lg-3 col-sm-12 col-md-3  justify-content-center"><img className="img-fluid" alt="img11" src="https://www.pw.live/version14/assets/img/group-20356.svg" /></div>
                  <div className="col-lg-9 col-sm-12 col-md-9">
                    <div className="d-flex flex-column">
                      <div className="why-inner-head font-fam-bold px-4">Scheduled Lectures</div>
                      <div className="why-inner-text font-fam-regular px-4">Learning is an important step for achieving dreams in a
                        student’s journey. We encourage the student to explore the concept in depth
                        instead
                        of memorizing. The live lectures help us in learning the needs of the students
                        and
                        motivates the students to be creative and be passionate learners.</div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-12 text-center">
                  <div className="col-lg-12 col-sm-12 col-md-12  justify-content-center"><img className="img-fluid" alt="img18" src="https://www.pw.live/version14/assets/img/group-20364.svg" /></div>
                </div>
                <div className="row">
                  <div className="col-12 col-md-12 d-flex justify-content-center d-md-none"><img className="img-fluid" alt="img11" src="https://www.pw.live/version14/assets/img/group-20360.svg" width={220} height={220} /></div>
                  <div className="col-12 col-md-9">
                    <div className="d-flex flex-column">
                      <div className="why-inner-head font-fam-bold px-4"> Doubt Solving Sessions</div>
                      <div className="why-inner-text font-fam-regular px-4">Our tutorial always encourage students to ask
                        questions. We have created an atmosphere where students don’t hesitate to ask
                        their doubts. We firmly believe in More you ask, the more you learn.</div>
                    </div>
                  </div>
                  <div className="col-12 col-md-3 d-flex justify-content-center d-md-block d-none"><img className="img-fluid" alt="img11" src="https://www.pw.live/version14/assets/img/group-20360.svg" width={220} height={220} /></div>
                </div>
                <div className="col-12 col-md-12 text-center">
                  <span className="d-md-block d-none"><img className="img-fluid" alt="img18" src="https://www.pw.live/version14/assets/img/group-20365.svg" /></span>
                  <span className="d-md-none"><img className="img-fluid" alt="img18" src="https://www.pw.live/version14/assets/img/mgroup20368.svg" /></span>
                </div>
                <div className="row">
                  <div className="col-12 col-md-3 d-flex justify-content-center"><img className="img-fluid" alt="img11" src="https://www.pw.live/version14/assets/img/group-20358.svg" /></div>
                  <div className="col-12 col-md-9">
                    <div className="d-flex flex-column">
                      <div className="why-inner-head font-fam-bold px-4">Structured And Targeted Study Material</div>
                      <div className="why-inner-text font-fam-regular px-4">Explore the art of concept with our structured material
                        with intelligent question tackling and problem solving skills.</div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-12 text-center">
                  <span className="d-md-block d-none"><img className="img-fluid" alt="img18" src="https://www.pw.live/version14/assets/img/group-20364.svg" /></span>
                  <span className="d-md-none"><img className="img-fluid" alt="img18" src="https://www.pw.live/version14/assets/img/mgroup20364.svg" /></span>
                </div>
                <div className="row">
                  <div className="col-12 col-md-3 d-flex justify-content-center d-md-none"><img className="img-fluid" alt="img11" src="https://www.pw.live/version14/assets/img/group-20359.svg" /></div>
                  <div className="col-12 col-md-9">
                    <div className="d-flex flex-column">
                      <div className="why-inner-head font-fam-bold px-4">Tests On Regular Basis For Progress Tracking</div>
                      <div className="why-inner-text font-fam-regular px-4">It is a set of test papers designed to make the student
                        comfortable with all possible varieties of questions along with the various ways
                        in which the same question can be put in order to make the student sweat in the
                        exam hall.The problems involve multi-dimensional thinking at a time.</div>
                    </div>
                  </div>
                  <div className="col-12 col-md-3 d-flex justify-content-center"><img className="img-fluid d-md-block d-none" alt="img11" src="https://www.pw.live/version14/assets/img/group-20359.svg" />
                  </div>
                </div>
              </div>
            </div>
          </section>

           

  </div>
  

  {/* /.content-wrapper */}
  <footer className="main-footer">
    <strong>Copyright © 2014-2021 <a href="https://adminlte.io">AdminLTE.io</a>.</strong>
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
  )
}

export default Dashboard1
