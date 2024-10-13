import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../../Loader';

const Doc = () => {
    const BASE_URL=process.env.REACT_APP_BASE_URL
    const [data, setData] = useState('');
    const [doc, setDoc] = useState('');
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
      document.title="DocumentTation "
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true); 
        setTimeout(async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/documentation`,{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}});
                setData(response.data);
                setDoc(response.data);
            } catch (error) {
                console.error('Error fetching documentation:', error);
            }
            setLoading(false); 
        }, 5000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            setTimeout(async() => {
              const response = await axios.patch(`${BASE_URL}/api/documentation`, { doc },{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}});
              toast.success('Update Successful!');
              setLoading(false)
            }, 3000);
        } catch (error) {
            toast.error('Update Failed.');
            console.error('Error updating documentation:', error);
            setLoading(false)
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'doc') {
            setDoc(value);
        }
    };

    return (
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
                <Header />

                <div className="content-wrapper">
                    {/* Content Header (Page header) */}
                    <div className="content-header">
                        <div className="container-fluid">
                            <div className="row mb-2">
                                <div className="col-sm-12">
                                    <h1 className="m-0 float-start">Documentation</h1>
                                    <section className="content-header">
                                        <div className="container-fluid">
                                            <div className="row mb-2">
                                                <div className="col-sm-6"></div>
                                                <div className="col-sm-6">
                                                    <ol className="breadcrumb float-sm-right">
                                                        <li className="breadcrumb-item">
                                                            <Link to="/admindashboard1">Home</Link>
                                                        </li>
                                                        <li className="breadcrumb-item">
                                                            <Link to="/categories">Back</Link>
                                                        </li>
                                                    </ol>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <br />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main content */}
                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-lg-3 col-6"></div>
                            </div>
                        </div>
                    </section>

                    <section className="content">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-header"></div>
                                        <div className="card-body">
                                           
                                            {loading ? (
                                                <Loader /> 
                                            ) : (
                                                <form onSubmit={handleSubmit}>
                                                    <textarea id="doc" name="doc" rows={30}  cols={80} className="form-control" value={doc} onChange={handleChange}></textarea>
                                                    <div>
                                                    
                                                        <button type="submit" className="btn btn-success"> Update </button>
                                                        
                                                    </div>
                                                </form>
                                            )}
                                            <ToastContainer />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
};

export default Doc;
