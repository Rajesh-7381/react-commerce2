import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto';
import {useFormik} from 'formik'
import * as Yup from 'yup'
import AreaChart from './Chart/AreaChart';
import BARChart from './Chart/BARChart';
import DOUNGHTChart from './Chart/DOUNGHTChart';
import LINEChart from './Chart/LINEChart';
import STACKEDChart from './Chart/STACKEDChart';
import PIEChart from './Chart/PIEChart';
import Header from './Component/Header';
import Footer from './Component/Footer';
import { CSVLink } from 'react-csv';
import { NotificationContainer, NotificationManager } from 'react-notifications';

const Dashboard1 = () => {
  const tableRef = useRef(null);
  const chartref = useRef(null); // this reference points to the <canvas> element in the DOM, which will be used as the rendering context for the chart.
  const chartinstance = useRef(null); //This reference stores the Chart.js instance, allowing for proper cleanup and management of the chart.
  const [usercount, setUserCount] = useState(0);
  const [admincount, setAdminCount] = useState(0);
  const [subadmincount, setSubadminCount] = useState(0);
  const [categoriescount, setcategoriesCount] = useState(0);
  const [allproductcount,setallproductcount]=useState(0);
  const [allbrandcount,setallbrandcount]=useState(0);
  // console.log(userData)
  const [pdate, setPdate] = useState('');
  const [registeruserdata2, setregisteruserdata] = useState(0);
  const [registeruserdata3, setregisteruserdata3] = useState(0);
  const [fromdate, setFromDate] = useState('');
  const [todate, setToDate] = useState('');
  const [selectedChart, setSelectedChart] = useState('pie');
  const [userDetails,setuserDetails]=useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get("http://localhost:8081/countuser");
        const adminResponse = await axios.get("http://localhost:8081/countadmin");
        const subadminResponse = await axios.get("http://localhost:8081/countsubadmin");
        const uniquecategoriesResponse =await axios.get("http://localhost:8081/uniquecategories");
        const productcountResponse=await axios.get("http://localhost:8081/allproductcount");
        const BrandcountResponse=await axios.get("http://localhost:8081/AllBrandCount");
        setUserCount(userResponse.data.count);
        setAdminCount(adminResponse.data.Admincount);
        setSubadminCount(subadminResponse.data.subaAdmincount);
        setcategoriesCount(uniquecategoriesResponse.data.catcount)
        setallproductcount(productcountResponse.data.productcount);
        setallbrandcount(BrandcountResponse.data.Brandcount);
        // Cookies.get("id",id);
      } catch (error) {
        console.error("Error fetching count data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(()=>{
    if(chartinstance.current){ //check if chartinstance exists
      chartinstance.current.destroy(); //if exist destroyed before creating new one 
    }
    const mychartref=chartref.current.getContext('2d'); //2d drawing context

    chartinstance.current=new Chart(mychartref,{ //This creates a new Chart.js instance with the specified type ("pie") and data.
      type:"pie",
      data:{
        labels: ['Admin', 'SubAdmin', 'User','Categories','Products','Brands'],
        datasets:[
          {
            label: '',
            data: [admincount , subadmincount, usercount,categoriescount,allproductcount,allbrandcount],
            backgroundColor: [
              'rgb(255, 205, 86)',
              'rgb(0,255,255)',
              'rgb(0,0,255)',
              'rgb(255,0,0)',
              'rgb(147,112,219)',
              'rgb(0,128,128)',
              
            ],
            
            hoverOffset: 4 //Defines the offset for slices on hover.
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
    // alert(pdate)
    try {
      const response = await axios.get(`http://localhost:8081/registerUserParticularDate/${pdate}`);
      // console.log(response.data);
      setregisteruserdata(response.data.count);
      setuserDetails(response.data.data)
      console.log(userDetails)
    } catch (error) {
      console.error(error);
    }
  }
  // to convert array of data
  const isArrayData=Array.isArray(userDetails)

  const UserQuery2 = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/registerUserfromrDateTotodate/${fromdate}/${todate}`);
      setregisteruserdata3(response.data.count);
    } catch (error) {
      console.error(error);
    }
  }
  

  // for chart
  const handleChartChange = (e) => {
    setSelectedChart(e.target.value);
  };
  
  // download csv file
  const headers=[
    {label:'Name',key:'name'},
    {label:'Email',key:'email'},
    {label:'Mobile',key:'mobile'},
  ]

  // exist or not
  const initialValues={
    unique_id:""
  }
  const validationSchema=Yup.object({
    unique_id:Yup.string().required("Please Enter Unique Id")
  })
  const onSubmitForm=async(values)=>{
   
    try {
      const { unique_id }=values;
      console.log(unique_id)
      const UniqueIdResponse=await axios.get(`http://localhost:8081/UniqueID/${unique_id}`)
      // console.log(UniqueIdResponse)
      if(UniqueIdResponse.data.UniqueIdExists){
        NotificationManager.success("yes")
      }else{
        NotificationManager.error("Provided Unique ID Not Exists!")
      }
    } catch (error) {
      
    }
  }

  const formik=useFormik({
    initialValues:initialValues,
    validationSchema:validationSchema,
    onSubmit:onSubmitForm
  })

  return (
    
    <div>
    
   <div className="wrapper">
  {/* Preloader */}
  <div className="preloader flex-column justify-content-center align-items-center">
    <img className="animation__shake" src="dist/img/AdminLTELogo.png" alt="AdminLTELogo" height={60} width={60} />
  </div>
  {/* Navbar */}
  <Header></Header>
  {/* Content Wrapper. Contains page content */}
  <div className="content-wrapper">
    {/* Content Header (Page header) */}
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0 float-left">Dashboard</h1>
            
          </div>{/* /.col */}
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <Link className="breadcrumb-item" to={"/admindashboard1"} style={{textDecoration:"none"}}>Home</Link>
              <li className="breadcrumb-item active ">Dashboard v1</li>
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
              <Link to={"/registeruser"} className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
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
                <h3>{allbrandcount}</h3>
                <p>Unique Brands</p>
              </div>
              <div className="icon">
                <i className="ion ion-stats-bars" />
              </div>
              <Link to={"/brands"} className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></Link>
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
                        {
                          registeruserdata2 && (
                            <div>
                              <a data-toggle="modal" href="#myModal" className="btn btn-dark mt-2 mx-2">View</a>
                              <div className="modal" id="myModal">
                                <div className="modal-dialog modal-dialog-centered modal-lg">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h4 className="modal-title " >Register User Details on <u>{pdate}</u></h4>
                                      <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                    </div>
                                    <div className="modal-body">
                                    <table className='table table-bordered table-striped' ref={tableRef}>
                                    <tr>
                                      <th className='bg-dark'>SL NO</th>
                                      <th className='bg-dark'>UNIQUE ID</th>
                                      <th className='bg-dark'>Name</th>
                                      <th className='bg-dark'>EMAIL</th>
                                      
                                    </tr>
                                    <tbody>
                                      {isArrayData ? (
                                        userDetails.map((user,index)=>(
                                          <tr key={index}>
                                            <td>{index+1}</td>
                                            <td>{user.UUID}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            
                                          </tr>
                                        ))
                                      ):(
                                        <tr>
                                            <td>{userDetails.id}</td>
                                            <td>{userDetails.name}</td>
                                            <td>{userDetails.email}</td>
                                            <td>{userDetails.mobile}</td>
                                          </tr>
                                      )}
                                    </tbody>
                                    </table>
                                    <CSVLink data={userDetails} headers={headers} filename="Static_Users.csv" target='_blank' >
                                      <button className='btn btn-success mx-2' ><i class="fa-solid fa-download"></i>   DownLoad</button>
                                    </CSVLink>
                                    <a data-toggle="modal" href="#myModal2" title='Are You want to modify User Data'  className="btn btn-primary">Click Me!</a>
                                    <br />
                                    <br />
                                      {/* progress bar*/}
                                      
                                    </div>
                                    <div className="modal-footer">
                                      <a href="#" data-dismiss="modal" className="btn btn-dark">Close</a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="modal" id="myModal2" data-backdrop="static">
                                <div className="modal-dialog modal-dialog-centered">
                                  <div className="modal-content">
                                    <div className="modal-header">
                                      <h4 className="modal-title">Exist or Not</h4>
                                      <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                                    </div>
                                    <form onSubmit={formik.handleSubmit}>
                                      <div className="modal-body">
                                      <div className='form-group text-start'>
                                          <label htmlFor="unique_id" className='form-label'>UNIQUE ID:</label>
                                          <input type="text" className='form-control' name='unique_id' id='unique_id' value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d' style={{background:"transparent", border:"none", borderBottom:"1px solid #000000", outline:"none", boxShadow:"none"}} autoFocus/>
                                          {formik.touched.name && formik.errors.name ? (
                                            <div className='text-danger'>{formik.errors.unique_id}</div>
                                          ):null}
                                      </div>
                                    </div>
                                    <div className="modal-footer">
                                    <NotificationContainer />
                                      <button href="#" data-dismiss="modal" className="btn btn-danger">Close</button>
                                      <button type='submit' data-toggle="modal" href="#myModal3" className="btn btn-primary">CHECK</button>
                                    </div>
                                    </form>
                                  </div>
                                </div>
                              </div>
                              
                            </div>
                          )
                        }
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
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Bar Chart</h3>
                    </div>
                       <div className='card-body'>
                                         
                       </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">All Chart</h3>
                      <div>
                      <label htmlFor="">Choose One</label>
                        <select name="" id="" className='form-control' onChange={handleChartChange}>
                          <option value="pie" selected>PIE CHART</option>
                          <option value="bar">BAR CHART</option>
                          <option value="area">AREA CHART</option>
                          <option value="line">REACT LINE CHART</option>
                          <option value="donut">DOUNT CHART</option>
                          <option value="stack">STACKED CHART</option>
                          
                        </select>
                        {/* 
                          
                        <canvas ref={dountchartref}></canvas>

                        */}
                        {selectedChart === 'pie' && <PIEChart />}
                        {selectedChart === 'area' && <AreaChart />}
                        {selectedChart === 'bar' && <BARChart />}
                        {selectedChart === 'donut' && <DOUNGHTChart />}
                        {selectedChart === 'line' && <LINEChart />}
                        {selectedChart === 'stack' && <STACKEDChart />}
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
  <Footer></Footer>
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
