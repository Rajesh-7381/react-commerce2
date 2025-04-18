import React, { Suspense, useEffect } from 'react';
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
import Doc from './admin/Document/Doc';
import ProtectedRoute from './protectedRoute';
import {LightDarkTheme} from './LightDarkTheme'
import TodoList from './Pratice/TodoList';
import ErrorBoundary from './ErrorBoundary';
import BuggyComponent from './BuggyComponent';
import { generateToken, messaging } from './notifications/firebase';
import { onMessage } from 'firebase/messaging';
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);


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
  useEffect(()=>{
    generateToken()
    onMessage(messaging,(payload)=>{
      console.log(payload)
    })
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js") // ✅ Corrected path
        .then((registration) => {
          console.log("✅ Service Worker Registered:", registration);
        })
        .catch((error) => {
          console.error("❌ Service Worker Registration Failed:", error);
        });
    }
  },[])

  

  return (
    <div className="App">
      <BrowserRouter>
        <ErrorBoundary>
          <Routes> {/*loader-container css -> index.css*/}
          <Route path='/a' element={<BuggyComponent />}></Route>
        <Route path='/' element={ <Suspense fallback={<div className='loader-container'></div>}><Login /></Suspense>}></Route>
        <Route path='/*' element={<Suspense fallback={<div className='loader-container'></div>}><NotFound  /></Suspense>}></Route> {/* fallback routeing*/}
        <Route path='/register' element={<Suspense fallback={<div className='loader-container'></div>}><Register /></Suspense>}></Route>
        <Route path='/forgotpassword' element={<Suspense fallback={<div className='loader-container'></div>}><ForgotPassword /></Suspense>}></Route>

        <Route path='/admindashboard1' element={<Suspense fallback={<div className='loader-container'></div>}><ProtectedRoute roleRequired="admin"><Dashboard1 /></ProtectedRoute></Suspense>}></Route>
        <Route path='/registeruser' element={<Suspense fallback={<div className='loader-container'></div>}><ProtectedRoute roleRequired="admin"><AddEditRegisterUser /></ProtectedRoute></Suspense>}></Route>
        {/*
        <Route path='/admindashboard1' element={<Suspense fallback={<div className='loader-container'></div>}><LightDarkTheme><Dashboard1 /></LightDarkTheme></Suspense>}></Route>
        <Route path='/registeruser' element={<Suspense fallback={<div className='loader-container'></div>}><AddEditRegisterUser /></Suspense>}></Route>
        */}
        <Route path='/subadmins' element={<Suspense fallback={<div className='loader-container'></div>}><ProtectedRoute roleRequired="admin"><Subadmin /></ProtectedRoute></Suspense>}></Route>
        <Route path='/subadminaddedit' element={<Suspense fallback={<div className='loader-container'></div>}><ProtectedRoute roleRequired="admin"><SubAdminAddEdit /></ProtectedRoute></Suspense>}></Route>
        <Route path='/categories' element={<Suspense fallback={<div className='loader-container'></div>}><ProtectedRoute roleRequired="admin"><Categories /></ProtectedRoute></Suspense>}></Route>
        <Route path='/categoriesaddedit' element={<Suspense fallback={<div className='loader-container'></div>}><ProtectedRoute roleRequired="admin"><CategoryAddEdit /></ProtectedRoute></Suspense>}></Route>
        <Route path='/cmspages' element={<Suspense fallback={<div className='loader-container'></div>}><ProtectedRoute roleRequired="admin"><Cmspages /></ProtectedRoute></Suspense>}></Route>
        <Route path='/cmspageaddedit' element={<Suspense fallback={<div className='loader-container'></div>}><ProtectedRoute roleRequired="admin"><CmspageAddEdit /></ProtectedRoute></Suspense>}></Route>
        <Route path='/products' element={<Suspense fallback={<div className='loader-container'></div> }> <ProtectedRoute roleRequired="admin"><Products /> </ProtectedRoute>  </Suspense> } />
        <Route path='/addeditproducts' element={<Suspense fallback={<div className='loader-container'></div>}><ProtectedRoute roleRequired="admin"><AddEditProducts /></ProtectedRoute></Suspense>}></Route>
        <Route path='/productsimage' element={<Suspense fallback={<div className='loader-container'></div>}><ProtectedRoute roleRequired="admin"><ProductImages /></ProtectedRoute></Suspense>}></Route>
        <Route path='/brands' element={<Suspense fallback={<div className='loader-container'></div>}><ProtectedRoute roleRequired="admin"><Brands /></ProtectedRoute></Suspense>}></Route>
        <Route path='/addeditbrands' element={<Suspense fallback={<div className='loader-container'></div>}><ProtectedRoute roleRequired="admin"><AddEditBrands /></ProtectedRoute></Suspense>}></Route>
        <Route path='/banners' element={<Suspense fallback={<div className='loader-container'></div>}><ProtectedRoute roleRequired="admin"><Banners /></ProtectedRoute></Suspense>}></Route>
        <Route path='/addeditbanners' element={<Suspense fallback={<div className='loader-container'></div>}><ProtectedRoute roleRequired="admin"><AddEditBanners /></ProtectedRoute></Suspense>}></Route>
        
                

        <Route path='/userdashboard2' element={<Suspense fallback={<div className='loader-container'></div>}><ProtectedRoute roleRequired="user"><Dashboard2 /></ProtectedRoute></Suspense>}></Route>
        <Route path='/contactus' element={<Suspense fallback={<div className='loader-container'></div>}><ProtectedRoute roleRequired="user"><Contact /></ProtectedRoute></Suspense>}></Route>
        <Route path='/myAccount' element={<Suspense fallback={<div className='loader-container'></div>}><ProtectedRoute roleRequired="user"><MyAccount /></ProtectedRoute></Suspense>}></Route>
        <Route path='/wishlist' element={<Suspense fallback={<div className='loader-container'></div>}><ProtectedRoute roleRequired="user"><WishList /></ProtectedRoute></Suspense>}></Route>
        <Route path='/Orders' element={<Suspense fallback={<div className='loader-container'></div>}><ProtectedRoute roleRequired="user"><Order /></ProtectedRoute></Suspense>}></Route>
        <Route path='/myCart' element={<Suspense fallback={<div className='loader-container'></div>}><ProtectedRoute roleRequired="user"><MyCart /></ProtectedRoute></Suspense>}></Route>
        <Route path='/productDetails' element={<Suspense fallback={<div className='loader-container'></div>}><ProtectedRoute roleRequired="user"><ProductDetails /></ProtectedRoute></Suspense>}></Route>
        <Route path='/listproduct' element={<Suspense fallback={<div className='loader-container'></div>}><ProtectedRoute roleRequired="user"><Listing /></ProtectedRoute></Suspense>}></Route>
        <Route path='/checkout' element={
          <Elements stripe={stripePromise}>
            <Checkout />
          </Elements>
        } />
        <Route path='/cart' element={<Suspense fallback={<div className='loader-container'></div>}><ProtectedRoute roleRequired="user"><Cart /></ProtectedRoute></Suspense>}></Route>
        <Route path='/success' element={< Success/>} ></Route>
        <Route path='/cancel' element={< Cancel/>} ></Route>
        <Route path='/card' element={< CreditOrDebit/>} ></Route>
        
        <Route path='/DomTable' element={< DomTable/>} ></Route>
        <Route path='/documents' element={<Doc />}></Route>
        <Route path='/todo' element={<TodoList />}></Route>
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
