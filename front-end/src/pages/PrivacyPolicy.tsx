import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';

const PrivacyPolicy = () => {
  return (
    <>
      <Meta title="Privacy Policy" />
      <BreadCrumb title="Privacy Policy" />
      <Container class1="policy py-5 home-wrapper-2">
        <div className="col-12">
          <div className="policy-item"></div>
        </div>
      </Container>
    </>
  );
};

export default PrivacyPolicy;
