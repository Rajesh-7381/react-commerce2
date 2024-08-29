import React, { Suspense } from 'react';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import './App.css';
import 'react-notifications/lib/notifications.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Dashboard2 from './user/Dashboard2';
import Success from './user/Account/Success';
import Cancel from './user/Account/Cancel';
import Contact from './user/Contact';
import MyAccount from './user/Account/MyAccount';
import WishList from './user/Account/WishList';
import Order from './user/Account/Order';
import MyCart from './user/Account/MyCart';
import ProductDetails from './user/Account/ProductDetails';
import Listing from './user/Account/Listing';
import Checkout from './user/Account/Checkout';
import Cart from './user/Account/Cart';
import CreditOrDebit from './user/Account/Payment/CreditOrDebit';
import DomTable from './Pratice/DomTable';

const stripePromise = loadStripe('pk_test_51Ph8kgFnMqw8LC18U63JgNUhD8F5wAKZfjQAyrnfgoKNwI5fbZtwBYZfXwkVE7VdsxMmKziLUOKi6AXbI7XJN9Oe00iO9DHFpM');
function withDelay(promise, delay = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // console.log(promise) //promise fullfilled shown
      resolve(promise);
    }, delay);
  });
}

// Lazy load the Products component with a delay
const Login = React.lazy(() => withDelay(import('./Login'), 1000));
const Register = React.lazy(() => withDelay(import('./Register'), 1000));
const Dashboard1 = React.lazy(() => withDelay(import('./admin/Dashboard1'), 1000));
const AddEditRegisterUser = React.lazy(() => withDelay(import('./admin/AddEditRegisterUser'), 1000));
const Subadmin = React.lazy(() => withDelay(import('./admin/Subadmin'), 1000));
const SubAdminAddEdit = React.lazy(() => withDelay(import('./admin/SubAdminAddEdit'), 1000));
const Categories = React.lazy(() => withDelay(import('./admin/Categories/Categories'), 1000));
const CategoryAddEdit = React.lazy(() => withDelay(import('./admin/Categories/CategoryAddEdit'), 1000));
const Cmspages = React.lazy(() => withDelay(import('./admin/CmsPages/Cmspages'), 1000));
const CmspageAddEdit = React.lazy(() => withDelay(import('./admin/CmsPages/CmspageAddEdit'), 1000));
const Products = React.lazy(() => withDelay(import('./admin/Products/Products'), 1000));
const AddEditProducts = React.lazy(() => withDelay(import('./admin/Products/AddEditProducts'), 1000));
const ForgotPassword = React.lazy(() => withDelay(import('./ForgotPassword'), 1000));
const NotFound = React.lazy(() => withDelay(import('./NotFound'), 1000));
const ProductImages = React.lazy(() => withDelay(import('./admin/ProductImages/ProductImages'), 1000));
const Brands = React.lazy(() => withDelay(import('./admin/Brands/Brands'), 1000));
const AddEditBrands = React.lazy(() => withDelay(import('./admin/Brands/AddEditBrands'), 1000));
const Banners = React.lazy(() => withDelay(import('./admin/Banners/Banners'), 1000));
const AddEditBanners = React.lazy(() => withDelay(import('./admin/Banners/AddEditBanners'), 1000));



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes> {/*loader-container css -> index.css*/}
          <Route path='/' element={ <Suspense fallback={<div className='loader-container'></div>}><Login /></Suspense>}></Route>
          <Route path='/*' element={<Suspense fallback={<div className='loader-container'></div>}><NotFound  /></Suspense>}></Route> {/* fallback routeing*/}
          <Route path='/register' element={<Suspense fallback={<div className='loader-container'></div>}><Register /></Suspense>}></Route>
          <Route path='/forgotpassword' element={<Suspense fallback={<div className='loader-container'></div>}><ForgotPassword /></Suspense>}></Route>

          <Route path='/admindashboard1' element={<Suspense fallback={<div className='loader-container'></div>}><Dashboard1 /></Suspense>}></Route>
          <Route path='/registeruser' element={<Suspense fallback={<div className='loader-container'></div>}><AddEditRegisterUser /></Suspense>}></Route>
          <Route path='/subadmins' element={<Suspense fallback={<div className='loader-container'></div>}><Subadmin /></Suspense>}></Route>
          <Route path='/subadminaddedit' element={<Suspense fallback={<div className='loader-container'></div>}><SubAdminAddEdit /></Suspense>}></Route>
          <Route path='/categories' element={<Suspense fallback={<div className='loader-container'></div>}><Categories /></Suspense>}></Route>
          <Route path='/categoriesaddedit' element={<Suspense fallback={<div className='loader-container'></div>}><CategoryAddEdit /></Suspense>}></Route>
          <Route path='/cmspages' element={<Suspense fallback={<div className='loader-container'></div>}><Cmspages /></Suspense>}></Route>
          <Route path='/cmspageaddedit' element={<Suspense fallback={<div className='loader-container'></div>}><CmspageAddEdit /></Suspense>}></Route>
          <Route path='/products' element={<Suspense fallback={<div className='loader-container'></div> }> <Products />   </Suspense> } />
          <Route path='/addeditproducts' element={<Suspense fallback={<div className='loader-container'></div>}><AddEditProducts /></Suspense>}></Route>
          <Route path='/productsimage' element={<Suspense fallback={<div className='loader-container'></div>}><ProductImages /></Suspense>}></Route>
          <Route path='/brands' element={<Suspense fallback={<div className='loader-container'></div>}><Brands /></Suspense>}></Route>
          <Route path='/addeditbrands' element={<Suspense fallback={<div className='loader-container'></div>}><AddEditBrands /></Suspense>}></Route>
          <Route path='/banners' element={<Suspense fallback={<div className='loader-container'></div>}><Banners /></Suspense>}></Route>
          <Route path='/addeditbanners' element={<Suspense fallback={<div className='loader-container'></div>}><AddEditBanners /></Suspense>}></Route>
          
                  

          <Route path='/userdashboard2' element={<Suspense fallback={<div className='loader-container'></div>}><Dashboard2 /></Suspense>}></Route>
          <Route path='/contactus' element={<Suspense fallback={<div className='loader-container'></div>}><Contact /></Suspense>}></Route>
          <Route path='/myAccount' element={<Suspense fallback={<div className='loader-container'></div>}><MyAccount /></Suspense>}></Route>
          <Route path='/wishlist' element={<Suspense fallback={<div className='loader-container'></div>}><WishList /></Suspense>}></Route>
          <Route path='/Orders' element={<Suspense fallback={<div className='loader-container'></div>}><Order /></Suspense>}></Route>
          <Route path='/myCart' element={<Suspense fallback={<div className='loader-container'></div>}><MyCart /></Suspense>}></Route>
          <Route path='/productDetails' element={<Suspense fallback={<div className='loader-container'></div>}><ProductDetails /></Suspense>}></Route>
          <Route path='/listproduct' element={<Suspense fallback={<div className='loader-container'></div>}><Listing /></Suspense>}></Route>
          <Route path='/checkout' element={
            <Elements stripe={stripePromise}>
              <Checkout />
            </Elements>
          } />
          <Route path='/cart' element={<Suspense fallback={<div className='loader-container'></div>}><Cart /></Suspense>}></Route>
          <Route path='/success' element={< Success/>} ></Route>
          <Route path='/cancel' element={< Cancel/>} ></Route>
          <Route path='/card' element={< CreditOrDebit/>} ></Route>


          
          <Route path='/DomTable' element={< DomTable/>} ></Route>
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
