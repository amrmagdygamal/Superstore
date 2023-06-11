import { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useFormik } from 'formik';

import { AppDispatch } from '../app/store';
import { createProdCategory } from '../features/productcategory/prodCategorySlice';

const schema = yup.object().shape({
  title: yup.string().required('Category Name is Required'),
});

const AddCategory = () => {
  const dispatch: AppDispatch = useDispatch();
  const newprodCategory = useSelector((state: any) => state.prodCategory);
  const { isSuccess, isError, isLoading, createdprodCategory } =
    newprodCategory;
  useEffect(() => {
    if (isSuccess && createdprodCategory) {
      toast.success('Category Added Successfullly!');
    } else if (isError) {
      toast.error('Something Went Wrong!');
    }
  }, [isSuccess, isError, isLoading]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createProdCategory(values));
      formik.resetForm();
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Category</h3>
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
              <div>{formik.errors.title}</div>
            ) : null}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
