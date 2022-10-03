import { Firestore } from 'firebase/firestore';
import { useEffect } from 'react';
import { Product } from '../../Interfaces/ProductInterface';
import ProductCard from './ProductCard';

interface Props {
  db: Firestore;
  products: Product[] | undefined;
}

const Shop: React.FC<Props> = ({ db, products }) => {
  useEffect(() => {
    window.scroll(0, 0);
  });

  return (
    <div className='shop-container'>
      {products ? (
        products.map((product) => {
          return (
            <ProductCard
              key={product.name.replace(' ', '-')}
              product={product}
            />
          );
        })
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
};

export default Shop;
