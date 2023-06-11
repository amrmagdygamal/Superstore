/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getCustomers } from '../features/customers/customerSlice';
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {  User } from '../types/User';




interface Column {
  title: string;
  dataIndex: string;
  defaultSortOrder?: string;
  sorter?: (a: any, b: any) => number;
}

const columns:any = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Username',
    dataIndex: 'username',
    defaultSortOrder: 'descend',
    sorter: (a: any, b: any) => a.username.localeCompare(b.username),
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
];



const Customers = () => {
  const dispatch:AppDispatch = useDispatch()



  useEffect(() => {
    dispatch(getCustomers())
  }, [])

  const customerState = useSelector((state: any) => state.customer.customers);

  const data1: { key: number; username: string; email: string }[] = customerState
  .filter((customer: User) => customer.role !== 'admin')
  .map((customer: User, index: number) => ({
    key: index + 1,
    username: customer.username,
    email: customer.email,
  }));
  

  return (
    <div>
      <h3 className="mb-4 title">Blogs List</h3>
      <div>
      <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  )
}

export default Customers;