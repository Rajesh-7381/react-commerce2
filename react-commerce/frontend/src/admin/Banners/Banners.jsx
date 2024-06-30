import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NotificationContainer } from 'react-notifications'
import { Link, useNavigate } from 'react-router-dom'
import { DeleteEntity } from '../CRUDENTITY/DeleteEntity';
import { StatusEntity } from '../CRUDENTITY/StatusEntity';
import Header from '../Component/Header';
import Footer from '../Component/Footer';

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
     <Header></Header>
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

export default Banners