export type ProductInfo = {
  _id: string
  name: string;
  description: string;
  image: string;
  price: number;
  slug: string;
  category: string;
  brand: string;
  countInStock: number;
  rating: number;
  numReviews: number;
};







// interface Image {
//   public_id: string;
//   url: string;
// }

// interface Color {
//   _id: string;
//   color: string;
// }

// interface Brand {
//   name: string;
// }

// interface Column {
//   title: string;
//   dataIndex: string;
//   defaultSortOrder?: string;
//   sorter?: (a: any, b: any) => number;
// }

// interface Customer {
//   role: string;
//   username: string;
//   email: string;
// }

// interface ProductState {
//   products: [];
//   isError: boolean;
//   isLoading: boolean;
//   isSuccess: boolean;
//   message: string;
//   createdProduct?: Product;
// }

// // Assuming you have a RootState type defined somewhere in your code
// const imgState = useSelector((state: RootState) => state.img.images);

// const handleColors = (e: React.ChangeEvent<HTMLSelectElement>): void => {
//   setColor(e.target.value);
// };

// const colors: Color[] = colorState.map((i) => ({
//   _id: i._id,
//   color: i.title,
// }));

// const img: Image[] = imgState.map((i) => ({
//   public_id: i.public_id,
//   url: i.url,
// }));

// {brandState.map((i: Brand, j: number) => (
//   <option key={j} value={i.name}>
//     {i.name}
//   </option>
// ))}

// const columns: Column[] = [
//   {
//     title: 'SNo',
//     dataIndex: 'key',
//   },
//   {
//     title: 'Username',
//     dataIndex: 'username',
//     defaultSortOrder: 'descend',
//     sorter: (a, b) => a.username.localeCompare(b.username),
//   },
//   {
//     title: 'Email',
//     dataIndex: 'email',
//   },
// ];

// const data1: { key: number; username: string; email: string }[] = customerState
//   .filter((customer: Customer) => customer.role !== 'admin')
//   .map((customer: Customer, index: number) => ({
//     key: index + 1,
//     username: customer.username,
//     email: customer.email,
//   }));

// export const createProduct = createAsyncThunk(
//   'product/create-products',
//   async (productData: FormData, thunkAPI) => {
//     try {
//       return await ProductService.createProduct(productData);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );