import axios from "axios";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { NotificationContainer } from "react-notifications";
import { Link, useNavigate } from "react-router-dom";
import { DeleteEntity } from "../CRUDENTITY/DeleteEntity";
import { StatusEntity } from "../CRUDENTITY/StatusEntity";
import Header from "../Component/Header";
import Footer from "../Component/Footer";
import Delay from 'react-delay'
import { SpinnerCircular } from 'spinners-react';
const BrandTable=lazy(()=>import("./BrandTable"))


const Brands = () => {
    
  
  
  
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
                      <input className="form-control mr-2" type="search" placeholder="Search using Brand Name" aria-label="Search"  />
                      <div className="input-group-append">
                          <NotificationContainer />
                          <button className='btn btn-primary ' >Add</button>
                          
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
                        <Suspense fallback={<SpinnerCircular thickness={180} speed={169} size={39}  color="rgba(57, 162, 172, 1)" secondaryColor='rgba(172, 57, 59, 0.86)' />} >
                          <Delay wait={3000}>
                            <BrandTable />
                          </Delay>
                        </Suspense>

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
