import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBgColors,
} from 'react-icons/ai';
import { RiCouponLine } from 'react-icons/ri';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from 'react-router-dom';
import { ImBlog } from 'react-icons/im';
import { IoIosNotifications } from 'react-icons/io';
import { FaClipboardList, FaBloggerB } from 'react-icons/fa';
import { SiBrandfolder } from 'react-icons/si';
import { BiCategoryAlt } from 'react-icons/bi';
import { Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout /* onContextMenu={(e) => e.preventDefault()} */>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">SP</span>
            <span className="lg-logo">
              Super Store{' '}
              <span className="bg-white rounded-3 text-dark text-center p-1 ts-5">
                Admin
              </span>
            </span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({ key }) => {
            if (key == 'signout') {
              return;
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: '',
              icon: <AiOutlineDashboard className="fs-4" />,
              label: 'Dashboard',
            },
            {
              key: 'customers',
              icon: <AiOutlineUser className="fs-4" />,
              label: 'Customers',
            },
            {
              key: 'Catalog',
              icon: <AiOutlineShoppingCart className="fs-4" />,
              label: 'Catalog',
              children: [
                {
                  key: 'product',
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: 'Add Product',
                },
                {
                  key: 'list-product',
                  icon: <AiOutlineShoppingCart className="fs-4" />,
                  label: 'Product List',
                },
                {
                  key: 'brand',
                  icon: <SiBrandfolder className="fs-4" />,
                  label: 'Brand',
                },
                {
                  key: 'list-brand',
                  icon: <SiBrandfolder className="fs-4" />,
                  label: 'Brand List ',
                },
                {
                  key: 'category',
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: 'Category',
                },
                {
                  key: 'list-category',
                  icon: <BiCategoryAlt className="fs-4" />,
                  label: 'Category List',
                },
                {
                  key: 'list-color',
                  icon: <AiOutlineBgColors className="fs-4" />,
                  label: 'Color',
                },
                {
                  key: 'color',
                  icon: <AiOutlineBgColors className="fs-4" />,
                  label: 'Add Color',
                },
              ],
            },
            {
              key: 'orders',
              icon: <FaClipboardList className="fs-4" />,
              label: 'Orders',
            },
            {
              key: 'marketing',
              icon: <RiCouponLine className="fs-4" />,
              label: 'Marketing',
              children: [
                {
                  key: 'coupon',
                  icon: <ImBlog className="fs-4" />,
                  label: 'Add Coupon',
                },
                {
                  key: 'coupon-list',
                  icon: <RiCouponLine className="fs-4" />,
                  label: 'Coupon List',
                },
              ],
            },
            {
              key: 'blogs',
              icon: <FaBloggerB className="fs-4" />,
              label: 'Blogs',
              children: [
                {
                  key: 'blog',
                  icon: <ImBlog className="fs-4" />,
                  label: 'Add Blog',
                },
                {
                  key: 'blog-list',
                  icon: <FaBloggerB className="fs-4" />,
                  label: 'Blog List',
                },
                {
                  key: 'blog-category',
                  icon: <ImBlog className="fs-4" />,
                  label: 'Add Blog Category',
                },
                {
                  key: 'blog-category-list',
                  icon: <FaBloggerB className="fs-4" />,
                  label: 'Blog Category List',
                },
              ],
            },
            {
              key: 'enquiries',
              icon: <FaClipboardList className="fs-4" />,
              label: 'Enquiries',
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="d-flex gap-4 align-items-center">
            <div className="position-relative">
              <IoIosNotifications className="fs-4" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div>
            <div className="dropdown d-flex gap-3 align-items-center ">
              <div>
                <img width={55} height={55} src="/images/logoamr.jpg" alt="" />
              </div>
              <button
                className="border-0 bg-transparent"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">Amr Magdy</h5>
                <p className="mb-0">amrroraker@gmail.com</p>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a
                    className="dropdown-item"
                    style={{ height: 'auto', lineHeight: '20px' }}
                    href="/"
                    onClick={() => console.log('View Profile clicked')}
                  >
                    View Profile
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    style={{ height: 'auto', lineHeight: '20px' }}
                    href="/"
                    onClick={() => console.log('Signout clicked')}
                  >
                    Signout
                  </a>
                </li>
              </ul>
            </div>
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </button>
              <ul className="dropdown-menu">
                <li>
                  <button className="dropdown-item" type="button">
                    Action
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" type="button">
                    Another action
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" type="button">
                    Something else here
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >

          <ToastContainer
          position='top-center'
          autoClose={400}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme='light'
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
