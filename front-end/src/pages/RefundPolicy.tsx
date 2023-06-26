
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';

const RefundPolicy = () => {
  return (
    <>
      <Meta title="Refund Policy" />
      <BreadCrumb title="Refund policy" />
      <Container class1="policy py-5 home-wrapper-2">
        <div className="col-12">
          <div className="policy-item"></div>
        </div>
      </Container>
    </>
  );
};

export default RefundPolicy;
