/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import 'react-widgets/styles.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'react-quill/dist/quill.snow.css';
import { AppDispatch } from '../app/store';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Dropzone from 'react-dropzone';
import { BlogInfo, createBlog, getBlog, resetState, updateBlog, uploadImg } from '../features/blogs/blogSlice';
import CustomInput from '../components/CustomInput';
import { useLocation, useNavigate } from 'react-router-dom';
import { deleteImg } from '../features/upload/uploadSlice';
import { getBlogCategories } from '../features/blogcategory/blogCategorySlice';


const schema = Yup.object().shape({
  title: Yup.string().required('Title is Required'),
  images: Yup.array().required("").min(1, 'You should Upload one Image'),
  description: Yup.string().required('Description is Required'),
  blogCategory: Yup.string().required('Category is Required'),

  author: Yup.string().required('Author Name is Required'),
});


const AddBlogPage = () => {

  const dispatch: AppDispatch = useDispatch();


  const location = useLocation();
  const navigate = useNavigate();
  const getBlogId = location.pathname.split('/')[3];



  
  const blogImgState = useSelector((state: any) => state.blog.images);

  const blogState = useSelector((state: any) => state.blog);
  const blogCategoryState = useSelector(
    (state: any) => state.blogCategory.blogCategories
  );

  useEffect(() => {
    dispatch(getBlogCategories())
  }, [])

  const {
    blogName,
    blogDesc,
    blogCategory,
    blogAuthor,
    blogImages,
  } = blogState
  
  
      const img: any = [];
      blogImgState?.forEach((i: any) => {
        img.push({
          public_id: i.public_id,
          url: i.url,
        });
      });

      
      useEffect(() => {
        if (getBlogId !== undefined) {
          dispatch(getBlog(getBlogId));
          img.push(blogImages)
        } else {
          dispatch(resetState());
        }
      }, [getBlogId]);
      
      useEffect(() => {
        formik.values.images = img;
      }, [img]);
      
  



  const formik = useFormik({
    initialValues: {
      title: blogName || '',
      description: blogDesc || '',
      blogCategory: blogCategory || '',
      author: blogAuthor || "",
      images: [],
    },


    validationSchema: schema,
    onSubmit: (values) => {
      if (getBlogId !== undefined) {
        const data: BlogInfo = { _id: getBlogId, title: values.title, description: values.description, category: values.blogCategory, author: values.author, images: values.images };
        dispatch(updateBlog(data));
        setTimeout(() => {
          navigate("/admin/blog-list")
        }, 400);
      } else {
        
        dispatch(createBlog({ title: values.title, description: values.description, category: values.blogCategory, author: values.author, images: values.images}));
        formik.resetForm();
      }
    },
  });




  return (
    <div>
      <h3 className="mb-4 title">{getBlogId !== undefined ? 'Edit' : 'Add'} Blog</h3>

      <div className="">
        <form action="" onSubmit={formik.handleSubmit} >
          <div className="mt-4 title">
          <CustomInput
              i_id="title"
              type="text"
              name="title"
              label="Enter Blog Title"
              onChan={formik.handleChange('title')}
              onBlur={formik.handleBlur('title')}
              val={formik.values.title}
            />
          </div>
          <div className="error mb-4">
            {formik.touched.title && formik.errors.title ? (
              <div>{formik.errors.title as React.ReactNode}</div>
            ) : null}
          </div>
          <input
            className="form-control p-3"
            placeholder="Write Description for the Blog"
            onChange={formik.handleChange('description')}
            onBlur={formik.handleBlur('description')}
            value={formik.values.description}
          />
          <div className="error mb-4">
            {formik.touched.description && formik.errors.description ? (
              <div>{formik.errors.description as React.ReactNode}</div>
            ) : null}
          </div>
          <select
            name="blogCategory"
            onChange={formik.handleChange('blogCategory')}
            onBlur={formik.handleBlur('blogCategory')}
            value={formik.values.blogCategory}
            className="form-control py-3"
            id=""
          >
            <option value="">Select Blog Categroy</option>
            {blogCategoryState.map((i: any, j: any) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          <div className="error">
            {formik.touched.blogCategory && formik.errors.blogCategory ? (
              <div>{formik.errors.blogCategory as React.ReactNode}</div>
            ) : null}
          </div>
          <div className="mt-4 title">
          <CustomInput
              i_id="author"
              type="text"
              name="title"
              label="Enter Blog Author"
              onChan={formik.handleChange('author')}
              onBlur={formik.handleBlur('author')}
              val={formik.values.author}
            />
          </div>
          <div className="error mb-4">
            {formik.touched.author && formik.errors.author ? (
              <div>{formik.errors.author as React.ReactNode}</div>
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
          <div className="showimages d-flex mt-3 flex-wrap gap-3">
            {blogImgState?.map((i: any, j: string) => {
              return (
                <div className="position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(deleteImg(i.public._id))}
                    className="btn-close position-absolute"
                    style={{ top: '.68rem', right: '.67rem' }}
                  ></button>
                  <img src={i.url} alt="img" width={405} height={280} />
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
            {getBlogId !== undefined ? 'Edit' : 'Add'} Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlogPage;
