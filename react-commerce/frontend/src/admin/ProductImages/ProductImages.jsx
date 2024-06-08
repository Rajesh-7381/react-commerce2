import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { NotificationManager, NotificationContainer } from 'react-notifications';
import Swal from 'sweetalert2';


const ProductImages = () => {
    // const navigate=useNavigate();
    const [productsimage,setproductsimage]=useState([]);
    const [filterdata,setfilterdata]=useState([]);
    useEffect(()=>{
        document.title='ProductImages';
        productsimagetabledata();
    },[]);

    const productsimagetabledata=async()=>{
        const response=await axios.get("http://localhost:8081/productsimage");
        // console.log(response.data)
        setproductsimage(response.data);
        setfilterdata(response.data);
    }
    
    // delete
    const handlecmspagedelete=async(id)=>{
        // alert(id)
        try {
            const confirmed = await Swal.fire({
                title: 'Are you sure?',
                text: 'This action cannot be undone.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
            });

            if (confirmed.isConfirmed) {
                // Delete the item
                await axios.delete(`http://localhost:8081/productsimagedelete/${id}`);
                NotificationManager.success("successfully!  deleted data");
                // Fetch the updated data from the server and update the local state
                // const response = await axios.get("http://localhost:8081/productsimage");

                // Update the state immediately
                // after successfully deleting the item from the server, we immediately update the state using setfilterdata and setproductsimage to filter out the deleted item.
                //  This ensures that the UI reflects the deletion instantly without needing to refresh the page.
                setfilterdata(filterdata.filter(item => item.id !== id));
                setproductsimage(productsimage.filter(item => item.id !== id));
            } else {
                // Do nothing
                NotificationManager.error("Data not deletd  successfully!");
            }
        } catch (error) {
            console.error(error);
        }
    }
    // status change
    const handlecmspagetoggle=async(id,status)=>{
        try {
            const newstatus=status===1 ? 0 : 1;
            // alert(id)
            // alert(status)
             await axios.put(`http://localhost:8081/handleproductsstatus/${id}`,{status:newstatus});
             const updatedata=filterdata.map(item=>{
                if(item.id === id){
                    return {...item ,status:newstatus};
                }
                return item;
        })
        setfilterdata(updatedata)
        } catch (error) {
            console.error(error);
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
                                <span className='badge badge-pill badge-warning'>Products Image/</span>
                                <span className='badge badge-pill badge-info'>Products Image Data</span>
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
                                                <li className="breadcrumb-item"><Link to={"/productsimage"}>Back</Link></li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <form className='d-flex align-items-center justify-content-end'>
                                
                            </form>

                            <div className="table-responsive">
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th className='bg-dark text-light'>SL NO.</th>
                                            <th className='bg-dark text-light'>Image</th>
                                            <th className='bg-dark text-light'>PRODUCTID</th>
                                            <th className='bg-dark text-light'>Image_SORT</th>
                                            <th className='bg-dark text-light'>STATUS</th>
                                            
                                            <th className='bg-dark text-light'>ACTIONS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filterdata.map((item,index)=>(
                                                <tr className={item.status === 1 ? 'bg-primary' : 'bg-info'} key={item.id}>
                                                    <td className={item.status === 1 ? 'bg-primary' : 'bg-info'}> {index+1}</td>

                                                    <td className={item.status === 1 ? 'bg-primary' : 'bg-info'}>
                                                        <Link to={`http://localhost:8081/productsimage/`+  item.image} target="_blank" id='image-constrained'>
                                                            <img src={`http://localhost:8081/productsimage/` + item.image} width={50} height={50} alt="" />
                                                        </Link>
                                                    </td>

                                                    <td className={item.status === 1 ? 'bg-primary' : 'bg-info'}> {item.product_id}</td>
                                                    <td className={item.status === 1 ? 'bg-primary' : 'bg-info'}> {item.image_sort}</td>
                                                    
                                                    <td className={item.status === 1 ? 'bg-primary' : 'bg-info'}> <span className={`badge badge-${item.status === 1 ? 'success' : 'danger'}`}>{item.status === 1 ? 'Active' : 'Inactive'}</span></td>
                                                    <td className={item.status === 1 ? 'bg-primary' : 'bg-info'}>
                                                    <NotificationContainer />
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
  )
}

export default ProductImages