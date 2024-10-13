import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NotificationContainer,NotificationManager } from 'react-notifications';
import { CSVLink } from 'react-csv';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DeleteEntity } from './CRUDENTITY/DeleteEntity';
import Footer from './Components/Footer';
import Header from './Components/Header';


const Subadmin = (args) => {
    const BASE_URL=process.env.REACT_APP_BASE_URL
    const navigate=useNavigate();
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [modal, setModal] = useState(false);
  // inside modal data shown(eye)
    const [modaldata, setmodaldata] = useState({});
    const [currentPage,setCurrentPage]=useState(1);
    const [columns,setColumns]=useState([
      {key :'name',label: 'NAME'},
      {key :'mobile',label: 'MOBILE'},
      {key :'email',label: 'EMAIL'},
      {key :'role',label: 'Role'},
      {key :'created_at',label: 'Created At'},
      {key :'actions',label : 'ACTIONS' }
    ]);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' }); // Sorting configuration
  

    const recordsPerPage=10;
    // const lastIndex=currentPage * recordsPerPage;
    // const firstIndex=lastIndex - recordsPerPage;
    const totalPages=Math.ceil(filterData.length / recordsPerPage);
    const numbers=[...Array(totalPages + 1).keys()].slice(1);
    
    useEffect(() => {
        document.title='SubAdmin';
        handleData();
    }, []);

    // Fetch data
    const handleData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/getAllSubAdminData`,{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}});
            setData(response.data);
            setFilterData(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    // CSV headers
    const headers = [
        { label: 'Name', key: 'name' },
        { label: 'Mobile', key: 'mobile' },
        { label: 'Email', key: 'email' },
        { label: 'Role', key: 'role' },
    ]

    // Searching function
    const searchFunction = (event) => {
        const searchData = event.target.value.toLowerCase().trim();
        // console.log(searchData)
        if (searchData === '') {
            setFilterData(data);
        } else {
            const filtered = data.filter(item =>
              item &&  item.name.toLowerCase().includes(searchData) 
            );
            setFilterData(filtered);
        }
    };
    // single data using modal 
    const toggle = async (id) => {
        try {
          const response = await axios.get(`${BASE_URL}/api/singledata/${id}`,{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}});
          // console.log(response.data[0])
          setmodaldata(response.data[0]);
          setModal(!modal);
        } catch (error) {
          console.error("error fetching data", error);
          setModal(!modal);
        }
      };

    //   update functionality
    const handleupdate = async (id) => {
        navigate("/subadminaddedit",{state:{id:id}});
    }

    // delete functionality
    const handledelete = async (id) => {
        await DeleteEntity('SubAdmin',id)
        // Fetch the updated data from the server and update the local state
        const response = await axios.get(`${BASE_URL}/api/getAllAdminSubadminUsers`,{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}});
        setData(response.data);
        setFilterData(response.data);
         
      };

    // print page
    const printpage=()=>{
        window.print();
    }

    // pdf format download
    const PdfFormat=()=>{
        const doc=new jsPDF();
        const tablecolumn=["SLNO","NAME","EMAIL","MOBILE","ROLE"];
        const tablerows=[];

        data.forEach((item,index)=>{
            const tabledata=[
                index+1,
                item.name,
                item.email,
                item.mobile,
                item.role.toUpperCase()
            ];
            
            tablerows.push(tabledata);
        });
        doc.autoTable(tablecolumn,tablerows,{startY:20});
        doc.text("RegisteredUsers",14,15);
        doc.save("RegisteredUsers.pdf");
        NotificationManager.success("pdf format download sucessfully!");
    }

    // pagination
    const prepage=()=>{
        if(currentPage > 1){
            setCurrentPage(currentPage - 1);
        }
    }
    const nextpage = ()=>{
        if(currentPage < recordsPerPage){
            setCurrentPage(currentPage + 1);
        }
    }
    const pageChange=(n)=>{
        setCurrentPage(n);
    }

    // for row swapping
    const handleDragStart = (e, id) => {
      // console.log(typeof id)
      e.dataTransfer.setData('text', id.toString()); 
      e.target.style.color = "green";
    };
    
    const handleDragOver = (e) => {
      e.target.style.color = "red";
      e.preventDefault();
    };
    
    const handleDrop = (e, id) => {
      // console.log(e)// return synthesisbaseevent
      e.preventDefault();
      // e.target.style.color = "green";
      const draggedId = e.dataTransfer.getData('text');  //return dragged id
      e.target.style.color = "green";
      const newFilteredData = [...filterData];
      const draggedIndex = newFilteredData.findIndex((item) => item.id.toString() === draggedId); // if filterdata.item.id === draggedid equal then return draggeddata index
      const targetIndex = newFilteredData.findIndex((item) => item.id === id); //same as it return targeted index means where dropped index
      if (draggedIndex === -1 || targetIndex === -1) {
        alert("Invalid places");
        return;
      }
    
      // Swap dragged and target items
      const draggedItem = newFilteredData[draggedIndex]; //suppose draggedIndex return 0 it means draggeditem store their data
      newFilteredData.splice(draggedIndex, 1); //splice(0,1) removes 1 element from newfilterdata and starting from draggedindex
      newFilteredData.splice(targetIndex, 0, draggedItem); //inserts draggeditem at the position of targetedindex and 0 means no removed
      setFilterData(newFilteredData);
    };

    // for column swapping
    const handleColumnDragStart=(e,index)=>{
      e.dataTransfer.setData("columnIndex",index);
    }

    const handleColumnDrop=(e,index)=>{
      const dragColumnIndex=e.dataTransfer.getData("columnIndex");
      const newColumns=[...columns];
      const draggedColumn=newColumns[dragColumnIndex];
      newColumns.splice(draggedColumn,1);
      newColumns.splice(index,0,draggedColumn)
      setColumns(newColumns)
    }

     // Sorting handler
  const handleSort = (key) => {
    // console.log(key)
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    const sortedData = [...filterData].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setFilterData(sortedData);
    setSortConfig({ key, direction });
  };
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
                    <h1 className="m-0 float-start">Subadmin Table</h1>
                    <Link  className="breadcrumb-item float-right" to={"/admindashboard1"}> Home </Link>
                    <br />
                  </div>
                </div>
                {/* /.row */}
              </div>
              {/* /.container-fluid */}
            </div>
            {/* /.content-header */}
    
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                               
                                <div className="card-body ">
                                    <form className='d-flex align-items-center justify-content-end'>
                                        <div className="input-group col-9">
                                            <input className="mr-2" type="search" style={{marginLeft:"-312px"}} placeholder="Search here....." aria-label="Search" onKeyUp={searchFunction} />
                                            <div className="input-group-append">
                                                <button className="btn btn-outline-success mr-5 searchbtn" type="button" >Search</button>
                                                <NotificationContainer />
                                                 <CSVLink data={filterData} headers={headers} filename='Static_users.csv' target='_blank' className='btn btn-dark mr-5 '>Export CSV <i className="fas fa-solid fa-download"></i> </CSVLink>
                                                 <Button className='btn btn-dark mr-5' onClick={printpage}>Print <i className="fas fa-solid fa-print"></i></Button>
                                                 <NotificationContainer />
                                                 <Button className='btn btn-dark mr-5' onClick={PdfFormat}>Pdf <i className="fas fa-solid fa-download"></i></Button>

                                                <button className='btn btn-outline-danger text-dark  backbtn' style={{ right: "10px", position: "absolute" }}><Link to={"/admindashboard1"}><i className="fas fa fa-arrow-circle-left">Back</i></Link></button>
                                            </div>
                                        </div>
                                    </form>
                                    <table id="Table" className="table table-bordered table-striped">
                                        <thead>
                                            <tr>
                                            <th key="slno" style={{ background: "black", color: "white" }}>Sl No</th>

                                                {columns.map((item,index)=>(
                                                  <th key={index} style={{background:"black", color:"white"}} draggable="true" onDragStart={(e)=>handleColumnDragStart(e,index)} onDragOver={(e)=>e.preventDefault()} onDrop={(e)=>handleColumnDrop(e,index)}>{item.label}
                                                      <span className="ml-2">
                                                        <button style={{ border: 'none', background: 'transparent', color: 'white' }} onClick={() => handleSort(item.key)} ><img src="https://cdn-icons-png.flaticon.com/128/5610/5610930.png" height={20} alt="" /></button>
                                                        <button  style={{ border: 'none', background: 'transparent', color: 'white' }}  onClick={() => handleSort(item.key)} ><img src="https://cdn-icons-png.flaticon.com/128/5612/5612000.png" alt="" height={20} /> </button>
                                                    </span>
                                                  </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                              filterData && filterData.length > 0 ? 
                                              filterData.slice((currentPage -1) * recordsPerPage ,currentPage * recordsPerPage).map((item, index) => (
                                                <tr key={item.id} draggable="true" onDragStart={(e)=>{handleDragStart(e,item.id)}} onDragOver={handleDragOver} onDrop={(e)=>handleDrop(e,item.id)}>
                                                    <td>{index + 1 +(currentPage -1) * recordsPerPage}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.mobile}</td>
                                                    <td>{item.email}</td>
                                                    <td><span className={`badge badge-${item.role === 'user' ? 'primary' : item.role === 'subadmin' ? 'warning' : 'success'}`}>{item.role === 'admin' ? 'ADMIN' : item.role === 'subadmin' ? 'SUBADMIN' : 'USER'}</span></td>
                                                   <td>{item.created_at}</td>
                                                    <td>
                                                        <button className='btn btn-dark btn-sm mr-2' onClick={()=> toggle(item.id)}><i className='fas fa-eye'></i></button>
                                                        <button className='btn btn-success btn-sm mr-2' onClick={()=> handleupdate(item.id)}><i className='fas fa-pencil-alt'></i></button>
                                                        <button className='btn btn-danger btn-sm' onClick={()=>handledelete(item.id)}><i className='fas fa-trash'></i></button>
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
                                    <nav className='float-right'>
                                        <ul className='pagination'>
                                            <li className='page-item'>
                                                <button onClick={prepage} className='page-link'>prev</button>
                                            </li>
                                            {
                                                numbers.map((n,i)=>(
                                                    <li className={`page-item ${currentPage === n ? 'active' : ''}`}>
                                                        <button className='page-link' onClick={()=>pageChange(n)}>{n}</button>
                                                    </li>
                                                ))
                                            }
                                            <li className='page-item'>
                                                <button className='page-link' onClick={nextpage}>next</button>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* for show singledata modal*/}
            <Modal isOpen={modal} toggle={toggle} {...args}>
              <ModalHeader toggle={toggle} className="bg-primary text-white">
                Hi {modaldata?.name ? <span className='bg-warning'>{modaldata.name}</span> : <span>No name</span>}
              </ModalHeader>
              <div className="text-center">
                {modaldata?.image ? (
                  <img src={modaldata.image} className='rounded-circle img-thumbnail mx-auto d-block' height={150} width={150} alt={modaldata.name} />
                ) : (
                  <img src={'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'} className='rounded-circle img-thumbnail mx-auto d-block' height={150} width={150} loading="lazy" alt="" />
                )}
              </div>
              <ModalBody>
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <h5 className="text-primary">Personal Information </h5>
                      <hr />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <p style={{ fontWeight: "bolder" }}>ID:</p>
                    </div>
                    <div className="col-md-4">
                      <p>{modaldata?.id ? <span style={{ color: "blue", fontWeight: "bold" }}>{modaldata.id}</span> : <span>No ID</span>}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <p style={{ fontWeight: "bolder" }}>Name:</p>
                    </div>
                    <div className="col-md-4">
                      <p>{modaldata?.name ? <span style={{ color: "blue", fontWeight: "bold" }}>{modaldata.name}</span> : <span>No name</span>}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <p style={{ fontWeight: "bolder" }}>Email:</p>
                    </div>
                    <div className="col-md-4">
                      <p>{modaldata?.email ? <span style={{ color: "blue", fontWeight: "bold" }}>{modaldata.email}</span> : <span>No email</span>}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <p style={{ fontWeight: "bolder" }}>Role:</p>
                    </div>
                    <div className="col-md-4">
                      <p>{modaldata?.role ? <span style={{ color: "blue", fontWeight: "bold" }}>{modaldata.role}</span> : <span>No role</span>}</p>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="bg-light">
                <Button color="primary" onClick={toggle}>
                  Ok
                </Button>{' '}
                <Button color="danger" onClick={toggle}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
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
}

export default Subadmin;
