
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import './App.css';
import 'react-notifications/lib/notifications.css';
import Login from './Login';
import Register from './Register';
import Dashboard1 from './admin/Dashboard1';
import Dashboard2 from './user/Dashboard2';
import AddEditRegisterUser from './admin/AddEditRegisterUser';
import Subadmin from './admin/Subadmin';
import SubAdminAddEdit from './admin/SubAdminAddEdit';
import Categories from './admin/Categories/Categories';
import CategoryAddEdit from './admin/Categories/CategoryAddEdit';
import Cmspages from './admin/CmsPages/Cmspages';
import CmspageAddEdit from './admin/CmsPages/CmspageAddEdit';
import Products from './admin/Products/Products';
import AddEditProducts from './admin/Products/AddEditProducts';
import ForgotPassword from './ForgotPassword';
import NotFound from './NotFound';
import ProductImages from './admin/ProductImages/ProductImages';
import Brands from './admin/Brands/Brands';
import AddEditBrands from './admin/Brands/AddEditBrands';
import Banners from './admin/Banners/Banners';
import AddEditBanners from './admin/Banners/AddEditBanners';
import Contact from './user/Contact';
import MyAccount from './user/Account/MyAccount';
import WishList from './user/Account/WishList';
import Order from './user/Account/Order';
import MyCart from './user/Account/MyCart';
import ProductDetails from './user/Account/ProductDetails';
import Listing from './user/Account/Listing';
import Checkout from './user/Account/Checkout';
import Cart from './user/Account/Cart';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Success from './user/Account/Success';
import Cancel from './user/Account/Cancel';

const stripePromise = loadStripe('pk_test_51Ph8kgFnMqw8LC18U63JgNUhD8F5wAKZfjQAyrnfgoKNwI5fbZtwBYZfXwkVE7VdsxMmKziLUOKi6AXbI7XJN9Oe00iO9DHFpM');

function App() {
  return (
    <div className="App">
    
      <BrowserRouter>
        <Routes>
          <Route path='/' element={< Login/>}></Route>
          <Route path='/*' element={< NotFound />}></Route> {/* fallback routeing*/}
          <Route path='/register' element={< Register/>}></Route>
          <Route path='/forgotpassword' element={< ForgotPassword/>}></Route>

          <Route path='/admindashboard1' element={< Dashboard1/>}></Route>
          <Route path='/registeruser' element={< AddEditRegisterUser/>}></Route>
          <Route path='/subadmins' element={< Subadmin/>}></Route>
          <Route path='/subadminaddedit' element={< SubAdminAddEdit/>}></Route>
          <Route path='/categories' element={< Categories/>}></Route>
          <Route path='/categoriesaddedit' element={< CategoryAddEdit/>}></Route>
          <Route path='/cmspages' element={< Cmspages/>}></Route>
          <Route path='/cmspageaddedit' element={< CmspageAddEdit/>}></Route>
          <Route path='/products' element={< Products/>}></Route>
          <Route path='/addeditproducts' element={< AddEditProducts/>}></Route>
          <Route path='/productsimage' element={< ProductImages/>}></Route>
          <Route path='/brands' element={< Brands/>}></Route>
          <Route path='/addeditbrands' element={< AddEditBrands/>}></Route>
          <Route path='/banners' element={< Banners/>}></Route>
          <Route path='/addeditbanners' element={< AddEditBanners/>}></Route>
          
                  

          <Route path='/userdashboard2' element={< Dashboard2/>}></Route>
          <Route path='/contactus' element={< Contact/>}></Route>
          <Route path='/myAccount' element={< MyAccount/>}></Route>
          <Route path='/wishlist' element={< WishList/>}></Route>
          <Route path='/Orders' element={< Order/>}></Route>
          <Route path='/myCart' element={< MyCart/>}></Route>
          <Route path='/productDetails' element={< ProductDetails/>}></Route>
          <Route path='/listproduct' element={< Listing/>}></Route>
          <Route path='/checkout' element={
            <Elements stripe={stripePromise}>
              <Checkout />
            </Elements>
          } />
          <Route path='/cart' element={< Cart/>} ></Route>
          <Route path='/success' element={< Success/>} ></Route>
          <Route path='/cancel' element={< Cancel/>} ></Route>
          
        </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
