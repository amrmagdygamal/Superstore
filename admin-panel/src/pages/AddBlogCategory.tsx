import { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useFormik } from 'formik';

import { AppDispatch } from '../app/store';
import { createBlogCategory, resetState } from '../features/blogcategory/blogCategorySlice';

const schema = yup.object().shape({
  title: yup.string().required('Blog Category Name is Required'),
});

const AddBlogCategory = () => {
  const dispatch: AppDispatch = useDispatch();
  const newblogCategory = useSelector((state: any) => state.blogCategory);
  const { isSuccess, isError, isLoading, createdblogCategory } =
    newblogCategory;
  useEffect(() => {
    if (isSuccess && createdblogCategory) {
      toast.success('Blog Category Added Successfullly!');
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
      dispatch(createBlogCategory(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 8000);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Blog Category</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="title"
            onChan={formik.handleChange('title')}
            onBlur={formik.handleBlur('title')}
            val={formik.values.title}
            label="Enter Blog Category Name"
            i_id="blogCategory"
          />
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Blog Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCategory;
