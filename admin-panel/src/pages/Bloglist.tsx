/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { deleteBlog, getBlogs, resetState } from '../features/blogs/blogSlice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import CustomModal from '../components/CustomeModel';

const columns: any = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    sorter: (a: any, b: any) => a.title.length - b.title.length,
  },
  {
    title: 'Category',
    dataIndex: 'category',
    sorter: (a: any, b: any) => a.category.length - b.category.length,
  },
  {
    title: 'Author',
    dataIndex: 'author',
    sorter: (a: any, b: any) => a.author.length - b.author.length,
  },

  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const Bloglist = () => {
  
  const dispatch: AppDispatch = useDispatch();


  const [open, setOpen] = useState(false);
  const [blogId, setBlogId] = useState('');
  const blogState = useSelector((state: any) => state.blog.blogs);
  
  const showModel = (e: string) => {
    setOpen(true);
    setBlogId(e);
  };

  const hideModel = () => {
    setOpen(false);
  };
  
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogs());
  }, []);


  useEffect(() => {
    dispatch(getBlogs());
  }, [blogState]);



  const data1: any = [];
  for (let i = 0; i < blogState.length; i++) {
    data1.push({
      key: i + 1,
      title: blogState[i].title,
      category: blogState[i].category,
      author: blogState[i].author,
      action: (
        <>
          <Link
            to={`/admin/blog/${blogState[i]._id}`}
            className="fs-3 text-dark"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModel(blogState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const handleDelete = (e: string) => {
    dispatch(deleteBlog(e));
    setTimeout(() => {
      dispatch(getBlogs());
    }, 100);
    setOpen(false);
  };

  return (
    <div>
      <h3 className="mb-4 title">Blogs List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModel}
        open={open}
        performAction={() => {
          handleDelete(blogId);
        }}
        title="Are you sure you want to delete this Blog?"
      />
    </div>
  );
};

export default Bloglist;
