import { useEffect } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import BlogCard from '../components/BlogCard';
import Container from '../components/Container';
import { Row } from 'react-bootstrap';
import { getBlogs } from '../features/blog/blogSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../app/store';

const Blog = () => {
  const dispatch: AppDispatch = useDispatch();
  const blogState = useSelector((state: any) => state.blog.blogs);

  const getAllBlogs = () => {
    dispatch(getBlogs());
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <>
      <Meta title="Blogs" />
      <BreadCrumb title="Blogs" />
      <Container class1="blog-wrapper box-shadow home-wrapper-2 py-5">
        <div className="col-3">
          <div className="filter-card box-shadow mb-3">
            <h3 className="filter-title">Find By Categories</h3>
            <div>
              <ul className="ps-0">
                <li>Watch</li>
                <li>TV</li>
                <li>Camera</li>
                <li>Laptop</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-9">
          <Row>
            {blogState &&
              blogState?.map((blog: any, index: string) => {
              return (
                <div className="col-6 mb-3" key={index}>
                  <BlogCard
                    id={blog?._id}
                    title={blog?.title}
                    description={blog?.description}
                    image={blog.images[0].url}
                    author={blog.author}
                  />
                </div>
              );
            })}
          </Row>
        </div>
      </Container>
    </>
  );
};

export default Blog;
