import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Dashboard2 = () => {
  const navigate=useNavigate();
  useEffect(()=>{
    document.title='Dashboard';
    
  },[])
  return (
    <div>
    <div>
  <div className="preloader is-active">
    <div className="preloader__wrap">
      
      <img src="./frontend/images/preloader.png" alt=""  className='preloader__img'/>
    </div>
  </div>
  {/*====== Main App ======*/}
  <div id="app">
    {/*====== Main Header ======*/}
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
                  <li className="has-dropdown">
                    <a>CLOTHING<i className="fas fa-angle-down u-s-m-l-6" /></a>
                    {/*====== Dropdown ======*/}
                    <span className="js-menu-toggle" />
                    <ul style={{width: 170}}>
                      <li className="has-dropdown has-dropdown--ul-left-100">
                        <a href="listing.html">Men<i className="fas fa-angle-down i-state-right u-s-m-l-6" /></a>
                        {/*====== Dropdown ======*/}
                        <span className="js-menu-toggle" />
                        <ul style={{width: 118}}>
                          <li>
                            <a href="listing.html">T-shirts</a>
                          </li>
                          <li>
                            <a href="listing.html">Shirts</a>
                          </li>
                          <li>
                            <a href="listing.html">Jeans</a>
                          </li>
                          <li>
                            <a href="listing.html">Shorts</a>
                          </li>
                        </ul>
                        {/*====== End - Dropdown ======*/}
                      </li>
                      <li className="has-dropdown has-dropdown--ul-left-100">
                        <a href="listing.html">Women<i className="fas fa-angle-down i-state-right u-s-m-l-6" /></a>
                        {/*====== Dropdown ======*/}
                        <span className="js-menu-toggle" />
                        <ul style={{width: 200}}>
                          <li>
                            <a href="listing.html">Tops</a>
                          </li>
                          <li>
                            <a href="listing.html">Dresses</a>
                          </li>
                          <li>
                            <a href="listing.html">Shorts</a>
                          </li>
                        </ul>
                        {/*====== End - Dropdown ======*/}
                      </li>
                      <li className="has-dropdown has-dropdown--ul-left-100">
                        <a href="listing.html">Kids<i className="fas fa-angle-down i-state-right u-s-m-l-6" /></a>
                        {/*====== Dropdown ======*/}
                        <span className="js-menu-toggle" />
                        <ul style={{width: 118}}>
                          <li>
                            <a href="listing.html">T-shirts</a>
                          </li>
                          <li>
                            <a href="listing.html">Shirts</a>
                          </li>
                          <li>
                            <a href="listing.html">Shorts</a>
                          </li>
                        </ul>
                        {/*====== End - Dropdown ======*/}
                      </li>
                      <li>
                        <a href="listing.html">Dummy</a>
                      </li>
                    </ul>
                    {/*====== End - Dropdown ======*/}
                  </li>
                  <li className="has-dropdown">
                    <a>ELECTRONICS<i className="fas fa-angle-down u-s-m-l-6" /></a>
                    {/*====== Dropdown ======*/}
                    <span className="js-menu-toggle" />
                    <ul style={{width: 170}}>
                      <li className="has-dropdown has-dropdown--ul-left-100">
                        <a href="listing.html">Mobiles<i className="fas fa-angle-down i-state-right u-s-m-l-6" /></a>
                        {/*====== Dropdown ======*/}
                        <span className="js-menu-toggle" />
                        <ul style={{width: 118}}>
                          <li>
                            <a href="listing.html">Smartphones</a>
                          </li>
                          <li>
                            <a href="listing.html">Accessories</a>
                          </li>
                        </ul>
                        {/*====== End - Dropdown ======*/}
                      </li>
                      <li className="has-dropdown has-dropdown--ul-left-100">
                        <a href="listing.html">Laptops<i className="fas fa-angle-down i-state-right u-s-m-l-6" /></a>
                        {/*====== Dropdown ======*/}
                        <span className="js-menu-toggle" />
                        <ul style={{width: 200}}>
                          <li>
                            <a href="listing.html">Laptops</a>
                          </li>
                          <li>
                            <a href="listing.html">Tablets</a>
                          </li>
                          <li>
                            <a href="listing.html">Accessories</a>
                          </li>
                        </ul>
                        {/*====== End - Dropdown ======*/}
                      </li>
                    </ul>
                    {/*====== End - Dropdown ======*/}
                  </li>
                  <li className="has-dropdown">
                    <a>APPLIANCES<i className="fas fa-angle-down u-s-m-l-6" /></a>
                    {/*====== Dropdown ======*/}
                    <span className="js-menu-toggle" />
                    <ul style={{width: 200}}>
                      <li>
                        <a href="listing.html">Air Conditioners</a>
                      </li>
                      <li>
                        <a href="listing.html">Refrigerators</a>
                      </li>
                    </ul>
                    {/*====== End - Dropdown ======*/}
                  </li>
                  <li>
                    <a href="listing.html">FEATURED PRODUCTS</a>
                  </li>
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
    {/*====== End - Main Header ======*/}
    {/*====== App Content ======*/}
    <div className="app-content">
      {/*====== Primary Slider ======*/}
      {/*<div className="s-skeleton s-skeleton--h-600 s-skeleton--bg-grey">
        <div className="owl-carousel primary-style-1" id="sitemakers-slider">
        <div className="sitemakers-slide sitemakers-slide--1" style={{backgroundImage: `url("./frontend/images/banners/sitemaker-slider-banner-1.png")`}}>
        <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="slider-content slider-content--animation">
                    <span className="content-span-2 u-c-secondary">10% Off on T-Shirts</span>
                    <a className="shop-now-link btn--e-brand" href="shop-side-version-2.html">SHOP NOW</a></div>
                </div>
              </div>
            </div>
          </div>
          <div className="sitemakers-slide sitemakers-slide--2" style={{backgroundImage: `url("./frontend/images/banners/sitemaker-slider-banner-2.png")`}}>
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="slider-content slider-content--animation">
                    <span className="content-span-2 u-c-secondary">20% Off on T-Shirts</span>
                    <a className="shop-now-link btn--e-brand" href="shop-side-version-2.html">SHOP NOW</a></div>
                </div>
              </div>
            </div>
          </div>
          <div className="sitemakers-slide sitemakers-slide--3" style={{backgroundImage: `url("./frontend/images/banners/sitemaker-slider-banner-3.png")`}}>
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="slider-content slider-content--animation">
                    <span className="content-span-2 u-c-secondary">15% Off on Jackets</span>
                    <a className="shop-now-link btn--e-brand" href="shop-side-version-2.html">SHOP NOW</a></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>*/}

      {/*====== End - Primary Slider ======*/}
      {/*====== Section 1 ======*/}
      <div className="u-s-p-y-60">
        {/*====== Section Intro ======*/}
        <div className="section__intro u-s-m-b-46">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section__text-wrap">
                  <h1 className="section__heading u-c-secondary u-s-m-b-12">SHOP BY DEALS</h1>
                  <span className="section__span u-c-silver">BROWSE FAVOURITE DEALS</span>
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
              <div className="col-lg-5 col-md-5 u-s-m-b-30">
                <a className="collection" href="shop-side-version-2.html">
                  <div className="aspect aspect--bg-grey aspect--square">
                    <img className="aspect__img collection__img" src="./frontend/images/collection/fix-banner-1.png" alt="" />
                  </div>
                </a>
              </div>
              <div className="col-lg-7 col-md-7 u-s-m-b-30">
                <a className="collection" href="shop-side-version-2.html">
                  <div className="aspect aspect--bg-grey aspect--1286-890">
                    <img className="aspect__img collection__img" src="./frontend/images/collection/fix-banner-2.png" alt="" />
                  </div>
                </a>
              </div>
              <div className="col-lg-7 col-md-7 u-s-m-b-30">
                <a className="collection" href="shop-side-version-2.html">
                  <div className="aspect aspect--bg-grey aspect--1286-890">
                    <img className="aspect__img collection__img" src="./frontend/images/collection/fix-banner-3.png" alt="" />
                  </div>
                </a>
              </div>
              <div className="col-lg-5 col-md-5 u-s-m-b-30">
                <a className="collection" href="shop-side-version-2.html">
                  <div className="aspect aspect--bg-grey aspect--square">
                    <img className="aspect__img collection__img" src="./frontend/images/collection/fix-banner-4.png" alt="" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/*====== Section Content ======*/}
      </div>
      {/*====== End - Section 1 ======*/}
      {/*====== Section 2 ======*/}
      <div className="u-s-p-b-60">
        {/*====== Section Intro ======*/}
        <div className="section__intro u-s-m-b-16">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section__text-wrap">
                  <h1 className="section__heading u-c-secondary u-s-m-b-12">TOP TRENDING</h1>
                  <span className="section__span u-c-silver">CHOOSE CATEGORY</span>
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
              <div className="col-lg-12">
                <div className="filter-category-container">
                  <div className="filter__category-wrapper">
                    <button className="btn filter__btn filter__btn--style-1 js-checked" type="button" data-filter="*">ALL</button>
                  </div>
                  <div className="filter__category-wrapper">
                    <button className="btn filter__btn filter__btn--style-1" type="button" data-filter=".newarrivals">NEW ARRIVALS</button>
                  </div>
                  <div className="filter__category-wrapper">
                    <button className="btn filter__btn filter__btn--style-1" type="button" data-filter=".bestsellers">BEST SELLERS</button>
                  </div>
                  <div className="filter__category-wrapper">
                    <button className="btn filter__btn filter__btn--style-1" type="button" data-filter=".discountedproducts">DISCOUNTED PRODUCTS</button>
                  </div>
                  <div className="filter__category-wrapper">
                    <button className="btn filter__btn filter__btn--style-1" type="button" data-filter=".featuredproducts">FEATURED PRODUCTS</button>
                  </div>
                </div>
                <div className="filter__grid-wrapper u-s-m-t-30">
                  <div className="row">
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 u-s-m-b-30 filter__item newarrivals">
                      <div className="product-o product-o--hover-on product-o--radius">
                        <div className="product-o__wrap">
                          <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                            <img className="aspect__img" src="./frontend/images/product/sitemakers-tshirt.png" alt="" /></a>
                        </div>
                        <span className="product-o__category">
                          <a href="shop-side-version-2.html">Brand Name</a></span>
                        <span className="product-o__name">
                          <a href="product-detail.html">Product Name</a></span>
                        <div className="product-o__rating gl-rating-style"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" />
                          <span className="product-o__review">(25)</span>
                        </div>
                        <span className="product-o__price">₹900.00
                          <span className="product-o__discount">₹1000.00.00</span></span>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 u-s-m-b-30 filter__item newarrivals">
                      <div className="product-o product-o--hover-on product-o--radius">
                        <div className="product-o__wrap">
                          <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                            <img className="aspect__img" src="./frontend/images/product/sitemakers-tshirt.png" alt="" /></a>
                        </div>
                        <span className="product-o__category">
                          <a href="shop-side-version-2.html">Brand Name</a></span>
                        <span className="product-o__name">
                          <a href="product-detail.html">Product Name</a></span>
                        <div className="product-o__rating gl-rating-style"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" /><i className="far fa-star" /><i className="far fa-star" />
                          <span className="product-o__review">(25)</span>
                        </div>
                        <span className="product-o__price">₹900.00
                          <span className="product-o__discount">₹1000.00.00</span></span>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 u-s-m-b-30 filter__item newarrivals">
                      <div className="product-o product-o--hover-on product-o--radius">
                        <div className="product-o__wrap">
                          <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                            <img className="aspect__img" src="./frontend/images/product/sitemakers-tshirt.png" alt="" /></a>
                        </div>
                        <span className="product-o__category">
                          <a href="shop-side-version-2.html">Brand Name</a></span>
                        <span className="product-o__name">
                          <a href="product-detail.html">Product Name</a></span>
                        <div className="product-o__rating gl-rating-style"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" />
                          <span className="product-o__review">(25)</span>
                        </div>
                        <span className="product-o__price">₹900.00
                          <span className="product-o__discount">₹1000.00.00</span></span>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 u-s-m-b-30 filter__item newarrivals">
                      <div className="product-o product-o--hover-on product-o--radius">
                        <div className="product-o__wrap">
                          <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                            <img className="aspect__img" src="./frontend/images/product/sitemakers-tshirt.png" alt="" /></a>
                        </div>
                        <span className="product-o__category">
                          <a href="shop-side-version-2.html">Brand Name</a></span>
                        <span className="product-o__name">
                          <a href="product-detail.html">Product Name</a></span>
                        <div className="product-o__rating gl-rating-style"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" />
                          <span className="product-o__review">(25)</span>
                        </div>
                        <span className="product-o__price">₹900.00
                          <span className="product-o__discount">₹1000.00.00</span></span>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 u-s-m-b-30 filter__item bestsellers">
                      <div className="product-o product-o--hover-on product-o--radius">
                        <div className="product-o__wrap">
                          <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                            <img className="aspect__img" src="./frontend/images/product/sitemakers-tshirt.png" alt="" /></a>
                        </div>
                        <span className="product-o__category">
                          <a href="shop-side-version-2.html">Brand Name</a></span>
                        <span className="product-o__name">
                          <a href="product-detail.html">Product Name</a></span>
                        <div className="product-o__rating gl-rating-style"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" />
                          <span className="product-o__review">(25)</span>
                        </div>
                        <span className="product-o__price">₹900.00
                          <span className="product-o__discount">₹1000.00.00</span></span>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 u-s-m-b-30 filter__item bestsellers">
                      <div className="product-o product-o--hover-on product-o--radius">
                        <div className="product-o__wrap">
                          <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                            <img className="aspect__img" src="./frontend/images/product/sitemakers-tshirt.png" alt="" /></a>
                        </div>
                        <span className="product-o__category">
                          <a href="shop-side-version-2.html">Brand Name</a></span>
                        <span className="product-o__name">
                          <a href="product-detail.html">Product Name</a></span>
                        <div className="product-o__rating gl-rating-style"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" />
                          <span className="product-o__review">(25)</span>
                        </div>
                        <span className="product-o__price">₹900.00
                          <span className="product-o__discount">₹1000.00.00</span></span>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 u-s-m-b-30 filter__item bestsellers">
                      <div className="product-o product-o--hover-on product-o--radius">
                        <div className="product-o__wrap">
                          <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                            <img className="aspect__img" src="./frontend/images/product/sitemakers-tshirt.png" alt="" /></a>
                        </div>
                        <span className="product-o__category">
                          <a href="shop-side-version-2.html">Brand Name</a></span>
                        <span className="product-o__name">
                          <a href="product-detail.html">Product Name</a></span>
                        <div className="product-o__rating gl-rating-style"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" />
                          <span className="product-o__review">(25)</span>
                        </div>
                        <span className="product-o__price">₹900.00
                          <span className="product-o__discount">₹1000.00.00</span></span>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 u-s-m-b-30 filter__item bestsellers">
                      <div className="product-o product-o--hover-on product-o--radius">
                        <div className="product-o__wrap">
                          <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                            <img className="aspect__img" src="./frontend/images/product/sitemakers-tshirt.png" alt="" /></a>
                        </div>
                        <span className="product-o__category">
                          <a href="shop-side-version-2.html">Brand Name</a></span>
                        <span className="product-o__name">
                          <a href="product-detail.html">Product Name</a></span>
                        <div className="product-o__rating gl-rating-style"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" />
                          <span className="product-o__review">(25)</span>
                        </div>
                        <span className="product-o__price">₹900.00
                          <span className="product-o__discount">₹1000.00.00</span></span>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 u-s-m-b-30 filter__item discountedproducts">
                      <div className="product-o product-o--hover-on product-o--radius">
                        <div className="product-o__wrap">
                          <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                            <img className="aspect__img" src="./frontend/images/product/sitemakers-tshirt.png" alt="" /></a>
                        </div>
                        <span className="product-o__category">
                          <a href="shop-side-version-2.html">Brand Name</a></span>
                        <span className="product-o__name">
                          <a href="product-detail.html">Product Name</a></span>
                        <div className="product-o__rating gl-rating-style"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" />
                          <span className="product-o__review">(25)</span>
                        </div>
                        <span className="product-o__price">₹900.00
                          <span className="product-o__discount">₹1000.00.00</span></span>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 u-s-m-b-30 filter__item discountedproducts">
                      <div className="product-o product-o--hover-on product-o--radius">
                        <div className="product-o__wrap">
                          <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                            <img className="aspect__img" src="./frontend/images/product/sitemakers-tshirt.png" alt="" /></a>
                        </div>
                        <span className="product-o__category">
                          <a href="shop-side-version-2.html">Brand Name</a></span>
                        <span className="product-o__name">
                          <a href="product-detail.html">Product Name</a></span>
                        <div className="product-o__rating gl-rating-style"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" />
                          <span className="product-o__review">(25)</span>
                        </div>
                        <span className="product-o__price">₹900.00
                          <span className="product-o__discount">₹1000.00.00</span></span>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 u-s-m-b-30 filter__item discountedproducts">
                      <div className="product-o product-o--hover-on product-o--radius">
                        <div className="product-o__wrap">
                          <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                            <img className="aspect__img" src="./frontend/images/product/sitemakers-tshirt.png" alt="" /></a>
                        </div>
                        <span className="product-o__category">
                          <a href="shop-side-version-2.html">Brand Name</a></span>
                        <span className="product-o__name">
                          <a href="product-detail.html">Product Name</a></span>
                        <div className="product-o__rating gl-rating-style"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" />
                          <span className="product-o__review">(25)</span>
                        </div>
                        <span className="product-o__price">₹900.00
                          <span className="product-o__discount">₹1000.00.00</span></span>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 u-s-m-b-30 filter__item discountedproducts">
                      <div className="product-o product-o--hover-on product-o--radius">
                        <div className="product-o__wrap">
                          <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                            <img className="aspect__img" src="./frontend/images/product/sitemakers-tshirt.png" alt="" /></a>
                        </div>
                        <span className="product-o__category">
                          <a href="shop-side-version-2.html">Brand Name</a></span>
                        <span className="product-o__name">
                          <a href="product-detail.html">Product Name</a></span>
                        <div className="product-o__rating gl-rating-style"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" />
                          <span className="product-o__review">(25)</span>
                        </div>
                        <span className="product-o__price">₹900.00
                          <span className="product-o__discount">₹1000.00.00</span></span>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 u-s-m-b-30 filter__item featuredproducts">
                      <div className="product-o product-o--hover-on product-o--radius">
                        <div className="product-o__wrap">
                          <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                            <img className="aspect__img" src="./frontend/images/product/sitemakers-tshirt.png" alt="" /></a>
                        </div>
                        <span className="product-o__category">
                          <a href="shop-side-version-2.html">Brand Name</a></span>
                        <span className="product-o__name">
                          <a href="product-detail.html">Product Name</a></span>
                        <div className="product-o__rating gl-rating-style"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" />
                          <span className="product-o__review">(25)</span>
                        </div>
                        <span className="product-o__price">₹900.00
                          <span className="product-o__discount">₹1000.00.00</span></span>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 u-s-m-b-30 filter__item featuredproducts">
                      <div className="product-o product-o--hover-on product-o--radius">
                        <div className="product-o__wrap">
                          <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                            <img className="aspect__img" src="./frontend/images/product/sitemakers-tshirt.png" alt="" /></a>
                        </div>
                        <span className="product-o__category">
                          <a href="shop-side-version-2.html">Brand Name</a></span>
                        <span className="product-o__name">
                          <a href="product-detail.html">Product Name</a></span>
                        <div className="product-o__rating gl-rating-style"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" />
                          <span className="product-o__review">(25)</span>
                        </div>
                        <span className="product-o__price">₹900.00
                          <span className="product-o__discount">₹1000.00.00</span></span>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 u-s-m-b-30 filter__item featuredproducts">
                      <div className="product-o product-o--hover-on product-o--radius">
                        <div className="product-o__wrap">
                          <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                            <img className="aspect__img" src="./frontend/images/product/sitemakers-tshirt.png" alt="" /></a>
                        </div>
                        <span className="product-o__category">
                          <a href="shop-side-version-2.html">Brand Name</a></span>
                        <span className="product-o__name">
                          <a href="product-detail.html">Product Name</a></span>
                        <div className="product-o__rating gl-rating-style"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" />
                          <span className="product-o__review">(25)</span>
                        </div>
                        <span className="product-o__price">₹900.00
                          <span className="product-o__discount">₹1000.00.00</span></span>
                      </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6 u-s-m-b-30 filter__item featuredproducts">
                      <div className="product-o product-o--hover-on product-o--radius">
                        <div className="product-o__wrap">
                          <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                            <img className="aspect__img" src="./frontend/images/product/sitemakers-tshirt.png" alt="" /></a>
                        </div>
                        <span className="product-o__category">
                          <a href="shop-side-version-2.html">Brand Name</a></span>
                        <span className="product-o__name">
                          <a href="product-detail.html">Product Name</a></span>
                        <div className="product-o__rating gl-rating-style"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" />
                          <span className="product-o__review">(25)</span>
                        </div>
                        <span className="product-o__price">₹900.00
                          <span className="product-o__discount">₹1000.00.00</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="load-more">
                  <button className="btn btn--e-brand" type="button">View More</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*====== End - Section Content ======*/}
      </div>
      {/*====== Section 4 ======*/}
      <div className="u-s-p-b-60">
        {/*====== Section Intro ======*/}
        <div className="section__intro u-s-m-b-46">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section__text-wrap">
                  <h1 className="section__heading u-c-secondary u-s-m-b-12">NEW ARRIVALS</h1>
                  <span className="section__span u-c-silver">GET UP FOR NEW ARRIVALS</span>
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
                  <div className="product-o product-o--hover-on product-o--radius">
                    <div className="product-o__wrap">
                      <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                        <img className="aspect__img" src="./frontend/images/product/sitemakers-tshirt.png" alt="" /></a>
                    </div>
                    <span className="product-o__category">
                      <a href="shop-side-version-2.html">Brand Name</a></span>
                    <span className="product-o__name">
                      <a href="product-detail.html">Product Name</a></span>
                    <div className="product-o__rating gl-rating-style"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" />
                      <span className="product-o__review">(25)</span>
                    </div>
                    <span className="product-o__price">₹900.00
                      <span className="product-o__discount">₹1000.00.00</span></span>
                  </div>
                </div>
                <div className="u-s-m-b-30">
                  <div className="product-o product-o--hover-on product-o--radius">
                    <div className="product-o__wrap">
                      <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                        <img className="aspect__img" src="./frontend/images/product/sitemakers-tshirt.png" alt="" /></a>
                    </div>
                    <span className="product-o__category">
                      <a href="shop-side-version-2.html">Brand Name</a></span>
                    <span className="product-o__name">
                      <a href="product-detail.html">Product Name</a></span>
                    <div className="product-o__rating gl-rating-style"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" />
                      <span className="product-o__review">(25)</span>
                    </div>
                    <span className="product-o__price">₹900.00
                      <span className="product-o__discount">₹1000.00.00</span></span>
                  </div>
                </div>
                <div className="u-s-m-b-30">
                  <div className="product-o product-o--hover-on product-o--radius">
                    <div className="product-o__wrap">
                      <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                        <img className="aspect__img" src="./frontend/images/product/sitemakers-tshirt.png" alt="" /></a>
                    </div>
                    <span className="product-o__category">
                      <a href="shop-side-version-2.html">Brand Name</a></span>
                    <span className="product-o__name">
                      <a href="product-detail.html">Product Name</a></span>
                    <div className="product-o__rating gl-rating-style"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" />
                      <span className="product-o__review">(25)</span>
                    </div>
                    <span className="product-o__price">₹900.00
                      <span className="product-o__discount">₹1000.00.00</span></span>
                  </div>
                </div>
                <div className="u-s-m-b-30">
                  <div className="product-o product-o--hover-on product-o--radius">
                    <div className="product-o__wrap">
                      <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                        <img className="aspect__img" src="./frontend/images/product/sitemakers-tshirt.png" alt="" /></a>
                    </div>
                    <span className="product-o__category">
                      <a href="shop-side-version-2.html">Brand Name</a></span>
                    <span className="product-o__name">
                      <a href="product-detail.html">Product Name</a></span>
                    <div className="product-o__rating gl-rating-style"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" />
                      <span className="product-o__review">(25)</span>
                    </div>
                    <span className="product-o__price">₹900.00
                      <span className="product-o__discount">₹1000.00.00</span></span>
                  </div>
                </div>
                <div className="u-s-m-b-30">
                  <div className="product-o product-o--hover-on product-o--radius">
                    <div className="product-o__wrap">
                      <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                        <img className="aspect__img" src="./frontend/images/product/sitemakers-tshirt.png" alt="" /></a>
                    </div>
                    <span className="product-o__category">
                      <a href="shop-side-version-2.html">Brand Name</a></span>
                    <span className="product-o__name">
                      <a href="product-detail.html">Product Name</a></span>
                    <div className="product-o__rating gl-rating-style"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" />
                      <span className="product-o__review">(25)</span>
                    </div>
                    <span className="product-o__price">₹900.00
                      <span className="product-o__discount">₹1000.00.00</span></span>
                  </div>
                </div>
                <div className="u-s-m-b-30">
                  <div className="product-o product-o--hover-on product-o--radius">
                    <div className="product-o__wrap">
                      <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                        <img className="aspect__img" src="./frontend/images/product/sitemakers-tshirt.png" alt="" /></a>
                    </div>
                    <span className="product-o__category">
                      <a href="shop-side-version-2.html">Brand Name</a></span>
                    <span className="product-o__name">
                      <a href="product-detail.html">Product Name</a></span>
                    <div className="product-o__rating gl-rating-style"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" />
                      <span className="product-o__review">(25)</span>
                    </div>
                    <span className="product-o__price">₹900.00
                      <span className="product-o__discount">₹1000.00.00</span></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="load-more">
                <button className="btn btn--e-brand" type="button">View More</button>
              </div>
            </div>
          </div>
        </div>
        {/*====== End - Section Content ======*/}
      </div>
      {/*====== End - Section 4 ======*/}
      {/*====== Section 5 ======*/}
      <div className="u-s-p-b-60">
        {/*====== Section Intro ======*/}
        <div className="section__intro u-s-m-b-46">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="section__text-wrap">
                  <h1 className="section__heading u-c-secondary u-s-m-b-12">FEATURED PRODUCTS</h1>
                  <span className="section__span u-c-silver">GET UP FOR FEATURED PRODUCTS</span>
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
                  <div className="product-o product-o--hover-on product-o--radius">
                    <div className="product-o__wrap">
                      <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                        <img className="aspect__img" src="./frontend/images/product/sitemakers-tshirt.png" alt="" /></a>
                    </div>
                    <span className="product-o__category">
                      <a href="shop-side-version-2.html">Brand Name</a></span>
                    <span className="product-o__name">
                      <a href="product-detail.html">Product Name</a></span>
                    <div className="product-o__rating gl-rating-style"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" />
                      <span className="product-o__review">(25)</span>
                    </div>
                    <span className="product-o__price">₹900.00
                      <span className="product-o__discount">₹1000.00.00</span></span>
                  </div>
                </div>
                <div className="u-s-m-b-30">
                  <div className="product-o product-o--hover-on product-o--radius">
                    <div className="product-o__wrap">
                      <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                        <img className="aspect__img" src="./frontend/images/product/sitemakers-tshirt.png" alt="" /></a>
                    </div>
                    <span className="product-o__category">
                      <a href="shop-side-version-2.html">Brand Name</a></span>
                    <span className="product-o__name">
                      <a href="product-detail.html">Product Name</a></span>
                    <div className="product-o__rating gl-rating-style"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" />
                      <span className="product-o__review">(25)</span>
                    </div>
                    <span className="product-o__price">₹900.00
                      <span className="product-o__discount">₹1000.00.00</span></span>
                  </div>
                </div>
                <div className="u-s-m-b-30">
                  <div className="product-o product-o--hover-on product-o--radius">
                    <div className="product-o__wrap">
                      <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                        <img className="aspect__img" src="./frontend/images/product/sitemakers-tshirt.png" alt="" /></a>
                    </div>
                    <span className="product-o__category">
                      <a href="shop-side-version-2.html">Brand Name</a></span>
                    <span className="product-o__name">
                      <a href="product-detail.html">Product Name</a></span>
                    <div className="product-o__rating gl-rating-style"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" />
                      <span className="product-o__review">(25)</span>
                    </div>
                    <span className="product-o__price">₹900.00
                      <span className="product-o__discount">₹1000.00.00</span></span>
                  </div>
                </div>
                <div className="u-s-m-b-30">
                  <div className="product-o product-o--hover-on product-o--radius">
                    <div className="product-o__wrap">
                      <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                        <img className="aspect__img" src="./frontend/images/product/sitemakers-tshirt.png" alt="" /></a>
                    </div>
                    <span className="product-o__category">
                      <a href="shop-side-version-2.html">Brand Name</a></span>
                    <span className="product-o__name">
                      <a href="product-detail.html">Product Name</a></span>
                    <div className="product-o__rating gl-rating-style"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" />
                      <span className="product-o__review">(25)</span>
                    </div>
                    <span className="product-o__price">₹900.00
                      <span className="product-o__discount">₹1000.00.00</span></span>
                  </div>
                </div>
                <div className="u-s-m-b-30">
                  <div className="product-o product-o--hover-on product-o--radius">
                    <div className="product-o__wrap">
                      <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                        <img className="aspect__img" src="./frontend/images/product/sitemakers-tshirt.png" alt="" /></a>
                    </div>
                    <span className="product-o__category">
                      <a href="shop-side-version-2.html">Brand Name</a></span>
                    <span className="product-o__name">
                      <a href="product-detail.html">Product Name</a></span>
                    <div className="product-o__rating gl-rating-style"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" />
                      <span className="product-o__review">(25)</span>
                    </div>
                    <span className="product-o__price">₹900.00
                      <span className="product-o__discount">₹1000.00.00</span></span>
                  </div>
                </div>
                <div className="u-s-m-b-30">
                  <div className="product-o product-o--hover-on product-o--radius">
                    <div className="product-o__wrap">
                      <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                        <img className="aspect__img" src="./frontend/images/product/sitemakers-tshirt.png" alt="" /></a>
                    </div>
                    <span className="product-o__category">
                      <a href="shop-side-version-2.html">Brand Name</a></span>
                    <span className="product-o__name">
                      <a href="product-detail.html">Product Name</a></span>
                    <div className="product-o__rating gl-rating-style"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" />
                      <span className="product-o__review">(25)</span>
                    </div>
                    <span className="product-o__price">₹900.00
                      <span className="product-o__discount">₹1000.00.00</span></span>
                  </div>
                </div>
                <div className="u-s-m-b-30">
                  <div className="product-o product-o--hover-on product-o--radius">
                    <div className="product-o__wrap">
                      <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                        <img className="aspect__img" src="./frontend/images/product/sitemakers-tshirt.png" alt="" /></a>
                    </div>
                    <span className="product-o__category">
                      <a href="shop-side-version-2.html">Brand Name</a></span>
                    <span className="product-o__name">
                      <a href="product-detail.html">Product Name</a></span>
                    <div className="product-o__rating gl-rating-style"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" />
                      <span className="product-o__review">(25)</span>
                    </div>
                    <span className="product-o__price">₹900.00
                      <span className="product-o__discount">₹1000.00.00</span></span>
                  </div>
                </div>
                <div className="u-s-m-b-30">
                  <div className="product-o product-o--hover-on product-o--radius">
                    <div className="product-o__wrap">
                      <a className="aspect aspect--bg-grey aspect--square u-d-block" href="product-detail.html">
                        <img className="aspect__img" src="./frontend/images/product/sitemakers-tshirt.png" alt="" /></a>
                    </div>
                    <span className="product-o__category">
                      <a href="shop-side-version-2.html">Brand Name</a></span>
                    <span className="product-o__name">
                      <a href="product-detail.html">Product Name</a></span>
                    <div className="product-o__rating gl-rating-style"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" />
                      <span className="product-o__review">(25)</span>
                    </div>
                    <span className="product-o__price">₹900.00
                      <span className="product-o__discount">₹1000.00.00</span></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="load-more">
                <button className="btn btn--e-brand" type="button">View More</button>
              </div>
            </div>
          </div>
        </div>
        {/*====== End - Section Content ======*/}
      </div>
      {/*====== End - Section 5 ======*/}
    </div>
    {/*====== End - App Content ======*/}
    {/*====== Main Footer ======*/}
    <footer>
      <div className="outer-footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="outer-footer__content u-s-m-b-40">
                <span className="outer-footer__content-title">Contact Us</span>
                <div className="outer-footer__text-wrap"><i className="fas fa-home" />
                  <span>SITEMAKERS.IN</span>
                </div>
                <div className="outer-footer__text-wrap"><i className="fas fa-phone-volume" />
                  <span>(+91) 900 000 000</span>
                </div>
                <div className="outer-footer__text-wrap"><i className="far fa-envelope" />
                  <span>contact@sitemakers.in</span>
                </div>
                <div className="outer-footer__social">
                  <ul>
                    <li>
                      <a className="s-fb--color-hover" href="#"><i className="fab fa-facebook-f" /></a>
                    </li>
                    <li>
                      <a className="s-tw--color-hover" href="#"><i className="fab fa-twitter" /></a>
                    </li>
                    <li>
                      <a className="s-youtube--color-hover" href="#"><i className="fab fa-youtube" /></a>
                    </li>
                    <li>
                      <a className="s-insta--color-hover" href="#"><i className="fab fa-instagram" /></a>
                    </li>
                    <li>
                      <a className="s-gplus--color-hover" href="#"><i className="fab fa-google-plus-g" /></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <div className="outer-footer__content u-s-m-b-40">
                    <span className="outer-footer__content-title">Account</span>
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
                      <span className="outer-footer__content-title">Company</span>
                      <ul>
                        <li>
                          <a href="about.html">About us</a>
                        </li>
                        <li>
                          <a href="contact.html">Contact us</a>
                        </li>
                        <li>
                          <a href="faq.html">FAQ</a>
                        </li>
                        <li>
                          <a href="terms-conditions.html">Terms &amp; Conditions</a>
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
                <span className="outer-footer__content-title">Join our Newsletter</span>
                <form className="newsletter">
                  <div className="newsletter__group">
                    <label htmlFor="newsletter" />
                    <input className="input-text input-text--only-white" type="text" id="newsletter" placeholder="Enter your Email" />
                    <button className="btn btn--e-brand newsletter__btn" type="submit">SUBSCRIBE</button>
                  </div>
                  <span className="newsletter__text">Subscribe to the mailing list to receive updates on promotions, new arrivals, discount and coupons.</span>
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
                    <li><i className="fab fa-cc-stripe" /></li>
                    <li><i className="fab fa-cc-paypal" /></li>
                    <li><i className="fab fa-cc-mastercard" /></li>
                    <li><i className="fab fa-cc-visa" /></li>
                    <li><i className="fab fa-cc-discover" /></li>
                    <li><i className="fab fa-cc-amex" /></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
    {/*====== Modal Section ======*/}
    {/*====== Newsletter Subscribe Modal ======*/}
    <div className="modal fade new-l" id="newsletter-modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content modal--shadow">
          <button className="btn new-l__dismiss fas fa-times" type="button" data-dismiss="modal" />
          <div className="modal-body">
            <div className="row u-s-m-x-0">
              <div className="col-lg-6 new-l__col-1 u-s-p-x-0">
                <a className="new-l__img-wrap u-d-block" href="shop-side-version-2.html">
                  <img className="u-img-fluid u-d-block" src="./frontend/images/newsletter/subscribe-now.png" alt="" /></a>
              </div>
              <div className="col-lg-6 new-l__col-2">
                <div className="new-l__section u-s-m-t-30">
                  <div className="u-s-m-b-8 new-l--center">
                    <h3 className="new-l__h3">Newsletter</h3>
                  </div>
                  <div className="u-s-m-b-30 new-l--center">
                    <p className="new-l__p1">Subscribe for emails to get the scoop on new arrivals, special sales and more.</p>
                  </div>
                  <form className="new-l__form">
                    <div className="u-s-m-b-15">
                      <input className="news-l__input" type="text" placeholder="E-mail Address" />
                    </div>
                    <div className="u-s-m-b-15">
                      <button className="btn btn--e-brand-b-2" type="submit">Subscribe!</button>
                    </div>
                  </form>
                  <div className="u-s-m-b-15 new-l--center"> 
                    <p className="new-l__p2">By Signing up, you agree to receive Reshop offers,<br />promotions and other commercial messages. You may unsubscribe at any time.</p>
                  </div>
                  <div className="u-s-m-b-15 new-l--center">
                    <Link className="new-l__link" data-dismiss="modal">No Thanks</Link>
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

export default Dashboard2
