import axios from "axios";
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { DeleteEntity } from "../CRUDENTITY/DeleteEntity";
import { StatusEntity } from "../CRUDENTITY/StatusEntity";

const BrandTable = () => {
  const navigate=useNavigate();
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

      // edit brands
      const BrandsAddEdit=async(id)=>{
        // alert(id)
        navigate("/addeditbrands",{state :{id:id}});
    }
    const DeleteBrand=async(id)=>{
      // alert(id)
      const data=await DeleteEntity('Brand',id);
      // Fetch the updated data from the server and update the local state
      const response = await axios.get("http://localhost:8081/api/getAllBrands");
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
              <Link to={item.brand_image} target="_blank" id='image-constrained'>
                 {item.brand_image && item.brand_image.trim() !== '' ? (
                    <img src={item.brand_image} width={50} height={50} alt="" loading="lazy" onError={(e)=>{
                      if(e.target.src !=='https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'){
                        e.target.src='https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'
                      }
                    }} />
                 ):(
                  <img src={'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'} width={50} height={50} alt="" loading="lazy" />
                 )}
              </Link>
        </td>
        <td>
            <Link to={item.brand_logo} target="_blank" id='image-constrained'>
            {item.brand_logo && item.brand_logo.trim() !== '' ? (
              <img src={item.brand_logo} width={50} height={50} alt="" loading="lazy" onError={(e)=>{
                if(e.target.src !== 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'){
                  e.target.src='https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'
                }
              }} />
            ):(
              <img src={'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'} width={50} height={50} alt="" loading="lazy"/>
            )}
            </Link>
        </td>
        <td>{item.brand_discount} </td>
        <td><Link to={item.url}>{item.url} </Link></td>
        <td><span className={`badge badge-${item.status === 1 ? 'success' : 'danger'}`}>{item.status === 1 ? 'Active' : 'Inactive'}</span> </td>
        <td>
       
        <button className='btn btn-success btn-sm  mr-1' onClick={()=>BrandsAddEdit(item.id)}><i className='fas  fa-pencil-alt'></i></button>
        <button className='btn btn-dark btn-sm  mr-1' onClick={()=>BrandStatusChange(item.id,item.status)}><i className={item.status === 1 ? 'fas fa-toggle-on' : 'fas fa-toggle-off'}></i></button>
        <button className='btn btn-danger btn-sm ' onClick={()=>DeleteBrand(item.id)} ><i className='fas fa-trash'></i></button>
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
