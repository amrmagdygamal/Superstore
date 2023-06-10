import axios from 'axios';
import { base_url } from '../../utils/base_url';

const getEnquiries = async () => {
  const response = await axios.get(`${base_url}enquiry/`);
  return response.data;
};

const EnquirieService = {
  getEnquiries,
};
export default EnquirieService;
