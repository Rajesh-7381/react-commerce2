import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../Component/Footer'
import Header from '../Component/Header'
import  { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { setPaymentMethod } from './redux/features/paymentSlice';
import stripe from './Payment/Stripe';
import {loadStripe} from '@stripe/stripe-js'; 

const Checkout = () => {
    const stripe = useStripe();
  const elements = useElements();
  const dispatch=useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const paymentMethod=useSelector((state)=>state.payment.paymentMethod);
  const [dis,setdis]=useState(null)
  

//   const MakePayment = async () => {
//     const stripe = await loadStripe("pk_test_51O4a72SHw6r4P7p3lRcPeLEdr5MlKBBt9O4hJGgIz5uHbedh6yzVa2YTv7dNcRazWeZIe9WmdYgjz3KjinL8ZvnC00IR7KUVcj");
  
//     try {
//       const response = await fetch('http://localhost:8081/create-payment-intent', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           amount: 1000, // amount in cents
//           id: 49,
          
//         }),
//       });
//       console.log(response)
//       const session = await response.json();
//       console.log(session)
//       window.location.href=session.url;
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
const handlePaymentChange=(event)=>{
    dispatch(setPaymentMethod(event.target.value))
}
  const MakePayment=async()=>{
    switch(paymentMethod){
        case 'stripe':
            // alert(paymentMethod)
            const stripe = await loadStripe("pk_test_51Ph8kgFnMqw8LC18U63JgNUhD8F5wAKZfjQAyrnfgoKNwI5fbZtwBYZfXwkVE7VdsxMmKziLUOKi6AXbI7XJN9Oe00iO9DHFpM");
  
    try {
      const response = await fetch('http://localhost:8081/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 1000, // amount in cents
          id: 49,
          
        }),
      });
    //   console.log(response)
      const session = await response.json();
    //   console.log(session)
      window.location.href=session.url;
    } catch (error) {
      console.log(error.message);
    }
            break;
        case 'cash-on-delivery':
            alert(paymentMethod)
            break;
        case 'pay-with-check':
            alert(paymentMethod)
            break;
        case 'pay-pal':
            alert(paymentMethod)
            break;
        default:
            break;    
    }
  }
  
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
                            <a href="checkout.html">Checkout</a></li>
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
                <div className="container">
                    <div className="row">
                    <div className="col-lg-12">
                        <div id="checkout-msg-group">
                        <div className="msg u-s-m-b-30">
                            <span className="msg__text text-start">Returning customer?
                            <a className="gl-link" href="#return-customer" data-toggle="collapse">Click here to login</a></span>
                            <div className="collapse" id="return-customer" data-parent="#checkout-msg-group">
                            <div className="l-f u-s-m-b-16">
                                <span className="gl-text u-s-m-b-16">If you have an account with us, please log in.</span>
                                <form className="l-f__form">
                                <div className="gl-inline">
                                    <div className="u-s-m-b-15 text-start">
                                    <label className="gl-label" htmlFor="login-email">E-MAIL *</label>
                                    <input className="input-text input-text--primary-style" type="text" id="login-email" placeholder="Enter E-mail" /></div>
                                    <div className="u-s-m-b-15 text-start">
                                    <label className="gl-label" htmlFor="login-password">PASSWORD *</label>
                                    <input className="input-text input-text--primary-style" type="text" id="login-password" placeholder="Enter Password" /></div>
                                </div>
                                <div className="gl-inline ">
                                    <div className="u-s-m-b-15">
                                    <button className="btn btn--e-transparent-brand-b-2 btn-outline-success" type="submit">LOGIN</button></div>
                                    <div className="u-s-m-b-15">
                                    <a className="gl-link" href="lost-password.html">Lost Your Password?</a></div>
                                </div>
                                {/*====== Check Box ======*/}
                                <div className="check-box ">
                                    <input type="checkbox" id="remember-me" />
                                    <div className="check-box__state check-box__state--primary ">
                                    <label className="check-box__label" htmlFor="remember-me">Remember Me</label></div>
                                </div>
                                {/*====== End - Check Box ======*/}
                                </form>
                            </div>
                            </div>
                        </div>
                        <div className="msg">
                            <span className="msg__text text-start">Have a coupon?
                            <a className="gl-link" href="#have-coupon" data-toggle="collapse">Click Here to enter your code</a></span>
                            <div className="collapse" id="have-coupon" data-parent="#checkout-msg-group">
                            <div className="c-f u-s-m-b-16">
                                <span className="gl-text u-s-m-b-16">Enter your coupon code if you have one.</span>
                                <form className="c-f__form">
                                <div className="u-s-m-b-16">
                                    <div className="u-s-m-b-15">
                                    <label htmlFor="coupon" />
                                    <input className="input-text input-text--primary-style" type="text" id="coupon" placeholder="Coupon Code" /></div>
                                    <div className="u-s-m-b-15 text-start">
                                    <button className="btn btn--e-transparent-brand-b-2 btn-primary" type="submit">APPLY</button></div>
                                </div>
                                </form>
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
            {/*====== End - Section 2 ======*/}
            {/*====== Section 3 ======*/}
            <div className="u-s-p-b-60">
                {/*====== Section Content ======*/}
                <div className="section__content">
                <div className="container">
                    <div className="checkout-f">
                    <div className="row">
                        <div className="col-lg-6">
                        <h1 className="checkout-f__h1">DELIVERY ADDRESSES</h1>
                        <div className="o-summary__section u-s-m-b-30">
                            <div className="o-summary__box">
                            <div className="ship-b">
                                <span className="ship-b__text">Ship to:</span>
                                <div className="ship-b__box u-s-m-b-10">
                                <input type="radio" id="address1" name="address_id" />
                                <p className="ship-b__p">Amit Gupta, 1234 Test Address, Delhi-110001 India 9800000000</p>
                                <a className="ship-b__edit btn--e-transparent-platinum-b-2" data-modal="modal" data-modal-id="#edit-ship-address">Edit</a>
                                <a className="ship-b__edit btn--e-transparent-platinum-b-2" data-modal="modal" data-modal-id="#edit-ship-address">Delete</a>
                                </div>
                                <div className="ship-b__box u-s-m-b-10">
                                <input type="radio" id="address1" name="address_id" />
                                <p className="ship-b__p">Amit Gupta, 1234 Test Address Delhi-110001 India 9800000000</p>
                                <a className="ship-b__edit btn--e-transparent-platinum-b-2" data-modal="modal" data-modal-id="#edit-ship-address">Edit</a>
                                <a className="ship-b__edit btn--e-transparent-platinum-b-2" data-modal="modal" data-modal-id="#edit-ship-address">Delete</a>
                                </div>
                            </div>
                            </div>
                        </div>
                        <h1 className="checkout-f__h1">ADD NEW DELIVERY ADDRESS</h1>
                        <form className="checkout-f__delivery">
                            <div className="u-s-m-b-30">
                            <div className="u-s-m-b-15">
                                {/*====== Check Box ======*/}
                                {/* <div class="check-box">

                                                            <input type="checkbox" id="get-address">
                                                            <div class="check-box__state check-box__state--primary">

                                                                <label class="check-box__label" for="get-address">Use default shipping and billing address from account</label></div>
                                                        </div> */}
                                {/*====== End - Check Box ======*/}
                            </div>
                            {/*====== NAME ======*/}
                            <div className="u-s-m-b-15 text-start">
                                <label className="gl-label" htmlFor="shipping-name">NAME *</label>
                                <input className="input-text input-text--primary-style" type="text" id="shipping-name" />
                            </div>
                            {/*====== End - NAME ======*/}
                            {/*====== ADDRESS ======*/}
                            <div className="u-s-m-b-15 text-start">
                                <label className="gl-label" htmlFor="shipping-address">ADDRESS *</label>
                                <input className="input-text input-text--primary-style" type="text" id="shipping-address" />
                            </div>
                            {/*====== End - ADDRESS ======*/}
                            {/*====== CITY ======*/}
                            <div className="u-s-m-b-15 text-start">
                                <label className="gl-label" htmlFor="shipping-city">CITY *</label>
                                <input className="input-text input-text--primary-style" type="text" id="shipping-city" />
                            </div>
                            {/*====== End - CITY ======*/}
                            {/*====== STATE ======*/}
                            <div className="u-s-m-b-15 text-start">
                                <label className="gl-label" htmlFor="shipping-state">STATE *</label>
                                <input className="input-text input-text--primary-style" type="text" id="shipping-state" />
                            </div>
                            {/*====== End - STATE ======*/}
                            {/*====== Country ======*/}
                            <div className="u-s-m-b-15 text-start">
                                {/*====== Select Box ======*/}
                                <label className="gl-label" htmlFor="billing-country">COUNTRY *</label><select className="select-box select-box--primary-style" id="billing-country">
                                <option selected value>Choose Country</option>
                                <option value="India">India</option>
                                <option value="United Arab Emirate">United Arab Emirate</option>
                                <option value="United Kingdom">United Kingdom</option>
                                <option value="United States">United States</option>
                                </select>
                                {/*====== End - Select Box ======*/}
                            </div>
                            {/*====== End - Country ======*/}
                            {/*====== PINCODE ======*/}
                            <div className="u-s-m-b-15 text-start">
                                <label className="gl-label" htmlFor="shipping-pincode">PINCODE *</label>
                                <input className="input-text input-text--primary-style" type="text" id="shipping-pincode" />
                            </div>
                            {/*====== End - PINCODE ======*/}
                            {/*====== MOBILE ======*/}
                            <div className="u-s-m-b-15 text-start">
                                <label className="gl-label" htmlFor="shipping-mobile">MOBILE *</label>
                                <input className="input-text input-text--primary-style" type="text" id="shipping-mobile" />
                            </div>
                            {/*====== End - MOBILE ======*/}
                            <div className="u-s-m-b-10 text-start">
                                {/*====== Check Box ======*/}
                                <div className="check-box">
                                <input type="checkbox" id="make-default-address" />
                                <div className="check-box__state check-box__state--primary">
                                    <label className="check-box__label" htmlFor="make-default-address">Make this default delivery address</label></div>
                                </div>
                                {/*====== End - Check Box ======*/}
                            </div>
                            <div>
                                <button className="btn btn--e-transparent-brand-b-2  btn-success" type="submit">SAVE</button>
                            </div>
                            </div>
                        </form>
                        </div>
                        <div className="col-lg-6">
                        <h1 className="checkout-f__h1">ORDER SUMMARY</h1>
                        {/*====== Order Summary ======*/}
                        <div className="o-summary">
                            <div className="o-summary__section u-s-m-b-30">
                            <div className="o-summary__item-wrap gl-scroll">
                                <div className="o-card">
                                <div className="o-card__flex">
                                    <div className="o-card__img-wrap">
                                    <img className="u-img-fluid" src="images/product/sitemakers-tshirt.png" alt /></div>
                                    <div className="o-card__info-wrap">
                                    <span className="o-card__name">
                                        <a href="product-detail.html">Product Name</a></span>
                                    <span className="o-card__quantity">Quantity x 1</span>
                                    <span className="o-card__price">₹900</span></div>
                                </div>
                                <a className="o-card__del far fa-trash-alt" />
                                </div>
                                <div className="o-card">
                                <div className="o-card__flex">
                                    <div className="o-card__img-wrap">
                                    <img className="u-img-fluid" src="images/product/sitemakers-tshirt.png" alt /></div>
                                    <div className="o-card__info-wrap">
                                    <span className="o-card__name">
                                        <a href="product-detail.html">Product Name</a></span>
                                    <span className="o-card__quantity">Quantity x 1</span>
                                    <span className="o-card__price">₹900</span></div>
                                </div>
                                <a className="o-card__del far fa-trash-alt" />
                                </div>
                                <div className="o-card">
                                <div className="o-card__flex">
                                    <div className="o-card__img-wrap">
                                    <img className="u-img-fluid" src="images/product/sitemakers-tshirt.png" alt /></div>
                                    <div className="o-card__info-wrap">
                                    <span className="o-card__name">
                                        <a href="product-detail.html">Product Name</a></span>
                                    <span className="o-card__quantity">Quantity x 1</span>
                                    <span className="o-card__price">₹900</span></div>
                                </div>
                                <a className="o-card__del far fa-trash-alt" />
                                </div>
                            </div>
                            </div>
                            <div className="o-summary__section u-s-m-b-30 ">
                            <div className="o-summary__box">
                                <h1 className="checkout-f__h1">BILLING ADDRESS</h1>
                                <div className="ship-b text-start">
                                <span className="ship-b__text">Bill to:</span>
                                <div className="ship-b__box u-s-m-b-10">
                                    <p className="ship-b__p">Amit Gupta, 5678 CP New Delhi, Delhi, India (+91) 9700000000</p>
                                    <a className="ship-b__edit btn--e-transparent-platinum-b-2" data-modal="modal" data-modal-id="#edit-ship-address">Edit</a>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="o-summary__section u-s-m-b-30">
                            <div className="o-summary__box">
                                <table className="o-summary__table">
                                <tbody>
                                    <tr>
                                    <td>SUBTOTAL</td>
                                    <td>₹2700</td>
                                    </tr>
                                    <tr>
                                    <td>SHIPPING (+)</td>
                                    <td>₹0.00</td>
                                    </tr>
                                    <tr>
                                    <td>TAX (+)</td>
                                    <td>₹0.00</td>
                                    </tr>
                                    <tr>
                                    <td>DISCOUNT (-)</td>
                                    <td>₹0.00</td>
                                    </tr>
                                    <tr>
                                    <td>GRAND TOTAL</td>
                                    <td>₹2700</td>
                                    </tr>
                                </tbody>
                                </table>
                            </div>
                            </div>
                            <div className="o-summary__section u-s-m-b-30">
                            <div className="o-summary__box">
                                <h1 className="checkout-f__h1">PAYMENT METHODS</h1>
                                <div className="checkout-f__payment" >
                                    <div className="u-s-m-b-10 text-start">
                                        {/*====== Radio Box ======*/}
                                        <div className="radio-box">
                                        <input type="radio" id="cash-on-delivery" name="payment" value="cash-on-delivery" onChange={handlePaymentChange}  />
                                        <div className="radio-box__state radio-box__state--primary">
                                            <label className="radio-box__label" htmlFor="cash-on-delivery">Cash on Delivery</label></div>
                                        </div>
                                        {/*====== End - Radio Box ======*/}
                                        <span className="gl-text u-s-m-t-6">Pay Upon Cash on delivery. (This service is only available for some countries)</span>
                                    </div>
                                    <div className="u-s-m-b-10 text-start">
                                        {/*====== Radio Box ======*/}
                                        <div className="radio-box">
                                        <input type="radio" id="stripe" name="payment" value="stripe" onChange={handlePaymentChange}/>
                                        <div className="radio-box__state radio-box__state--primary">
                                            <label className="radio-box__label" htmlFor="stripe">Stripe</label></div>
                                        </div>
                                        {/*====== End - Radio Box ======*/}
                                        <span className="gl-text u-s-m-t-6">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</span>
                                    </div>
                                    <div className="u-s-m-b-10 text-start">
                                        {/*====== Radio Box ======*/}
                                        <div className="radio-box">
                                        <input type="radio" id="pay-with-check" name="payment" value="pay-with-check" onChange={handlePaymentChange}/>
                                        <div className="radio-box__state radio-box__state--primary">
                                            <label className="radio-box__label" htmlFor="pay-with-check">Pay With Check</label></div>
                                        </div>
                                        {/*====== End - Radio Box ======*/}
                                        <span className="gl-text u-s-m-t-6">Please send a check to Store Name, Store Street, Store Town, Store State / County, Store Postcode.</span>
                                    </div>
                                    <div className="u-s-m-b-10 text-start">
                                        {/*====== Radio Box ======*/}
                                        <div className="radio-box">
                                        <input type="radio" id="pay-pal" name="payment" value="pay-pal" onChange={handlePaymentChange}/>
                                        <div className="radio-box__state radio-box__state--primary">
                                            <label className="radio-box__label" htmlFor="pay-pal">PayPal (Pay With Credit / Debit Card / Paypal Credit)</label></div>
                                        </div>
                                        {/*====== End - Radio Box ======*/}
                                        <span className="gl-text u-s-m-t-6">When you click "Place Order" below we'll take you to Paypal's site to make Payment with your Credit / Debit Card or Paypal Credit.</span>
                                    </div>
                                    <div className="u-s-m-b-15 text-start">
                                        {/*====== Check Box ======*/}
                                        <div className="check-box">
                                        <input type="checkbox" id="term-and-condition" />
                                        <div className="check-box__state check-box__state--primary">
                                            <label className="check-box__label" htmlFor="term-and-condition">I consent to the</label></div>
                                        </div>
                                        {/*====== End - Check Box ======*/}
                                        <a className="gl-link">Terms of Service.</a>
                                    </div>
                                    <div>
                                        <button className="btn btn--e-brand-b-2" style={{backgroundColor:"pink"}} onClick={MakePayment}>PLACE ORDER</button></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*====== End - Order Summary ======*/}
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                {/*====== End - Section Content ======*/}
            </div>
            {/*====== End - Section 3 ======*/}
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

export default Checkout
