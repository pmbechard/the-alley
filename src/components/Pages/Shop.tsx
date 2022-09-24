import { Firestore } from 'firebase/firestore';
import { Product } from '../ProductInterface';

interface Props {
  db: Firestore;
  products: Product[] | undefined;
}

const Shop: React.FC<Props> = ({ db, products }) => {
  return (
    <div className='shop-container'>
      {products &&
        products.map((product) => {
          return <p key={product.id}>{product.name}</p>;
        })}
    </div>
  );
};

export default Shop;
