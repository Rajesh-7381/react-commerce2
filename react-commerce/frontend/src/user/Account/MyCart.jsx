import React from 'react'
import Header from '../Component/Header'
import Footer from '../Component/Footer'

const MyCart = () => {
  return (
    <div>
      <Header></Header>

      {/*====== App Content ======*/}
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
                      <a href="cart.html">Cart</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*====== End - Section 1 ======*/}
        {/*====== Section 2 ======*/}
        <div className="u-s-p-b-10">
          {/*====== Section Intro ======*/}
          <div className="section__intro u-s-m-b-60">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="section__text-wrap">
                    <h1 className="section__heading u-c-secondary">SHOPPING CART</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*====== End - Section Intro ======*/}
          {/*====== Section Content ======*/}
          <div className="section__content">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 u-s-m-b-30">
                  <div className="table-responsive">
                    <table className="table-p">
                      <tbody>
                        {/*====== Row ======*/}
                        <tr>
                          <td>
                            <div className="table-p__box">
                              <div className="table-p__img-wrap">
                                <img className="u-img-fluid" src="images/product/sitemakers-tshirt.png" alt /></div>
                              <div className="table-p__info">
                                <span className="table-p__name">
                                  <a href="product-detail.html">Product Name</a></span>
                                <span className="table-p__category">
                                  <a href="shop-side-version-2.html">Brand Name</a></span>
                                <ul className="table-p__variant-list">
                                  <li>
                                    <span>Size: Large</span></li>
                                  <li>
                                    <span>Color: Red</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="table-p__price">₹900.00</span></td>
                          <td>
                            <div className="table-p__input-counter-wrap">
                              {/*====== Input Counter ======*/}
                              <div className="input-counter">
                                <span className="input-counter__minus fas fa-minus" />
                                <input className="input-counter__text input-counter--text-primary-style" type="text" defaultValue={1} data-min={1} data-max={1000} />
                                <span className="input-counter__plus fas fa-plus" /></div>
                              {/*====== End - Input Counter ======*/}
                            </div>
                          </td>
                          <td>
                            <div className="table-p__del-wrap">
                              <a className="far fa-trash-alt table-p__delete-link" href="#" />
                            </div>
                          </td>
                        </tr>
                        {/*====== End - Row ======*/}
                        {/*====== Row ======*/}
                        <tr>
                          <td>
                            <div className="table-p__box">
                              <div className="table-p__img-wrap">
                                <img className="u-img-fluid" src="images/product/sitemakers-tshirt.png" alt /></div>
                              <div className="table-p__info">
                                <span className="table-p__name">
                                  <a href="product-detail.html">Product Name</a></span>
                                <span className="table-p__category">
                                  <a href="shop-side-version-2.html">Brand Name</a></span>
                                <ul className="table-p__variant-list">
                                  <li>
                                    <span>Size: Large</span></li>
                                  <li>
                                    <span>Color: Red</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="table-p__price">₹900.00</span></td>
                          <td>
                            <div className="table-p__input-counter-wrap">
                              {/*====== Input Counter ======*/}
                              <div className="input-counter">
                                <span className="input-counter__minus fas fa-minus" />
                                <input className="input-counter__text input-counter--text-primary-style" type="text" defaultValue={1} data-min={1} data-max={1000} />
                                <span className="input-counter__plus fas fa-plus" /></div>
                              {/*====== End - Input Counter ======*/}
                            </div>
                          </td>
                          <td>
                            <div className="table-p__del-wrap">
                              <a className="far fa-trash-alt table-p__delete-link" href="#" />
                            </div>
                          </td>
                        </tr>
                        {/*====== End - Row ======*/}
                        {/*====== Row ======*/}
                        <tr>
                          <td>
                            <div className="table-p__box">
                              <div className="table-p__img-wrap">
                                <img className="u-img-fluid" src="images/product/sitemakers-tshirt.png" alt /></div>
                              <div className="table-p__info">
                                <span className="table-p__name">
                                  <a href="product-detail.html">Product Name</a></span>
                                <span className="table-p__category">
                                  <a href="shop-side-version-2.html">Brand Name</a></span>
                                <ul className="table-p__variant-list">
                                  <li>
                                    <span>Size: Large</span></li>
                                  <li>
                                    <span>Color: Red</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="table-p__price">₹900.00</span></td>
                          <td>
                            <div className="table-p__input-counter-wrap">
                              {/*====== Input Counter ======*/}
                              <div className="input-counter">
                                <span className="input-counter__minus fas fa-minus" />
                                <input className="input-counter__text input-counter--text-primary-style" type="text" defaultValue={1} data-min={1} data-max={1000} />
                                <span className="input-counter__plus fas fa-plus" /></div>
                              {/*====== End - Input Counter ======*/}
                            </div>
                          </td>
                          <td>
                            <div className="table-p__del-wrap">
                              <a className="far fa-trash-alt table-p__delete-link" href="#" />
                            </div>
                          </td>
                        </tr>
                        {/*====== End - Row ======*/}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="route-box">
                    <div className="route-box__g1">
                      <a className="route-box__link" href="shop-side-version-2.html"><i className="fas fa-long-arrow-alt-left" />
                        <span>CONTINUE SHOPPING</span></a></div>
                    <div className="route-box__g2">
                      <a className="route-box__link" href="cart.html"><i className="fas fa-trash" />
                        <span>CLEAR CART</span>
                      </a>
                      {/* <a class="route-box__link" href="cart.html"><i class="fas fa-sync"></i>
                                            <span>UPDATE CART</span>
                                        </a> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*====== End - Section Content ======*/}
        </div>
        {/*====== End - Section 2 ======*/}
        {/*====== Section 3 ======*/}
        <div className="u-s-p-b-60">
          {/*====== Section Content ======*/}
          <div className="section__content">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 u-s-m-b-30">
                  <form className="f-cart">
                    <div className="row">
                      <div className="col-lg-4 col-md-6 u-s-m-b-30">
                        <div className="f-cart__pad-box">
                          <h1 className="gl-h1">APPLY COUPON CODE</h1>
                          <div className="u-s-m-b-30">
                            <label className="gl-label" htmlFor="shipping-zip">Enter Coupon Code to avail Discount</label>
                            <input className="input-text input-text--primary-style" type="text" id="shipping-zip" placeholder="Enter Coupon Code" /></div>
                          <div className="u-s-m-b-30">
                            <a className="f-cart__ship-link btn--e-transparent-brand-b-2" href="cart.html">APPLY</a></div>
                          {/* <span class="gl-text">Note: Any note can come here</span> */}
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 u-s-m-b-30">
                      </div>
                      <div className="col-lg-4 col-md-6 u-s-m-b-30">
                        <div className="f-cart__pad-box">
                          <div className="u-s-m-b-30">
                            <table className="f-cart__table">
                              <tbody>
                                <tr>
                                  <td>SUBTOTAL</td>
                                  <td>₹2700</td>
                                </tr>
                                <tr>
                                  <td>COUPON DISCOUNT</td>
                                  <td>₹0</td>
                                </tr>
                                <tr>
                                  <td>GRAND TOTAL</td>
                                  <td>₹2700</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div>
                            <button className="btn btn--e-brand-b-2" type="submit"> PROCEED TO CHECKOUT</button></div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/*====== End - Section Content ======*/}
        </div>
        {/*====== End - Section 3 ======*/}
      </div>
{/*====== End - App Content ======*/}

        <Footer></Footer>
    </div>
  )
}

export default MyCart
