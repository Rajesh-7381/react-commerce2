import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NotificationContainer,NotificationManager } from 'react-notifications';
import { CSVLink } from 'react-csv';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DeleteEntity } from './CRUDENTITY/DeleteEntity';
import Footer from './Component/Footer';
import Header from './Component/Header';


const Subadmin = (args) => {
    const navigate=useNavigate();
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);

    const [modal, setModal] = useState(false);

  // inside modal data shown(eye)
    const [modaldata, setmodaldata] = useState({});
    const [currentPage,setCurrentPage]=useState(1);
    const recordsPerPage=10;
    const lastIndex=currentPage * recordsPerPage;
    const firstIndex=lastIndex - recordsPerPage;
    const totalPages=Math.ceil(filterData.length / recordsPerPage);
    const numbers=[...Array(totalPages + 1).keys()].slice(1);
    
    useEffect(() => {
        document.title='SubAdmin';
        handleData();
    }, []);

    // Fetch data
    const handleData = async () => {
        try {
            const response = await axios.get("http://localhost:8081/api/getAllSubAdminData");
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
          const response = await axios.get(`http://localhost:8081/api/singledata/${id}`);
          setmodaldata(response.data.data);
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
        const response = await axios.get("http://localhost:8081/api/getAllAdminSubadminUsers");
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
                    <Link  className="breadcrumb-item float-right" to={"/admindashboard1"}>
                        Home
                    </Link>
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
                               
                                <div className="card-body ">
                                    <form className='d-flex align-items-center justify-content-end'>
                                        <div className="input-group col-9">
                                            <input className="mr-2" type="search" placeholder="Search" aria-label="Search" onKeyUp={searchFunction} />
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
                                                <th className='bg-dark text-light'>SL NO</th>
                                                <th className='bg-dark text-light'>NAME</th>
                                                <th className='bg-dark text-light'>MOBILE</th>
                                                <th className='bg-dark text-light'>EMAIL</th>
                                                <th className='bg-dark text-light'>ROLE</th>
                                                <th className='bg-dark text-light'>Created At</th>
                                                <th className='bg-dark text-light'>ACTIONS</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                              filterData && filterData.length > 0 ? 
                                              filterData.slice((currentPage -1) * recordsPerPage ,currentPage * recordsPerPage).map((item, index) => (
                                                <tr key={item.id}>
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
              Hi <span className='bg-warning'>{modaldata.name}</span> 
            </ModalHeader>
            <div className="text-center">
              <img src={`http://localhost:8081/api/profile/${modaldata.image}`} className='rounded-circle img-thumbnail mx-auto d-block' height={150} width={150} alt={modaldata.name} />
            </div>
            <ModalBody>
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <h5 className="text-primary">Personal Information</h5>
                    <hr />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <p style={{ fontWeight: "bolder" }}>ID:</p>
                  </div>
                  <div className="col-md-4">
                    <p><span style={{ color: "blue", fontWeight: "bold" }}>{modaldata.id}</span></p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <p style={{ fontWeight: "bolder" }}>Name:</p>
                  </div>
                  <div className="col-md-4">
                    <p><span style={{ color: "blue", fontWeight: "bold" }}>{modaldata.name}</span></p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <p style={{ fontWeight: "bolder" }}>Email:</p>
                  </div>
                  <div className="col-md-4">
                    <p><span style={{ color: "blue", fontWeight: "bold" }}>{modaldata.email}</span></p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <p style={{ fontWeight: "bolder" }}>Role:</p>
                  </div>
                  <div className="col-md-4">
                    <p><span style={{ color: "blue", fontWeight: "bold" }}>{modaldata.role}</span></p>
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
