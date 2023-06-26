import { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useFormik } from 'formik';

import { AppDispatch } from '../app/store';
import {
  BlogcategInfo,
  createBlogCategory,
  getBlogcateg,
  resetState,
  updateBlogcateg,
} from '../features/blogcategory/blogCategorySlice';

const schema = yup.object().shape({
  title: yup.string().required('Blog Category Name is Required'),
});

const AddBlogCategory = () => {
  const dispatch: AppDispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();
  const getBlogCategId = location.pathname.split('/')[3];

  const newblogCategory = useSelector((state: any) => state.blogCategory);
  const {
    blogcategName,
  } = newblogCategory;

  useEffect(() => {
    if (getBlogCategId !== undefined) {
      dispatch(getBlogcateg(getBlogCategId));
    } else {
    dispatch(resetState());
  }
  }, [getBlogCategId]);


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogcategName || '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBlogCategId !== undefined) {
        const data: BlogcategInfo = { _id: getBlogCategId, title: values.title };
        dispatch(updateBlogcateg(data));
        setTimeout(() => {
          navigate("/admin/blog-category-list")
        }, 300);
      } else {
        dispatch(createBlogCategory(values));
        formik.resetForm();
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getBlogCategId !== undefined ? 'Edit' : 'Add'} Blog Category
      </h3>
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
          <div className="error">
            {formik.touched.title && formik.errors.title ? (
              <div>
                <p>{formik.errors.title as React.ReactNode}</p>
              </div>
            ) : null}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getBlogCategId !== undefined ? "Edit" : "Add"} Blog Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogCategory;
