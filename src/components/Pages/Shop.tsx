import { Firestore } from 'firebase/firestore';
import { Product } from '../Interfaces/ProductInterface';
import ProductCard from '../ProductCard';

interface Props {
  db: Firestore;
  products: Product[] | undefined;
}

const Shop: React.FC<Props> = ({ db, products }) => {
  return (
    <div className='shop-container'>
      {products ? (
        products.map((product) => {
          return <p key={product.name.replace(' ', '-')}><ProductCard product={product} /></p>;
        })
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  );
};

export default Shop;
