import axios from "axios";
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";

const BrandTable = () => {
    const [brandData,setbrandData]=useState([]);
    
    useEffect(()=>{
      document.title="Brands";
        GETALLBRANDS();
    },[]);

    const GETALLBRANDS=async()=>{
        try {
            const response=await axios.get("http://localhost:8081/api/getAllBrands");
            setbrandData(response.data);
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
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
    { brandData && brandData.length > 0 ?
      brandData.map((item, index) => (
      <tr key={index}>
        <td>{index+1}</td>
        <td>{item.brand_name}  </td>
        <td>
              <Link to={`http://localhost:8081/api/brandimage/`+  item.brand_image} target="_blank" id='image-constrained'>
                  <img src={`http://localhost:8081/api/brandimage/` + item.brand_image} width={50} height={50} alt="" />
              </Link>
        </td>
        <td>
            <Link to={`http://localhost:8081/api/brandlogo/`+  item.brand_logo} target="_blank" id='image-constrained'>
                <img src={`http://localhost:8081/api/brandlogo/` + item.brand_logo} width={50} height={50} alt="" />
            </Link>
        </td>
        <td>{item.brand_discount} </td>
        <td><Link to={item.url}>{item.url} </Link></td>
        <td><span className={`badge badge-${item.status === 1 ? 'success' : 'danger'}`}>{item.status === 1 ? 'Active' : 'Inactive'}</span> </td>
        <td>
       
        <button className='btn btn-success btn-sm  mr-1' ><i className='fas  fa-pencil-alt'></i></button>
        <button className='btn btn-dark btn-sm  mr-1' ><i className={item.status === 1 ? 'fas fa-toggle-on' : 'fas fa-toggle-off'}></i></button>
        <button className='btn btn-danger btn-sm ' ><i className='fas fa-trash'></i></button>
        </td>
      </tr>
    ))
    :
    <tr>
      <td colSpan={6}>No data found</td>
    </tr>
  }
    </tbody>
  </table>
    </div>
  )
}

export default BrandTable
