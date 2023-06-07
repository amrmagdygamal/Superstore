import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';

const ShippingPolicy = () => {
  return (
    <>
      <Meta title="Shipping Policy" />
      <BreadCrumb title="Shipping Policy" />
      <div className="policy py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="policy-item"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingPolicy;
