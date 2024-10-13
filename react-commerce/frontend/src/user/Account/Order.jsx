import React from 'react'
import Header from '../Component/Header'
import Footer from '../Component/Footer'

const Order = () => {
  return (
    <div>
    <Header />
    <br />
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
                <div className="dash__box dash__box--shadow dash__box--radius dash__box--bg-white u-s-m-b-30">
                  <div className="dash__pad-2">
                    <h1 className="dash__h1 u-s-m-b-14">My Orders</h1>
                    <span className="dash__text u-s-m-b-30">Here you can see all products that have been delivered.</span>
                    <form className="m-order u-s-m-b-30">
                      <div className="m-order__select-wrapper">
                        <label className="u-s-m-r-8" htmlFor="my-order-sort">Show:</label><select className="select-box select-box--primary-style" id="my-order-sort">
                          <option selected>Last 5 orders</option>
                          <option>Last 15 days</option>
                          <option>Last 30 days</option>
                          <option>Last 6 months</option>
                          <option>Orders placed in 2018</option>
                          <option>All Orders</option>
                        </select></div>
                    </form>
                    <div className="m-order__list">
                      <div className="m-order__get">
                        <div className="manage-o__header u-s-m-b-30">
                          <div className="dash-l-r">
                            <div>
                              <div className="manage-o__text-2 u-c-secondary">Order #1001</div>
                              <div className="manage-o__text u-c-silver">Placed on 18 Aug 2023 10:10:10</div>
                            </div>
                            <div>
                              <div className="dash__link dash__link--brand">
                                <a href="order-details.html">MANAGE</a></div>
                            </div>
                          </div>
                        </div>
                        <div className="manage-o__description">
                          <div className="description__info-wrap">
                            <div>
                              <span className="manage-o__badge badge--processing">Processing</span>
                            </div>  
                          </div>
                          <div className="description__info-wrap">
                            <div>
                              <span className="manage-o__text-2 u-c-silver">Payment Method:
                                <span className="manage-o__text-2 u-c-secondary">COD</span></span>
                            </div>
                            <div>
                              <span className="manage-o__text-2 u-c-silver">Total Items:
                                <span className="manage-o__text-2 u-c-secondary">1</span></span>
                            </div>
                            <div>
                              <span className="manage-o__text-2 u-c-silver">Grand Total:
                                <span className="manage-o__text-2 u-c-secondary">₹900</span></span></div>
                          </div>
                        </div>
                      </div>
                      <div className="m-order__get">
                        <div className="manage-o__header u-s-m-b-30">
                          <div className="dash-l-r">
                            <div>
                              <div className="manage-o__text-2 u-c-secondary">Order #1001</div>
                              <div className="manage-o__text u-c-silver">Placed on 18 Aug 2023 10:10:10</div>
                            </div>
                            <div>
                              <div className="dash__link dash__link--brand">
                                <a href="order-details.html">MANAGE</a></div>
                            </div>
                          </div>
                        </div>
                        <div className="manage-o__description">
                          <div className="description__info-wrap">
                            <div>
                              <span className="manage-o__badge badge--shipped">Shipped</span>
                            </div>  
                          </div>
                          <div className="description__info-wrap">
                            <div>
                              <span className="manage-o__text-2 u-c-silver">Payment Method:
                                <span className="manage-o__text-2 u-c-secondary">COD</span></span>
                            </div>
                            <div>
                              <span className="manage-o__text-2 u-c-silver">Total Items:
                                <span className="manage-o__text-2 u-c-secondary">1</span></span>
                            </div>
                            <div>
                              <span className="manage-o__text-2 u-c-silver">Grand Total:
                                <span className="manage-o__text-2 u-c-secondary">₹900</span></span></div>
                          </div>
                        </div>
                      </div>
                      <div className="m-order__get">
                        <div className="manage-o__header u-s-m-b-30">
                          <div className="dash-l-r">
                            <div>
                              <div className="manage-o__text-2 u-c-secondary">Order #1001</div>
                              <div className="manage-o__text u-c-silver">Placed on 18 Aug 2023 10:10:10</div>
                            </div>
                            <div>
                              <div className="dash__link dash__link--brand">
                                <a href="order-details.html">MANAGE</a></div>
                            </div>
                          </div>
                        </div>
                        <div className="manage-o__description">
                          <div className="description__info-wrap">
                            <div>
                              <span className="manage-o__badge badge--delivered">Delivered</span>
                            </div>  
                          </div>
                          <div className="description__info-wrap">
                            <div>
                              <span className="manage-o__text-2 u-c-silver">Payment Method:
                                <span className="manage-o__text-2 u-c-secondary">COD</span></span>
                            </div>
                            <div>
                              <span className="manage-o__text-2 u-c-silver">Total Items:
                                <span className="manage-o__text-2 u-c-secondary">1</span></span>
                            </div>
                            <div>
                              <span className="manage-o__text-2 u-c-silver">Grand Total:
                                <span className="manage-o__text-2 u-c-secondary">₹900</span></span></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*====== End - Section Content ======*/}
    </div>
        <Footer />
    </div>
  )
}

export default Order
