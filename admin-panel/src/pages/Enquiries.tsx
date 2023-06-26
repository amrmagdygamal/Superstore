/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import {
  deleteEnquiry,
  getEnquiries,
  resetState,
} from '../features/enquiries/enquiriesSlice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiFillDelete, AiOutlineEye } from 'react-icons/ai';
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
    title: 'Email',
    dataIndex: 'email',
    sorter: (a: any, b: any) => a.email.length - b.email.length,
  },
  {
    title: 'Number',
    dataIndex: 'number',
    sorter: (a: any, b: any) => a.number - b.number,
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
  const [open, setOpen] = useState(false);
  const [enquiryId, setenquiryId] = useState('');
  
  const enquiryState = useSelector((state: any) => state.enquiry.enquiries);
  const showModel = (e: string) => {
    setOpen(true);
    setenquiryId(e);
  };

  const hideModel = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getEnquiries());
  }, []);


  const data1: any = [];
  for (let i = 0; i < enquiryState.length; i++) {
    data1.push({
      key: i + 1,
      title: enquiryState[i].title,
      category: enquiryState[i].category,
      author: enquiryState[i].author,
      status: (
        <>
          <select name="status" id="" className="form-control form-select">
          <option value="Submitted">Submitted</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </>
      ),
      action: (
        <>
          <Link
            to={`/admin/enquiry/${enquiryState[i]._id}`}
            className="fs-3 text-dark"
          >
            <AiOutlineEye />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => showModel(enquiryState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const handleDelete = (e: string) => {
    dispatch(deleteEnquiry(e));
    setTimeout(() => {
      dispatch(getEnquiries());
    }, 400);
    setOpen(false);
  };

  return (
    <>
      <div>
        <h3 className="mb-4 title">Enquiries</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      <CustomModal
        hideModal={hideModel}
        open={open}
        performAction={() => {
          handleDelete(enquiryId);
        }}
        title="Are you sure you want to delete this Enquiry?"
      />
      </div>
    </>
  );
};

export default Enquiries;
