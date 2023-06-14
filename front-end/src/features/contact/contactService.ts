import axios from 'axios';
import { base_url } from '../../utils/base_url';





// get all products 

const postQuery = async (contactData: any) => {
  const response = await axios.post(`${base_url}enquiry/`, contactData);
  return response.data;
};




const contactService = {
  postQuery
};

export default contactService;
