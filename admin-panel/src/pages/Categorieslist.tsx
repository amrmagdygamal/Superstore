/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { getprodCategories } from '../features/productcategory/prodCategorySlice';

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

const Categorieslist = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getprodCategories());
  }, []);

  const prodCategoryState = useSelector((state: any) => state.prodCategory.prodCategories);

  const data1: any = [];
  for (let i = 0; i < prodCategoryState.length; i++) {
    data1.push({
      key: i + 1,
      title: prodCategoryState[i].title,
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
      <h3 className="mb-4 title">Categories</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Categorieslist;
