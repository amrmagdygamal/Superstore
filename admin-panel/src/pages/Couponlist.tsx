/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import {
  deleteCoupon,
  getCoupons,
  resetState,
} from '../features/coupon/couponSlice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import CustomModal from '../components/CustomeModel';

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

  const [open, setOpen] = useState(false);
  const [couponId, setCouponId] = useState('');

  const showModel = (e: string) => {
    setOpen(true);
    setCouponId(e);
  };
  const CouponState = useSelector((state: any) => state.coupon.coupons);

  const hideModel = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getCoupons());
  }, []);
  



  const data1: any = [];
  for (let i = 0; i < CouponState.length; i++) {
    data1.push({
      key: i + 1,
      name: CouponState[i].name,
      expiry: CouponState[i].expiry.toLocaleString(),
      discount: CouponState[i].discount,
      action: (
        <>
          <Link
            to={`/admin/brand/${CouponState[i]._id}`}
            className="fs-3 text-dark"
          >
            <BiEdit />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModel(CouponState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const handleDelete = (e: string) => {
    dispatch(deleteCoupon(e));
    setTimeout(() => {
      dispatch(getCoupons());
    }, 400);
    setOpen(false);
  };

  return (
    <div>
      <h3 className="mb-4 title">Coupons</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModel}
        open={open}
        performAction={() => {
          handleDelete(couponId);
        }}
        title="Are you sure you want to delete this Coupon?"
      />
    </div>
  );
};

export default Couponlist;
