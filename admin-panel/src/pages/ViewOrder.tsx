/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { getAnOrder } from '../features/order/orderSlice';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

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

  const location = useLocation();
  const getOrderId = location.pathname.split("/")[2]
  
  const orderState = useSelector((state: any) => state?.order?.AnOrder);

  useEffect(() => {
    dispatch(getAnOrder(getOrderId));
  }, []);




  const data1: any = [];
  for (let i = 0; i < orderState?.products?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState?.products[i].name,
      brand: orderState?.products[i].brand,
      count: orderState?.products[i].quantity,
      amount: orderState?.products[i].price,
      color: orderState?.products[i].color?.title,
      date: orderState?.products[i].createdAt,

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
