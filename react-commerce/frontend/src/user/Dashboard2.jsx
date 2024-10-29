import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from './Component/Header';
import Footer from './Component/Footer';
import {  Carousel,  CarouselItem,  CarouselControl,  CarouselIndicators,  CarouselCaption,} from 'reactstrap';


const Dashboard2 = () => {
  const BASE_URL=process.env.REACT_APP_BASE_URL
  const navigate=useNavigate();
  const [products,setproducts]=useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(()=>{
    fetchProducts();
    
  },[]);

  const fetchProducts=async()=>{
    const response=await axios.get(`${BASE_URL}/api/AllProductDetailsShown`,{headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}});
    // console.log(response)
    // console.log(response.data.result)
    setproducts(response.data.result);
    // console.log(products)
  }
  const items = [
    {
      src: 'https://picsum.photos/id/123/1200/400',
      altText: 'Slide 1',
      caption: 'Slide 1',
      key: 1,
    },
    {
      src: 'https://picsum.photos/id/456/1200/400',
      altText: 'Slide 2',
      caption: 'Slide 2',
      key: 2,
    },
    {
      src: 'https://picsum.photos/id/678/1200/400',
      altText: 'Slide 3',
      caption: 'Slide 3',
      key: 3,
    },
  ];
  

    
  
    const next = () => {
      if (animating) return;
      const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
    };
  
    const previous = () => {
      if (animating) return;
      const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
      setActiveIndex(nextIndex);
    };
  
    const goToIndex = (newIndex) => {
      if (animating) return;
      setActiveIndex(newIndex);
    };
  
    const slides = items.map((item) => {
      return (
        <CarouselItem onExiting={() => setAnimating(true)}  onExited={() => setAnimating(false)} key={item.src} >
          <img src={item.src}  style={{height: 500,  width: 1340, objectFit: 'cover', }} alt={item.altText} />
          <CarouselCaption captionText={item.caption} captionHeader={item.caption}  /> </CarouselItem>
      );
    });
  
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
    <Header />
    {/*====== End - Main Header ======*/}
    {/*====== App Content ======*/}
    <br />
    
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
       {/*====== slider start ======*/}

     <Carousel
     activeIndex={activeIndex}
     next={next}
     previous={previous}
     
   >
     <CarouselIndicators
       items={items}
       activeIndex={activeIndex}
       onClickHandler={goToIndex}
     />
     {slides}
     <CarouselControl
       direction="prev"
       directionText="Previous"
       onClickHandler={previous}
     />
     <CarouselControl
       direction="next"
       directionText="Next"
       onClickHandler={next}
     />
   </Carousel>
   {/*====== slider end ======*/}
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
                   
                    {
                      products.map((product,index)=>(
                        <div key={index} className="col-xl-3 col-lg-4 col-md-6 col-sm-6 u-s-m-b-30 filter__item newarrivals">
                        <div className="product-o product-o--hover-on product-o--radius">
                          <div className="product-o__wrap">
                            <Link className="aspect aspect--bg-grey aspect--square u-d-block" to={'/listproduct'}>
                              <img className="aspect__img" src={`${BASE_URL}/productsimage/`+product.image} alt="" /></Link>
                          </div>
                          <span className="product-o__category">
                            <a href="shop-side-version-2.html">{product.brand_name ? product.brand_name :'Brand Name'}</a></span>
                          <span className="product-o__name">
                            <a href="product-detail.html">{product.product_name}</a></span>
                          <div className="product-o__rating gl-rating-style"><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star-half-alt" />
                            <span className="product-o__review">(25)</span>
                          </div>
                          <span className="product-o__price">₹{product.final_price}.00
                            <span className="product-o__discount">₹{product.product_discount}.00</span></span>
                        </div>
                      </div>
                      ))
                    }
                    
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
    <Footer />
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
