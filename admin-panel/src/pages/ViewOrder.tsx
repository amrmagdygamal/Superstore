/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { getAllOrders } from '../features/order/orderSlice';
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
    title: 'Name',
    dataIndex: 'name',
    sorter: (a: any, b: any) => a.title.length - b.title.length,
  },
  {
    title: 'Product',
    dataIndex: 'product',
    sorter: (a: any, b: any) => a.product.length - b.product.length,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    sorter: (a: any, b: any) => a.amount - b.amount,
  },
  {
    title: 'Date',
    dataIndex: 'date',
    sorter: (a: any, b: any) => a.date - b.date,
  },

  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const ViewOrder = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  const AllOrderState = useSelector((state: any) => state.order.order[0].products);

  const data1: any = [];
  for (let i = 0; i < AllOrderState.length; i++) {
    data1.push({
      key: i + 1,
      name: AllOrderState[i].product.name,
      brand: AllOrderState[i].product.brand,
      count: AllOrderState[i].count,
      amount: AllOrderState[i].product.price,
      color: AllOrderState[i].product.color,
      date: AllOrderState[i].product.createdAt,
    });
  }

  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ViewOrder;
