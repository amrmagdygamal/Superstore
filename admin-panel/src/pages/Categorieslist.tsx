/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { deleteCategory, getprodCategories, resetState } from '../features/productcategory/prodCategorySlice';
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

const Categorieslist = () => {
  const dispatch: AppDispatch = useDispatch();

  
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState("");

  const showModel = (e: string) => {
    setOpen(true);
    setCategoryId(e);
  };
  
  const hideModel = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(resetState());
    dispatch(getprodCategories());
  }, []);

  const prodCategoryState = useSelector((state: any) => state.prodCategory.prodCategories);

  const data1: any = [];
  for (let i = 0; i < prodCategoryState.length; i++) {
    data1.push({
      key: i + 1,
      title: prodCategoryState[i].title,
      action: (
        <>
          <Link to={`/admin/category/${prodCategoryState[i]._id}`} className="fs-3 text-dark">
            <BiEdit />
          </Link>
          <button className="ms-3 fs-3 text-danger bg-transparent border-0" onClick={() => showModel(prodCategoryState[i]._id)}>
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const handleDelete = (e: string) => {
    dispatch(deleteCategory(e));
    setTimeout(() => {
      dispatch(getprodCategories())
    }, 100);
    setOpen(false);
  }



  return (
    <div>
      <h3 className="mb-4 title">Categories</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModel}
        open={open}
        performAction={() => {
          handleDelete(categoryId);
        }}
        title="Are you sure you want to delete this Category?"
      />
    </div>
  );
};

export default Categorieslist;
