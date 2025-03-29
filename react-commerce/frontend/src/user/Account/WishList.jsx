import React from 'react'
import Header from '../Component/Header'
import Footer from '../Component/Footer'

const WishList = () => {
  return (
    <div>
      <Header />
      <div className="app-content">
        {/*====== Section 1 ======*/}
        <div className="u-s-p-y-10">
          {/*====== Section Content ======*/}
          <div className="section__content">
            <div className="container">
              <div className="breadcrumb">
                <div className="breadcrumb__wrap">
                  <ul className="breadcrumb__list">
                    <li className="has-separator">
                      <a href="index.html">Home</a></li>
                    <li className="is-marked">
                      <a href="dash-address-add.html">My Account</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*====== End - Section 1 ======*/}
        {/*====== Section 2 ======*/}
        <div className="u-s-p-b-60">
          {/*====== Section Content ======*/}
          <div className="section__content">
            <div className="dash">
              <div className="container">
                <div className="row">
                  <div className="col-lg-3 col-md-12">
                    {/*====== Dashboard Features ======*/}
                    <div className="dash__box dash__box--bg-white dash__box--shadow u-s-m-b-30">
                      <div className="dash__pad-1">
                        <span className="dash__text u-s-m-b-16">Hello, Amit Gupta</span>
                        <ul className="dash__f-list">
                          <li><a href="account.html">My Billing/Contact Address</a></li>
                          <li><a href="orders.html">My Orders</a></li>
                          <li><a href="wishlist.html">My Wish List</a></li>
                          <li><a href="update-password.html">Update Password</a></li>
                        </ul>
                      </div>
                    </div>
                    {/*====== End - Dashboard Features ======*/}
                  </div>
                  <div className="col-lg-9 col-md-12">
                    <div className="dash__box dash__box--shadow dash__box--radius dash__box--bg-white">
                      <div className="dash__pad-2">
                        <h1 className="dash__h1 u-s-m-b-14">My Wish List</h1>
                        {/*====== Section Content ======*/}
                        <div className="section__content">
                          <div className="container">
                            <div className="row">
                              <div className="col-lg-12 col-md-12 col-sm-12">
                                {/*====== Wishlist Product ======*/}
                                <div className="w-r u-s-m-b-30">
                                  <div className="w-r__container">
                                    <div className="w-r__wrap-1">
                                      <div className="w-r__img-wrap">
                                        <img className="u-img-fluid" src="images/product/sitemakers-tshirt.png" alt /></div>
                                      <div className="w-r__info">
                                        <span className="w-r__name">
                                          <a href="product-detail.html">Product Name</a></span>
                                        <span className="w-r__category">
                                          <a href="shop-side-version-2.html">Brand Name</a></span>
                                        <span className="w-r__price">₹900
                                          <span className="w-r__discount">₹1000</span></span></div>
                                    </div>
                                    <div className="w-r__wrap-2">
                                      <a className="w-r__link btn--e-brand-b-2" data-modal="modal" data-modal-id="#add-to-cart">ADD TO CART</a>
                                      <a className="w-r__link btn--e-transparent-platinum-b-2" href="product-detail.html">VIEW</a>
                                      <a className="w-r__link btn--e-transparent-platinum-b-2" href="#">REMOVE</a></div>
                                  </div>
                                </div>
                                {/*====== End - Wishlist Product ======*/}
                                {/*====== Wishlist Product ======*/}
                                <div className="w-r u-s-m-b-30">
                                  <div className="w-r__container">
                                    <div className="w-r__wrap-1">
                                      <div className="w-r__img-wrap">
                                        <img className="u-img-fluid" src="images/product/sitemakers-tshirt.png" alt /></div>
                                      <div className="w-r__info">
                                        <span className="w-r__name">
                                          <a href="product-detail.html">Product Name</a></span>
                                        <span className="w-r__category">
                                          <a href="shop-side-version-2.html">Brand Name</a></span>
                                        <span className="w-r__price">₹900
                                          <span className="w-r__discount">₹1000</span></span></div>
                                    </div>
                                    <div className="w-r__wrap-2">
                                      <a className="w-r__link btn--e-brand-b-2" data-modal="modal" data-modal-id="#add-to-cart">ADD TO CART</a>
                                      <a className="w-r__link btn--e-transparent-platinum-b-2" href="product-detail.html">VIEW</a>
                                      <a className="w-r__link btn--e-transparent-platinum-b-2" href="#">REMOVE</a></div>
                                  </div>
                                </div>
                                {/*====== End - Wishlist Product ======*/}
                                {/*====== Wishlist Product ======*/}
                                <div className="w-r u-s-m-b-30">
                                  <div className="w-r__container">
                                    <div className="w-r__wrap-1">
                                      <div className="w-r__img-wrap">
                                        <img className="u-img-fluid" src="images/product/sitemakers-tshirt.png" alt /></div>
                                      <div className="w-r__info">
                                        <span className="w-r__name">
                                          <a href="product-detail.html">Product Name</a></span>
                                        <span className="w-r__category">
                                          <a href="shop-side-version-2.html">Brand Name</a></span>
                                        <span className="w-r__price">₹900
                                          <span className="w-r__discount">₹1000</span></span></div>
                                    </div>
                                    <div className="w-r__wrap-2">
                                      <a className="w-r__link btn--e-brand-b-2" data-modal="modal" data-modal-id="#add-to-cart">ADD TO CART</a>
                                      <a className="w-r__link btn--e-transparent-platinum-b-2" href="product-detail.html">VIEW</a>
                                      <a className="w-r__link btn--e-transparent-platinum-b-2" href="#">REMOVE</a></div>
                                  </div>
                                </div>
                                {/*====== End - Wishlist Product ======*/}
                              </div>
                              <div className="col-lg-12">
                                <div className="route-box">
                                  <div className="route-box__g">
                                    <a className="route-box__link" href="shop-side-version-2.html"><i className="fas fa-long-arrow-alt-left" />
                                      <span>CONTINUE SHOPPING</span></a></div>
                                  <div className="route-box__g">
                                    <a className="route-box__link" href="wishlist.html"><i className="fas fa-trash" />
                                      <span>CLEAR WISHLIST</span></a></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/*====== End - Section Content ======*/}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*====== End - Section Content ======*/}
        </div>
        {/*====== End - Section 2 ======*/}
      </div>
      <Footer />
    </div>
  )
}

export default WishList
