import React from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineMail } from 'react-icons/ai';
import { BiInfoCircle, BiPhoneCall } from 'react-icons/bi';

const Contact = () => {
  return (
    <>
      <Meta title="Contact Us" />
      <BreadCrumb title="Contact Us" />
      <div className="contact py-5 home-wrapper-2">
        <Container>
          <Row>
            <Col md={12}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d707.2604415311392!2d31.717642718946454!3d30.293237142755455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f8075f7c0ecadb%3A0xc54596c9cf9f7c82!2s10th%20of%20Ramadan%20City%2C%20Ash%20Sharqia%20Governorate!5e0!3m2!1sen!2seg!4v1686083271823!5m2!1sen!2seg"
                width="600"
                height="450"
                style={{ border: '0', width: '100%' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </Col>
            <Col md={12} className="mt-5">
              <div className="contact-inner box-shadow d-flex justify-content-between">
                <div>
                  <h3 className="contact-title mb-4">Contact</h3>
                  <form action="" className="d-flex flex-column gap-3">
                    <div>
                      <input
                        placeholder="Name"
                        className="form-control"
                        type="text"
                      />
                    </div>
                    <div>
                      <input
                        placeholder="Email"
                        className="form-control"
                        type="email"
                      />
                    </div>
                    <div>
                      <input
                        placeholder="Mobile Number"
                        className="form-control"
                        type="tel"
                      />
                    </div>
                    <div>
                      <textarea
                        className="w-100 form-control"
                        name=""
                        id=""
                        cols={30}
                        rows={4}
                        placeholder="Comments"
                      ></textarea>
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
                      <address className='mb-0'>
                        Home: Refaat El-Gamal Street, 10th of Ramadan City,
                        Egypt
                      </address>
                    </li>
                    <li className="mb-3 d-flex gap-2 align-items-center">
                      <BiPhoneCall className="fs-5" />
                      <a href="tel:+20 01095330155">+20 01095330155</a>
                    </li>
                    <li className="mb-3 d-flex gap-2 align-items-center">
                      <AiOutlineMail className="fs-5" />
                      <a href="mailto:amroraker@gmail.com">
                        amroraker@gmail.com
                      </a>
                    </li>
                    <li className="mb-3 d-flex gap-2 align-items-center">
                      <BiInfoCircle className="fs-5" />
                      <address className='mb-0'>Sunday-Friday 10 AM - 8 PM</address>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Contact;
