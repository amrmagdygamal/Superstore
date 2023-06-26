import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { AiOutlineHome, AiOutlineMail } from 'react-icons/ai';
import { BiInfoCircle, BiPhoneCall } from 'react-icons/bi';
import Container from '../components/Container';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import * as Yup from 'yup';

import { useFormik } from 'formik';
import { postQuery } from '../features/contact/contactSlice';

const signUpSchema = Yup.object().shape({
  name: Yup.string().defined().required('Name is Required'),

  email: Yup.string().email('Enter valid Email').required('Email is Required'),
  mobile: Yup.string()
    .required('Mobile Number is required'),
  comment:  Yup.string()
  .required('Comment is required'),
});

const Contact = () => {
  const dispatch: AppDispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
      comment: '',
    },
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      dispatch(postQuery(values));
      formik.resetForm();
    },
  });

  return (
    <>
      <Meta title="Contact Us" />
      <BreadCrumb title="Contact Us" />
      <Container class1="contact py-5 home-wrapper-2">
        <div className="col-12">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d707.2604415311392!2d31.717642718946454!3d30.293237142755455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f8075f7c0ecadb%3A0xc54596c9cf9f7c82!2s10th%20of%20Ramadan%20City%2C%20Ash%20Sharqia%20Governorate!5e0!3m2!1sen!2seg!4v1686083271823!5m2!1sen!2seg"
            width="600"
            height="450"
            style={{ border: '0', width: '100%' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <div className="col-12 mt-5">
          <div className="contact-inner box-shadow d-flex justify-content-between">
            <div>
              <h3 className="contact-title mb-4">Contact</h3>
              <form action="" onSubmit={formik.handleSubmit} className="d-flex flex-column gap-4">
            <div>
                <input
                  name="name"
                  className="form-control h-50 py-3"
                  type="text"
                  placeholder="Name"
                  onChange={formik.handleChange('name')}
                  onBlur={formik.handleBlur('name')}
                  value={formik.values.name}
                />
                <div className="error">
                  {formik.touched.name && formik.errors.name ? (
                    <div>{formik.errors.name}</div>
                  ) : null}
                </div>
            </div>
              <div>
                  <input
                  name="email"
                  className="form-control h-50 py-3"
                  type="text"
                  placeholder="Email"
                  onChange={formik.handleChange('email')}
                  onBlur={formik.handleBlur('email')}
                  value={formik.values.email}
                />
                <div className="error">
                  {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                  ) : null}
                </div>
              </div>
              <div>
                  <input
                  name="mobile"
                  className="form-control h-50 py-3"
                  type="text"
                  placeholder="Mobile"
                  onChange={formik.handleChange('mobile')}
                  onBlur={formik.handleBlur('mobile')}
                  value={formik.values.mobile}
                />
                <div className="error">
                  {formik.touched.mobile && formik.errors.mobile ? (
                    <div>{formik.errors.mobile}</div>
                  ) : null}
                </div>
              </div>
                <div>
                  <textarea
                    className="w-100 form-control"
                    name="comment"
                    id=""
                    cols={30}
                    rows={4}
                    placeholder="comment"
                  onChange={formik.handleChange('comment')}
                  onBlur={formik.handleBlur('comment')}
                  value={formik.values.comment}
                  />
                  <div className="error">
                  {formik.touched.comment && formik.errors.comment ? (
                    <div>{formik.errors.comment}</div>
                  ) : null}
                </div>
                </div>
                <div>
                  <button className="button border-0">Submit</button>
                </div>
              </form>
            </div>
            <div>
              <h3 className="contact-title mb-4">Get In Touck With Us</h3>
              <ul className="ps-0">
                <li className="mb-3 d-flex gap-2 align-items-center">
                  <AiOutlineHome className="fs-5" />
                  <address className="mb-0">
                    Home: Refaat El-Gamal Street, 10th of Ramadan City, Egypt
                  </address>
                </li>
                <li className="mb-3 d-flex gap-2 align-items-center">
                  <BiPhoneCall className="fs-5" />
                  <a href="tel:+20 01095330155">+20 01095330155</a>
                </li>
                <li className="mb-3 d-flex gap-2 align-items-center">
                  <AiOutlineMail className="fs-5" />
                  <a href="mailto:amroraker@gmail.com">amroraker@gmail.com</a>
                </li>
                <li className="mb-3 d-flex gap-2 align-items-center">
                  <BiInfoCircle className="fs-5" />
                  <address className="mb-0">Sunday-Friday 10 AM - 8 PM</address>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Contact;
