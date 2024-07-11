import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
import ReactImageMagnify from "@blacklab/react-image-magnify";
import Swal from "sweetalert2";
import Header from "../Component/Header";
import Footer from "../Component/Footer";

const AddEditProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state ? location.state.id : null;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [data, setData] = useState({});
  const [productattributedata, setproductattributedata] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setbrands] = useState([]);

  const [productPrice, setProductPrice] = useState(0);
  const [productDiscount, setProductDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);

  const [isFeatured, setIsFeatured] = useState(false); // New state for checkbox
  const [colorname, setcolorname] = useState([]);
  const [imageSrc, setImageSrc] = useState(null);
  // this works when admin choose file but not choosen and they create cancel this time instead of error we shown nothing
  // const [fileDataURL, setFileDataURL] = useState(null);
  const fileinputref = useRef(null); //
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [productImagesPreview, setProductImagesPreview] = useState([]);
  const [allproductsAttributes, setallproductsAttributes] = useState([]);
  const [PImages, setPImages] = useState([]);
  const [dynamicfields, setDynamicFields] = useState([
    { size: "", sku: "", price: "", stock: "" },
  ]);

  const selectFiles = (event) => {
    setSelectedFiles([...event.target.files]);
    const previewImages = Array.from(event.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    setProductImagesPreview(previewImages);
  };

  useEffect(() => {
    document.title = "Addeditproduct";
    if (id) {
      handleProductUpdate(id);
    }
  }, [id]);

  useEffect(() => {
    // Fetch categories from the backend when the component mounts
    fetchCategories();
    productcolor();
    fetchBrands();
  }, []);

  const productcolor = async () => {
    try {
      const response = await axios.get("http://localhost:8081/productcolor");
      setcolorname(response.data);
      // console.log(response.data);
    } catch (error) {}
  };
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`http://localhost:8081/getAllCategorys`);
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBrands=async()=>{
    try {
      const response=await axios.get("http://localhost:8081/getAllBrands");
      setbrands(response.data);
    } catch (error) {
        console.error(error)
    }
  }
  const productimage = (e) => {
    const imagefile = e.target.files;
    setPImages(imagefile);
  };
  const handleProductUpdate = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/productedit/${id}`
      );
      const productdata = response.data.data;

      const response2 = await axios.get(
        `http://localhost:8081/editproductattributes/${id}`
      );
      const productattributes = response2.data.data;
      // console.log(productattributes)
      // console.log(productdata);
      setData(productdata);
      setproductattributedata(productattributes);
      setValue("category_id", productdata.category_id); // Add category_id to FormData
      setValue("product_name", productdata.product_name);
      setValue("brand_id", productdata.brand_id);
      setValue("product_code", productdata.product_code);
      setValue("family_color", productdata.family_color);
      setValue("product_color", productdata.product_color);
      setValue("group_code", productdata.group_code);
      setValue("product_price", productdata.product_price);
      setValue("product_weight", productdata.product_weight);
      setValue("product_discount", productdata.product_discount);
      setValue("discount_type", productdata.discount_type);
      // Calculate final price based on fetched product data
      const calculatedFinalPrice =
        productdata.product_price -
        productdata.product_price * (productdata.product_discount / 100);
      setFinalPrice(calculatedFinalPrice.toFixed(2));
      setValue("final_price", calculatedFinalPrice.toFixed(2));
      setValue("product_video", productdata.product_video);
      setValue("product_image", productdata.product_image);
      setValue("description", productdata.description);
      setValue("washcare", productdata.washcare);
      setValue("keywords", productdata.keywords);
      setValue("fabric", productdata.fabric);
      setValue("pattern", productdata.pattern);
      setValue("sleeve", productdata.sleeve);
      setValue("fit", productdata.fit);
      setValue("meta_keywords", productdata.meta_keywords);
      setValue("meta_description", productdata.meta_description);
      setValue("meta_title", productdata.meta_title);
      setValue("occassion", productdata.occassion);
      setIsFeatured(productdata.is_featured === "Yes");
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (formData) => {
    try {
      const form = new FormData();
      form.append("category_id", formData.category_id); // Add category_id to FormData
      form.append("product_name", formData.product_name);
      form.append("brand_id", formData.brand_id);
      form.append("product_code", formData.product_code);
      form.append("family_color", formData.family_color);
      form.append("product_color", formData.product_color);
      form.append("group_code", formData.group_code);
      form.append("product_price", formData.product_price);
      form.append("product_weight", formData.product_weight);
      form.append("product_discount", formData.product_discount);
      form.append("discount_type", formData.discount_type);
      form.append("final_price", finalPrice); // Use calculated final price
      form.append("product_video", formData.product_video[0]);
      // form.append('product_image', formData.product_image[0]);
      for (let i = 0; i < PImages.length; i++) {
        form.append("product_image", PImages[i]);
      }
      form.append("description", formData.description);
      form.append("washcare", formData.washcare);
      form.append("keywords", formData.keywords);
      form.append("fabric", formData.fabric);
      form.append("pattern", formData.pattern);
      form.append("sleeve", formData.sleeve);
      form.append("fit", formData.fit);
      form.append("meta_keywords", formData.meta_keywords);
      form.append("meta_description", formData.meta_description);
      form.append("meta_title", formData.meta_title);
      form.append("occassion", formData.occassion);
      form.append("is_featured", isFeatured ? "Yes" : "No");

      dynamicfields.forEach((field, index) => {
        form.append(`attributes[${index}][size]`, field.size);
        form.append(`attributes[${index}][sku]`, field.sku);
        form.append(`attributes[${index}][price]`, field.price);
        form.append(`attributes[${index}][stock]`, field.stock);
      });

      const url = id
        ? `http://localhost:8081/updateproducts/${id}`
        : `http://localhost:8081/addproducts`;
      const method = id ? "put" : "post";

      await axios[method](url, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      NotificationManager.success(
        id ? "product updated successfully!" : "product added successfully!"
      );
      navigate("/products");

    } catch (error) {
      console.error(error);
      NotificationManager.error("Error occurred while saving the product.");
    }
  };

  // handle checkbox update
  const handleCheckboxChange = (e) => {
    setIsFeatured(e.target.checked);
  };

  const fabricArray = ["Cotton", "Polyster", "Wool"];
  const sleeveArray = ["Fullsleeve", "Halfsleeve", "Shortsleeve", "Sleeveless"];
  const patternArray = ["Checked", "Plain", "Printed", "Self", "Solid"];
  const fitArray = ["Regular", "Slim"];
  const occasionArray = ["Casual", "Formal"];

  useEffect(() => {
    // Calculate the final price based on product price and discount
    const calculatedFinalPrice =
      productPrice - productPrice * (productDiscount / 100);
    setFinalPrice(calculatedFinalPrice.toFixed(2)); // toFixed(2) for two decimal points
  }, [productPrice, productDiscount]);

  const handlePriceChange = (e) => {
    setProductPrice(parseFloat(e.target.value) || 0);
  };

  const handleDiscountChange = (e) => {
    setProductDiscount(parseFloat(e.target.value) || 0);
  };

  const handleImageChange = (e) => {
    // Access the first file selected by the user from the file input element
    const file = e.target.files[0];

    // Handle the case where no file is selected (e.g., user cancels the file selection)
    if (!file) {
      setImageSrc(null);
      return;
    }

    // Define the list of valid file types
    const validateFiles = [
      "image/png",
      "image/jpeg",
      "image/gif",
      "image/webp",
    ];

    // Check if the selected file type is valid
    if (!validateFiles.includes(file.type)) {
      alert("Please provide only JPEG, PNG, GIF, or WebP images.");
      return;
    }

    // Create a new FileReader instance to read the file
    const reader = new FileReader();

    // Define an event handler to be executed when the file reading operation is complete
    reader.onload = () => {
      // Update the state with the file's data URL
      // This will trigger a re-render and display the image
      setImageSrc(reader.result);
    };

    // Start reading the file as a data URL
    // This will result in the file data being converted to a base64-encoded string
    reader.readAsDataURL(file);
  };

  // image removing

  const handleDeleteImage = () => {
    setImageSrc(null);
    if (fileinputref.current) {
      fileinputref.current.value = "";
      // Force reset input value to ensure the same file can be selected again
      fileinputref.current.type = "text";
      fileinputref.current.type = "file";
    }
  };

  // for dynamic field

  const handleAddField = () => {
    if (dynamicfields.length < 10) {
      setDynamicFields([
        ...dynamicfields,
        { size: "", sku: "", price: "", stock: "" },
      ]);
    } else {
      Swal.fire({
        title: "Maxium limit  Reached",
        text: "A Maxium 10 Fields Allowed",
        icon: "warning",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  const handleChange = (index, event) => {
    const values = [...dynamicfields];
    values[index][event.target.name] = event.target.value;
    setDynamicFields(values);
  };

  const handleRemoveField = (index) => {
    const values = [...dynamicfields];
    values.splice(index, 1);
    setDynamicFields(values);
  };

  const handleChange2 = (index, e) => {
    const newSize = e.target.value;
    console.log(newSize);
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
                    <h1 className="m-0 float-start">Edit/Update Products</h1>
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
                  <div className="card card-primary">
                    <div className="card-header">
                      <h3
                        className="card-title"
                        style={{ width: "100%", fontWeight: "bold" }}
                      >
                        {id ? "Update Products" : "Add Products"}
                      </h3>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="card-body">
                            <div className="form-group text-start">
                              <label htmlFor="category_id">
                                Select Category
                              </label>
                              <select
                                name="category_id"
                                id="category_id"
                                className="form-control"
                                {...register("category_id", { required: true })}
                                value={data.category_id}
                              >
                                <option value="">Select</option>
                                {categories.map((category) => (
                                  <option key={category.id} value={category.id}>
                                    {category.category_name}
                                  </option>
                                ))}
                              </select>
                              {errors.category_id && (
                                <span className="text-danger">
                                  Category is required
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12">
  <div className="card-body">
    <div className="form-group text-start">
      <label htmlFor="brand_id">Select Brand</label>
      <select
        name="brand_id"
        id="brand_id"
        className="form-control"
        {...register("brand_id", { required: true })}
        value={data.id} // Assuming `data` has the correct brand_id
        onChange={(e) => setValue('brand_id', e.target.value)} // Use appropriate state update method if needed
      >
        <option value="">Select</option>
        {brands.map((brand) => (
          <option key={brand.id} value={brand.id}>
            {brand.brand_name}
          </option>
        ))}
      </select>
      {errors.id && (
        <span className="text-danger">
          Category is required
        </span>
      )}
    </div>
  </div>
</div>


                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="card-body">
                            <div className="form-group text-start">
                              <label htmlFor="exampleInputProductName">
                                Product Name{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputProductName"
                                name="product_name"
                                {...register("product_name", {
                                  required: true,
                                })}
                                defaultValue={data.product_name}
                              />
                              {errors.product_name && (
                                <span className="text-danger">
                                  Product Name is required{" "}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="card-body">
                            <div className="form-group text-start">
                              <label htmlFor="exampleInputProductcode">
                                Product code
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputProductcode"
                                name="product_code"
                                {...register("product_code", {
                                  required: true,
                                })}
                                defaultValue={data.product_code}
                              />
                              {errors.product_code && (
                                <span className="text-danger">
                                  product code is required{" "}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="card-body">
                            <div className="form-group text-start">
                              <label htmlFor="exampleInputProductselectid">
                                product color{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <select
                                name="product_color"
                                id="product_color"
                                className="form-control"
                                {...register("product_color", {
                                  required: true,
                                })}
                              >
                                <option value="">Select</option>
                                {colorname.map((color) => (
                                  <option
                                    value={color.colors}
                                    key={color}
                                    selected={
                                      color.colors === data.product_color
                                    }
                                  >
                                    {color.colors}
                                  </option>
                                ))}
                              </select>
                              {errors.product_color && (
                                <span className="text-danger">
                                  product color is required{" "}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="card-body">
                            <div className="form-group text-start">
                              <label htmlFor="exampleInputProductColor">
                                Family Color{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <select
                                name="family_color"
                                id="family_color"
                                className="form-control"
                                {...register("family_color", {
                                  required: true,
                                })}
                              >
                                <option value="">Select</option>
                                {colorname.map((color) => (
                                  <option
                                    value={color.colors}
                                    key={color}
                                    selected={
                                      color.colors === data.family_color
                                    }
                                  >
                                    {color.colors}
                                  </option>
                                ))}
                              </select>
                              {errors.family_color && (
                                <span className="text-danger">
                                  family color is required{" "}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="card-body">
                            <div className="form-group text-start">
                              <label htmlFor="exampleInputProductCode">
                                Group Code{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputProductCode"
                                name="group_code"
                                {...register("group_code", { required: true })}
                                defaultValue={data.group_code}
                              />
                              {errors.group_code && (
                                <span className="text-danger">
                                  group code is required{" "}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="card-body">
                            <div className="form-group text-start">
                              <label htmlFor="exampleInputProductPrice">
                                Product Price{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputProductPrice product_price"
                                name="product_price"
                                {...register("product_price", {
                                  required: true,
                                })}
                                onChange={handlePriceChange}
                                defaultValue={0}
                              />
                              {errors.product_price && (
                                <span className="text-danger">
                                  product price is required{" "}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="card-body">
                            <div className="form-group text-start">
                              <label htmlFor="exampleInputProductWeight">
                                Product Weight{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputProductWeight"
                                name="product_weight"
                                {...register("product_weight", {
                                  required: true,
                                })}
                                defaultValue={data.product_weight}
                              />
                              {errors.product_weight && (
                                <span className="text-danger">
                                  product weight is required{" "}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="card-body">
                            <div className="form-group text-start">
                              <label htmlFor="exampleInputProductDiscount">
                                Product Discount (%)
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputProductDiscount product_discount"
                                name="product_discount"
                                {...register("product_discount", {
                                  required: true,
                                })}
                                onChange={handleDiscountChange}
                                defaultValue={0}
                              />
                              {errors.product_discount && (
                                <span className="text-danger">
                                  Product Discount is required{" "}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="card-body">
                            <div className="form-group text-start">
                              <label htmlFor="exampleInputProductType">
                                Discount Type
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputProductType"
                                name="discount_type"
                                {...register("discount_type", {
                                  required: true,
                                })}
                                defaultValue={data.discount_type}
                              />
                              {errors.discount_type && (
                                <span className="text-danger">
                                  discount type is required{" "}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="card-body">
                            <div className="form-group text-start">
                              <label htmlFor="exampleInputProductPrice">
                                Final Price{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputProductPrice final_price"
                                readOnly
                                value={finalPrice}
                                name="final_price"
                                {...register("final_price", { required: true })}
                                defaultValue={data.final_price}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="card-body">
                            <div className="form-group text-start">
                              <label htmlFor="exampleInputProductVideo">
                                Product Video
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="file"
                                className="form-control"
                                ref={fileinputref}
                                accept="image/jpeg,image/png,image/gif"
                                id="exampleInputProductVideo"
                                name="product_video"
                                {...register("product_video")}
                                onChange={handleImageChange}
                              />
                              {errors.product_video && (
                                <span className="text-danger">
                                  product video is required{" "}
                                </span>
                              )}
                            </div>
                            <div
                              className="d-flex align-items-right"
                              style={{ width: "200px", height: "200px" }}
                            >
                              <div style={{ flex: 1 }}>
                                <ReactImageMagnify
                                  imageProps={{
                                    alt: "",
                                    isFluidWidth: true,
                                    src: imageSrc,
                                  }}
                                  magnifiedImageProps={{
                                    src: imageSrc,
                                    width: 1200,
                                    height: 1800,
                                  }}
                                />
                              </div>
                              <button
                                className="btn btn-danger btn-sm"
                                title="Remove Image"
                                onClick={handleDeleteImage}
                                disabled={!imageSrc}
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="card-body">
                            <div className="form-group text-start">
                              <label htmlFor="exampleInputProductimage">
                                Product image
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="file"
                                className="form-control"
                                id="exampleInputProductimage"
                                name="product_image"
                                multiple
                                {...register("product_image")}
                                onChange={productimage}
                              />
                              <p>Only accepted jpg,jpeg,webp,png and gif</p>
                              <img
                                src={
                                  `http://localhost:8081/productsimage/` +
                                  data.image
                                }
                                alt=""
                              />
                              {errors.product_image && (
                                <span className="text-danger">
                                  product images is required{" "}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="card-body">
                            <div className="field_wrapper">
                              {id ? (
                                <div className="table-responsive">
                                  <table className="table table-bordered table-striped">
                                    <thead>
                                      <tr>
                                        <th className="bg-dark text-light">
                                          Size
                                        </th>
                                        <th className="bg-dark text-light">
                                          SKU
                                        </th>
                                        <th className="bg-dark text-light">
                                          Price
                                        </th>
                                        <th className="bg-dark text-light">
                                          Stock
                                        </th>
                                        <th className="bg-dark text-light">
                                          Action
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {productattributedata.map(
                                        (item, index) => (
                                          <tr key={index}>
                                            <td>
                                              <input
                                                type="text"
                                                className="form-control bg-dark"
                                                name="size"
                                                value={item.size}
                                                onChange={(e) =>
                                                  handleChange2(index, e)
                                                }
                                              />
                                            </td>
                                            <td>
                                              <input
                                                type="text"
                                                className="form-control bg-dark"
                                                value={item.sku}
                                              />
                                            </td>
                                            <td>
                                              <input
                                                type="number"
                                                className="form-control bg-dark"
                                                value={item.price}
                                              />
                                            </td>
                                            <td>
                                              <input
                                                type="number"
                                                className="form-control bg-dark"
                                                value={item.stock}
                                              />
                                            </td>
                                            <td>
                                              <NotificationContainer />
                                              <button className="btn btn-dark btn-sm  mr-1">
                                                <i className="fas  fa-toggle-on"></i>
                                              </button>
                                              <button className="btn btn-danger btn-sm ">
                                                <i className="fas fa-trash"></i>
                                              </button>
                                            </td>
                                          </tr>
                                        )
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              ) : (
                                ""
                              )}
                              <Link
                                href="javascript:void(0);"
                                className="add_button"
                                title="Add field"
                                onClick={handleAddField}
                              >
                                {id ? "" : "Add"}
                              </Link>
                              {dynamicfields.map((field, index) => (
                                <div
                                  key={index}
                                  className="form-group text-start"
                                >
                                  <label htmlFor="">Product Attribute</label>
                                  <input
                                    type="text"
                                    name="size"
                                    placeholder="Size"
                                    style={{ width: "120px" }}
                                    value={field.size}
                                    onChange={(e) => handleChange(index, e)}
                                  />
                                  <input
                                    type="text"
                                    name="sku"
                                    placeholder="Sku"
                                    style={{ width: "120px" }}
                                    value={field.sku}
                                    onChange={(e) => handleChange(index, e)}
                                  />
                                  <input
                                    type="number"
                                    name="price"
                                    placeholder="Price"
                                    style={{ width: "120px" }}
                                    value={field.price}
                                    onChange={(e) => handleChange(index, e)}
                                  />
                                  <input
                                    type="number"
                                    name="stock"
                                    placeholder="Stock"
                                    style={{ width: "120px" }}
                                    value={field.stock}
                                    onChange={(e) => handleChange(index, e)}
                                  />

                                  {index > 0 && (
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveField(index)}
                                      style={{
                                        color: "red",
                                        textDecoration: "none",
                                      }}
                                    >
                                      Remove
                                    </button>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="card-body">
                            <div className="form-group text-start">
                              <label htmlFor="exampleInputProductDescription">
                                Description{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputProductDescription"
                                name="description"
                                {...register("description", { required: true })}
                                defaultValue={data.description}
                              />
                              {errors.description && (
                                <span className="text-danger">
                                  description is required{" "}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="card-body">
                            <div className="form-group text-start">
                              <label htmlFor="exampleInputProductWashCare">
                                WashCare<span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputProductWashCare"
                                name="washcare"
                                {...register("washcare", { required: true })}
                                defaultValue={data.washcare}
                              />
                              {errors.washcare && (
                                <span className="text-danger">
                                  washcare is required{" "}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="card-body">
                            <div className="form-group text-start">
                              <label htmlFor="exampleInputProductKeyWords">
                                KeyWords <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputProductKeyWords"
                                name="keywords"
                                {...register("keywords", { required: true })}
                                defaultValue={data.keywords}
                              />
                              {errors.keywords && (
                                <span className="text-danger">
                                  keywords is required{" "}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="card-body">
                            <div className="form-group text-start">
                              <label htmlFor="exampleInputProductFabric">
                                Fabric<span className="text-danger">*</span>
                              </label>
                              <select
                                name="fabric"
                                id="fabric"
                                className="form-control"
                                {...register("fabric", { required: true })}
                              >
                                <option value="">Select</option>
                                {fabricArray.map((fabricArray) => (
                                  <option key={fabricArray} value={fabricArray}>
                                    {fabricArray}
                                  </option>
                                ))}
                              </select>
                              {errors.fabric && (
                                <span className="text-danger">
                                  fabric is required{" "}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="card-body">
                            <div className="form-group text-start">
                              <label htmlFor="exampleInputProductPattern">
                                Pattern <span className="text-danger">*</span>
                              </label>
                              <select
                                name="pattern"
                                id="pattern"
                                {...register("pattern", { required: true })}
                                className="form-control"
                              >
                                <option value="">Select</option>
                                {patternArray.map((patternArray) => (
                                  <option
                                    value={patternArray}
                                    key={patternArray}
                                  >
                                    {patternArray}
                                  </option>
                                ))}
                              </select>
                              {errors.pattern && (
                                <span className="text-danger">
                                  pattern is required{" "}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="card-body">
                            <div className="form-group text-start">
                              <label htmlFor="exampleInputProductsleeve">
                                Sleeve<span className="text-danger">*</span>
                              </label>
                              <select
                                name="sleeve"
                                id="sleeve"
                                className="form-control"
                                {...register("sleeve", { required: true })}
                              >
                                <option value="">Select</option>
                                {sleeveArray.map((sleeveArray) => (
                                  <option value={sleeveArray} key={sleeveArray}>
                                    {sleeveArray}
                                  </option>
                                ))}
                              </select>
                              {errors.sleeve && (
                                <span className="text-danger">
                                  sleeve is required{" "}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="card-body">
                            <div className="form-group text-start">
                              <label htmlFor="exampleInputProductfit">
                                Fit <span className="text-danger">*</span>
                              </label>
                              <select
                                name="fit"
                                id="fit"
                                className="form-control"
                                {...register("fit", { required: true })}
                              >
                                <option value="">Select</option>
                                {fitArray.map((fitArray) => (
                                  <option value={fitArray} key={fitArray}>
                                    {fitArray}
                                  </option>
                                ))}
                              </select>
                              {errors.fit && (
                                <span className="text-danger">
                                  fit is required{" "}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="card-body">
                            <div className="form-group text-start">
                              <label htmlFor="exampleInputProductoccassion">
                                Occasion<span className="text-danger">*</span>
                              </label>
                              <select
                                name="occassion"
                                id="occassion"
                                className="form-control"
                                {...register("occassion", { required: true })}
                              >
                                <option value="">Select</option>
                                {occasionArray.map((occasionArray) => (
                                  <option
                                    value={occasionArray}
                                    key={occasionArray}
                                  >
                                    {occasionArray}
                                  </option>
                                ))}
                              </select>
                              {errors.occassion && (
                                <span className="text-danger">
                                  occassion is required{" "}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="card-body">
                            <div className="form-group text-start">
                              <label htmlFor="exampleInputProductmeta_title">
                                Meta Title{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputProductmeta_title"
                                name="meta_title"
                                {...register("meta_title", { required: true })}
                                defaultValue={data.meta_title}
                              />
                              {errors.meta_title && (
                                <span className="text-danger">
                                  meta title is required{" "}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="card-body">
                            <div className="form-group text-start">
                              <label htmlFor="exampleInputProductmeta_description">
                                Meta Description
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputProductmeta_description"
                                name="meta_description"
                                {...register("meta_description", {
                                  required: true,
                                })}
                                defaultValue={data.meta_description}
                              />
                              {errors.meta_description && (
                                <span className="text-danger">
                                  meta description is required{" "}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="card-body">
                            <div className="form-group text-start">
                              <label htmlFor="exampleInputProductmeta_title">
                                Meta Keywords{" "}
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="exampleInputProductmeta_title"
                                name="meta_keywords"
                                {...register("meta_keywords", {
                                  required: true,
                                })}
                                defaultValue={data.meta_keywords}
                              />
                              {errors.meta_keywords && (
                                <span className="text-danger">
                                  Meta Keywords is required{" "}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="card-body">
                            <div className="form-group text-start">
                              <label htmlFor="exampleInputProductis_featured">
                                Is Featured
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                type="checkbox"
                                id="exampleInputProductis_featured"
                                name="is_featured"
                                {...register("is_featured")}
                                checked={isFeatured}
                                onChange={handleCheckboxChange}
                              />
                              {errors.is_featured && (
                                <span className="text-danger">
                                  Feature is required{" "}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="text-start">
                        <button type="submit" className="btn btn-primary">
                          {id ? "Update " : "Submit"}
                        </button>
                      </div>
                    </form>
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

export default AddEditProducts;
