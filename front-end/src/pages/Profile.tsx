import {useState } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import { useSelector } from 'react-redux';
import {FiEdit} from 'react-icons/fi'

const Profile = () => {

  const userState = useSelector((state: any) => state.user);
  const [edit, setEdit] = useState(false);



  return (
    <>
      <Meta title="Profile Page" />
      <BreadCrumb title="Profile Page" />
      <Container class1="py-5 home-wrapper-2">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="my-3">Update Profile</h3>
            <FiEdit className="fs-4" onClick={() => setEdit(true)} />
          </div>
          <form>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                User Name
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={userState?.userInfor?.username}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                name="email"
                value={userState?.userInfor?.email}
                disabled
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                name="password"
                value="xxxx"
                disabled
                onCopy={(e) => {
                  e.preventDefault();
                }}
              />
            </div>
            {edit && (
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            )}
          </form>
        </div>
      </Container>
    </>
  );
};

export default Profile;
