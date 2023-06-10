import axios from 'axios';
import { base_url } from '../../utils/base_url';
import { User } from '../../types/User';

const getCustomers = async () => {
  const response = await axios.get(`${base_url}users/all-users`);
  return response.data;
};

const customerService = {
  getCustomers

}
export default customerService;