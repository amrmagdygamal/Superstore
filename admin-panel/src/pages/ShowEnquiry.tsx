import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  getEnquiry,
  resetState,
  updateEnquiry,
} from '../features/enquiries/enquiriesSlice';
import { BiArrowBack } from 'react-icons/bi';
import { AppDispatch } from '../app/store';

const ShowEnquiry = () => {
  const dispatch: AppDispatch = useDispatch();

  const location = useLocation();

  const navigate = useNavigate();

  const getEnqId = location.pathname.split('/')[3];

  const enqState = useSelector((state: any) => state.enquiry);

  const { enqName, enqMobile, enqEmail, enqComment, enqStatus } = enqState;

  useEffect(() => {
    dispatch(getEnquiry(getEnqId));
  }, [getEnqId]);

  const goBack = () => {
    navigate(-1);
  };

  const setEnquiryStatus = (e: any, i: any) => {
    const data: any = { id: i, enquiryData: e };

    dispatch(updateEnquiry(data));

    dispatch(resetState());

    setTimeout(() => {
      dispatch(getEnquiry(getEnqId));
    }, 100);

  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4 title">View Enquiry</h3>
        <button
          className="bg-transpatent border-0 fs-6 mb-0 d-flex align-items-center gap-1"
          onClick={goBack}
        >
          <BiArrowBack className="fs-5" /> Go Back
        </button>
      </div>
      <div className="mt-5 bg-white p-4 d-flex gap-3 flex-column rounded-3">
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Name:</h6>
          <p className="mb-0">{enqName}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Mobile:</h6>
          <p className="mb-0">
            <a href={`tel:+91${enqMobile}`}>{enqMobile}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Email:</h6>
          <p className="mb-0">
            <a href={`mailto:{enqEmail}`}>{enqEmail}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Comment:</h6>
          <p className="mb-0">{enqComment}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Status:</h6>
          <p className="mb-0">{enqStatus}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Change Status:</h6>
          <div>
            <select
              name=""
              defaultValue={enqStatus ? enqStatus : 'Submitted'}
              className="form-control form-select"
              id=""
              onChange={(e) => setEnquiryStatus(e.target.value, getEnqId)}
            >
              <option value="Submitted">Submitted</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowEnquiry;
