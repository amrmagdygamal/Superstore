import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {BsLinkedin, BsGithub, BsYoutube, BsFacebook} from 'react-icons/bs';


const Footer = () => {
  return (
    <>
      <footer className="py-4 footer-top">
        <Container>
          <Row className="align-items-center">
            <Col md={5}>
              <div className="top-data d-flex gap-4 align-items-center">
                <img src="images/newsletter.png" alt="newsletter" />
                <h2 className="mb-0">Sign Up For Newsletter</h2>
              </div>
            </Col>
            <Col md={7}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control py-1"
                  placeholder="Your Email Address"
                  aria-label="Your Email Address."
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text" id="basic-addon2">
                  Subscribe
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
      <footer className="py-4 footer-upper">
        <Container>
          <Row>
            <Col md-4>
              <h4>Contact Us</h4>
              <div>
                <address>
                  <p className="mb-1 py-2">Home : Refaat El-Gamal Street,</p> 
                  <p className="mb-1 py-2"> 10th of Ramadan City,</p> 
                  <p className="mb-1 py-2">Egypt,</p>
                  <p className="mb-1 py-2">postalCode: 44629</p>
                </address>
                <a href="tel:+20 01095330155" className='text-white'>+20 01095330155</a>
                <a href="mailto:amororaker@gmail.com" className='text-white d-block mb-1 py-2 '>amroraker@gmail.com</a>
              </div>
              <div className="social-icons d-flex align-items-center gap-3">
                <a href="https://www.linkedin.com/in/amr-magdy-658298247" className='text-white'><BsLinkedin className="fs-4" /></a>
                <a href="https://github.com/amrmagdygamal" className='text-white'><BsGithub className="fs-4" /></a>
                <a href="https://www.youtube.com/@AmrMagdyPRO" className='text-white'><BsYoutube className="fs-4" /></a>
                <a href="https://www.facebook.com/profile.php" className='text-white'><BsFacebook className="fs-4" /></a>
              </div>
            </Col>
            <Col md-3>
              <h4>Information</h4>
              <div className="footer-links d-flex flex-column">
                <Link to="/privacy-policy" className="text-white mb-1 py-2">
                  Privacy Policy
                </Link>
                <Link to="/refund-policy" className="text-white mb-1 py-2">
                  Refund Policy
                </Link>
                <Link to="/shipping-policy" className="text-white mb-1 py-2">
                  Shipping Policy
                </Link>
                <Link to="/term-conditions" className="text-white mb-1 py-2">
                  Terms & Conditions
                </Link>
                <Link to="/blogs" className="text-white mb-1 py-2">
                  Blogs
                </Link>
              </div>
            </Col>
            <Col md-3>
              <h4>Account</h4>
              <div className="footer-links d-flex flex-column">
                <Link to="/" className="text-white mb-1 py-2">
                  Search
                </Link>
                <Link to="/" className="text-white mb-1 py-2">
                  About Us
                </Link>
                <Link to="/" className="text-white mb-1 py-2">
                  Faq
                </Link>
                <Link to="/contact" className="text-white mb-1 py-2">
                  Contact
                </Link>
              </div>
            </Col>
            <Col md-2>
              <h4>Quick Links</h4>
              <div className="footer-links d-flex flex-column">
                <Link to="/" className="text-white mb-1 py-2">
                  Laptops
                </Link>
                <Link to="/" className="text-white mb-1 py-2">
                  Headphones
                </Link>
                <Link to="/" className="text-white mb-1 py-2">
                  Watches
                </Link>
                <Link to="/" className="text-white mb-1 py-2">
                  Tablets
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
      <footer className="py-3 footer-bottom">
        <Container>
          <Row>
            <Col md={12}>
              <p className="text-center mb-0">
                &copy; {new Date().getFullYear()}; Powered by Amr Magdy
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
