/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { deleteColor, getColors, resetState } from '../features/color/colorSlice';
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
    title: 'Title',
    dataIndex: 'title',
    sorter: (a: any, b: any) => a.title.length - b.title.length,
  },

  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const Colorlist = () => {
  const dispatch: AppDispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [colorId, setColorId] = useState('');

  const showModel = (e: string) => {
    setOpen(true);
    setColorId(e);
  };

  const hideModel = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getColors());
  }, []);

  const colorState = useSelector((state: any) => state.color.colors);

  const data1: any = [];
  for (let i = 0; i < colorState.length; i++) {
    data1.push({
      key: i + 1,
      title: colorState[i].title,
      action: (
        <>
          <Link to={`/admin/Color/${colorState[i]._id}`}
            className="fs-3 text-dark">
            <BiEdit />
          </Link>
          <button className="ms-3 fs-3 text-danger bg-transparent border-0" onClick={() => showModel(colorState[i]._id)}>
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const handleDelete = (e: string) => {
    dispatch(deleteColor(e));
    setTimeout(() => {
      dispatch(getColors())
    }, 100);
    setOpen(false);
  }



  return (
    <div>
      <h3 className="mb-4 title">Colors List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModel}
        open={open}
        performAction={() => {
          handleDelete(colorId);
        }}
        title="Are you sure you want to delete this Color?"
      />
    </div>
  );
};

export default Colorlist;
