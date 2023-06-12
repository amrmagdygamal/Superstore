/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import {
  deleteBlogcateg,
  getBlogCategories,
  resetState,
} from '../features/blogcategory/blogCategorySlice';
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
    title: 'Action',
    dataIndex: 'action',
  },
];

const Blogcatlist = () => {
  const [open, setOpen] = useState(false);
  const [blogCategId, setBlogCategId] = useState('');

  const showModel = (e: string) => {
    setOpen(true);
    setBlogCategId(e);
  };

  const hideModel = () => {
    setOpen(false);
  };

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogCategories());
  }, []);

  const blogCategoryState = useSelector(
    (state: any) => state.blogCategory.blogCategories
  );

  const data1: any = [];
  for (let i = 0; i < blogCategoryState.length; i++) {
    data1.push({
      key: i + 1,
      title: blogCategoryState[i].title,
      action: (
        <>
          <Link
            to={`/admin/blog-category/${blogCategoryState[i]._id}`}
            className="fs-3 text-dark"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModel(blogCategoryState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const handleDelete = (e: string) => {
    dispatch(deleteBlogcateg(e));
    setTimeout(() => {
      setOpen(false)
      dispatch(getBlogCategories());
    }, 100);
    setOpen(false);
  };

  return (
    <div>
      <h3 className="mb-4 title">Blogs Category</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModel}
        open={open}
        performAction={() => {
          handleDelete(blogCategId);
        }}
        title="Are you sure you want to delete this Blog Category?"
      />
    </div>
  );
};

export default Blogcatlist;
