import { BsArrowDownRight } from 'react-icons/bs';
import { BsArrowUpRight } from 'react-icons/bs';
import { Column } from '@ant-design/charts';
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  getAllOrders,
  getMonthlyOrders,
  getYearlyStats,
} from '../features/order/orderSlice';

interface DataType {
  key: React.Key;
  name: string;
  product: number;
  price: number;
  disprice: number
  status: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Product Count',
    dataIndex: 'product',
  },
  {
    title: 'Product Price',
    dataIndex: 'price',
  },
  {
    title: 'Total Price After Discount',
    dataIndex: 'disprice',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
];



const Dashboard = () => {
  const dispatch: AppDispatch = useDispatch();
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const orderMonthState = useSelector(
    (state: any) => state.order.orderMonthlyData
  );
  const orderyearState = useSelector(
    (state: any) => state.order.orderYearlyStats
  );
  const allOrdersState = useSelector((state: any) => state.order.orders);

  const [dataMonthly, setDataMonthly] = useState([]);
  const [dataMonthlySales, setDataMonthlySales] = useState([]);
  const [orderData, setOrderData] = useState<DataType[]>([]);

  useEffect(() => {
    dispatch(getMonthlyOrders());
    dispatch(getYearlyStats());
    dispatch(getAllOrders());
  }, []);

  useEffect(() => {

    const data: any = [];
    const monthOrderCount: any = [];
    for (let index = 0; index < orderMonthState?.length; index++) {
      const elem = orderMonthState[index];
      data.push({ type: monthNames[elem?._id?.month], income: elem?.amount });
      monthOrderCount.push({
        type: monthNames[elem?._id?.month],
        sales: elem?.count,
      });
    }

    setDataMonthly(data);
    setDataMonthlySales(monthOrderCount);

    const data1: DataType[] = [];
    for (let i = 0; i < allOrdersState; i++) {
      data1.push({
        key: i,
        name: allOrdersState[i].shippingAddress?.firstName,
        product: allOrdersState?.length,
        price: allOrdersState?.paymentResult?.amount,
        disprice: allOrdersState?.paymentResult?.totalPriceAfterDiscount,
        status: allOrdersState?.status,
      });
    }
    setOrderData(data1)
  }, [orderMonthState | allOrdersState | orderyearState]);

  const config = {
    data: dataMonthly,
    xField: 'type',
    yField: 'income',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    color: ({ type }: any) => {
      return '#e9b10d';
    },
    label: {
      fields: ['sales'],
      style: {
        fill: '#FFFFFF',
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Month',
      },
      sales: {
        alias: 'Income',
      },
    },
  };
  const config2 = {
    data: dataMonthlySales,
    xField: 'type',
    yField: 'sales',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    color: ({ type }: any) => {
      return '#e9b10d';
    },
    label: {
      fields: ['sales'],
      style: {
        fill: '#FFFFFF',
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Month',
      },
      sales: {
        alias: 'Sales',
      },
    },
  };

  return (
    <>
      <h3 className="mb-3">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded">
          <div>
            <p className="desc">Total Income</p>{' '}
            <h4 className="mb-0 sub-title sub-title">
              ${orderyearState && orderyearState[0].amount}
            </h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsArrowDownRight />
              -5%
            </h6>
            <p className="mb-0 desc">Income in Last Year from Today</p>
          </div>
        </div>
        <div className="d-flex p-3 justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded">
          <div>
            <p className="desc">Total Sales</p>{' '}
            <h4 className="mb-0 sub-title">
              {orderyearState && orderyearState[0].count}
            </h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="green">
              <BsArrowUpRight />
              32%
            </h6>
            <p className="mb-0 desc">Sales in Last Year from Today</p>
          </div>
        </div>
      </div>
      <div className="d-flex justify-conetent-between gap-3">
        <div className="mt-4 flex-grow-1 w-50 title">
          <h3 className="mb-5">InCome Statics</h3>
          <div className="">
            <Column {...config} />
          </div>
        </div>
        <div className="mt-4 flex-grow-1 w-50 title">
          <h3 className="mb-5">Sales Statics</h3>
          <div className="">
            <Column {...config2} />
          </div>
        </div>{' '}
        flex-grow-1 w-50
      </div>
      <div className="mt-4">
        <h3 className="mb-5 title">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={orderData} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
