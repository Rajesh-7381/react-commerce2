import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { CSVLink } from 'react-csv';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import zxcvbn from 'zxcvbn';
import { DeleteEntity } from './CRUDENTITY/DeleteEntity';
import Footer from './Components/Footer';
import Header from './Components/Header';

const AddEditRegisterUser = (args) => {
  const BASE_URL=process.env.REACT_APP_BASE_URL
  const [pass,setpass]=useState(false);
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  // inside modal data shown(eye)
  const [modaldata, setmodaldata] = useState({});
  const [id, setId] = useState(""); // Define id state
  const [passwordstrength,setPasswordStrength]=useState(0);
  // const [checked,setnewchecked]=useState(new Array(data.length).fill(false))
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState({});
  const navigate=useNavigate();
  let sRow=false;
  const [loading,setloading]=useState(false)

  const toggle = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/singledata/${id}`,{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}});
      // console.log(response.data)
      setmodaldata(response.data[0]);
      // console.log(modaldata)
      setModal(!modal);
    } catch (error) {
      console.error("error fetching data", error);
      setModal(!modal);
    }
  };

  const toggle2 = async (id) => {
    setModal2(!modal2);
    await onSubmitForm(id);
  };

  useEffect(() => {
    document.title='AddEditRegister';
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/getAllAdminSubadminUsers`,{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}});
        setData(response.data);
        setFilterData(response.data);  // Initialize filterData as well
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

const debounce=(func,wait)=>{
  let timerId;
  // console.log(timerId)
  return (...args)=>{
    // console.log(args[0])
    clearTimeout(timerId)
    // console.log(timerId)
    timerId=setTimeout(()=>func(...args),wait)
    // console.log(timerId)
  }
}
const callApi=async(e)=>{
  const searchTerm=e.target.value.toUpperCase().trim();
  try {
    const response = await axios.get(`${BASE_URL}/api/SearchAdminSubAdminUser/${searchTerm}`,{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}});
    // console.log(response.data);
    let filteredData = response.data;
    if (searchTerm!== "") {
      filteredData = filteredData.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilterData(filteredData);
  } catch (error) {
    console.error(error)
  }
}
const debounceCallApi=useMemo(()=>debounce(callApi,1000),[]);

  // csv download
  const headers = [
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Role', key: 'role' },
    
  ]

  // pdf download
  const DownloadPDFFormatDocument = () => {
    const doc = new jsPDF();

    // define column and data
    const tablecolumn = ["SL No", "NAME", "EMAIL", "ROLE"];
    const tablerows = [];

    // data from state
    data.forEach((item, index) => {
      const rowdata = [
        index + 1,
        item.name,
        item.email,
        item.role.toUpperCase()
      ];
      tablerows.push(rowdata);
    });
    const backgroundImage=new Image();
    backgroundImage.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTcvIcikyjgYcDZuKPzsq8xAZIilsBxUm10g&s"
    doc.addImage(backgroundImage, 0, 0, 210, 297)
    doc.autoTable(tablecolumn, tablerows, { startY: 20 }); //sets the vertical position (the Y-coordinate) on the PDF document where the table should start being drawn. The value 20 means that the table starts 20 units down from the top of the page
    doc.text("RegisteredUsers", 14, 15); //specific cordinates
    doc.save("RegisteredUsers.pdf");
    NotificationManager.success("Form Download PDF Format Document successfully!");
  }

  // for print data
  const printdata = () => {
    window.print();
    // NotificationManager.success("Form submitted successfully!");
  }

  // for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const pageNumbersToShow = 5;
  const totalPages = Math.ceil(filterData.length / recordsPerPage);
  
  const firstIndex = Math.floor((currentPage - 1) / pageNumbersToShow) * pageNumbersToShow + 1;//1st time 0
  const lastIndex = Math.min(firstIndex + pageNumbersToShow - 1, totalPages); //1st time 10
  // const records = filterData.slice(firstIndex, lastIndex); (1st index inclusive and last index not inclusive)
  // const totalPages = Math.ceil(filterData.length / recordsPerPage); //50/10=5
  const pageNumbers = [...Array(lastIndex + 1).keys()].slice(firstIndex);
  //here Array(totalPages + 1) this creates new array . let totalPages is 5 +1 =6
  // .keys() this returns iterator over array keys. since the array is created with  totalpages+1 elements, this iterator will return keys from 0 to totalpages
  // the spread(...) operator is used spread the iterator keys into an array.
  // .slice(1) => finally we use slice(1) to remove first element from array . because page starts from 1 not 0

  const prePage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const pageChange = (page) => {
    setCurrentPage(page);
    navigate(`/registeruser?page=${page}&limit=${recordsPerPage}`,{replace:true})
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().max(100).min(3).required("please enter your name!"),
    email: Yup.string().max(100).min(2).required("please enter your email!"),
    password: Yup.string().max(100).min(6).required("please enter your password!"),
    role: Yup.string().required("please enter your name!"),
    // image: Yup.mixed().required('Image is required')
  });

  const onSubmitForm = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/editdata/${id}`,{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}});
      const  data =response.data.result[0];
      // console.log(data)
      formik.setValues({
        name: data.name,
        mobile: data.mobile,
        email: data.email,
        password: data.password,
        role: data.role
        // image:data.image
      });
      setId(data.id); // Set id state
    } catch (error) {
        console.log(error)
    }
  };


  const handleSubmit = async (values) => {
    if (passwordstrength !== 4) {
      NotificationManager.error("Password strength is not strong enough!");
      return;
    }
    setloading(true)
    try {
        setTimeout(async() => {
          await axios.put(`${BASE_URL}/api/update/${id}`, values,{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}});
          NotificationManager.success("Form updated successfully!");
          // Fetch the updated data from the server and update the local state
          const response = await axios.get(`${BASE_URL}/api/getAllAdminSubadminUsers`,{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}});
          setData(response.data);
          setFilterData(response.data);
          setModal2(false); 
          setloading(false)
        }, 3000);
    } catch (error) {
        NotificationManager.error("Form  not updated successfully!");
      console.error("Error updating data", error);
    }
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "",
      mobile: ''
      // image:null
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit
  });

  // const handleImageChange = (event) => {
  //   const d=formik.setFieldValue('image', event.currentTarget.files[0]);
  //   console.log(d)
  // };

//   delete functionality
  const handledelete = async (id) => {
    await DeleteEntity('Admin',id);  
    const response = await axios.get(`${BASE_URL}/api/getAllAdminSubadminUsers`,{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}});
    setData(response.data);
    setFilterData(response.data);
      
  };
  
 // Function to handle password change and update password strength
  const handlePasswordChange = (event) => {
    const { value } = event.target;
    const result = zxcvbn(value);
    setPasswordStrength(result.score);
    formik.handleChange(event); // Update formik values
  };

  const handleselectAll=(e)=>{
    setSelectAll(e.target.checked)
    // console.log(e.target.checked)
    if(e.target.checked){
      const selobj={};
      data.forEach((row)=>{
        setSelectedRows[row.id]=true;
      })
      setSelectedRows(selobj)
    }else{
      setSelectedRows({})
    }
  }
  const handleRowSelect=(e,id)=>{
    // alert(e)
    // alert(id)
    const c=e.target.checked
    alert(c)
    sRow=data.id === id ? true : false
  }

  // for sorting
  
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
                <h1 className="m-0 float-start">Edit/Update </h1>
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
                  <form className='d-flex align-items-center justify-content-end'>
                    <div className="input-group">
                      <input className="mr-2" type="search" placeholder="Search" aria-label="Search" onChange={(e)=>{debounceCallApi(e)}} />
                      <div className="input-group-append">
                        <button className="btn btn-outline-success mr-5" type="button" >Search</button>
                        <NotificationContainer />
                        <CSVLink data={filterData} headers={headers} filename='Static_users.csv' target='_blank' className='btn btn-dark mr-5 '>Export CSV <i className="fas fa-solid fa-download"></i> </CSVLink>
                        <NotificationContainer />
                        <button className='btn btn-dark mr-5' onClick={DownloadPDFFormatDocument}>PDF Format <i className="fas fa-solid fa-download"></i></button>
                        <NotificationContainer />
                        <button className='btn btn-dark mr-5' onClick={printdata}>Print <i className="fas fa-solid fa-print"></i></button>
                        <button className='btn btn-outline-danger text-dark backbtn ' style={{ right: "10px", position: "absolute" }}><Link to={"/admindashboard1"}><i className="fas fa fa-arrow-circle-left">Back</i></Link></button>
                      </div>
                    </div>
                  </form>


                  <table id="example1" className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th className='bg-dark text-light' title='check box through delete'><input type='checkbox'  name='allSelect' checked={selectAll} onChange={ handleselectAll } />SELECT</th>
                        <th className='bg-dark text-light'>SL NO</th>
                        <th className='bg-dark text-light'>NAME</th>
                        <th className='bg-dark text-light'>MOBILE</th>
                        <th className='bg-dark text-light'>EMAIL</th>
                        <th className='bg-dark text-light'>ROLE</th>
                        <th className='bg-dark text-light'>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filterData.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage).map((dt, index) => (

                        <tr key={dt.id}>

                          <td>
                            <input type="checkbox"  id=""  onChange={(e)=>handleRowSelect(e,dt.id)}  />
                          </td>
                          <td>{(currentPage - 1) * recordsPerPage + index + 1}</td>
                          <td>{dt.name}</td>
                          <td>{dt.mobile}</td>
                          <td>{dt.email}</td>
                          <td><span className={`badge badge-${dt.role === 'user' ? 'primary' : dt.role === 'subadmin' ? 'warning' : 'success'}`}>{dt.role === 'admin' ? 'ADMIN' : dt.role === 'subadmin' ? 'SUBADMIN' : 'USER'}</span></td>
                          <td>
                            <button className='btn btn-dark btn-sm mr-2' onClick={() => toggle(dt.id)}><i className='fas fa-eye'></i></button>
                            <NotificationContainer />
                            <button className='btn btn-success btn-sm mr-2' onClick={() => toggle2(dt.id)}><i className='fas fa-pencil-alt'></i></button>
                            <NotificationContainer />
                            <button  className='btn btn-danger btn-sm' onClick={() => handledelete(dt.id)} ><i className='fas fa-trash'></i></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <br></br>
                  <nav className='float-right'>
                  <ul className='pagination paginationRightTab'>
                    <li className='page-item'>
                      <button onClick={prePage} className='page-link'>Prev</button>
                    </li>
                    {pageNumbers.map((n) => (
                      <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={n}>
                        <button onClick={() => pageChange(n)} className='page-link'>{n}</button>
                      </li>
                    ))}
                    {lastIndex < totalPages && (
                      <li className='page-item'>
                        <span className='page-link'>...</span>
                      </li>
                    )}
                    <li className='page-item'>
                      <button onClick={nextPage} className='page-link'>Next</button>
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

      {/* for update modal*/}
      <Modal isOpen={modal2} toggle={toggle2} {...args}>
        <ModalHeader toggle={toggle2}>Hi <span style={{background:"pink",color:"blue"}}>{modaldata.name}</span> is Your Personal Information</ModalHeader>
        <ModalBody>
          <section className="content">
            <div className="container-fluid">
              <div className="row">
                {/* left column */}
                <div className="col-md-12">
                  {/* general form elements */}
                  <div className="card card-primary">
                    <div className="card-header">
                      <h3 className="card-title">Update Form</h3>
                    </div>
                    {/* /.card-header */}
                    {/* form start */}
                    
                    <form onSubmit={formik.handleSubmit}>

                      <div className="card-body">
                        <div className="form-group">
                          <label htmlFor="exampleInputName"><i className='fas fa-user'></i> Enter Your Name</label>
                          <input type="text" className="form-control" id="exampleInputName" placeholder="Enter email" name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} autoComplete='username' />
                          {formik.touched.name && formik.errors.name ? <div className="text-danger">{formik.errors.name}</div> : null}
                        </div>

                        <div className="form-group">
                          <label htmlFor="email"><i class="fas fa-envelope"></i> Email address</label>
                          <input type="email" className="form-control" id="email" placeholder="Enter email" name='email' value={formik.values.email} onChange={formik.handleChange} autoComplete='username' />
                          {formik.touched.email && formik.errors.email ? <div className="text-danger">{formik.errors.email}</div> : null}
                        </div>
                        {/*
                        <div className="form-group">
                          <label htmlFor="image"><i className="fas fa-solid fa-user"></i> Profile</label>
                          <input type="file" className="form-control" id="image" name='image' onChange={handleImageChange} onBlur={formik.handleBlur} />
                          {formik.touched.image && formik.errors.image ? <div className="text-danger">{formik.errors.image}</div> : null}
                        </div>
                        */}
                        <div className="form-group">
                          <label htmlFor="exampleInputMobile"><i class="fas fa-solid fa-phone"></i>  Mobile</label>
                          <input type="text" className="form-control" id="exampleInputMobile" placeholder="Enter Mobile" name='mobile' value={formik.values.mobile} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                        </div>

                        <div className="form-group">
                          <label htmlFor="exampleInputPassword1"><i className='fas fa-lock'></i> Password</label>
                          <input type={pass ? 'text' : 'password'} className="form-control" id="exampleInputPassword1" placeholder="Password" name='password' value={formik.values.password} onChange={(e) => {formik.handleChange(e);handlePasswordChange(e);}} onBlur={formik.handleBlur} autoComplete='current-password' />
                          <p style={{position: "absolute", top: "63%", right: "23px", transform: "translateY(-40%)", cursor: "pointer"}} onClick={()=>setpass(!pass)}>{(pass) ? <i className='fas fa-solid fa-eye-slash'></i> : <i className='fas fa-eye'></i>}</p>
                          {formik.touched.password && formik.errors.password ? <div className="text-danger">{formik.errors.password}</div> : null}
                          <div className='progress mt-2'>
                            <div className={`progress-bar ${passwordstrength === 0 ? 'bg-danger' :passwordstrength === 1 ? 'bg-warning' : passwordstrength === 2 ? 'bg-info' : passwordstrength === 3 ? 'bg-primary' :  'bg-success'}`} role='progressbar' style={{width : `${(passwordstrength + 1) * 25}%`}} aria-valuenow={(passwordstrength + 1) * 25} aria-valuemin="0" aria-valuemax="100">
                                {passwordstrength === 0 && "0%"}
                                {passwordstrength === 1 && "25%"}
                                {passwordstrength === 2 && "50%"}
                                {passwordstrength === 3 && "75%"}
                                {passwordstrength === 4 && "100%"}
                            </div>
                          </div>
                        </div>
                        <div className="form-group">
                          <label><i className='fas fa-user'></i> Role<span className='text-danger'>*</span></label>
                          <select className="form-control select2 select2-danger" data-dropdown-css-class="select2-danger" name='role' style={{ width: '100%' }} value={formik.values.role} onChange={formik.handleChange} onBlur={formik.handleBlur}>
                            <option>Select Role</option>
                            <option value="admin" selected={formik.values.role === 'admin'}>Admin</option>
                            <option value="subadmin" selected={formik.values.role === 'subadmin'}>SubAdmin</option>
                            <option value="user" selected={formik.values.role === 'user'}>User</option>
                          </select>
                          {formik.touched.role && formik.errors.role ? <div className="text-danger">{formik.errors.role}</div> : null}
                        </div>
                      </div>
                      {/* /.card-body */}
                      <div className="card-footer">
                      {loading ? (
                        <div>
                          <button type="submit" className="btn btn-success" disabled  style={{ position: 'relative', zIndex: 0 }} >   <i className="fas fa-spinner fa-spin" /> Update </button>
                           <div style={{   position: 'absolute',   top: 0,   left: 0,   width: '100%',   height: '100%',   zIndex: 1,   cursor: 'not-allowed' }} /> </div>
                      ) : (
                        <button type="submit" className="btn btn-success">Update</button>
                      )}
                      </div>
                    </form>
                  </div>
                  {/* /.card */}
                </div>
                {/*/.col (left) */}
                {/* right column */}
              </div>
              {/* /.row */}
            </div>{/* /.container-fluid */}
          </section>

        </ModalBody>
        <ModalFooter>
        <Button color="primary" onClick={toggle}>
            Ok
        </Button>{' '}
        <Button color="danger" onClick={toggle2}>Cancel</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>

    {/* /.content-wrapper */}
    <Footer></Footer>
    </div>
    {/* ./wrapper */}
    </div>
    </div>
  );
}

export default AddEditRegisterUser;
