import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const [categories, setcategories] = useState([]);
  useEffect(() => {
    document.title="Dashboard2"
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8081/getAllCategorys');
        setcategories(response.data);
      } catch (error) {
        console.error('Error fetching the categories:', error);
      }
    };
  
    fetchCategories();
  }, []);
  useEffect(() => {
    // console.log(categories);
  }, [categories]);
  
//  lookup object for category id to name mapping
const categoryLookup = categories.reduce((acc, category) => {
  acc[category.id] = category.category_name;
  return acc;
}, {});

// Filter out categories without a parent
const categoriesWithParent = categories.filter(category => category.parent_id); // if it met category contain id  and their parent_id they return new array
  return (
    <div>
    <header className="header--style-1">
      {/*====== Nav 1 ======*/}
      <nav className="primary-nav primary-nav-wrapper--border">
        <div className="container">
          {/*====== Primary Nav ======*/}
          <div className="primary-nav">
            {/*====== Main Logo ======*/}
            <a className="main-logo" href="index.html">
              
              <img src="./frontend/images/logo/logo-1.png" alt="" /></a>
            {/*====== End - Main Logo ======*/}
            {/*====== Search Form ======*/}
            <form className="main-form">
              <label htmlFor="main-search" />
              <input className="input-text input-text--border-radius input-text--style-1" type="text" id="main-search" placeholder="Search" />
              <button className="btn btn--icon fas fa-search main-search-button" type="submit" />
            </form>
            {/*====== End - Search Form ======*/}
            {/*====== Dropdown Main plugin ======*/}
            <div className="menu-init" id="navigation">
              <button className="btn btn--icon toggle-button toggle-button--secondary fas fa-cogs" type="button" />
              {/*====== Menu ======*/}
              <div className="ah-lg-mode">
                <span className="ah-close">✕ Close</span>
                {/*====== List ======*/}
                <ul className="ah-list ah-list--design1 ah-list--link-color-secondary">
                  <li className="has-dropdown" data-tooltip="tooltip" data-placement="left" title="Account">
                    <a><i className="far fa-user-circle" /></a>
                    {/*====== Dropdown ======*/}
                    <span className="js-menu-toggle" />
                    <ul style={{width: 120}}>
                      <li>
                        <a href="dashboard.html"><i className="fas fa-user-circle u-s-m-r-6" />
                          <span>Account</span></a>
                      </li>
                      <li>
                        <Link to={"/register"}><i className="fas fa-user-plus u-s-m-r-6" />
                          <span>Signup</span></Link>
                      </li>
                      <li>
                        <Link to={"/"}><i className="fas fa-lock u-s-m-r-6" />
                          <span>Signin</span></Link>
                      </li>
                      <li>
                        <Link to={"/"}><i className="fas fa-lock-open u-s-m-r-6" />
                          <span>Signout</span></Link>
                      </li>
                    </ul>
                    {/*====== End - Dropdown ======*/}
                  </li>
                  <li data-tooltip="tooltip" data-placement="left" title="Contact">
                    <a href="tel:+0900000000"><i className="fas fa-phone-volume" /></a>
                  </li>
                  <li data-tooltip="tooltip" data-placement="left" title="Mail">
                    <a href="mailto:contact@domain.com"><i className="far fa-envelope" /></a>
                  </li>
                </ul>
                {/*====== End - List ======*/}
              </div>
              {/*====== End - Menu ======*/}
            </div>
            {/*====== End - Dropdown Main plugin ======*/}
          </div>
          {/*====== End - Primary Nav ======*/}
        </div>
      </nav>
      {/*====== End - Nav 1 ======*/}
      {/*====== Nav 2 ======*/}
      <nav className="secondary-nav-wrapper">
        <div className="container">
          {/*====== Secondary Nav ======*/}
          <div className="secondary-nav">
            {/*====== Dropdown Main plugin ======*/}
            <div className="menu-init" id="navigation1">
              {/* <button class="btn btn--icon toggle-mega-text toggle-button" type="button">M</button> */}
              {/*====== Menu ======*/}
              <div className="ah-lg-mode">
                <span className="ah-close">✕ Close</span>
                {/*====== List ======*/}
                <ul className="ah-list">
                  <li className="has-dropdown">
                    {/* <span class="mega-text">M</span> */}
                    {/*====== Mega Menu ======*/}
                    <span className="js-menu-toggle" />
                    <div className="mega-menu">
                      <div className="mega-menu-wrap">
                        <div className="mega-menu-list">
                          <ul>
                            <li className="js-active">
                              <a href="shop-side-version-2.html"><i className="fas fa-tv u-s-m-r-6" />
                                <span>Electronics</span></a>
                              <span className="js-menu-toggle js-toggle-mark" />
                            </li>
                            <li>
                              <a href="shop-side-version-2.html"><i className="fas fa-female u-s-m-r-6" />
                                <span>Women's Clothing</span></a>
                              <span className="js-menu-toggle" />
                            </li>
                            <li>
                              <a href="shop-side-version-2.html"><i className="fas fa-male u-s-m-r-6" />
                                <span>Men's Clothing</span></a>
                              <span className="js-menu-toggle" />
                            </li>
                            <li>
                              <a href="index.html"><i className="fas fa-utensils u-s-m-r-6" />
                                <span>Food &amp; Supplies</span></a>
                              <span className="js-menu-toggle" />
                            </li>
                            <li>
                              <a href="index.html"><i className="fas fa-couch u-s-m-r-6" />
                                <span>Furniture &amp; Decor</span></a>
                              <span className="js-menu-toggle" />
                            </li>
                            <li>
                              <a href="index.html"><i className="fas fa-football-ball u-s-m-r-6" />
                                <span>Sports &amp; Game</span></a>
                              <span className="js-menu-toggle" />
                            </li>
                            <li>
                              <a href="index.html"><i className="fas fa-heartbeat u-s-m-r-6" />
                                <span>Beauty &amp; Health</span></a>
                              <span className="js-menu-toggle" />
                            </li>
                          </ul>
                        </div>
                        {/*====== Electronics ======*/}
                        <div className="mega-menu-content js-active">
                          {/*====== Mega Menu Row ======*/}
                          <div className="row">
                            <div className="col-lg-3">
                              <ul>
                                <li className="mega-list-title">
                                  <a href="shop-side-version-2.html">3D PRINTER &amp; SUPPLIES</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">3d Printer</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">3d Printing Pen</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">3d Printing Accessories</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">3d Printer Module Board</a>
                                </li>
                              </ul>
                            </div>
                            <div className="col-lg-3">
                              <ul>
                                <li className="mega-list-title">
                                  <a href="shop-side-version-2.html">HOME AUDIO &amp; VIDEO</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">TV Boxes</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">TC Receiver &amp; Accessories</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Display Dongle</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Home Theater System</a>
                                </li>
                              </ul>
                            </div>
                            <div className="col-lg-3">
                              <ul>
                                <li className="mega-list-title">
                                  <a href="shop-side-version-2.html">MEDIA PLAYERS</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Earphones</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Mp3 Players</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Speakers &amp; Radios</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Microphones</a>
                                </li>
                              </ul>
                            </div>
                            <div className="col-lg-3">
                              <ul>
                                <li className="mega-list-title">
                                  <a href="shop-side-version-2.html">VIDEO GAME ACCESSORIES</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Nintendo Video Games Accessories</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Sony Video Games Accessories</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Xbox Video Games Accessories</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          {/*====== End - Mega Menu Row ======*/}
                          <br />
                          {/*====== Mega Menu Row ======*/}
                          <div className="row">
                            <div className="col-lg-3">
                              <ul>
                                <li className="mega-list-title">
                                  <a href="shop-side-version-2.html">SECURITY &amp; PROTECTION</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Security Cameras</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Alarm System</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Security Gadgets</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">CCTV Security &amp; Accessories</a>
                                </li>
                              </ul>
                            </div>
                            <div className="col-lg-3">
                              <ul>
                                <li className="mega-list-title">
                                  <a href="shop-side-version-2.html">PHOTOGRAPHY &amp; CAMERA</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Digital Cameras</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Sport Camera &amp; Accessories</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Camera Accessories</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Lenses &amp; Accessories</a>
                                </li>
                              </ul>
                            </div>
                            <div className="col-lg-3">
                              <ul>
                                <li className="mega-list-title">
                                  <a href="shop-side-version-2.html">ARDUINO COMPATIBLE</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Raspberry Pi &amp; Orange Pi</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Module Board</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Smart Robot</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Board Kits</a>
                                </li>
                              </ul>
                            </div>
                            <div className="col-lg-3">
                              <ul>
                                <li className="mega-list-title">
                                  <a href="shop-side-version-2.html">DSLR Camera</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Nikon Cameras</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Canon Camera</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Sony Camera</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">DSLR Lenses</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          {/*====== End - Mega Menu Row ======*/}
                          <br />
                          {/*====== Mega Menu Row ======*/}
                          <div className="row">
                            <div className="col-lg-3">
                              <ul>
                                <li className="mega-list-title">
                                  <a href="shop-side-version-2.html">NECESSARY ACCESSORIES</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Flash Cards</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Memory Cards</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Flash Pins</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Compact Discs</a>
                                </li>
                              </ul>
                            </div>
                            <div className="col-lg-9 mega-image">
                              <div className="mega-banner">
                                <a className="u-d-block" href="shop-side-version-2.html">
                                  <img className="u-img-fluid u-d-block" src="./frontend/images/banners/sitemaker-slider-banner-1.png" alt="" /></a>
                                  
                              </div>
                            </div>
                          </div>
                          {/*====== End - Mega Menu Row ======*/}
                        </div>
                        {/*====== End - Electronics ======*/}
                        {/*====== Women ======*/}
                        <div className="mega-menu-content">
                          {/*====== Mega Menu Row ======*/}
                          <div className="row">
                            <div className="col-lg-6 mega-image">
                              <div className="mega-banner">
                                <a className="u-d-block" href="shop-side-version-2.html">
                                  <img className="u-img-fluid u-d-block" src="./frontend/images/banners/sitemaker-slider-banner-1.png" alt="" /></a>
                              </div>
                            </div>
                            <div className="col-lg-6 mega-image">
                              <div className="mega-banner">
                                <a className="u-d-block" href="shop-side-version-2.html">
                                  <img className="u-img-fluid u-d-block" src="./frontend/images/banners/sitemaker-slider-banner-1.png" alt="" /></a>
                              </div>
                            </div>
                          </div>
                          {/*====== End - Mega Menu Row ======*/}
                          <br />
                          {/*====== Mega Menu Row ======*/}
                          <div className="row">
                            <div className="col-lg-3">
                              <ul>
                                <li className="mega-list-title">
                                  <a href="shop-side-version-2.html">HOT CATEGORIES</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Dresses</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Blouses &amp; Shirts</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">T-shirts</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Rompers</a>
                                </li>
                              </ul>
                            </div>
                            <div className="col-lg-3">
                              <ul>
                                <li className="mega-list-title">
                                  <a href="shop-side-version-2.html">INTIMATES</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Bras</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Brief Sets</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Bustiers &amp; Corsets</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Panties</a>
                                </li>
                              </ul>
                            </div>
                            <div className="col-lg-3">
                              <ul>
                                <li className="mega-list-title">
                                  <a href="shop-side-version-2.html">WEDDING &amp; EVENTS</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Wedding Dresses</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Evening Dresses</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Prom Dresses</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Flower Dresses</a>
                                </li>
                              </ul>
                            </div>
                            <div className="col-lg-3">
                              <ul>
                                <li className="mega-list-title">
                                  <a href="shop-side-version-2.html">BOTTOMS</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Skirts</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Shorts</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Leggings</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Jeans</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          {/*====== End - Mega Menu Row ======*/}
                          <br />
                          {/*====== Mega Menu Row ======*/}
                          <div className="row">
                            <div className="col-lg-3">
                              <ul>
                                <li className="mega-list-title">
                                  <a href="shop-side-version-2.html">OUTWEAR</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Blazers</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Basics Jackets</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Trench</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Leather &amp; Suede</a>
                                </li>
                              </ul>
                            </div>
                            <div className="col-lg-3">
                              <ul>
                                <li className="mega-list-title">
                                  <a href="shop-side-version-2.html">JACKETS</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Denim Jackets</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Trucker Jackets</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Windbreaker Jackets</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Leather Jackets</a>
                                </li>
                              </ul>
                            </div>
                            <div className="col-lg-3">
                              <ul>
                                <li className="mega-list-title">
                                  <a href="shop-side-version-2.html">ACCESSORIES</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Tech Accessories</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Headwear</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Baseball Caps</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Belts</a>
                                </li>
                              </ul>
                            </div>
                            <div className="col-lg-3">
                              <ul>
                                <li className="mega-list-title">
                                  <a href="shop-side-version-2.html">OTHER ACCESSORIES</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Bags</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Wallets</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Watches</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Sunglasses</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          {/*====== End - Mega Menu Row ======*/}
                          <br />
                          {/*====== Mega Menu Row ======*/}
                          <div className="row">
                            <div className="col-lg-9 mega-image">
                              <div className="mega-banner">
                                <a className="u-d-block" href="shop-side-version-2.html">
                                  <img className="u-img-fluid u-d-block" src="./frontend/images/banners/sitemaker-slider-banner-1.png" alt="" /></a>
                              </div>
                            </div>
                            <div className="col-lg-3 mega-image">
                              <div className="mega-banner">
                                <a className="u-d-block" href="shop-side-version-2.html">
                                  <img className="u-img-fluid u-d-block" src="./frontend/images/banners/sitemaker-slider-banner-1.png" alt="" /></a>
                              </div>
                            </div>
                          </div>
                          {/*====== End - Mega Menu Row ======*/}
                        </div>
                        {/*====== End - Women ======*/}
                        {/*====== Men ======*/}
                        <div className="mega-menu-content">
                          {/*====== Mega Menu Row ======*/}
                          <div className="row">
                            <div className="col-lg-4 mega-image">
                              <div className="mega-banner">
                                <a className="u-d-block" href="shop-side-version-2.html">
                                  <img className="u-img-fluid u-d-block" src="./frontend/images/banners/sitemaker-slider-banner-1.png" alt="" /></a>
                              </div>
                            </div>
                            <div className="col-lg-4 mega-image">
                              <div className="mega-banner">
                                <a className="u-d-block" href="shop-side-version-2.html">
                                  <img className="u-img-fluid u-d-block" src="./frontend/images/banners/sitemaker-slider-banner-1.png" alt="" /></a>
                              </div>
                            </div>
                            <div className="col-lg-4 mega-image">
                              <div className="mega-banner">
                                <a className="u-d-block" href="shop-side-version-2.html">
                                  <img className="u-img-fluid u-d-block" src="./frontend/images/banners/sitemaker-slider-banner-1.png" alt="" /></a>
                              </div>
                            </div>
                          </div>
                          {/*====== End - Mega Menu Row ======*/}
                          <br />
                          {/*====== Mega Menu Row ======*/}
                          <div className="row">
                            <div className="col-lg-3">
                              <ul>
                                <li className="mega-list-title">
                                  <a href="shop-side-version-2.html">HOT SALE</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">T-Shirts</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Tank Tops</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Polo</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Shirts</a>
                                </li>
                              </ul>
                            </div>
                            <div className="col-lg-3">
                              <ul>
                                <li className="mega-list-title">
                                  <a href="shop-side-version-2.html">OUTWEAR</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Hoodies</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Trench</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Parkas</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Sweaters</a>
                                </li>
                              </ul>
                            </div>
                            <div className="col-lg-3">
                              <ul>
                                <li className="mega-list-title">
                                  <a href="shop-side-version-2.html">BOTTOMS</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Casual Pants</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Cargo Pants</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Jeans</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Shorts</a>
                                </li>
                              </ul>
                            </div>
                            <div className="col-lg-3">
                              <ul>
                                <li className="mega-list-title">
                                  <a href="shop-side-version-2.html">UNDERWEAR</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Boxers</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Briefs</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Robes</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Socks</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          {/*====== End - Mega Menu Row ======*/}
                          <br />
                          {/*====== Mega Menu Row ======*/}
                          <div className="row">
                            <div className="col-lg-3">
                              <ul>
                                <li className="mega-list-title">
                                  <a href="shop-side-version-2.html">JACKETS</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Denim Jackets</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Trucker Jackets</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Windbreaker Jackets</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Leather Jackets</a>
                                </li>
                              </ul>
                            </div>
                            <div className="col-lg-3">
                              <ul>
                                <li className="mega-list-title">
                                  <a href="shop-side-version-2.html">SUNGLASSES</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Pilot</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Wayfarer</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Square</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Round</a>
                                </li>
                              </ul>
                            </div>
                            <div className="col-lg-3">
                              <ul>
                                <li className="mega-list-title">
                                  <a href="shop-side-version-2.html">ACCESSORIES</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Eyewear Frames</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Scarves</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Hats</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Belts</a>
                                </li>
                              </ul>
                            </div>
                            <div className="col-lg-3">
                              <ul>
                                <li className="mega-list-title">
                                  <a href="shop-side-version-2.html">OTHER ACCESSORIES</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Bags</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Wallets</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Watches</a>
                                </li>
                                <li>
                                  <a href="shop-side-version-2.html">Tech Accessories</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          {/*====== End - Mega Menu Row ======*/}
                          <br />
                          {/*====== Mega Menu Row ======*/}
                          <div className="row">
                            <div className="col-lg-6 mega-image">
                              <div className="mega-banner">
                                <a className="u-d-block" href="shop-side-version-2.html">
                                  <img className="u-img-fluid u-d-block" src="./frontend/images/banners/sitemaker-slider-banner-1.png" alt="" /></a>
                              </div>
                            </div>
                            <div className="col-lg-6 mega-image">
                              <div className="mega-banner">
                                <a className="u-d-block" href="shop-side-version-2.html">
                                  <img className="u-img-fluid u-d-block" src="./frontend/images/newsletter/subscribe-now.png" alt="" /></a>
                              </div>
                            </div>
                          </div>
                          {/*====== End - Mega Menu Row ======*/}
                        </div>
                        {/*====== End - Men ======*/}
                        {/*====== No Sub Categories ======*/}
                        <div className="mega-menu-content">
                          <h5>No Categories</h5>
                        </div>
                        {/*====== End - No Sub Categories ======*/}
                        {/*====== No Sub Categories ======*/}
                        <div className="mega-menu-content">
                          <h5>No Categories</h5>
                        </div>
                        {/*====== End - No Sub Categories ======*/}
                        {/*====== No Sub Categories ======*/}
                        <div className="mega-menu-content">
                          <h5>No Categories</h5>
                        </div>
                        {/*====== End - No Sub Categories ======*/}
                        {/*====== No Sub Categories ======*/}
                        <div className="mega-menu-content">
                          <h5>No Categories</h5>
                        </div>
                        {/*====== End - No Sub Categories ======*/}
                      </div>
                    </div>
                    {/*====== End - Mega Menu ======*/}
                  </li>
                </ul>
                {/*====== End - List ======*/}
              </div>
              {/*====== End - Menu ======*/}
            </div>
            {/*====== End - Dropdown Main plugin ======*/}
            {/*====== Dropdown Main plugin ======*/}
            
            <div className="menu-init" id="navigation2">
              <button className="btn btn--icon toggle-button toggle-button--secondary fas fa-cog" type="button" />
              {/*====== Menu ======*/}
              <div className="ah-lg-mode">
                <span className="ah-close">✕ Close</span>
                {/*====== List ======*/}
                <ul className="ah-list ah-list--design2 ah-list--link-color-secondary">
                  <li>
                    <a href="shop-side-version-2.html">NEW ARRIVALS</a>
                  </li>
                  {categoriesWithParent.map((category) => (
                    categoryLookup[category.parent_id] && (
                      <li className="has-dropdown" key={category.id}>
                        <Link>{categoryLookup[category.parent_id]}<i className="fas fa-angle-down u-s-m-l-6" /></Link>
                        <span className="js-menu-toggle" />
                        <ul style={{ width: 170 }}>
                          <li className="has-dropdown has-dropdown--ul-left-100">
                            <Link to={category.url}>{category.category_name}<i className="fas fa-angle-down i-state-right u-s-m-l-6" /></Link>
                            <span className="js-menu-toggle" />
                            <ul style={{ width: 118 }}>
                            <li><a href="listing.html">T-shirts</a></li>
                              
                            </ul>
                          </li>
                        </ul>
                      </li>
                    )
                  ))}
                </ul>
                {/*====== End - List ======*/}
              </div>
              {/*====== End - Menu ======*/}
            </div>
            {/*====== End - Dropdown Main plugin ======*/}
            {/*====== Dropdown Main plugin ======*/}
            <div className="menu-init" id="navigation3">
              <button className="btn btn--icon toggle-button toggle-button--secondary fas fa-shopping-bag toggle-button-shop" type="button" />
              <span className="total-item-round">2</span>
              {/*====== Menu ======*/}
              <div className="ah-lg-mode">
                <span className="ah-close">✕ Close</span>
                {/*====== List ======*/}
                <ul className="ah-list ah-list--design1 ah-list--link-color-secondary">
                  <li>
                    <a href="index.html"><i className="fas fa-home u-c-brand" /></a>
                  </li>
                  <li>
                    <a href="wishlist.html"><i className="far fa-heart" /></a>
                  </li>
                  <li className="has-dropdown">
                    <a className="mini-cart-shop-link"><i className="fas fa-shopping-bag" />
                      <span className="total-item-round">3</span></a>
                    {/*====== Dropdown ======*/}
                    <span className="js-menu-toggle" />
                    <div className="mini-cart">
                      {/*====== Mini Product Container ======*/}
                      <div className="mini-product-container gl-scroll u-s-m-b-15">
                        {/*====== Card for mini cart ======*/}
                        <div className="card-mini-product">
                          <div className="mini-product">
                            <div className="mini-product__image-wrapper">
                              <a className="mini-product__link" href="product-detail.html">
                                <img className="u-img-fluid" src="./frontend/images/product/sitemakers-tshirt.png" alt="" /></a>
                            </div>
                            <div className="mini-product__info-wrapper">
                              <span className="mini-product__category">
                                <a href="shop-side-version-2.html">Brand Name</a></span>
                              <span className="mini-product__name">
                                <a href="product-detail.html">Product Name</a></span>
                              <span className="mini-product__quantity">1 x</span>
                              <span className="mini-product__price">₹900</span>
                            </div>
                          </div>
                          <a className="mini-product__delete-link far fa-trash-alt" />
                        </div>
                        {/*====== End - Card for mini cart ======*/}
                        {/*====== Card for mini cart ======*/}
                        <div className="card-mini-product">
                          <div className="mini-product">
                            <div className="mini-product__image-wrapper">
                              <a className="mini-product__link" href="product-detail.html">
                                <img className="u-img-fluid" src="images/product/sitemakers-tshirt.png" alt="" /></a>
                            </div>
                            <div className="mini-product__info-wrapper">
                              <span className="mini-product__category">
                                <a href="shop-side-version-2.html">Brand Name</a></span>
                              <span className="mini-product__name">
                                <a href="product-detail.html">Product Name</a></span>
                              <span className="mini-product__quantity">1 x</span>
                              <span className="mini-product__price">₹900</span>
                            </div>
                          </div>
                          <a className="mini-product__delete-link far fa-trash-alt" />
                        </div>
                        {/*====== End - Card for mini cart ======*/}
                        {/*====== Card for mini cart ======*/}
                        <div className="card-mini-product">
                          <div className="mini-product">
                            <div className="mini-product__image-wrapper">
                              <a className="mini-product__link" href="product-detail.html">
                                <img className="u-img-fluid" src="./frontend/images/product/sitemakers-tshirt.png" alt="" /></a>
                            </div>
                            <div className="mini-product__info-wrapper">
                              <span className="mini-product__category">
                                <a href="shop-side-version-2.html">Brand Name</a></span>
                              <span className="mini-product__name">
                                <a href="product-detail.html">Product Name</a></span>
                              <span className="mini-product__quantity">1 x</span>
                              <span className="mini-product__price">₹900</span>
                            </div>
                          </div>
                          <a className="mini-product__delete-link far fa-trash-alt" />
                        </div>
                        {/*====== End - Card for mini cart ======*/}
                      </div>
                      {/*====== End - Mini Product Container ======*/}
                      {/*====== Mini Product Statistics ======*/}
                      <div className="mini-product-stat">
                        <div className="mini-total">
                          <span className="subtotal-text">SUBTOTAL</span>
                          <span className="subtotal-value">₹2700</span>
                        </div>
                        <div className="mini-action">
                          <a className="mini-link btn--e-brand-b-2" href="checkout.html">PROCEED TO CHECKOUT</a>
                          <a className="mini-link btn--e-transparent-secondary-b-2" href="cart.html">VIEW CART</a>
                        </div>
                      </div>
                      {/*====== End - Mini Product Statistics ======*/}
                    </div>
                    {/*====== End - Dropdown ======*/}
                  </li>
                </ul>
                {/*====== End - List ======*/}
              </div>
              {/*====== End - Menu ======*/}
            </div>
            {/*====== End - Dropdown Main plugin ======*/}
          </div>
          {/*====== End - Secondary Nav ======*/}
        </div>
      </nav>
      {/*====== End - Nav 2 ======*/}
    </header>
    </div>
  )
}

export default Header
