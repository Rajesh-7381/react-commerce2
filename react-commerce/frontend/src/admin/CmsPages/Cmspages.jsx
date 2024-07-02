import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DeleteEntity } from '../CRUDENTITY/DeleteEntity';
import { StatusEntity } from '../CRUDENTITY/StatusEntity';
import Footer from '../Component/Footer';
import Header from '../Component/Header';


const Cmspages = () => {
    const navigate=useNavigate();
    const [cmspagedata,setcmspagedata]=useState([]);
    const [filterdata,setfilterdata]=useState([]);
    useEffect(()=>{
        document.title='CmsPages';
        cmspagetabledata();
    },[]);

    const cmspagetabledata=async()=>{
        const response=await axios.get("http://localhost:8081/getAllCmss");
        setcmspagedata(response.data);
        setfilterdata(response.data);
    }
    
    const searchfunction=(event)=>{
        const search_cms_pagedata=event.target.value.toLowerCase().trim();
        // alert(search_cms_pagedata)
       if(search_cms_pagedata === ''){
        setfilterdata(filterdata);
       }else{
        const filtered=cmspagedata.filter(item=>(
            item.title.toLowerCase().includes(search_cms_pagedata) ||  
            item.description.toLowerCase().includes(search_cms_pagedata) ||  
            item.url.toLowerCase().includes(search_cms_pagedata) ||  
            item.meta_title.toLowerCase().includes(search_cms_pagedata) ||  
            item.meta_keywords.toLowerCase().includes(search_cms_pagedata) ||  
            item.meta_description.toLowerCase().includes(search_cms_pagedata)  
         ))
         setfilterdata(filtered)
       }
    }

    // edit
    const handladdeditcmspage=async(id)=>{
        // alert(id)
        navigate("/cmspageaddedit",{state:{id:id}});
    }
    // delete
    const handlecmspagedelete=async(id)=>{
        await DeleteEntity('Cms',id);
        // Fetch the updated data from the server and update the local state
        const response = await axios.get("http://localhost:8081/getAllCmss");
        setcmspagedata(response.data);
        setfilterdata(response.data);
           
    }
    // status change
    const handlecmspagetoggle=async(id,status)=>{
        await StatusEntity('CmsStatus',id,status,setfilterdata,filterdata);        
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
                <h1 className="m-0 float-start">CMS Page Table</h1>
                <section className="content-header">
                                <div className="container-fluid">
                                    <div className="row mb-2">
                                        <div className="col-sm-6"></div>
                                        <div className="col-sm-6">
                                            <ol className="breadcrumb float-sm-right">
                                                <li className="breadcrumb-item "><Link to={"/admindashboard1"}>Home</Link></li>
                                                <li className="breadcrumb-item"><Link to={"/categories"}>Back</Link></li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </section>
                <br />
                
              </div>
             
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
                <div className="col-12">
                    <div className="card">
                        
                        <div className="card-body">
                            
                            <form className='d-flex align-items-center justify-content-end'>
                                <div className="input-group">
                                    <input className="form-control mr-2" type="search" placeholder="Search using name, url, title etc..." aria-label="Search" onKeyUp={searchfunction} />
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-success mr-2" type="button">Search</button>
                                        <button className='btn btn-primary ' onClick={() => handladdeditcmspage()}>Add</button>
                                    </div>
                                </div>
                            </form>

                            <div className="table-responsive">
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th className='bg-dark text-light'>SL NO.</th>
                                            <th className='bg-dark text-light'>TITLE</th>
                                            <th className='bg-dark text-light'>URL</th>
                                            <th className='bg-dark text-light'>STATUS</th>
                                            <th className='bg-dark text-light'>ACTIONS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filterdata.map((item,index)=>(
                                                <tr  key={item.id}>
                                                    <td > {index+1}</td>
                                                    <td > {item.title}</td>
                                                    <td > <Link to={item.url} target='_blank'>{item.url}</Link></td>
                                                    <td > <span className={`badge badge-${item.status === 1 ? 'success' : 'danger'}`}>{item.status === 1 ? 'Active' : 'Inactive'}</span></td>
                                                    <td >
                                                        <button className='btn btn-sm btn-success mr-1' title='edit' onClick={()=>handladdeditcmspage(item.id)}><i className='fas fa-pencil-alt'></i></button>
                                                        <button className='btn btn-sm btn-danger mr-1' title='delete' onClick={()=>handlecmspagedelete(item.id)}><i className='fas fa-trash'></i></button>
                                                        <button className='btn btn-sm btn-dark' title='toggle off/on' onClick={()=>handlecmspagetoggle(item.id,item.status)}><i className={item.status === 1 ? 'fas fa-toggle-on' : 'fas fa-toggle-off'}></i></button>
                                                    </td>
                                                </tr>
                                            ))
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

export default Cmspages