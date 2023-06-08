import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { Link } from 'react-router-dom';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import Container from '../components/Container';

const BlogPage = () => {
  return (
    <>
      <Meta title="Blog Page" />
      <BreadCrumb title="Blog Page" />
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
            <h3 className="title">A Beatiful Sunday Morning Resaissance</h3>
            <img
              src="/images/blog-4.webp"
              className="img-fluid w-100 my-4"
              alt="blog"
            />
            <p>
              You're only as good as your last collection, whick is an enormous
              pressure. I think there is something about luzury - it's not
              something people need, but it's what they want. It really pulls at
              their heart. I have a fantastic relationship with money.
              Scelerisque sociosqu ullamcorper urna nisl mollis vestibulum
              pretium commodo inceptos cum condimentum placerat accumsan ante
              vestibulum.
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
