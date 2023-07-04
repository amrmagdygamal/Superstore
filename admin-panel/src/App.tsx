import './App.css';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Login from './pages/Login';
// import Resetpasword from './pages/Resetpasword';
// import Forgotpassword from './pages/Forgotpassword';
import Enquiries from './pages/Enquiries';
import Bloglist from './pages/Bloglist';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Colorlist from './pages/Colorlist';
import Categorieslist from './pages/Categorieslist';
import Brandlist from './pages/Brandlist';
import Productlist from './pages/Productlist';
import Couponlist from './pages/Couponlist';
import Blogcatlist from './pages/Blogcatlist';
import AddBlogPage from './pages/AddBlogPage';
import AddBlogCategory from './pages/AddBlogCategory';
import AddColor from './pages/AddColor';
import AddCategory from './pages/AddCategory';
import AddBrand from './pages/AddBrand';
import AddProduct from './pages/AddProduct';
import AddCoupon from './pages/AddCoupon';
import ShowEnquiry from './pages/ShowEnquiry';
import ViewOrder from './pages/ViewOrder';
import { OpenRoutes } from './components/OpenRouter';
import { PrivateRoutes } from './components/PrivateRoutes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <OpenRoutes>
              <Login />
            </OpenRoutes>
          }
        />
          <Route path="/admin" element={<PrivateRoutes><MainLayout /></PrivateRoutes>}>
            <Route index element={<Dashboard />} />
            <Route path="enquiries" element={<Enquiries />} />
            <Route path="enquiries/:id" element={<ShowEnquiry />} />
            <Route path="blog-list" element={<Bloglist />} />
            <Route path="add-blog" element={<AddBlogPage />} />
            <Route path="add-blog/:id" element={<AddBlogPage />} />
            <Route path="orders-list" element={<Orders />} />
            <Route path="view-order/:id" element={<ViewOrder />} />
            <Route path="customers" element={<Customers />} />
            <Route path="blog-category-list" element={<Blogcatlist />} />
            <Route path="add-blog-category" element={<AddBlogCategory />} />
            <Route path="add-blog-category/:id" element={<AddBlogCategory />} />
            <Route path="list-color" element={<Colorlist />} />
            <Route path="add-color" element={<AddColor />} />
            <Route path="add-color/:id" element={<AddColor />} />
            <Route path="add-coupon" element={<AddCoupon />} />
            <Route path="add-coupon/:id" element={<AddCoupon />} />
            <Route path="add-category" element={<AddCategory />} />
            <Route path="add-category/:id" element={<AddCategory />} />
            <Route path="list-category" element={<Categorieslist />} />
            <Route path="list-brand" element={<Brandlist />} />
            <Route path="add-brand" element={<AddBrand />} />
            <Route path="add-brand/:id" element={<AddBrand />} />
            <Route path="product-list" element={<Productlist />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="add-product/:id" element={<AddProduct />} />
            <Route path="coupon-list" element={<Couponlist />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
