/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { getBrands } from '../features/brand/brandSlice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { resetState } from '../features/customers/customerSlice';

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
    title: 'Action',
    dataIndex: 'action',
  },
];

const Brandlist = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(resetState())
    dispatch(getBrands());
  }, []);

  const brandState = useSelector((state: any) => state.brand.brands);

  const data1: any = [];
  for (let i = 0; i < brandState.length; i++) {
      data1.push({
        key: i + 1,
        name: brandState[i].name,
        action: (
          <>
            <Link to={`/admin/brand/${brandState[i]._id}`} className="fs-3 text-dark">
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
      <h3 className="mb-4 title">Brands</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Brandlist;
