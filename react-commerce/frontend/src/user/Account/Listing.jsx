import React, { useEffect, useState } from 'react'
import Footer from '../Component/Footer'
import Header from '../Component/Header'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

const Listing = () => {
  const { id }=useParams();
  const [listingproduct,setlistingproduct]=useState([]);

  useEffect(()=>{
    const fetchListingProduct=async()=>{
      try {
        const response=await axios.get(`http://localhost:8081/listingproduct/${id}`);
        setlistingproduct(response.data)
        console.log(listingproduct)
      } catch (error) {
          console.error("Error fetching the product details:", error);
      }
    }
    fetchListingProduct();
  },[id])
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
      <br />
      <div className="app-content">
      {/*====== Section 1 ======*/}
      <div className="u-s-p-y-10">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-12">
              <div className="shop-w-master">
                <h1 className="shop-w-master__heading u-s-m-b-30"><i className="fas fa-filter u-s-m-r-8" />
                  <span>FILTERS</span></h1>
                <div className="shop-w-master__sidebar">
                  <div className="u-s-m-b-30">
                    <div className="shop-w shop-w--style">
                      <div className="shop-w__intro-wrap">
                        <h1 className="shop-w__h">CATEGORY</h1>
                        <span className="fas fa-minus shop-w__toggle" data-target="#s-category" data-toggle="collapse" />
                      </div>
                      <div className="shop-w__wrap collapse show" id="s-category">
                        <ul className="shop-w__category-list gl-scroll">
                          <li className="has-list">
                            <a href="#">Clothing</a>
                            <span className="js-shop-category-span is-expanded fas fa-plus u-s-m-l-6" />
                            <ul style={{display: 'block'}}>
                              <li className="has-list">
                                <a href="#">Men</a>
                                <span className="js-shop-category-span fas fa-plus u-s-m-l-6" />
                                <ul>
                                  <li>
                                    <a href="#">T-Shirts</a>
                                  </li>
                                  <li>
                                    <a href="#">Shirts</a>
                                  </li>
                                  <li>
                                    <a href="#">Jeans</a>
                                  </li>
                                  <li>
                                    <a href="#">Shorts</a>
                                  </li>
                                </ul>
                              </li>
                              <li className="has-list">
                                <a href="#">Women</a>
                                <span className="js-shop-category-span fas fa-plus u-s-m-l-6" />
                                <ul>
                                  <li>
                                    <a href="#">Tops</a></li>
                                  <li>
                                    <a href="#">Dresses</a></li>
                                  <li>
                                    <a href="#">Shorts</a>
                                  </li>
                                </ul>
                              </li>
                              <li className="has-list">
                                <a href="#">Kids</a>
                                <span className="js-shop-category-span fas fa-plus u-s-m-l-6" />
                                <ul>
                                  <li>
                                    <a href="#">T-Shirts</a>
                                  </li>
                                  <li>
                                    <a href="#">Shirts</a>
                                  </li>
                                  <li>
                                    <a href="#">Shorts</a>
                                  </li>
                                </ul>
                              </li>
                              <li className="has-list">
                                <a href="#">Dummy</a>
                              </li>
                            </ul>
                          </li>
                          <li className="has-list">
                            <a href="#">Electronics</a>
                            <span className="js-shop-category-span fas fa-plus u-s-m-l-6" />
                            <ul>
                              <li className="has-list">
                                <a href="#">Mobiles</a>
                                <span className="js-shop-category-span fas fa-plus u-s-m-l-6" />
                                <ul>
                                  <li>
                                    <a href="#">Smartphones</a>
                                  </li>
                                  <li>
                                    <a href="#">Accessories</a>
                                  </li>
                                </ul>
                              </li>
                              <li className="has-list">
                                <a href="#">Laptops</a>
                                <span className="js-shop-category-span fas fa-plus u-s-m-l-6" />
                                <ul>
                                  <li>
                                    <a href="#">Laptops</a>
                                  </li>
                                  <li>
                                    <a href="#">Tablets</a>
                                  </li>
                                  <li>
                                    <a href="#">Accessories</a>
                                  </li>
                                </ul>
                              </li>
                            </ul>
                          </li>
                          <li className="has-list">
                            <a href="#">Appliances</a>
                            <span className="js-shop-category-span fas fa-plus u-s-m-l-6" />
                            <ul>
                              <li className="has-list">
                                <a href="#">Air Conditioners</a>
                              </li>
                              <li className="has-list">
                                <a href="#">Refrigerators</a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="u-s-m-b-30">
                    <div className="shop-w shop-w--style">
                      <div className="shop-w__intro-wrap">
                        <h1 className="shop-w__h">RATING</h1>
                        <span className="fas fa-minus shop-w__toggle" data-target="#s-rating" data-toggle="collapse" />
                      </div>
                      <div className="shop-w__wrap collapse show" id="s-rating">
                        <ul className="shop-w__list gl-scroll">
                          <li>
                            <div className="rating__check">
                              <input type="checkbox" />
                              <div className="rating__check-star-wrap"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /></div>
                            </div>
                            <span className="shop-w__total-text">(2)</span>
                          </li>
                          <li>
                            <div className="rating__check">
                              <input type="checkbox" />
                              <div className="rating__check-star-wrap"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="far fa-star" />
                                <span>&amp; Up</span></div>
                            </div>
                            <span className="shop-w__total-text">(8)</span>
                          </li>
                          <li>
                            <div className="rating__check">
                              <input type="checkbox" />
                              <div className="rating__check-star-wrap"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="far fa-star" /><i className="far fa-star" />
                                <span>&amp; Up</span></div>
                            </div>
                            <span className="shop-w__total-text">(10)</span>
                          </li>
                          <li>
                            <div className="rating__check">
                              <input type="checkbox" />
                              <div className="rating__check-star-wrap"><i className="fas fa-star" /><i className="fas fa-star" /><i className="far fa-star" /><i className="far fa-star" /><i className="far fa-star" />
                                <span>&amp; Up</span></div>
                            </div>
                            <span className="shop-w__total-text">(12)</span>
                          </li>
                          <li>
                            <div className="rating__check">
                              <input type="checkbox" />
                              <div className="rating__check-star-wrap"><i className="fas fa-star" /><i className="far fa-star" /><i className="far fa-star" /><i className="far fa-star" /><i className="far fa-star" />
                                <span>&amp; Up</span></div>
                            </div>
                            <span className="shop-w__total-text">(1)</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="u-s-m-b-30">
                    <div className="shop-w shop-w--style">
                      <div className="shop-w__intro-wrap">
                        <h1 className="shop-w__h">SIZE</h1>
                        <span className="fas fa-minus shop-w__toggle" data-target="#s-size" data-toggle="collapse" />
                      </div>
                      <div className="shop-w__wrap collapse show" id="s-size">
                        <ul className="shop-w__list gl-scroll">
                          <li>
                            {/*====== Check Box ======*/}
                            <div className="check-box">
                              <input type="checkbox" id="small" />
                              <div className="check-box__state check-box__state--primary">
                                <label className="check-box__label" htmlFor="small">Small</label>
                              </div>
                            </div>
                            {/*====== End - Check Box ======*/}
                          </li>
                          <li>
                            {/*====== Check Box ======*/}
                            <div className="check-box">
                              <input type="checkbox" id="medium" />
                              <div className="check-box__state check-box__state--primary">
                                <label className="check-box__label" htmlFor="medium">Medium</label>
                              </div>
                            </div>
                            {/*====== End - Check Box ======*/}
                          </li>
                          <li>
                            {/*====== Check Box ======*/}
                            <div className="check-box">
                              <input type="checkbox" id="large" />
                              <div className="check-box__state check-box__state--primary">
                                <label className="check-box__label" htmlFor="large">Large</label>
                              </div>
                            </div>
                            {/*====== End - Check Box ======*/}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="u-s-m-b-30">
                    <div className="shop-w shop-w--style">
                      <div className="shop-w__intro-wrap">
                        <h1 className="shop-w__h">BRAND</h1>
                        <span className="fas fa-minus shop-w__toggle" data-target="#s-brand" data-toggle="collapse" />
                      </div>
                      <div className="shop-w__wrap collapse show" id="s-brand">
                        <ul className="shop-w__list gl-scroll">
                          <li>
                            {/*====== Check Box ======*/}
                            <div className="check-box">
                              <input type="checkbox" id="arrow" />
                              <div className="check-box__state check-box__state--primary">
                                <label className="check-box__label" htmlFor="arrow">Arrow</label>
                              </div>
                            </div>
                            {/*====== End - Check Box ======*/}
                          </li>
                          <li>
                            {/*====== Check Box ======*/}
                            <div className="check-box">
                              <input type="checkbox" id="gap" />
                              <div className="check-box__state check-box__state--primary">
                                <label className="check-box__label" htmlFor="gap">Gap</label>
                              </div>
                            </div>
                            {/*====== End - Check Box ======*/}
                          </li>
                          <li>
                            {/*====== Check Box ======*/}
                            <div className="check-box">
                              <input type="checkbox" id="nike" />
                              <div className="check-box__state check-box__state--primary">
                                <label className="check-box__label" htmlFor="nike">Nike</label>
                              </div>
                            </div>
                            {/*====== End - Check Box ======*/}
                          </li>
                          <li>
                            {/*====== Check Box ======*/}
                            <div className="check-box">
                              <input type="checkbox" id="puma" />
                              <div className="check-box__state check-box__state--primary">
                                <label className="check-box__label" htmlFor="puma">Puma</label>
                              </div>
                            </div>
                            {/*====== End - Check Box ======*/}
                          </li>
                          <li>
                            {/*====== Check Box ======*/}
                            <div className="check-box">
                              <input type="checkbox" id="fila" />
                              <div className="check-box__state check-box__state--primary">
                                <label className="check-box__label" htmlFor="fila">Fila</label>
                              </div>
                            </div>
                            {/*====== End - Check Box ======*/}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="u-s-m-b-30">
                    <div className="shop-w shop-w--style">
                      <div className="shop-w__intro-wrap">
                        <h1 className="shop-w__h">PRICE</h1>
                        <span className="fas fa-minus shop-w__toggle" data-target="#s-price" data-toggle="collapse" />
                      </div>
                      <div className="shop-w__wrap collapse show" id="s-price">
                        <form className="shop-w__form-p">
                          <div className="shop-w__form-p-wrap">
                            <div>
                              <label htmlFor="price-min" />
                              <input className="input-text input-text--primary-style" type="text" id="price-min" placeholder="Min" /></div>
                            <div>
                              <label htmlFor="price-max" />
                              <input className="input-text input-text--primary-style" type="text" id="price-max" placeholder="Max" /></div>
                            <div>
                              <button className="btn btn--icon fas fa-angle-right btn--e-transparent-platinum-b-2" type="submit" /></div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="u-s-m-b-30">
                    <div className="shop-w shop-w--style">
                      <div className="shop-w__intro-wrap">
                        <h1 className="shop-w__h">COLOR</h1>
                        <span className="fas fa-minus shop-w__toggle" data-target="#s-color" data-toggle="collapse" />
                      </div>
                      <div className="shop-w__wrap collapse show" id="s-color">
                        <ul className="shop-w__list gl-scroll">
                          <li>
                            <div className="color__check">
                              <input type="checkbox" id="jet" />
                              <label className="color__check-label" htmlFor="jet" style={{backgroundColor: '#FF0000'}} title="Red" /></div>Red
                          </li>
                          <li>
                            <div className="color__check">
                              <input type="checkbox" id="folly" />
                              <label className="color__check-label" htmlFor="folly" style={{backgroundColor: '#0000FF'}} /></div>Blue
                          </li>
                          <li>
                            <div className="color__check">
                              <input type="checkbox" id="yellow" />
                              <label className="color__check-label" htmlFor="yellow" style={{backgroundColor: '#FFFF00'}} /></div>Yellow
                          </li>
                          <li>
                            <div className="color__check">
                              <input type="checkbox" id="granite-gray" />
                              <label className="color__check-label" htmlFor="granite-gray" style={{backgroundColor: '#008000'}} /></div>Green
                          </li>
                          <li>
                            <div className="color__check">
                              <input type="checkbox" id="space-cadet" />
                              <label className="color__check-label" htmlFor="space-cadet" style={{backgroundColor: '#FFA500'}} /></div>Orange
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="u-s-m-b-30">
                    <div className="shop-w shop-w--style">
                      <div className="shop-w__intro-wrap">
                        <h1 className="shop-w__h">FABRIC</h1>
                        <span className="fas fa-minus collapsed shop-w__toggle" data-target="#s-fabric" data-toggle="collapse" />
                      </div>
                      <div className="shop-w__wrap collapse" id="s-fabric">
                        <ul className="shop-w__list gl-scroll">
                          <li>
                            {/*====== Check Box ======*/}
                            <div className="check-box">
                              <input type="checkbox" id="xs" />
                              <div className="check-box__state check-box__state--primary">
                                <label className="check-box__label" htmlFor="xs">Cotton</label></div>
                            </div>
                            {/*====== End - Check Box ======*/}
                          </li>
                          <li>
                            {/*====== Check Box ======*/}
                            <div className="check-box">
                              <input type="checkbox" id="small" />
                              <div className="check-box__state check-box__state--primary">
                                <label className="check-box__label" htmlFor="small">Polyester</label></div>
                            </div>
                            {/*====== End - Check Box ======*/}
                          </li>
                          <li>
                            {/*====== Check Box ======*/}
                            <div className="check-box">
                              <input type="checkbox" id="medium" />
                              <div className="check-box__state check-box__state--primary">
                                <label className="check-box__label" htmlFor="medium">Wool</label></div>
                            </div>
                            {/*====== End - Check Box ======*/}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9 col-md-12">
              <div className="shop-p">
                <div className="shop-p__toolbar u-s-m-b-30">
                  <div className="shop-p__meta-wrap u-s-m-b-60">
                    <span className="shop-p__meta-text-1 text-start">FOUND 12 RESULTS</span>
                    <div className="shop-p__meta-text-2 text-start">
                      <a className="gl-tag btn--e-brand-shadow " href="#">T-Shirts</a>
                    </div>
                  </div>
                  <div className="shop-p__tool-style">
                    <div className="tool-style__group u-s-m-b-8">
                      <span className="js-shop-grid-target is-active">Grid</span>
                      <span className="js-shop-list-target">List</span></div>
                    <form>
                      <div className="tool-style__form-wrap">
                        <div className="u-s-m-b-8"><select className="select-box select-box--transparent-b-2">
                            <option selected>Sort By: Newest Items</option>
                            <option>Sort By: Latest Items</option>
                            <option>Sort By: Best Selling</option>
                            <option>Sort By: Best Rating</option>
                            <option>Sort By: Lowest Price</option>
                            <option>Sort By: Highest Price</option>
                          </select></div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="shop-p__collection">
                  <div className="row is-grid-active">
                    <div className="col-lg-4 col-md-6 col-sm-6">
                      {
                        listingproduct.map((list)=>(
                          <div className="product-m">
                          <div className="product-m__thumb">
                            <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                              <img className="aspect__img" src="images/product/sitemakers-tshirt.png" alt /></a>
                            <div className="product-m__quick-look">
                              <a className="fas fa-search" data-modal="modal" data-modal-id="#quick-look" data-tooltip="tooltip" data-placement="top" title="Quick Look" /></div>
                            <div className="product-m__add-cart">
                              <a className="btn--e-brand" data-modal="modal" data-modal-id="#add-to-cart">View Details</a></div>
                          </div>
                          <div className="product-m__content">
                            <div className="product-m__category">
                              <a href="shop-side-version-2.html">{list.product_name}</a></div>
                            <div className="product-m__name">
                              <a href="product-detail.html">Product Name</a></div>
                            <div className="product-m__rating gl-rating-style"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" /><i className="far fa-star" /><i className="far fa-star" />
                              <span className="product-m__review">(25)</span></div>
                            <div className="product-m__price">₹900.00</div>
                            <div className="product-m__hover">
                              <div className="product-m__preview-description">
                                <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</span></div>
                              <div className="product-m__wishlist">
                                <a className="far fa-heart" href="#" data-tooltip="tooltip" data-placement="top" title="Add to Wishlist" /></div>
                            </div>
                          </div>
                        </div>
                        ))
                      }
                    </div>
                    
                  </div>
                </div>
                <div className="u-s-p-y-60">
                  {/*====== Pagination ======*/}
                  <ul className="shop-p__pagination">
                    <li className="is-active">
                      <a href="shop-side-version-2.html">1</a></li>
                    <li>
                      <a href="shop-side-version-2.html">2</a></li>
                    <li>
                      <a href="shop-side-version-2.html">3</a></li>
                    <li>
                      <a href="shop-side-version-2.html">4</a></li>
                    <li>
                      <a className="fas fa-angle-right" href="shop-side-version-2.html" /></li>
                  </ul>
                  {/*====== End - Pagination ======*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*====== End - Section 1 ======*/}
    </div>
    
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

export default Listing
