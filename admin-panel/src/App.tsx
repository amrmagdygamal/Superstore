import './App.css'
import Dashboard from './pages/Dashboard'
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Login from './pages/Login'
import Resetpasword from './pages/Resetpasword'
import Forgotpassword from './pages/Forgotpassword'
import Enquiries from './pages/Enquiries'
import Bloglist from './pages/Bloglist'
import Orders from './pages/Orders'
import Customers from './pages/Customers'
import Colorlist from './pages/Colorlist'
import Categorieslist from './pages/Categorieslist'
import Brandlist from './pages/Brandlist'
import Productlist from './pages/Productlist'
import Couponlist from './pages/Couponlist'
import Blogcatlist from './pages/Blogcatlist'
import AddBlogPage from './pages/AddBlogPage'
import AddBlogCategory from './pages/AddBlogCategory'
import AddColor from './pages/AddColor'
import AddCategory from './pages/AddCategory'
import AddBrand from './pages/AddBrand'
import AddProduct from './pages/AddProduct'
import AddCoupon from './pages/AddCoupon'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/reset-password" element={<Resetpasword />}/>
        <Route path="/forgot-password" element={<Forgotpassword />}/>
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />}/>
          <Route path='enquiries' element={<Enquiries />}/>
          <Route path='blog-list' element={<Bloglist />}/>
          <Route path='blog' element={<AddBlogPage />}/>
          <Route path='orders' element={<Orders />}/>
          <Route path='customers' element={<Customers />}/>
          <Route path='blog-category-list' element={<Blogcatlist />}/>
          <Route path='blog-category' element={<AddBlogCategory />}/>
          <Route path='list-color' element={<Colorlist />}/>
          <Route path='color' element={<AddColor />}/>
          <Route path='coupon' element={<AddCoupon />}/>
          <Route path='category' element={<AddCategory />}/>
          <Route path='list-category' element={<Categorieslist />}/>
          <Route path='list-brand' element={<Brandlist />}/>
          <Route path='brand' element={<AddBrand />}/>
          <Route path='list-product' element={<Productlist />}/>
          <Route path='product' element={<AddProduct />}/>
          <Route path='coupon-list' element={<Couponlist />}/>
        </Route>
      </Routes>

    </BrowserRouter>
  )
}

export default App
