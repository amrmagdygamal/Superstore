import './App.css'
import Dashboard from './pages/Dashboard'
import {BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import Login from './pages/Login'
import Resetpasword from './pages/Resetpasword'
import Forgotpassword from './pages/Forgotpassword'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/reset-password" element={<Resetpasword />}/>
        <Route path="/forgot-password" element={<Forgotpassword />}/>
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />}/>
        </Route>
      </Routes>

    </BrowserRouter>
  )
}

export default App
