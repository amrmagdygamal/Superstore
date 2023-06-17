import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { ToastContainer } from 'react-toastify';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer
            position="top-center"
            autoClose={400}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            limit={1}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
    </>
  );
};

export default Layout;
