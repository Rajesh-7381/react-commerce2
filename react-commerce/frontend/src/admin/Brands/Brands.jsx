import axios from "axios";
import React, { useEffect, useState } from "react";
import { NotificationContainer } from "react-notifications";
import { Link, useNavigate } from "react-router-dom";
import { DeleteEntity } from "../CRUDENTITY/DeleteEntity";
import { StatusEntity } from "../CRUDENTITY/StatusEntity";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
const Brands = () => {
    const navigate=useNavigate();
    const [brandData,setbrandData]=useState([]);
    
    useEffect(()=>{
      document.title="Brands";
        GETALLBRANDS();
    },[]);

    const GETALLBRANDS=async()=>{
        try {
            const response=await axios.get("http://localhost:8081/getAllBrands");
            setbrandData(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    // edit brands
    const BrandsAddEdit=async(id)=>{
        // alert(id)
        navigate("/addeditbrands",{state :{id:id}});
    }

    const DeleteBrand=async(id)=>{
      // alert(id)
            const data=await DeleteEntity('Brand',id);
            // Fetch the updated data from the server and update the local state
            const response = await axios.get("http://localhost:8081/getAllBrands");
            setbrandData(response.data);
    }
    // for status change
    const BrandStatusChange = async (id, status) => {
     await StatusEntity('BrandStatus',id,status,setbrandData,brandData)
  }
  
  const searchfunction = (event) => {
    const searchdata = event.target.value.toLowerCase().trim();
    if (searchdata === "") {
      setbrandData(brandData);
    } else {
      const filteredData = brandData.filter(item =>
        item && item.brand_name && item.brand_name.toLowerCase().includes(searchdata)
      );
      setbrandData(filteredData);
    }
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
          {/* Content Wrapper. Contains page content */}
          <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <div className="content-header">
              <div className="container-fluid">
                <div className="row mb-2">
                  <div className="col-sm-12">
                    <h1 className="m-0 float-start">Brands Table</h1>
                    <Link  className="breadcrumb-item float-right" to={"/admindashboard1"}>
                        Home
                    </Link>
                    <br />
                    
                  </div>
                  <form className='d-flex align-items-center justify-content-end'>
                    <div className="input-group">
                      <input className="form-control mr-2" type="search" placeholder="Search using Brand Name" aria-label="Search" onClick={searchfunction}  />
                      <div className="input-group-append">
                          <NotificationContainer />
                          <button className='btn btn-primary ' onClick={()=>BrandsAddEdit()}>Add</button>
                          
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
                              <th className="bg-dark text-light"> NAME</th>
                              <th className="bg-dark text-light">IMAGE</th>
                              <th className="bg-dark text-light">LOGO</th>
                              <th className="bg-dark text-light">DISCOUNT</th>
                              <th className="bg-dark text-light">URL</th>
                              <th className="bg-dark text-light">STATUS</th>
                              <th className="bg-dark text-light">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                          {brandData.map((item, index) => (
                            <tr key={index}>
                              <td>{index+1}</td>
                              <td>{item.brand_name}  </td>
                              <td>
                                    <Link to={`http://localhost:8081/brandimage/`+  item.brand_image} target="_blank" id='image-constrained'>
                                        <img src={`http://localhost:8081/brandimage/` + item.brand_image} width={50} height={50} alt="" />
                                    </Link>
                              </td>
                              <td>
                                  <Link to={`http://localhost:8081/brandlogo/`+  item.brand_logo} target="_blank" id='image-constrained'>
                                      <img src={`http://localhost:8081/brandlogo/` + item.brand_logo} width={50} height={50} alt="" />
                                  </Link>
                              </td>
                              <td>{item.brand_discount} </td>
                              <td><Link to={item.url}>{item.url} </Link></td>
                              <td><span className={`badge badge-${item.status === 1 ? 'success' : 'danger'}`}>{item.status === 1 ? 'Active' : 'Inactive'}</span> </td>
                              <td>
                              <NotificationContainer />
                              <button className='btn btn-success btn-sm  mr-1' onClick={()=>BrandsAddEdit(item.id)}><i className='fas  fa-pencil-alt'></i></button>
                              <button className='btn btn-dark btn-sm  mr-1' onClick={()=>BrandStatusChange(item.id,item.status)}><i className={item.status === 1 ? 'fas fa-toggle-on' : 'fas fa-toggle-off'}></i></button>
                              <button className='btn btn-danger btn-sm ' onClick={()=>DeleteBrand(item.id)}><i className='fas fa-trash'></i></button>
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
  );
};

export default Brands;
