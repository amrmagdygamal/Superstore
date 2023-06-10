/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {BiEdit} from 'react-icons/bi';
import {AiFillDelete} from 'react-icons/ai';
import { AppDispatch } from '../app/store';
import { getProducts } from '../features/product/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';



const columns: any = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a: any, b: any) => a.title.length - b.title.length,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a: any, b: any) => a.brand.length - b.brand.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a: any, b: any) => a.category.length - b.category.length,
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a: any, b: any) => a.price - b.price,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
  
];




const Productlist = () => {

  const dispatch:AppDispatch = useDispatch()



  useEffect(() => {
    dispatch(getProducts())
  }, [])

  const productState = useSelector((state: any) => state.product.products);

  const data1: any = [];
for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i + 1,
      title: productState[i].title,
      brand: productState[i].brand,
      price: `${productState[i].price}`,
      color: productState[i].color,
      category: productState[i].category,
      action: (
        <>
          <Link to="/" className='fs-3 text-dark'>
            <BiEdit />
          </Link>
          <Link className='ms-3 fs-3 text-danger' to="/">
            <AiFillDelete />
          </Link>
        </>
      )
    })
  }


  return (
    <div>
      <h3 className="mb-4 title">Products</h3>
      <div>
      <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  )
}

export default Productlist;