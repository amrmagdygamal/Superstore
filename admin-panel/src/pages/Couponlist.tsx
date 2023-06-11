/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { Table } from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { getCoupons } from '../features/coupon/couponSlice';
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
    title: 'Expiry',
    dataIndex: 'expiry',
    sorter: (a: any, b: any) => a.expiry.length - b.expiry.length,
  },
  {
    title: 'Discount',
    dataIndex: 'discount',
    sorter: (a: any, b: any) => a.discount - b.discount,
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const Couponlist = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getCoupons());
  }, []);

  const CouponState = useSelector((state: any) => state.coupon.coupons);

  const data1: any = [];
  for (let i = 0; i < CouponState.length; i++) {
      data1.push({
        key: i + 1,
        name: CouponState[i].name,
        expiry:( CouponState[i].expiry).toLocaleString(),
        discount: CouponState[i].discount,
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
      <h3 className="mb-4 title">Coupons</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Couponlist;
