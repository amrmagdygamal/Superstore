/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { getBlogs } from '../features/blogs/blogSlice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';

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
    sorter: (a: any, b: any) => a.title.length - b.title.length,
  },

  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const Bloglist = () => {

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogs());
  }, []);

  const blogState = useSelector((state: any) => state.blog.blogs);

  const data1: any = [];
  for (let i = 0; i < blogState.length; i++) {
      data1.push({
        key: i + 1,
        title: blogState[i].title,
        categroy: blogState[i].name,
        action: (
          <>
            <Link to="/" className="fs-3 text-dark">
              <BiEdit />
            </Link>
            <Link className="ms-3 fs-3 text-danger" to="/">
              <AiFillDelete />
            </Link>
          </>
        ),
      });
  }



  return (
    <div>
      <h3 className="mb-4 title">Blogs List</h3>
      <div>
      <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  )
}

export default Bloglist;