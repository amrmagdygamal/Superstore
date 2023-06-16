import { useEffect, useState } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import { Badge } from 'react-bootstrap';
import ProductItem from '../components/ProductItem';
import { Color } from '../components/Color';
import Rating from '../components/Rating';
import Container from '../components/Container';
import LoadingBox from '../components/LoadingBox';
import { getError } from '../utils';
import { ApiError } from '../types/ApiErrors';
import MessageBox from '../components/MessageBox';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppDispatch } from '../app/store';
import { getproducts } from '../features/product/productSlice';
import { ProductInfo } from '../types/ProductInfo';

const OurStore = () => {
  const dispatch: AppDispatch = useDispatch();

  const [grid, setGrid] = useState(4);

  const brandState = useSelector((state: any) => state.brand.brands);
  const colorState = useSelector((state: any) => state.color.colors);

  const prodCategoryState = useSelector(
    (state: any) => state.productCategory.categories
  );
  const productState = useSelector((state: any) => state.product.products);
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);

  // Filter States

  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [tag, setTag] = useState('');
  const [color, setColor] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [sort, setSort] = useState("");

  const getAllProducts = () => {
    dispatch(getproducts({category, brand, tag, color, minPrice, maxPrice, sort}));
  };

  useEffect(() => {
    const prodBrands: Array<string> = [];
    const prodCategories: Array<string> = [];
    const prodTags: Array<string> = [];
    const prodColors: Array<string> = [];

    for (let index = 0; index < productState?.length; index++) {
      const elem = productState[index];
      prodBrands.push(elem?.brand);
      prodCategories.push(elem?.category);
      prodTags.push(elem?.tags);
      prodColors.push(elem?.color);
    }

    setBrands(prodBrands);
    setCategories(prodCategories);
    setTags(prodTags);
    setColors(prodColors);
  }, [productState]);

  useEffect(() => {
    getAllProducts();
  }, [category, brand, tag, color, minPrice, maxPrice, sort]);

  return (
    <>
      <Meta title="Our Store" />
      <BreadCrumb title="Our Store" />
      <Container class1="store-wrapper home-wrapper-2 py-5">
        <div className="col-3">
          <div className="filter-card box-shadow mb-3">
            <h3 className="filter-title">Shop By Categories</h3>
            <div>
              <ul className="ps-0">
                {categories &&
                  [...new Set(categories)].map(
                    (item: string, index: number) => {
                      return (
                        <li key={index} onClick={() => setCategory(item)}>
                          {item}
                        </li>
                      );
                    }
                  )}
              </ul>
            </div>
          </div>
          <div className="filter-card box-shadow mb-3">
            <h3 className="filter-title">Filter By</h3>
            <div>
              <h5 className="sub-title">Price</h5>
              <div className="d-flex align-items-center gap-2">
                <div className="form-floating d-flex align-items-center justify-content-center">
                  $
                  <input
                    type="number"
                    style={{ height: '2.7rem', width: '7rem' }}
                    id="floatingInput"
                    placeholder="From"
                    className="ms-2 form-control"
                    onChange={(e) => setMinPrice(parseInt(e.target.value))}
                  />
                  <label
                    style={{
                      height: '1.8rem',
                      fontSize: '.8rem',
                      marginLeft: '1rem',
                    }}
                    htmlFor="floatingInput"
                  >
                    From
                  </label>
                </div>
                <div className="form-floating">
                  <input
                    type="number"
                    style={{ height: '2.7rem', width: '7rem' }}
                    className="form-control"
                    id="floatingInput"
                    placeholder="To"
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                  />
                  <label
                    style={{ height: '1.8rem', fontSize: '.8rem' }}
                    htmlFor="floatingInput"
                  >
                    To
                  </label>
                </div>
              </div>
              <h5 className="sub-title">Colors</h5>
              <div>
                <div>
                  {colors &&
                    [...new Set(colors)].map((item: string, index: number) => {
                      return (
                        <li
                          style={{ backgroundColor: productState.title }}
                          className="bg-light rounded-cirlce px-3 py-2"
                          key={index}
                          onClick={() => setColor(item)}
                        >
                          {item}
                        </li>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Product Tages</h3>
              <div>
                <div className="product-tags d-flex flex-wrap align-items-center gap-2">
                  {tags &&
                    [...new Set(tags)].map((item: string, index: number) => {
                      return (
                        <Badge
                          className="bg-light rounded-3 px-3 py-2"
                          key={index}
                          onClick={() => setTag(item)}
                        >
                          {item}
                        </Badge>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="filter-card mb-3">
              <h3 className="filter-title">Product Brands</h3>
              <div>
                <div className="product-tags d-flex flex-wrap align-items-center gap-2">
                  {brands &&
                    [...new Set(brands)].map((item: string, index: number) => {
                      return (
                        <Badge
                          className="bg-light rounded-3 px-3 py-2"
                          key={index}
                          onClick={() => setBrand(item)}
                        >
                          {item}
                        </Badge>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
          <div className="filter-card box-shadow mb-3">
            <h3 className="filter-title">Random Product</h3>
            <div>
              <div className="random-products mb-3 d-flex">
                <div className="w-50">
                  <img
                    src="images/watch.jpg"
                    className="img-fluid"
                    alt="watch"
                  />
                </div>
                <div className="w-50">
                  <h5>
                    Kids headphones bulk 10 pack multi colored for students
                  </h5>
                  <Rating rating={5} numReviews={30} />
                  <b>$ 300</b>
                </div>
              </div>
              <div className="random-products d-flex">
                <div className="w-50">
                  <img
                    src="images/watch.jpg"
                    className="img-fluid"
                    alt="watch"
                  />
                </div>
                <div className="w-50">
                  <h5>
                    Kids headphones bulk 10 pack multi colored for students
                  </h5>
                  <Rating rating={5} numReviews={30} />
                  <b>$ 300</b>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-9">
          <div className="filter-sort-grid box-shadow mb-4">
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-1">
                <p className="mb-0">Sort</p>
                <p className="mb-0 me-1">By:</p>
                <select
                  id=""
                  name="sort"
                  defaultValue={'manule'}
                  className="form-control form-select"
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="best-selling">Alphabetically, A-Z</option>
                  <option value="title-ascending">Alphabetically, Z-A</option>
                  <option value="price">Price, low to high</option>
                  <option value="-price">Price, high to low</option>
                  <option value="CreatedAt">Date, old to new</option>
                  <option value="-CreatedAt">Date, new to old</option>
                </select>
              </div>
              <div className="d-flex align-items-center gap-3">
                <p className="mb-0 totalproducts">
                  {productState?.length} Products
                </p>
                <div className="d-flex grid gap-1 align-items-center">
                  <img
                    onClick={() => {
                      setGrid(3);
                    }}
                    src="images/gr4.svg"
                    alt="grid"
                    className="d-block img-fluid"
                  />
                  <img
                    onClick={() => {
                      setGrid(4);
                    }}
                    src="images/gr3.svg"
                    alt="grid"
                    className="d-block img-fluid"
                  />
                  <img
                    onClick={() => {
                      setGrid(6);
                    }}
                    src="images/gr2.svg"
                    alt="grid"
                    className="d-block img-fluid"
                  />
                  <img
                    onClick={() => {
                      setGrid(12);
                    }}
                    src="images/gr.svg"
                    alt="grid"
                    className="d-block img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="products-list pb-5">
            <div className="d-flex flex-wrap gap-2">
              {productState &&
                productState?.map((product: ProductInfo, index: number) => {
                  if (product.tags === 'popular') {
                    return <ProductItem product={product} key={index} />;
                  }
                })}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default OurStore;
