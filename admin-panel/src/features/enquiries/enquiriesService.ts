import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { config } from '../../utils/axiosconfig';

const getEnquiries = async () => {
  const response = await axios.get(`${base_url}enquiry/`);
  return response.data;
};

const updateEnquiry = async (enquiry: any) => {
  const response = await axios.put(
    `${base_url}enquiry/${enquiry._id}`,
    {
      status: enquiry.enquiryData,
    }
  );

  return response.data;
};
const getEnquiry = async (id: string) => {
  const response = await axios.get(`${base_url}enquiry/${id}`, config);

  return response.data;
};

const deleteEnquiry = async (id: string) => {
  const response = await axios.delete(`${base_url}enquiry/${id}`, config);

  return response.data;
};

const EnquirieService = {
  getEnquiries,
  getEnquiry,
  updateEnquiry,
  deleteEnquiry,
};
export default EnquirieService;
