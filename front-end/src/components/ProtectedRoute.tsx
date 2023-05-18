import { useContext } from "react"
import { Store } from "../Store"
import { Navigate, Outlet } from "react-router-dom"


const ProtectedRoute = () => {

  const {
    state: { userInfo },
  } = useContext(Store)

  if(userInfo) {
    return <Outlet />
  } else {
    return <Navigate to="/signin" />
  }

}

export default ProtectedRoute