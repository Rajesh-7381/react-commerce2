import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../Component/Footer'
import Header from '../Component/Header'

const MyAccount = () => {
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
                    <li><Link to={"/myAccount"}>My Billing/Contact Address</Link></li>
                    <li><Link to={"/Orders"}>My Orders</Link></li>
                    <li><Link to={"/wishlist"}>My Wish List</Link></li>
                    <li><Link to={"/forgotpassword"}>Update Password</Link></li>
                  </ul>
                </div>
              </div>
              {/*====== End - Dashboard Features ======*/}
            </div>
            <div className="col-lg-9 col-md-12">
              <div className="dash__box dash__box--shadow dash__box--radius dash__box--bg-white">
                <div className="dash__pad-2">
                  <h1 className="dash__h1 u-s-m-b-14">My Billing/Contact Address</h1>
                  <span className="dash__text u-s-m-b-30">Please add your Billing/Contact details.</span>
                  <form className="dash-address-manipulation">
                    <div className="gl-inline">
                      <div className="u-s-m-b-30">
                        <label className="gl-label float-left" htmlFor="billing-name">NAME *</label>
                        <input className="input-text input-text--primary-style" type="text" id="billing-name" placeholder="Name" /></div>
                      <div className="u-s-m-b-30">
                        <label className="gl-label float-left" htmlFor="billing-address">ADDRESS *</label>
                        <input className="input-text input-text--primary-style" type="text" id="billing-address" placeholder="ADDRESS" /></div>
                    </div>
                    <div className="gl-inline">
                      <div className="u-s-m-b-30">
                        <label className="gl-label float-left" htmlFor="billing-city">CITY *</label>
                        <input className="input-text input-text--primary-style" type="text" id="billing-city" placeholder="CITY" /></div>
                      <div className="u-s-m-b-30">
                        <label className="gl-label float-left" htmlFor="billing-state">STATE *</label>
                        <input className="input-text input-text--primary-style" type="text" id="billing-state" placeholder="STATE" /></div>
                    </div>
                    <div className="gl-inline">
                      <div className="u-s-m-b-30">
                        {/*====== Select Box ======*/}
                        <label className="gl-label float-left" htmlFor="billing-country">COUNTRY *</label><select className="select-box select-box--primary-style" id="billing-country">
                          <option selected value>Choose Country</option>
                          <option value="india">India</option>
                          <option value="uae">United Arab Emirate (UAE)</option>
                          <option value="uk">United Kingdom (UK)</option>
                          <option value="us">United States (US)</option>
                        </select>
                        {/*====== End - Select Box ======*/}
                      </div>
                      <div className="u-s-m-b-30">
                        <label className="gl-label float-left" htmlFor="billing-pincode">PINCODE *</label>
                        <input className="input-text input-text--primary-style" type="text" id="billing-pincode" placeholder="PINCODE" /></div>
                    </div>
                    <div className="gl-inline">
                      <div className="u-s-m-b-30">
                        <label className="gl-label float-left" htmlFor="billing-mobile">MOBILE *</label>
                        <input className="input-text input-text--primary-style" type="text" id="billing-mobile" placeholder="MOBILE" /></div>
                      <div className="u-s-m-b-30">
                        <label className="gl-label float-left" htmlFor="billing-email">EMAIL *</label>
                        <input className="input-text input-text--primary-style" type="text" id="billing-email" placeholder="EMAIL" /></div>
                    </div>
                    <button className="btn btn--e-brand-b-2 float-left btn-success" type="submit">SAVE</button>
                  </form>
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
{/*====== End - App Content ======*/}


    
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

export default MyAccount
