import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { DeleteEntity } from "../CRUDENTITY/DeleteEntity";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { StatusEntity } from "../CRUDENTITY/StatusEntity";
import Footer from "../Component/Footer";
import Header from "../Component/Header";

const Categories = () => {
  const navigate = useNavigate();
  const [categorydata, setcategorydata] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const [currentpage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentpage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const totalPages = Math.ceil(filterData.length / recordsPerPage);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);

  useEffect(() => {
    document.title = "Categories";
    handlecategorydata();
  }, []);

  const handlecategorydata = async () => {
    const response = await axios.get("http://localhost:8081/getAllCategorys");
    setcategorydata(response.data);
    setFilterData(response.data);
  };

  // search function
  const searchfunction = (event) => {
    const searchData = event.target.value.toLowerCase().trim();
    if (searchData === "") {
      setFilterData(categorydata);
    } else {
      const filtered = categorydata.filter(
        (item) =>
          (item &&
            item.category_name &&
            item.category_name.toLowerCase().includes(searchData)) ||
          (item && item.url && item.url.toLowerCase().includes(searchData)) ||
          (item &&
            item.meta_title &&
            item.meta_title.toLowerCase().includes(searchData)) ||
          (item &&
            item.meta_description &&
            item.meta_description.toLowerCase().includes(searchData)) ||
          (item &&
            item.meta_keyword &&
            item.meta_keyword.toLowerCase().includes(searchData))
      );
      setFilterData(filtered);
    }
  };

  // edit form
  const handladdedit = (id = null) => {
    navigate("/categoriesaddedit", { state: { id: id } });
  };
  // delete data
  const handledelete = async (id) => {
    DeleteEntity("Category", id);
    // Fetch the updated data from the server and update the local state
    const response = await axios.get("http://localhost:8081/getAllCategorys");

    setcategorydata(response.data);
    setFilterData(response.data);
  };

  const toggleclick = async (id, status) => {
    await StatusEntity("CategoryStatus", id, status, setFilterData, filterData);
  };

  // for pagination
  const prepage = () => {
    if (currentpage > 1) {
      setCurrentPage(currentpage - 1);
    }
  };

  const nextpage = () => {
    if (currentpage < totalPages) {
      setCurrentPage(currentpage + 1);
    }
  };
  const pagechange = (n) => {
    setCurrentPage(n);
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
                    <h1 className="m-0 float-start">Category Table</h1>
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
                      <div className="card-body">
                        <form className="d-flex align-items-center justify-content-end">
                          <div className="input-group">
                            <input
                              className="form-control mr-2"
                              type="search"
                              placeholder="Search using name, url, title etc..."
                              aria-label="Search"
                              onKeyUp={searchfunction}
                            />
                            <div className="input-group-append">
                              <button
                                className="btn btn-outline-success mr-2"
                                type="button"
                              >
                                Search
                              </button>
                              <button
                                className="btn btn-primary "
                                onClick={() => handladdedit()}
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        </form>

                        <div className="table-responsive">
                          <table className="table table-bordered table-striped">
                            <thead>
                              <tr>
                                <th className="bg-dark text-light">SL NO.</th>
                                <th className="bg-dark text-light">
                                  CATEGORY NAME
                                </th>
                                <th className="bg-dark text-light">
                                  PARENT CATEGORY{" "}
                                </th>
                                <th className="bg-dark text-light">
                                  CATEGORY IMAGE
                                </th>
                                <th className="bg-dark text-light">
                                  CATEGORY DISCOUNT
                                </th>
                                <th className="bg-dark text-light">URL</th>
                                <th className="bg-dark text-light">STATUS</th>
                                <th className="bg-dark text-light">ACTIONS</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filterData
                                .slice(
                                  (currentpage - 1) * recordsPerPage,
                                  currentpage * recordsPerPage
                                )
                                .map((item, index) => (
                                  <tr
                                    key={item.id}
                                    className={
                                      item.status === 1 ? "bg-primary" : ""
                                    }
                                  >
                                    <td style={{ width: "1px" }}>
                                      {index +
                                        1 +
                                        (currentpage - 1) * recordsPerPage}
                                    </td>
                                    <td>{item.category_name}</td>
                                    <td>
                                      {/* Check if the category has a parent */}
                                      {item.parent_id ? (
                                        // If the category has a parent, find the parent category in the categorydata array
                                        categorydata.find(
                                          (cat) => cat.id === item.parent_id
                                        )?.category_name || "No Parent"
                                      ) : (
                                        // If the category does not have a parent, display "No Parent"
                                        <span className="badge badge-pill badge-secondary">
                                          No Parent
                                        </span>
                                      )}
                                    </td>

                                    <td>
                                      <Link
                                        to={
                                          `http://localhost:8081/CategoryImage/` +
                                          item.category_image
                                        }
                                        target="_blank"
                                      >
                                        <img
                                          src={
                                            `http://localhost:8081/CategoryImage/` +
                                            item.category_image
                                          }
                                          alt={item.category_name}
                                          width={50}
                                          height={50}
                                        />
                                      </Link>
                                    </td>
                                    <td>{item.category_discount}</td>
                                    <td>{item.url}</td>
                                    <td>
                                      <span
                                        className={`badge badge-${
                                          item.status === 1
                                            ? "success"
                                            : "danger"
                                        }`}
                                      >
                                        {item.status === 1
                                          ? "Active"
                                          : "Inactive"}
                                      </span>
                                    </td>
                                    <td>
                                      <button
                                        className="btn btn-success btn-sm mr-1"
                                        onClick={() => handladdedit(item.id)}
                                      >
                                        <i className="fas fa-pencil-alt"></i>
                                      </button>
                                      <button
                                        className="btn btn-danger btn-sm mr-1"
                                        onClick={() => handledelete(item.id)}
                                      >
                                        <i className="fas fa-trash"></i>
                                      </button>
                                      <button
                                        className="btn btn-dark btn-sm"
                                        onClick={() =>
                                          toggleclick(item.id, item.status)
                                        }
                                      >
                                        <i
                                          className={
                                            item.status === 1
                                              ? "fas fa-toggle-on"
                                              : "fas fa-toggle-off"
                                          }
                                        ></i>
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                          <br></br>
                          <nav className="float-right">
                            <ul className="pagination">
                              <li className="page-item">
                                <button onClick={prepage} className="page-link">
                                  prev
                                </button>
                              </li>
                              {numbers.map((n, i) => (
                                <li
                                  className={`page-item ${
                                    currentpage === n ? "active" : ""
                                  }`}
                                  key={i}
                                >
                                  <button
                                    onClick={() => pagechange(n)}
                                    className="page-link"
                                  >
                                    {n}
                                  </button>
                                </li>
                              ))}
                              <li className="page-item">
                                <button
                                  onClick={nextpage}
                                  className="page-link"
                                >
                                  next
                                </button>
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

          {/* /.content-wrapper */}
          <Footer></Footer>
        </div>
        {/* ./wrapper */}
      </div>
    </div>
  );
};

export default Categories;
