import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
    <footer>
    <div className="outer-footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="outer-footer__content u-s-m-b-40">
              <span className="outer-footer__content-title">
                Contact Us
              </span>
              <div className="outer-footer__text-wrap">
                <i className="fas fa-home" />
                <span>SITEMAKERS.IN</span>
              </div>
              <div className="outer-footer__text-wrap">
                <i className="fas fa-phone-volume" />
                <span>(+91) 900 000 000</span>
              </div>
              <div className="outer-footer__text-wrap">
                <i className="far fa-envelope" />
                <span>contact@sitemakers.in</span>
              </div>
              <div className="outer-footer__social">
                <ul>
                  <li>
                    <a className="s-fb--color-hover" href="#">
                      <i className="fab fa-facebook-f" />
                    </a>
                  </li>
                  <li>
                    <a className="s-tw--color-hover" href="#">
                      <i className="fab fa-twitter" />
                    </a>
                  </li>
                  <li>
                    <a className="s-youtube--color-hover" href="#">
                      <i className="fab fa-youtube" />
                    </a>
                  </li>
                  <li>
                    <a className="s-insta--color-hover" href="#">
                      <i className="fab fa-instagram" />
                    </a>
                  </li>
                  <li>
                    <a className="s-gplus--color-hover" href="#">
                      <i className="fab fa-google-plus-g" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="outer-footer__content u-s-m-b-40">
                  <span className="outer-footer__content-title">
                    Account
                  </span>
                  <div className="outer-footer__list-wrap">
                    <ul>
                      <li>
                        <a href="account.html">My Account</a>
                      </li>
                      <li>
                        <a href="orders.html">My Orders</a>
                      </li>
                      <li>
                        <a href="cart.html">My Cart</a>
                      </li>
                      <li>
                        <a href="wishlist.html">My Wishlist</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="outer-footer__content u-s-m-b-40">
                  <div className="outer-footer__list-wrap">
                    <span className="outer-footer__content-title">
                      Company
                    </span>
                    <ul>
                      <li>
                        <a href="about.html">About us</a>
                      </li>
                      <li>
                        <Link to={"/contactus"}>Contact Us</Link>
                      </li>
                      <li>
                        <a href="faq.html">FAQ</a>
                      </li>
                      <li>
                        <a href="terms-conditions.html">
                          Terms &amp; Conditions
                        </a>
                      </li>
                      <li>
                        <a href="privacy-policy.html">Privacy Policy</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12">
            <div className="outer-footer__content">
              <span className="outer-footer__content-title">
                Join our Newsletter
              </span>
              <form className="newsletter">
                <div className="newsletter__group">
                  <label htmlFor="newsletter" />
                  <input
                    className="input-text input-text--only-white"
                    type="text"
                    id="newsletter"
                    placeholder="Enter your Email"
                  />
                  <button
                    className="btn btn--e-brand newsletter__btn"
                    type="submit"
                  >
                    SUBSCRIBE
                  </button>
                </div>
                <span className="newsletter__text">
                  Subscribe to the mailing list to receive updates on
                  promotions, new arrivals, discount and coupons.
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="lower-footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="lower-footer__content">
              <div className="lower-footer__copyright">
                <span>Copyright © 2023</span>
                <a href="index.html">SiteMakers.in</a>
                <span>All Right Reserved</span>
              </div>
              <div className="lower-footer__payment">
                <ul>
                  <li>
                    <i className="fab fa-cc-stripe" />
                  </li>
                  <li>
                    <i className="fab fa-cc-paypal" />
                  </li>
                  <li>
                    <i className="fab fa-cc-mastercard" />
                  </li>
                  <li>
                    <i className="fab fa-cc-visa" />
                  </li>
                  <li>
                    <i className="fab fa-cc-discover" />
                  </li>
                  <li>
                    <i className="fab fa-cc-amex" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
    </div>
  )
}

export default Footer
