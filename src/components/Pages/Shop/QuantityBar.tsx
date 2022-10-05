import React from 'react';
import minusIcon from '../../../img/minus.png';
import plusIcon from '../../../img/plus.png';
import { Product } from '../../Interfaces/ProductInterface';

interface Props {
  product: Product;
  quantity: number;
  modifyCartItem: (product: Product, quantity: number) => Promise<void>;
}

const QuantityBar: React.FC<Props> = ({
  product,
  quantity,
  modifyCartItem,
}) => {
  return (
    <div className='product-quantity-bar'>
      <img
        src={minusIcon}
        alt='remove'
        onClick={() => modifyCartItem(product, quantity - 1)}
      />
      <p>In cart: {quantity}</p>
      <img
        src={plusIcon}
        alt='add'
        onClick={() => modifyCartItem(product, quantity + 1)}
      />
    </div>
  );
};

export default QuantityBar;
