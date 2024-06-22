import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NotificationContainer } from 'react-notifications';
import { Link, useNavigate } from 'react-router-dom'

import { DeleteEntity } from '../CRUDENTITY/DeleteEntity';
import { StatusEntity } from '../CRUDENTITY/StatusEntity';

const Products = () => {
    const navigate=useNavigate();
    const [productdata,setproductdata]=useState([]);
    useEffect(()=>{
        document.title="Products";
        retrivedData();
    },[]);
    const retrivedData= async()=>{
        try {
           const response=await axios.get("http://localhost:8081/getAllProducts") ;
           setproductdata(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleedit=(id)=>{
        navigate("/addeditproducts",{state:{id:id}});
    }

    // handle delete
    const handledelete=async(id)=>{
        // alert(1)
       const data=await DeleteEntity('Product',id);
        // Fetch the updated data from the server and update the local state
        const response = await axios.get("http://localhost:8081/getAllProducts");
        setproductdata(response.data);
        // setFilterData(response.data);
    }

    const toggleclick = async (status, id) => {
        try {
            await StatusEntity('ProductStatus',id,status,setproductdata,productdata)
            
        } catch (error) {
            alert(`Error: ${error.message}`)
        }        
      };
      
    const [currentpage,setCurrentPage]=useState(1);
    const recordsPerPage=10;
    const lastIndex=currentpage * recordsPerPage;
    const firstIndex=lastIndex - recordsPerPage;
    const totalPages= Math.ceil(productdata.length /recordsPerPage);
    const numbers=[...Array(totalPages + 1).keys()].slice(1);

    const prepage =()=>{
        if(currentpage > 1){
            setCurrentPage(currentpage -1)
        }
    }

    const nextpage=()=>{
        if(currentpage < totalPages){
            setCurrentPage(currentpage+1);
        }
    }
    const pagechange=(n)=>{
        setCurrentPage(n)
    }

    // searching functionality
    const searchfunction=(event)=>{
        const searchdata=event.target.value.toLowerCase().trim();
        console.log(searchdata)
        if(searchdata === ""){
            setproductdata(productdata)
        }else{
            const filtered=productdata.filter(item=>
                (item && item.product_name && item.product_name.toLowerCase().includes(searchdata)) ||
                (item &&item.product_code &&item.product_code.toLowerCase().includes(searchdata)) ||
                (item &&item.product_color &&item.product_color.toLowerCase().includes(searchdata)) ||
                (item &&item.product_weight &&item.product_weight.toLowerCase().includes(searchdata)) ||
                (item &&item.family_color &&item.family_color.toLowerCase().includes(searchdata))
            );
            setproductdata(filtered);
        }
    
    }
  return (
    <div>
        <section className="content">
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header ">
                            <h1 className="card-title " style={{ margin: "auto", width: "100%", fontWeight: "bold" }}>
                                <span className='badge badge-pill badge-warning'>Products/</span>
                                <span className='badge badge-pill badge-info'>Products Data</span>
                            </h1>
                        </div>

                        <div className="card-body">
                            <section className="content-header">
                                <div className="container-fluid">
                                    <div className="row mb-2">
                                        <div className="col-sm-6"></div>
                                        <div className="col-sm-6">
                                            <ol className="breadcrumb float-sm-right">
                                                <li className="breadcrumb-item "><Link to={"/admindashboard1"}>Home</Link></li>
                                                <li className="breadcrumb-item"><Link to={""}>Back</Link></li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <form className='d-flex align-items-center justify-content-end'>
                                <div className="input-group">
                                    <input className="form-control mr-2" type="search" placeholder="Search using name, url, title etc..." aria-label="Search" onKeyUp={searchfunction}  />
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-success mr-2" type="button">Search</button>
                                        <button className='btn btn-primary ' onClick={()=>handleedit()}>Add</button>
                                    </div>
                                </div>
                            </form>

                            <div className="table-responsive">
                                <table className="table table-bordered table-striped ">
                                    <thead>
                                        <tr>
                                            <th className='bg-dark text-light'>SL NO.</th>
                                            <th className='bg-dark text-light'>PRODUCT NAME</th>
                                            <th className='bg-dark text-light'>CATEGORY</th>
                                            <th className='bg-dark text-light'>PARENT CATEGORY</th>
                                            <th className='bg-dark text-light'>PRODUCT CODE </th>
                                            <th className='bg-dark text-light'>PRODUCT COLOR</th>
                                            <th className='bg-dark text-light'>FAMILY COLOR </th>
                                            <th className='bg-dark text-light'>GROUP CODE</th>
                                            <th className='bg-dark text-light'>PRODUCT PRICE</th>
                                            <th className='bg-dark text-light'>PRODUCT WEIGHT</th>
                                            <th className='bg-dark text-light'>PRODUCT DISCOUNT </th>
                                            <th className='bg-dark text-light'>STATUS</th>
                                            <th className='bg-dark text-light'>ACTIONS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {
                                                productdata.slice((currentpage-1) * recordsPerPage , currentpage * recordsPerPage).map((item, index) => (
                                                    <tr key={item.id} className={item.status === 'Active' ? 'bg-primary' : ''}>
                                                        <td style={{ width: "1px" }}>{index + 1 + (currentpage - 1) * recordsPerPage}</td>
                                                        <td>{item.product_name}</td>
                                                        <td>{item.category_name}</td>
                                                        <td>{item.parent_category_name}</td>
                                                        <td>{item.product_code}</td>
                                                        <td>{item.product_color}</td>
                                                        <td>{item.family_color}</td>
                                                        <td>{item.group_code}</td>
                                                        <td>{item.product_price}</td>
                                                        <td>{item.product_weight}</td>
                                                        <td>{item.product_discount}</td>
                                                        <td><span className={`badge badge-${item.status === 1 ? 'success' : 'danger'}`}>{item.status === 1 ? 'Active' : 'Inactive'}</span></td>
                                                        <td>
                                                            <NotificationContainer />
                                                            <button className='btn btn-success btn-sm ' onClick={()=>handleedit(item.id)}><i className='fas fa-pencil-alt'></i></button>
                                                            <button className='btn btn-danger btn-sm' onClick={()=>handledelete(item.id)}><i className='fas fa-trash'></i></button>
                                                            <button className='btn btn-dark btn-sm' onClick={()=>toggleclick(item.status,item.id)}><i className={item.status === 'Active' ? 'fas fa-toggle-on' : 'fas fa-toggle-off'}></i></button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                </table>
                                <br></br>
                                <nav className='float-right'>
                                    <ul className='pagination'>
                                        <li className='page-item'>
                                            <button onClick={prepage} className='page-link'>prev</button>
                                        </li>
                                        {
                                            numbers.map((n,i)=>(
                                                <li className={`page-item ${currentpage===n ? 'active' : ''}`} key={i}>
                                                     <button onClick={()=>pagechange(n)} className='page-link'>{n}</button>
                                                </li>
                                            ))
                                        }
                                        <li className='page-item'>
                                            <button onClick={nextpage}  className='page-link'>next</button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </section>
    </div>
  )
}

export default Products
