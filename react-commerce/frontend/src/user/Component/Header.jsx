import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addToCart } from '../Account/redux/features/cartSlice'
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
  const [categories, setcategories] = useState([]);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  useEffect(() => {
    document.title="Dashboard2"
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/getAllCategorys');
        // console.log(response.data)
        setcategories(response.data);
      } catch (error) {
        console.error('Error fetching the categories:', error);
      }
    };
  
    fetchCategories();
  }, []);

// Filter out categories without a parent
const categoriesWithParent = categories.filter(category => category.parent_id); // if it met category contain id  and their parent_id they return new array
const uniqueCategories = [...new Set(categoriesWithParent.map(category => category.parent_id))].map(id => categories.find(category => category.id === id));
// console.log(JSON.stringify(categoriesWithParent))

const  { cart } =useSelector((state)=>state.allCart)
  // console.log(cart)

  const send=(e)=>{
    dispatch(addToCart())
  }

  const debounce=(func,wait)=>{
    let timerId;
    return (...args)=>{
      clearTimeout(timerId);
      timerId=setTimeout(()=>func(...args),wait)
    }
  }

  const callApi=async(event)=>{
    const searchData=event.target.value.toLowerCase().trim();
    console.log(searchData)
    if(searchData === ""){
      setcategories(categories)
    }else{
      const filterData=categories.filter(item=>
        item && item.category_name && item.category_name.toLowerCase().includes(searchData)
      )
      setcategories(filterData)
    }
  }
  const debounceCallApi=useMemo(()=>debounce(callApi,1000),[])

  function ListingProduct(id,categoryName){
    navigate("/listproduct",{state: {id:id,categoryName:categoryName}})
  }
  return (
    <div>
    <header className="header--style-1">
      {/*====== Nav 1 ======*/}
      <nav className="primary-nav primary-nav-wrapper--border">
        <div className="container">
          {/*====== Primary Nav ======*/}
          <div className="primary-nav">
            {/*====== Main Logo ======*/}
            <Link className="main-logo" to={"/userdashboard2"}>
              
              <img src="./frontend/images/logo/logo-1.png" alt="" /></Link>
            {/*====== End - Main Logo ======*/}
            {/*====== Search Form ======*/}
            <form className="main-form">
              <label htmlFor="main-search" />
              <input className="input-text input-text--border-radius input-text--style-1" type="text" id="main-search" placeholder="Search" onChange={(e)=>{debounceCallApi(e)}} />
              <button className="btn btn--icon  main-search-button" type="submit" ><i className='fas fa-search'></i></button>
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
                  {uniqueCategories.map((category) => (
                    <li className="has-dropdown" key={category.id}>
                      <Link>{category.category_name}<i className="fas fa-angle-down u-s-m-l-6" /></Link>
                      <span className="js-menu-toggle" />
                      <ul style={{ width: 170 }}>
                        {categoriesWithParent.filter(subCategory => subCategory.parent_id === category.id).map(subCategory => (
                          <li key={subCategory.id} onClick={()=>ListingProduct(subCategory.id,subCategory.category_name)}>
                            <Link to={`/api/${subCategory.category_name}`}>{subCategory.category_name}</Link>
                          </li>
                        ))}
                      </ul>
                    </li>
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
              <span className="total-item-round">{cart.length}</span>
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
                      <span className="total-item-round">{cart.length}</span></a>
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
                          <Link className="mini-link btn--e-brand-b-2" to={"/checkout"}>PROCEED TO CHECKOUT</Link>
                          <Link className="mini-link btn--e-transparent-secondary-b-2" to={"/cart"}>VIEW CART</Link>
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
