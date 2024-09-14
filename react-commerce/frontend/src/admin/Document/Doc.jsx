import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import { useForm } from 'react-hook-form';


const Doc = () => {
    const {register,handlesubmit,formState:{errors},setValue}=useForm()
    const [data,setData]=useState();
    useEffect(()=>{
        axios.get("http://localhost:8081/api/documentation").then(response=>{
            // console.log(response)
            setData(response.data)
        })
        .catch(err=>{
            console.error(err)
        })
        
    })

  
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
                <h1 className="m-0 float-start">Documentation </h1>
                <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                    <div className="col-sm-6"></div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item ">
                            <Link to={"/admindashboard1"}>Home</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to={"/categories"}>Back</Link>
                        </li>
                        </ol>
                    </div>
                    </div>
                </div>
                </section>
                <br />
            </div>

            {/* /.col */}
            <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right"></ol>
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
                <div className="card-header ">
                </div>
                <div className="card-body">
                    <form >
                        <textarea rows={34} cols={160} name='doc' value={data}>{data}</textarea>
                        <button type='submit' className='btn btn-success'>Update</button>
                    </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

   

     
    </div>

    {/* /.content-wrapper */}
    <Footer></Footer>
    </div>
    {/* ./wrapper */}
    </div>
    </div>
  )
}

export default Doc
