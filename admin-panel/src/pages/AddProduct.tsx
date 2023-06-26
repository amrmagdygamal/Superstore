/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import 'react-widgets/styles.css';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'react-quill/dist/quill.snow.css';
import Multiselect from 'react-widgets/Multiselect';
import { getBrands } from '../features/brand/brandSlice';
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getColors } from '../features/color/colorSlice';
import Dropzone from 'react-dropzone';
import { deleteImg, uploadImg } from '../features/upload/uploadSlice';
import {
  createProduct,
  getProduct,
  resetState,
  updateProduct,
} from '../features/product/productSlice';
import CustomInput from '../components/CustomInput';
import { getprodCategories } from '../features/productcategory/prodCategorySlice';
import { useLocation, useNavigate } from 'react-router-dom';

const schema = Yup.object().shape({
  name: Yup.string().required('Name is Required'),
  images: Yup.array().required('').min(1, 'You should Product Images'),

  description: Yup.string().required('Description is Required'),
  price: Yup.number().required('Price is Required'),
  brand: Yup.string().required('Brand is Required'),
  tag: Yup.string().required('Tag is Required'),
  category: Yup.string().required('Category is Required'),
  color: Yup.array()
    .min(1, 'Pick at least one color')
    .required('Color is Required'),
  countInStock: Yup.number().required('Quantity is Required'),
});

const AddProduct = () => {
  const [color, setColor] = useState([]);

  const dispatch: AppDispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const getProductId = location.pathname.split('/')[3];
  const newProduct = useSelector((state: any) => state.product);
  const {
    isSuccess,
    productName,
    productDesc,
    productCategory,
    productPrice,
    productBrand,
    productTag,
    productQuant,
    productImages,
  } = newProduct;
  
  useEffect(() => {
    if (getProductId !== undefined) {
      dispatch(getProduct(getProductId));
      console.log(productName, productDesc, productCategory)
    } else {
      dispatch(resetState());
    }
  }, [getProductId]);
  const brandState = useSelector((state: any) => state.brand.brands);
  const colorState = useSelector((state: any) => state.color.colors);
  const imgState = useSelector((state: any) => state.img.images);
  const prodCategoryState = useSelector(
    (state: any) => state.prodCategory.prodCategories
  );

  const handleColors = (e: any) => {
    setColor(e);
  };


  useEffect(() => {
    dispatch(getBrands());
    dispatch(getColors());
    dispatch(getprodCategories());
  }, []);

  const colors: any = colorState.map((i: any) => ({
    _id: i._id,
    color: i.title,
  }));

  const img: any = [];
  imgState.forEach((i: any) => {
    img.push({
      url: i.url,
      public_id: i.public_id,
    });
  });

  useEffect(() => {

    formik.values.color = color ? color : [];
    formik.values.images = img;
  }, [color, img]);

  const [initialValues, setInitialValues] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    color: [],
    brand: '',
    tag: '',
    countInStock: '',
    images: [],
  });
  
  useEffect(() => {
    if ( productName | productDesc | productCategory | productPrice | productBrand | productTag | productQuant) {
      setTimeout(() => {
        setInitialValues({
          name: productName,
          description: productDesc,
          category: productCategory,
          price: productPrice,
          color: [],
          brand: productBrand,
          tag: productTag,
          countInStock: productQuant,
          images: productImages,
        });
      }, 3000);
    }
  }, [isSuccess, productName, productDesc, productCategory, productPrice, productBrand, productTag, productQuant, productImages]);
  

  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values) => {
      if (getProductId !== undefined) {
        const data: any = {
          name: values.name,
          description: values.description,
          price: values.price,
          brand: values.brand,
          category: values.category,
          countInStock: values.countInStock,
          color: values.color,
          images: values.images,
          tag: values.tag,
        };
        dispatch(updateProduct(data));
        setTimeout(() => {
          navigate('/admin/product-list');
        }, 400);
      } else {
        dispatch(
          createProduct({
            name: values.name,
            description: values.description,
            price: values.price,
            brand: values.brand,
            category: values.category,
            countInStock: values.countInStock,
            color: values.color,
            images: values.images,
            tag: values.tag,
          })
        );
        formik.resetForm();
        setColor([]);
      }
    },
  });
  return (
    <div>
      <h3 className="mb-4 name">
        {getProductId !== undefined ? 'Edit' : 'Add'} Product
      </h3>

      <div className="">
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="">
            <CustomInput
              i_id="name"
              type="text"
              name="name"
              label="Enter Product name"
              onChan={formik.handleChange('name')}
              onBlur={formik.handleBlur('name')}
              val={formik.values.name}
            />
          </div>
          <div className="error mb-4">
            {formik.touched.name && formik.errors.name ? (
              <div>{formik.errors.name as React.ReactNode}</div>
            ) : null}
          </div>
          <input
            className="form-control p-3"
            placeholder="Write Description for the product"
            onChange={formik.handleChange('description')}
            onBlur={formik.handleBlur('description')}
            value={formik.values.description}
          />
          <div className="error">
            {formik.touched.description && formik.errors.description ? (
              <div>{formik.errors.description as React.ReactNode}</div>
            ) : null}
          </div>
          <div className="my-4">
            <CustomInput
              i_id="price"
              type="number"
              name="price"
              label="Enter Product Price"
              val={formik.values.price}
              onBlur={formik.handleBlur('price')}
              onChan={formik.handleChange('price')}
            />
            <div className="error">
              {formik.touched.price && formik.errors.price ? (
                <div>{formik.errors.price as React.ReactNode}</div>
              ) : null}
            </div>
          </div>
          <select
            name="brand"
            onChange={formik.handleChange('brand')}
            onBlur={formik.handleBlur('brand')}
            value={formik.values.brand}
            className="form-control py-3"
          >
            <option value="">Select Brand</option>
            {brandState.map((i: any, j: any) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}{' '}
            as React.ReactNode
          </select>
          <div className="error mb-3">
            {formik.touched.brand && formik.errors.brand ? (
              <div>{formik.errors.brand as React.ReactNode}</div>
            ) : null}
          </div>
          <select
            name="category"
            onChange={formik.handleChange('category')}
            onBlur={formik.handleBlur('category')}
            value={formik.values.category}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select Categroy</option>
            {prodCategoryState.map((i: any, j: any) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category ? (
              <div>{formik.errors.category as React.ReactNode}</div>
            ) : null}
          </div>
          <select
            name="tag"
            onChange={formik.handleChange('tag')}
            onBlur={formik.handleBlur('tag')}
            value={formik.values.tag}
            className="form-control py-3 mb-3"
          >
            <option value="features">
              Featured
            </option>
            <option value="popular">Popular</option>
            <option value="special">Special</option>
          </select>
          <div className="error mb-3">
            {formik.touched.tag && formik.errors.tag ? (
              <div>{formik.errors.tag as React.ReactNode}</div>
            ) : null}
          </div>
          <Multiselect
            dataKey="id"
            textField="color"
            defaultValue={[1]}
            data={colors}
            onChange={(i) => handleColors(i)}
            value={formik.values.color}
          />
          <div className="error">
            {formik.touched.color && formik.errors.color ? (
              <div>{formik.errors.color as React.ReactNode}</div>
            ) : null}
          </div>
          <CustomInput
            i_id="quantity"
            type="number"
            name="countInStock"
            label="Enter Product Quantity"
            val={formik.values.countInStock}
            onChan={formik.handleChange('countInStock')}
            onBlur={formik.handleBlur('countInStock')}
          />
          <div className="error">
            {formik.touched.countInStock && formik.errors.countInStock ? (
              <div>{formik.errors.countInStock as React.ReactNode}</div>
            ) : null}
          </div>
          <div className="bg-white border-1 mt-4 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {productImages != undefined
              ? productImages?.map((i: any, j: string) => {
                  return (
                    <div className="position-relative" key={j}>
                      <button
                        type="button"
                        onClick={() => dispatch(deleteImg(i.public_id))}
                        className="btn-close position-absolute"
                        style={{ top: '.68rem', right: '.67rem' }}
                      ></button>
                      <img src={i.url} alt="img" width={200} height={200} />
                    </div>
                  );
                })
              : imgState.map((i: any, j: string) => {
                  return (
                    <div className="position-relative" key={j}>
                      <button
                        type="button"
                        onClick={() => dispatch(deleteImg(i.public_id))}
                        className="btn-close position-absolute"
                        style={{ top: '.68rem', right: '.67rem' }}
                      ></button>
                      <img src={i.url} alt="img" width={200} height={200} />
                    </div>
                  );
                })}
          </div>
          <div className="error">
            {formik.touched.images && formik.errors.images ? (
              <div>{formik.errors.images as React.ReactNode}</div>
            ) : null}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getProductId !== undefined ? 'Edit' : 'Add'} Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
