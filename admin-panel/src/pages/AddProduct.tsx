import React, { useState } from 'react';
import CustomInput from '../components/CustomInput';
import ReactQuill from 'react-quill';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';

import 'react-quill/dist/quill.snow.css';
const { Dragger } = Upload;

const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const AddProduct = () => {
  const [desc, setDesc] = useState();

  const handleDescription = (e: any) => {
    setDesc(e);
  };

  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>

      <div className="">
        <form action="">
          <div className="mb-4">
            <CustomInput type="text" name="title" label="Enter Product Title" />
          </div>
          <ReactQuill
            theme="snow"
            value={desc}
            onChange={(evt) => {
              handleDescription(evt);
            }}
          />
          <br />
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger>
          <div className="mt-4">
            <CustomInput type="number" name="price" label="Enter Product Price" />
          </div>
          <select name="brand" className="form-control py-3 mb-3" id="">
            <option value="">Select Brand</option>
          </select>
          <select name="brand" className="form-control py-3 mb-3" id="">
            <option value="">Select Categroy</option>
          </select>
          <select name="brand" className="form-control py-3 mb-3" id="">
            <option value="">Select Color</option>
          </select>
          <CustomInput type="number" name="quantity" label="Enter Product Quantity" />

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
