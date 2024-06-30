import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Component/Header";
import Footer from "./Component/Footer";
const Contact = () => {
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
          <div className="u-s-p-b-60">
            {/*====== Section Content ======*/}
            <div className="section__content">
              <div className="container">
                <div className="row">
                  <div className="col-lg-4 col-md-6 u-s-m-b-30">
                    <div className="contact-o u-h-100">
                      <div className="contact-o__wrap">
                        <div className="contact-o__icon">
                          <i className="fas fa-phone-volume" />
                        </div>
                        <span className="contact-o__info-text-1">
                          LET'S HAVE A CALL
                        </span>
                        <span className="contact-o__info-text-2">
                          (+0) 900 000 000
                        </span>
                        <span className="contact-o__info-text-2">
                          (+0) 900 800 700
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 u-s-m-b-30">
                    <div className="contact-o u-h-100">
                      <div className="contact-o__wrap">
                        <div className="contact-o__icon">
                          <i className="fas fa-map-marker-alt" />
                        </div>
                        <span className="contact-o__info-text-1">
                          OUR LOCATION
                        </span>
                        <span className="contact-o__info-text-2">
                          1234, TEST ADDRESS, NEW DELHI
                        </span>
                        <span className="contact-o__info-text-2">
                          DELHI, INDIA
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 u-s-m-b-30">
                    <div className="contact-o u-h-100">
                      <div className="contact-o__wrap">
                        <div className="contact-o__icon">
                          <i className="far fa-clock" />
                        </div>
                        <span className="contact-o__info-text-1">
                          WORK TIME
                        </span>
                        <span className="contact-o__info-text-2">
                          5 Days a Week
                        </span>
                        <span className="contact-o__info-text-2">
                          From 9 AM to 7 PM
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/*====== End - Section Content ======*/}
          </div>
          <div className="section__content">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="contact-area u-h-100">
                    <div className="contact-area__heading">
                      <h2 className="float-left">Get In Touch</h2>
                      <br />
                    </div>
                    <form
                      className="contact-f"
                      method="post"
                      action="index.html"
                    >
                      <div className="row">
                        <div className="col-lg-6 col-md-6 u-h-100">
                          <div className="u-s-m-b-30">
                            <label htmlFor="c-name" />
                            <input
                              className="input-text input-text--border-radius input-text--primary-style"
                              type="text"
                              id="c-name"
                              placeholder="Name (Required)"
                              required
                            />
                          </div>
                          <div className="u-s-m-b-30">
                            <label htmlFor="c-email" />
                            <input
                              className="input-text input-text--border-radius input-text--primary-style"
                              type="text"
                              id="c-email"
                              placeholder="Email (Required)"
                              required
                            />
                          </div>
                          <div className="u-s-m-b-30">
                            <label htmlFor="c-subject" />
                            <input
                              className="input-text input-text--border-radius input-text--primary-style"
                              type="text"
                              id="c-subject"
                              placeholder="Subject (Required)"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 u-h-100">
                          <div className="u-s-m-b-30">
                            <label htmlFor="c-message" />
                            <textarea
                              className="text-area text-area--border-radius text-area--primary-style"
                              id="c-message"
                              placeholder="Compose a Message (Required)"
                              required
                              defaultValue={""}
                            />
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <button
                            className="btn btn--e-brand-b-2 float-left btn-outline-success"
                            type="submit"
                          >
                            Send Message
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
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
  );
};

export default Contact;
