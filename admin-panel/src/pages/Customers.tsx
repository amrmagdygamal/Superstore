/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { Table } from 'antd';
import { getCustomers, resetState } from '../features/customers/customerSlice';
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';




const columns: any = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Username',
    dataIndex: 'username',
    defaultSortOrder: "descend",
    sorter: (a: any, b: any) => a.username - b.username,
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  
];




const Customers = () => {
  const dispatch:AppDispatch = useDispatch()



  useEffect(() => {
    dispatch(resetState());
    dispatch(getCustomers())
  }, [])

  const customerState = useSelector((state: any) => state.customer.cutomers);

  const data1: any = [];
for (let i = 0; i < customerState?.length; i++) {
  if(customerState[i]?.role !== "admin") {
    data1.push({
      key: i ,
      username: customerState[i].username,
      email: customerState[i].email,
    })
  }
}
  

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