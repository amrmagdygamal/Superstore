
import { Link } from 'react-router-dom';
import Container from './Container';

const BreadCrumb = (props: any) => {
  const { title } = props;
  return (
    <Container class1="breadcrumb mb-0 py-4">
      <div className="col-12">
        <p className="text-center mb-0">
          <Link to="/" className="text-dark">
            Home
          </Link>{' '}
          / {title}
        </p>
      </div>
    </Container>
  );
};

export default BreadCrumb;
