import {BsArrowDownRight} from 'react-icons/bs';
import {BsArrowUpRight} from 'react-icons/bs';
import { Column } from '@ant-design/charts';
import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: React.Key;
  name: string;
  product: number;
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
    title: 'Product',
    dataIndex: 'product',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
];

const data1: DataType[] = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    status: `London, Park Lane no. ${i}`,
  });
}

const Dashboard = () => {




  const data = [
    {
      type: 'Jan',
      sales: 38,
    },
    {
      type: 'Fab',
      sales: 52,
    },
    {
      type: 'Mar',
      sales: 61,
    },
    {
      type: 'Apr',
      sales: 145,
    },
    {
      type: 'May',
      sales: 48,
    },
    {
      type: 'Jun',
      sales: 38,
    },
    {
      type: 'July',
      sales: 38,
    },
    {
      type: 'Aug',
      sales: 38,
    },
    {
      type: 'Sept',
      sales: 38,
    },
    {
      type: 'Oct',
      sales: 38,
    },
    {
      type: 'Nov',
      sales: 38,
    },
    {
      type: 'Dec',
      sales: 38,
    },
  ];
  const config = {
    data,
    xField: 'type',
    yField: 'sales',
    color: () => {
      return "#e9b10d";
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


  return (
    <>
      <h3 className="mb-3">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded">
          <div>
            <p>Total</p> <h4 className="mb-0">$1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className='red'><BsArrowDownRight />-32%</h6>
            <p className="mb-0">Compared To April 2022</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded">
          <div>
            <p>Total</p> <h4 className="mb-0">$1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className='green'><BsArrowUpRight />32%</h6>
            <p className="mb-0">Compared To April 2022</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded">
          <div>
            <p>Total</p> <h4 className="mb-0">$1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className='red'><BsArrowDownRight />-32%</h6>
            <p className="mb-0">Compared To April 2022</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded">
          <div>
            <p>Total</p> <h4 className="mb-0">$1100</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className='green'><BsArrowUpRight />32%</h6>
            <p className="mb-0">Compared To April 2022</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-4">InCome Statics</h3>
        <div className="">
        <Column {...config} />
        </div>
      </div>
      <div className="mt-4">
        <h3 className="mb-4">
          Recent Orders
        </h3>
        <div>
        <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    
    </>
  );
};

export default Dashboard;
