/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { AppDispatch } from '../app/store';
import {
  deleteProduct,
  getProducts,
  resetState,
} from '../features/product/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CustomModal from '../components/CustomeModel';

const columns: any = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a: any, b: any) => a.name.length - b.name.length,
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
    sorter: (a: any, b: any) => a.brand.length - b.brand.length,
  },
  {
    title: 'Category',
    dataIndex: 'category',
    sorter: (a: any, b: any) => a.category.length - b.category.length,
  },
  {
    title: 'Color',
    dataIndex: 'color',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    sorter: (a: any, b: any) => a.price - b.price,
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const Productlist = () => {
  const dispatch: AppDispatch = useDispatch();

  const productState = useSelector((state: any) => state.product.products);

  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState('');

  const showModel = (e: string) => {
    setOpen(true);
    setProductId(e);
  };

  const hideModel = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getProducts());
  }, []);

  const data1: any = [];
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i + 1,
      title: productState[i].title,
      category: productState[i].category,
      author: productState[i].author,
      action: (
        <>
          <Link
            to={`/admin/product/${productState[i]._id}`}
            className="fs-3 text-dark"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModel(productState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const handleDelete = (e: string) => {
    dispatch(deleteProduct(e));
    setTimeout(() => {
      dispatch(getProducts());
    }, 100);
    setOpen(false);
  };

  return (
    <>
      <div>
        <h3 className="mb-4 title">Products</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      <CustomModal
        hideModal={hideModel}
        open={open}
        performAction={() => {
          handleDelete(productId);
        }}
        title="Are you sure you want to delete this Product?"
      />
      </div>
    </>
  );
};

export default Productlist;
