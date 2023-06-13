import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import Container from '../components/Container';
import { getBlog} from '../features/blog/blogSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../app/store';
import moment from 'moment';
import { useEffect } from 'react';


const BlogPage = () => {


  const dispatch: AppDispatch = useDispatch();
  const blogState = useSelector((state: any) => state.blog.blog);
  const location = useLocation();

  const getBlogId = location.pathname.split("/")[2]

  const getABlog = () => {
    dispatch(getBlog(getBlogId));
  };

  useEffect(() => {
    getABlog();
  }, []);




  return (
    <>
      <Meta title={blogState.title} />
      <BreadCrumb title={blogState.title} />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="col-3">
          <div className="filter-card mb-3">
            <h3 className="filter-title">Shop By Categories</h3>
            <div>
              <ul className="ps-0">
                <li>Home</li>
                <li>Our Store</li>
                <li>Blogs</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-9">
          <div className="blog-page">
            <h3 className="title">{blogState.title}</h3>
            <img
              src={blogState.images[0].url ? blogState.images[0].url : "/images/blog-1.jpg"}
              className="img-fluid w-100 my-4"
              alt="blog"
            />
            <p dangerouslySetInnerHTML={{ __html: blogState.description}}>
            </p>
            <Link to="/blog" className="d-flex gap-1 align-items-center fs-5">
              <HiOutlineArrowLeft />
              Go back to Blogs
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
};

export default BlogPage;
