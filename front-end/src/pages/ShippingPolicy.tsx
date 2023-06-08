import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';

const ShippingPolicy = () => {
  return (
    <>
      <Meta title="Shipping Policy" />
      <BreadCrumb title="Shipping Policy" />
      <Container class1="policy py-5 home-wrapper-2">
        <div className="col-12">
          <div className="policy-item"></div>
        </div>
      </Container>
    </>
  );
};

export default ShippingPolicy;
