import React, { useEffect, useState } from 'react'
import Header from '../Component/Header'
import Footer from '../Component/Footer'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity,decrementQuantity } from './redux/features/productSlice'

const ProductDetails = () => {
  const {id}=useParams();
  // console.log(id)
  const [listproduct, setlistProduct] = useState([]);
  const dispatch=useDispatch();
  const quantity=useSelector(state=>state.product.quantity);

  // increment or decrement product quantity
  const handleIncrement=()=>{
    dispatch(incrementQuantity());
    
  }
  const handleDecrement=()=>{
    dispatch(decrementQuantity());
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const response = await axios.get(`http://localhost:8081/productDetails/49`);
    // const response = await axios.get(`http://localhost:8081/listingproduct/${id}`);
    setlistProduct(response.data[0]);
    // console.log(listproduct)
  };

  return (
    <div>
        <div>
    <div className="preloader is-active">
      <div className="preloader__wrap">
        <img
          src="./frontend/images/preloader.png"
          alt=""
          className="preloader__img"
        />
      </div>
    </div>
    {/*====== Main App ======*/}
    <div id="app">
      {/*====== Main Header ======*/}
      <Header></Header>
      {/*====== End - Main Header ======*/}
      {/*====== App Content ======*/}
      <br />
      <div className="app-content">
  {/*====== Section 1 ======*/}
  <div className="u-s-p-t-10">
    <div className="container">
      <div className="row">
        <div className="col-lg-5">
          {/*====== Product Breadcrumb ======*/}
          <div className="pd-breadcrumb u-s-m-b-30">
            <ul className="pd-breadcrumb__list">
              <li className="has-separator">
                <a href="index.hml">Home</a></li>
              <li className="has-separator">
                <a href="shop-side-version-2.html">{listproduct.parent_id}</a></li>
              <li className="has-separator">
                <a href="shop-side-version-2.html">{listproduct.category_name}</a></li>
              <li className="is-marked">
                <a href="shop-side-version-2.html">{listproduct.product_name}</a></li>
            </ul>
          </div>
          {/*====== End - Product Breadcrumb ======*/}
          {/*====== Product Detail Zoom ======*/}
          <div className="pd u-s-m-b-30">
            <div className="slider-fouc pd-wrap">
              <div id="pd-o-initiate">
                {/* <div className="pd-o-img-wrap" data-src={`http://localhost:8081/productsimage/`+listproduct.image}>
                  <img className="u-img-fluid" src={`http://localhost:8081/productsimage/`+listproduct.image} data-zoom-image={`http://localhost:8081/productsimage/`+listproduct.image} alt="" />
                </div> */}
                <div className="pd-o-img-wrap" data-src={'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg'}>
                  <img className="u-img-fluid" src={'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg'} data-zoom-image={'https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg'} alt="" />
                </div>
                
              </div>
              <span className="pd-text">Click for larger zoom</span>
            </div>
            <div className="u-s-m-t-15">
              <div className="slider-fouc">
                <div id="pd-o-thumbnail">
                  <div>
                    <img className="u-img-fluid" src="https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg" alt="" />
                  </div>
                  <div>
                    <img className="u-img-fluid" src="images/product/sitemakers-tshirt-large-2.png" alt />
                  </div>
                  <div>
                    <img className="u-img-fluid" src="images/product/sitemakers-tshirt-large-3.png" alt />
                  </div>
                  <div>
                    <img className="u-img-fluid" src="images/product/sitemakers-tshirt-large-4.png" alt />
                  </div>
                  <div>
                    <img className="u-img-fluid" src="images/product/sitemakers-tshirt-large-5.png" alt />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*====== End - Product Detail Zoom ======*/}
        </div>
        <div className="col-lg-7">
          {/*====== Product Right Side Details ======*/}
          <div className="pd-detail">
            <div>
              <span className="pd-detail__name">{listproduct.product_name}</span></div>
            <div>
              <div className="pd-detail__inline">
                <span className="pd-detail__price">₹{listproduct.final_price}.00</span>
                <span className="pd-detail__discount">({listproduct.product_discount}% OFF)</span><del className="pd-detail__del">₹{listproduct.product_price}.00</del></div>
            </div>
            <div className="u-s-m-b-15">
              <div className="pd-detail__rating gl-rating-style"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" />
                <span className="pd-detail__review u-s-m-l-4">
                  <a data-click-scroll="#view-review">25 Reviews</a></span></div>
            </div>
            <div className="u-s-m-b-15">
              <div className="pd-detail__inline">
                <span className="pd-detail__stock">{listproduct.stock} in stock</span>
                <span className="pd-detail__left">Only 2 left</span></div>
            </div>
            <div className="u-s-m-b-15">
              <span className="pd-detail__preview-desc">{listproduct.description}.</span></div>
            <div className="u-s-m-b-15">
              <div className="pd-detail__inline">
                <span className="pd-detail__click-wrap"><i className="far fa-heart u-s-m-r-6" />
                  <a href="signin.html">Add to Wishlist</a>
                </span>
              </div>
            </div>
            <div className="u-s-m-b-15">
              <ul className="pd-social-list">
                <li>
                  <a className="s-fb--color-hover" href="#"><i className="fab fa-facebook-f" /></a></li>
                <li>
                  <a className="s-tw--color-hover" href="#"><i className="fab fa-twitter" /></a></li>
                <li>
                  <a className="s-insta--color-hover" href="#"><i className="fab fa-instagram" /></a></li>
                <li>
                  <a className="s-wa--color-hover" href="#"><i className="fab fa-whatsapp" /></a></li>
                <li>
                  <a className="s-gplus--color-hover" href="#"><i className="fab fa-google-plus-g" /></a></li>
              </ul>
            </div>
            <div className="u-s-m-b-15">
              <form className="pd-detail__form">
                <div className="u-s-m-b-15">
                  <span className="pd-detail__label u-s-m-b-8 text-start">Color:</span>
                  <div className="pd-detail__color">
                    <div className="color__radio">
                      <input type="radio" id="jet" name="color" defaultChecked />
                      <label className="color__radio-label" htmlFor="jet" style={{backgroundColor: '#000000'}} /></div>
                    <a href="product-detail2.html"><div className="color__radio">
                        <label className="color__radio-label" htmlFor="folly" style={{backgroundColor: '#735240'}} />
                      </div></a>
                    <a href="product-detail2.html"><div className="color__radio">
                        <label className="color__radio-label" htmlFor="yellow" style={{backgroundColor: '#158F8B'}} />
                      </div></a>
                    <a href="product-detail2.html"><div className="color__radio">
                        <label className="color__radio-label" htmlFor="granite-gray" style={{backgroundColor: '#FC2767'}} />
                      </div></a>
                    <a href="product-detail2.html"><div className="color__radio">
                        <label className="color__radio-label" htmlFor="space-cadet" style={{backgroundColor: '#5370FE'}} />
                      </div></a>
                  </div>
                </div>
                <div className="u-s-m-b-15">
                  <span className="pd-detail__label u-s-m-b-8 text-start">Size:</span>
                  <div className="pd-detail__size">
                    <div className="size__radio">
                      <input type="radio" id="xs" name="size" defaultChecked />
                      <label className="size__radio-label" htmlFor="xs">XS</label></div>
                    <div className="size__radio">
                      <input type="radio" id="small" name="size" />
                      <label className="size__radio-label" htmlFor="xxl">Small</label></div>
                    <div className="size__radio">
                      <input type="radio" id="medium" name="size" />
                      <label className="size__radio-label" htmlFor="medium">Medium</label></div>
                    <div className="size__radio">
                      <input type="radio" id="large" name="size" />
                      <label className="size__radio-label" htmlFor="xxl">Large</label></div>
                    <div className="size__radio">
                      <input type="radio" id="xl" name="size" />
                      <label className="size__radio-label" htmlFor="xl">XL</label></div>
                    <div className="size__radio">
                      <input type="radio" id="xxl" name="size" />
                      <label className="size__radio-label" htmlFor="xxl">XXL</label></div>
                  </div>
                </div>
                <div className="pd-detail-inline-2">
                  <div className="u-s-m-b-15">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <button className="btn btn-outline-secondary" type="button" onClick={handleDecrement}>
                          <i className="fas fa-minus"></i>
                        </button>
                      </div>
                      <input
                        className="form-control text-center"
                        type="text"
                        value={quantity}
                        readOnly
                        data-min={1}
                        data-max={1000}
                      />
                      <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={handleIncrement}>
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                      
                    </div>
                  </div>
                  <div className="u-s-m-b-15">
                    <button className="btn btn--e-brand-b-2 btn btn-primary" type="submit">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="u-s-m-b-15">
              <span className="pd-detail__label u-s-m-b-8">Product Policy:</span>
              <ul className="pd-detail__policy-list text-start">
                <li><i className="fas fa-check-circle u-s-m-r-8" />
                  <span>Buyer Protection.</span></li>
                <li><i className="fas fa-check-circle u-s-m-r-8" />
                  <span>Full Refund if you don't receive your order.</span></li>
                <li><i className="fas fa-check-circle u-s-m-r-8" />
                  <span>Returns accepted if product not as described.</span></li>
              </ul>
            </div>
          </div>
          {/*====== End - Product Right Side Details ======*/}
        </div>
      </div>
    </div>
  </div>
  {/*====== Product Detail Tab ======*/}
  <div className="u-s-p-y-90">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="pd-tab">
            <div className="u-s-m-b-30">
              <ul className="nav pd-tab__list">
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#pd-desc">DESCRIPTION</a></li>
                <li className="nav-item">
                  <a className="nav-link" data-toggle="tab" href="#pd-tag">VIDEO</a></li>
                <li className="nav-item">
                  <a className="nav-link active" id="view-review" data-toggle="tab" href="#pd-rev">REVIEWS
                    <span>(25)</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="tab-content">
              {/*====== Tab 1 ======*/}
              <div className="tab-pane" id="pd-desc">
                <div className="pd-tab__desc">
                  <div className="u-s-m-b-15">
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                  </div>
                  <div className="u-s-m-b-30"><iframe src="https://www.youtube.com/embed/qKqSBm07KZk" allowFullScreen /></div>
                  <div class="u-s-m-b-30">
                    <ul>
                         <li><i class="fas fa-check u-s-m-r-8 "></i>

                            <span>Buyer Protection.</span></li>
                        <li><i class="fas fa-check u-s-m-r-8"></i>

                            <span>Full Refund if you don't receive your order.</span></li>
                        <li><i class="fas fa-check u-s-m-r-8"></i>

                            <span>Returns accepted if product not as described.</span>
                        </li>
                    </ul>
                </div> 
                  <div className="u-s-m-b-15">
                    <h4>PRODUCT INFORMATION</h4>
                  </div>
                  <div className="u-s-m-b-15">
                    <div className="pd-table gl-scroll">
                      <table>
                        <tbody>
                          <tr>
                            <td>Product Code</td>
                            <td><b className='text-dark'>{listproduct.group_code ? listproduct.group_code :'RC001'}</b></td>
                          </tr>
                          <tr>
                            <td>Product Color</td>
                            <td><b className='text-dark'>{listproduct.product_color ? listproduct.product_color :'RC001'}</b>Red</td>
                          </tr>
                          <tr>
                            <td>Fabric</td>
                            <td><b className='text-dark'>{listproduct.fabric ? listproduct.fabric :'Cotton'}</b></td>
                          </tr>
                          <tr>
                            <td>Sleeve</td>
                            <td><b className='text-dark'>{listproduct.sleeve ? listproduct.sleeve :'Long Sleeve'}</b></td>
                          </tr>
                          <tr>
                            <td>Fit</td>
                            <td><b className='text-dark'>{listproduct.fit ? listproduct.fit :'Regular'}</b></td>
                          </tr>
                          <tr>
                            <td>Neck</td>
                            <td><b className='text-dark'>{listproduct.group_code ? listproduct.group_code :'RC001'}</b></td>
                          </tr>
                          <tr>
                            <td>Occasion</td>
                            <td><b className='text-dark'>{listproduct.occassion ? listproduct.occassion :'Casual'}</b></td>
                          </tr>
                          <tr>
                            <td>Shipping Weight (Grams)</td>
                            <td><b className='text-dark'>{listproduct.product_weight ? listproduct.product_weight.replace(/\D/g,'') :'0.00'}</b></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              {/*====== End - Tab 1 ======*/}
              {/*====== Tab 2 ======*/}
              <div className="tab-pane" id="pd-tag">
                <div className="pd-tab__tag">
                  <h2 className="u-s-m-b-15">PRODUCT VIDEO</h2>
                  <div className="u-s-m-b-15">
                    <video width={400} controls>
                      <source src="video/sample.mp4" type="video/mp4" />
                      Your browser does not support HTML video.
                    </video>
                  </div>
                  <span className="gl-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>
                </div>
              </div>
              {/*====== End - Tab 2 ======*/}
              {/*====== Tab 3 ======*/}
              <div className="tab-pane fade show active" id="pd-rev">
                <div className="pd-tab__rev">
                  <div className="u-s-m-b-30">
                    <div className="pd-tab__rev-score">
                      <div className="u-s-m-b-8">
                        <h2>25 Reviews - 4.6 (Overall)</h2>
                      </div>
                      <div className="gl-rating-style-2 u-s-m-b-8"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" /></div>
                      <div className="u-s-m-b-8">
                        <h4>We want to hear from you!</h4>
                      </div>
                      <span className="gl-text">Tell us what you think about this item</span>
                    </div>
                  </div>
                  <div className="u-s-m-b-30">
                    <form className="pd-tab__rev-f1">
                      <div className="rev-f1__group">
                        <div className="u-s-m-b-15">
                          <h2>25 Review(s) for Double Shade Black Grey Casual T-Shirt</h2>
                        </div>
                        <div className="u-s-m-b-15">
                          <label htmlFor="sort-review" /><select className="select-box select-box--primary-style" id="sort-review">
                            <option selected>Sort by: Best Rating</option>
                            <option>Sort by: Worst Rating</option>
                          </select></div>
                      </div>
                      <div className="rev-f1__review">
                        <div className="review-o u-s-m-b-15">
                          <div className="review-o__info u-s-m-b-8">
                            <span className="review-o__name">Good Product</span>
                            <span className="review-o__date">22 July 2023 10:57:43</span></div>
                          <div className="review-o__rating gl-rating-style u-s-m-b-8"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="far fa-star" />
                            <span>(4)</span></div>
                          <p className="review-o__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </div>
                        <div className="review-o u-s-m-b-15">
                          <div className="review-o__info u-s-m-b-8">
                            <span className="review-o__name">Good Product</span>
                            <span className="review-o__date">22 July 2023 10:57:43</span></div>
                          <div className="review-o__rating gl-rating-style u-s-m-b-8"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="far fa-star" />
                            <span>(4)</span></div>
                          <p className="review-o__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </div>
                        <div className="review-o u-s-m-b-15">
                          <div className="review-o__info u-s-m-b-8">
                            <span className="review-o__name">Good Product</span>
                            <span className="review-o__date">22 July 2023 10:57:43</span></div>
                          <div className="review-o__rating gl-rating-style u-s-m-b-8"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="far fa-star" />
                            <span>(4)</span></div>
                          <p className="review-o__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="u-s-m-b-30">
                    <form className="pd-tab__rev-f2">
                      <h2 className="u-s-m-b-15">Add a Review</h2>
                      <span className="gl-text u-s-m-b-15">Your email address will not be published. Required fields are marked *</span>
                      <div className="u-s-m-b-30">
                        <div className="rev-f2__table-wrap gl-scroll">
                          <table className="rev-f2__table">
                            <thead>
                              <tr>
                                <th>
                                  <div className="gl-rating-style-2"><i className="fas fa-star" />
                                    <span>(1)</span></div>
                                </th>
                                <th>
                                  <div className="gl-rating-style-2"><i className="fas fa-star" /><i className="fas fa-star-half-alt" />
                                    <span>(1.5)</span></div>
                                </th>
                                <th>
                                  <div className="gl-rating-style-2"><i className="fas fa-star" /><i className="fas fa-star" />
                                    <span>(2)</span></div>
                                </th>
                                <th>
                                  <div className="gl-rating-style-2"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" />
                                    <span>(2.5)</span></div>
                                </th>
                                <th>
                                  <div className="gl-rating-style-2"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" />
                                    <span>(3)</span></div>
                                </th>
                                <th>
                                  <div className="gl-rating-style-2"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" />
                                    <span>(3.5)</span></div>
                                </th>
                                <th>
                                  <div className="gl-rating-style-2"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" />
                                    <span>(4)</span></div>
                                </th>
                                <th>
                                  <div className="gl-rating-style-2"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" />
                                    <span>(4.5)</span></div>
                                </th>
                                <th>
                                  <div className="gl-rating-style-2"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" />
                                    <span>(5)</span></div>
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  {/*====== Radio Box ======*/}
                                  <div className="radio-box">
                                    <input type="radio" id="star-1" name="rating" />
                                    <div className="radio-box__state radio-box__state--primary">
                                      <label className="radio-box__label" htmlFor="star-1" /></div>
                                  </div>
                                  {/*====== End - Radio Box ======*/}
                                </td>
                                <td>
                                  {/*====== Radio Box ======*/}
                                  <div className="radio-box">
                                    <input type="radio" id="star-1.5" name="rating" />
                                    <div className="radio-box__state radio-box__state--primary">
                                      <label className="radio-box__label" htmlFor="star-1.5" /></div>
                                  </div>
                                  {/*====== End - Radio Box ======*/}
                                </td>
                                <td>
                                  {/*====== Radio Box ======*/}
                                  <div className="radio-box">
                                    <input type="radio" id="star-2" name="rating" />
                                    <div className="radio-box__state radio-box__state--primary">
                                      <label className="radio-box__label" htmlFor="star-2" /></div>
                                  </div>
                                  {/*====== End - Radio Box ======*/}
                                </td>
                                <td>
                                  {/*====== Radio Box ======*/}
                                  <div className="radio-box">
                                    <input type="radio" id="star-2.5" name="rating" />
                                    <div className="radio-box__state radio-box__state--primary">
                                      <label className="radio-box__label" htmlFor="star-2.5" /></div>
                                  </div>
                                  {/*====== End - Radio Box ======*/}
                                </td>
                                <td>
                                  {/*====== Radio Box ======*/}
                                  <div className="radio-box">
                                    <input type="radio" id="star-3" name="rating" />
                                    <div className="radio-box__state radio-box__state--primary">
                                      <label className="radio-box__label" htmlFor="star-3" /></div>
                                  </div>
                                  {/*====== End - Radio Box ======*/}
                                </td>
                                <td>
                                  {/*====== Radio Box ======*/}
                                  <div className="radio-box">
                                    <input type="radio" id="star-3.5" name="rating" />
                                    <div className="radio-box__state radio-box__state--primary">
                                      <label className="radio-box__label" htmlFor="star-3.5" /></div>
                                  </div>
                                  {/*====== End - Radio Box ======*/}
                                </td>
                                <td>
                                  {/*====== Radio Box ======*/}
                                  <div className="radio-box">
                                    <input type="radio" id="star-4" name="rating" />
                                    <div className="radio-box__state radio-box__state--primary">
                                      <label className="radio-box__label" htmlFor="star-4" /></div>
                                  </div>
                                  {/*====== End - Radio Box ======*/}
                                </td>
                                <td>
                                  {/*====== Radio Box ======*/}
                                  <div className="radio-box">
                                    <input type="radio" id="star-4.5" name="rating" />
                                    <div className="radio-box__state radio-box__state--primary">
                                      <label className="radio-box__label" htmlFor="star-4.5" /></div>
                                  </div>
                                  {/*====== End - Radio Box ======*/}
                                </td>
                                <td>
                                  {/*====== Radio Box ======*/}
                                  <div className="radio-box">
                                    <input type="radio" id="star-5" name="rating" />
                                    <div className="radio-box__state radio-box__state--primary">
                                      <label className="radio-box__label" htmlFor="star-5" /></div>
                                  </div>
                                  {/*====== End - Radio Box ======*/}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="rev-f2__group">
                        <div className="u-s-m-b-15">
                          <label className="gl-label" htmlFor="reviewer-text">YOUR REVIEW *</label><textarea className="text-area text-area--primary-style" id="reviewer-text" defaultValue={""} /></div>
                        <div>
                          <p className="u-s-m-b-30">
                            <label className="gl-label" htmlFor="reviewer-name">YOUR NAME *</label>
                            <input className="input-text input-text--primary-style" type="text" id="reviewer-name" /></p>
                          <p className="u-s-m-b-30">
                            <label className="gl-label" htmlFor="reviewer-email">YOUR EMAIL *</label>
                            <input className="input-text input-text--primary-style" type="text" id="reviewer-email" /></p>
                          <p className="u-s-m-b-30">
                            <label className="gl-label" htmlFor="review-title">REVIEW TITLE *</label>
                            <input className="input-text input-text--primary-style" type="text" id="review-title" /></p>
                        </div>
                      </div>
                      <div>
                        <button className="btn btn--e-brand-shadow btn btn-success" type="submit">SUBMIT</button></div>
                    </form>
                  </div>
                </div>
              </div>
              {/*====== End - Tab 3 ======*/}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/*====== End - Product Detail Tab ======*/}
  <div className="u-s-p-b-90">
    {/*====== Section Intro ======*/}
    <div className="section__intro u-s-m-b-46">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section__text-wrap">
              <h1 className="section__heading u-c-secondary u-s-m-b-12">CUSTOMER ALSO VIEWED</h1>
              <span className="section__span u-c-grey">PRODUCTS THAT CUSTOMER VIEWED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/*====== End - Section Intro ======*/}
    {/*====== Section Content ======*/}
    <div className="section__content">
      <div className="container">
        <div className="slider-fouc">
          <div className="owl-carousel product-slider" data-item={4}>
            <div className="u-s-m-b-30">
              <div className="product-o product-o--hover-on">
                <div className="product-o__wrap">
                  <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                    <img className="aspect__img" src="images/product/sitemakers-tshirt.png" alt />
                  </a>
                </div>
                <span className="product-o__category">
                  <a href="shop-side-version-2.html">Brand Name</a></span>
                <span className="product-o__name">
                  <a href="product-detail.html">Product Name</a></span>
                <div className="product-o__rating gl-rating-style"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" />
                  <span className="product-o__review">(20)</span></div>
                <span className="product-o__price">₹900.00
                  <span className="product-o__discount">₹1000.00</span></span>
              </div>
            </div>
            <div className="u-s-m-b-30">
              <div className="product-o product-o--hover-on">
                <div className="product-o__wrap">
                  <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                    <img className="aspect__img" src="images/product/sitemakers-tshirt.png" alt />
                  </a>
                </div>
                <span className="product-o__category">
                  <a href="shop-side-version-2.html">Brand Name</a></span>
                <span className="product-o__name">
                  <a href="product-detail.html">Product Name</a></span>
                <div className="product-o__rating gl-rating-style"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" />
                  <span className="product-o__review">(20)</span></div>
                <span className="product-o__price">₹900.00
                  <span className="product-o__discount">₹1000.00</span></span>
              </div>
            </div>
            <div className="u-s-m-b-30">
              <div className="product-o product-o--hover-on">
                <div className="product-o__wrap">
                  <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                    <img className="aspect__img" src="images/product/sitemakers-tshirt.png" alt />
                  </a>
                </div>
                <span className="product-o__category">
                  <a href="shop-side-version-2.html">Brand Name</a></span>
                <span className="product-o__name">
                  <a href="product-detail.html">Product Name</a></span>
                <div className="product-o__rating gl-rating-style"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" />
                  <span className="product-o__review">(20)</span></div>
                <span className="product-o__price">₹900.00
                  <span className="product-o__discount">₹1000.00</span></span>
              </div>
            </div>
            <div className="u-s-m-b-30">
              <div className="product-o product-o--hover-on">
                <div className="product-o__wrap">
                  <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                    <img className="aspect__img" src="images/product/sitemakers-tshirt.png" alt />
                  </a>
                </div>
                <span className="product-o__category">
                  <a href="shop-side-version-2.html">Brand Name</a></span>
                <span className="product-o__name">
                  <a href="product-detail.html">Product Name</a></span>
                <div className="product-o__rating gl-rating-style"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" />
                  <span className="product-o__review">(20)</span></div>
                <span className="product-o__price">₹900.00
                  <span className="product-o__discount">₹1000.00</span></span>
              </div>
            </div>
            <div className="u-s-m-b-30">
              <div className="product-o product-o--hover-on">
                <div className="product-o__wrap">
                  <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                    <img className="aspect__img" src="images/product/sitemakers-tshirt.png" alt />
                  </a>
                </div>
                <span className="product-o__category">
                  <a href="shop-side-version-2.html">Brand Name</a></span>
                <span className="product-o__name">
                  <a href="product-detail.html">Product Name</a></span>
                <div className="product-o__rating gl-rating-style"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" />
                  <span className="product-o__review">(20)</span></div>
                <span className="product-o__price">₹900.00
                  <span className="product-o__discount">₹1000.00</span></span>
              </div>
            </div>
            <div className="u-s-m-b-30">
              <div className="product-o product-o--hover-on">
                <div className="product-o__wrap">
                  <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                    <img className="aspect__img" src="images/product/sitemakers-tshirt.png" alt />
                  </a>
                </div>
                <span className="product-o__category">
                  <a href="shop-side-version-2.html">Brand Name</a></span>
                <span className="product-o__name">
                  <a href="product-detail.html">Product Name</a></span>
                <div className="product-o__rating gl-rating-style"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" />
                  <span className="product-o__review">(20)</span></div>
                <span className="product-o__price">₹900.00
                  <span className="product-o__discount">₹1000.00</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/*====== End - Section Content ======*/}
  </div>
  {/*====== End - Section 1 ======*/}
</div>

      

    
      {/*====== Main Footer ======*/}
      <br />
      <Footer></Footer>
      
      {/*====== Modal Section ======*/}
      {/*====== Newsletter Subscribe Modal ======*/}
      <div className="modal fade new-l" id="newsletter-modal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content modal--shadow">
            <button
              className="btn new-l__dismiss fas fa-times"
              type="button"
              data-dismiss="modal"
            />
            <div className="modal-body">
              <div className="row u-s-m-x-0">
                <div className="col-lg-6 new-l__col-1 u-s-p-x-0">
                  <a
                    className="new-l__img-wrap u-d-block"
                    href="shop-side-version-2.html"
                  >
                    <img
                      className="u-img-fluid u-d-block"
                      src="./frontend/images/newsletter/subscribe-now.png"
                      alt=""
                    />
                  </a>
                </div>
                <div className="col-lg-6 new-l__col-2">
                  <div className="new-l__section u-s-m-t-30">
                    <div className="u-s-m-b-8 new-l--center">
                      <h3 className="new-l__h3">Newsletter</h3>
                    </div>
                    <div className="u-s-m-b-30 new-l--center">
                      <p className="new-l__p1">
                        Subscribe for emails to get the scoop on new
                        arrivals, special sales and more.
                      </p>
                    </div>
                    <form className="new-l__form">
                      <div className="u-s-m-b-15">
                        <input
                          className="news-l__input"
                          type="text"
                          placeholder="E-mail Address"
                        />
                      </div>
                      <div className="u-s-m-b-15">
                        <button
                          className="btn btn--e-brand-b-2"
                          type="submit"
                        >
                          Subscribe!
                        </button>
                      </div>
                    </form>
                    <div className="u-s-m-b-15 new-l--center">
                      <p className="new-l__p2">
                        By Signing up, you agree to receive Reshop offers,
                        <br />
                        promotions and other commercial messages. You may
                        unsubscribe at any time.
                      </p>
                    </div>
                    <div className="u-s-m-b-15 new-l--center">
                      <Link className="new-l__link" data-dismiss="modal">
                        No Thanks
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*====== End - Newsletter Subscribe Modal ======*/}
      {/*====== End - Modal Section ======*/}
    </div>
    {/*====== End - Main App ======*/}
    {/*====== Google Analytics: change UA-XXXXX-Y to be your site's ID ======*/}
        </div>
    </div>
  )
}

export default ProductDetails
