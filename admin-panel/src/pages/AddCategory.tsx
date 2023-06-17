import { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';

import { AppDispatch } from '../app/store';
import {
  CategoryInfo,
  createProdCategory,
  getCategory,
  resetState,
  updateCategory,
} from '../features/productcategory/prodCategorySlice';

const schema = yup.object().shape({
  title: yup.string().required('Category Name is Required'),
});

const AddCategory = () => {


  const dispatch: AppDispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const getCategoryId = location.pathname.split('/')[3];

  const {
    isSuccess,
    isError,
    isLoading,
    createdCategory,
    categoryName,
    updatedCategory,
  } = useSelector((state: any) => state.prodCategory);
    
  useEffect(() => {
    if (getCategoryId !== undefined) {
      dispatch(getCategory(getCategoryId));
    } else {
      dispatch(resetState());
    }
  }, [getCategoryId]);


  


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getCategoryId !== undefined) {
        const data: CategoryInfo = { _id: getCategoryId, title: values.title };
        dispatch(updateCategory(data));
        setTimeout(() => {
          navigate("/admin/list-category")
        }, 300);
      } else {
        dispatch(createProdCategory(values));
        formik.resetForm();
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">  {getCategoryId !== undefined ? 'Edit' : 'Add'} Category</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="title"
            onChan={formik.handleChange('title')}
            onBlur={formik.handleBlur('title')}
            val={formik.values.title}
            label="Enter Category Name"
            i_id="prodCategory"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title ? (
              <div>{formik.errors.title as React.ReactNode}</div>
            ) : null}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
              {getCategoryId !== undefined ? 'Edit' : 'Add'} Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
