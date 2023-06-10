/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { getEnquiries } from '../features/enquiries/enquiriesSlice';
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
    sorter: (a: any, b: any) => a.name.length - b.name.length,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    sorter: (a: any, b: any) => a.email.length - b.email.length,
  },
  {
    title: 'Number',
    dataIndex: 'number',
    sorter: (a: any, b: any) => a.number.length - b.number.length,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    sorter: (a: any, b: any) => a.status.length - b.status.length,
  },

  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const Enquiries = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getEnquiries());
  }, []);

  const Enquiriestate = useSelector((state: any) => state.brand.Enquiries);

  const data1: any = [];
  for (let i = 0; i < Enquiriestate.length; i++) {
    data1.push({
      key: i + 1,
      name: Enquiriestate[i].name,
      email: Enquiriestate[i].email,
      number: Enquiriestate[i].number,
      status: (
        <>
          <select
            name="status"
            id=""
            className="form-control form-select"
          >
            <option value="">
              Set Status
            </option>
          </select>
        </>
      ),
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
      <h3 className="mb-4 title">Enquiries</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Enquiries;
