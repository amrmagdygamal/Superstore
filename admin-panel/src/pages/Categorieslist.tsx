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


const Categorieslist = () => {
  return (
    <div>
      <h3 className="mb-4">Categories</h3>
      <div>
      <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  )
}

export default Categorieslist;