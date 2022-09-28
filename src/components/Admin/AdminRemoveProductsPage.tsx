import React, { useRef, useState } from 'react';
import backIcon from '../../img/back.png';
import { Product } from '../Interfaces/ProductInterface';

interface Props {
  setAdminPage: React.Dispatch<React.SetStateAction<string>>;
  getProducts: Product[] | undefined;
  deleteProduct: (id: string) => Promise<void>;
}

const AdminRemoveProductsPage: React.FC<Props> = ({
  setAdminPage,
  getProducts,
  deleteProduct,
}) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const [getCurrentProduct, setCurrentProduct] = useState<string>('');

  return (
    <>
      <img
        className='back-btn panel-btn'
        src={backIcon}
        alt='back'
        onClick={() => setAdminPage('main')}
      />
      <h1>Remove Products</h1>
      <select
        name='remove-product-select'
        id='remove-product-select'
        ref={selectRef}
        defaultValue='Select a product'
        onChange={() => setCurrentProduct(selectRef.current?.value || '')}
      >
        <option disabled value='Select a product'>
          Select a product
        </option>
        {getProducts?.map((product) => {
          return (
            <option value={product.name} key={product.name}>
              {product.name}
            </option>
          );
        })}
      </select>
      <button
        onClick={() => {
          deleteProduct(getCurrentProduct);
          setAdminPage('main');
        }}
      >
        Delete Product
      </button>
    </>
  );
};

export default AdminRemoveProductsPage;
