/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { getAllOrders, updateOrder } from '../features/order/orderSlice';
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

const Orders = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrders());
  }, []);

  const AllOrderState = useSelector((state: any) => state.order.orders);

  const data1: any = [];
  for (let i = 0; i < AllOrderState?.length; i++) {
    data1.push({
      key: i + 1,
      product: AllOrderState[i]?.name,
      name: AllOrderState[i]?.products?.map((i: any, j: string) => {
        <Link to={`/admin/order/${AllOrderState[i]?.orderby._id}`} >
          View Order
        </Link>
      }),
      amount: AllOrderState[i].paymentResult?.amount,
      date: new Date(AllOrderState[i]?.created).toLocaleString(),
      action: (
        <>
          <select name="status" defaultValue={AllOrderState[i]?.paymentResult?.status} onChange={(e: any) => updateOneOrder({id: AllOrderState[i]?._id,status: e.target.value})} className="form-control form-select" id="status">
            <option value="Not Processed">Not Processed</option>
            <option value="Cash On Delivery">Cash On Delivery</option>
            <option value="Processing">Processing</option>
            <option value="Dispatched">Dispatched</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Delivered">Delivered</option>
        </select>

        </>
      ),
    });
  }

  const updateOneOrder = (e: any) => {
    dispatch(updateOrder(e))
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

export default Orders;
