import React, { useRef, useState } from 'react';
import backIcon from '../../img/back.png';
import { Product, ModifiedProduct } from '../Interfaces/ProductInterface';

interface Props {
  setAdminPage: React.Dispatch<React.SetStateAction<string>>;
  getProducts: Product[] | undefined;
  getProductByName: (name: string) => Promise<Product | null>;
  updateProduct: (
    modifiedProduct: ModifiedProduct,
    name: string
  ) => Promise<void>;
}

const AdminModifyProductsPage: React.FC<Props> = ({
  setAdminPage,
  getProducts,
  getProductByName,
  updateProduct,
}) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  let [getCurrentProduct, setCurrentProduct] = useState<Product | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const tagsRef = useRef<HTMLSelectElement>(null);

  const compareProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tagsElements = tagsRef.current?.selectedOptions;
    let tags = [];
    for (let i = 0; i < (tagsRef.current?.selectedOptions.length || 0); i++) {
      tagsElements && tags.push(`${tagsElements[i].value}`);
    }

    let changes: ModifiedProduct = {};

    if (priceRef.current?.value !== getCurrentProduct?.price)
      changes['price'] = getCurrentProduct?.price;
    if (descriptionRef.current?.value !== getCurrentProduct?.description)
      changes['description'] = getCurrentProduct?.description;
    if (imageRef.current?.value !== getCurrentProduct?.img)
      changes['img'] = getCurrentProduct?.img;
    if (tags !== getCurrentProduct?.tags) changes['tags'] = tags;

    updateProduct(changes, getCurrentProduct?.name || '');
    setAdminPage('main');
  };

  return (
    <>
      <img
        className='back-btn panel-btn'
        src={backIcon}
        alt='back'
        onClick={() => setAdminPage('main')}
      />
      <h1>Modify Products</h1>
      <select
        name='modify-product-select'
        id='modify-product-select'
        ref={selectRef}
        defaultValue='Select a product'
        onChange={async () =>
          setCurrentProduct(
            await getProductByName(selectRef.current?.value || '')
          )
        }
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
      {getCurrentProduct ? (
        <form className='admin-panel-form' onSubmit={(e) => compareProduct(e)}>
          <input
            type='text'
            name='name'
            ref={nameRef}
            id='product-name-input'
            value={getCurrentProduct.name}
            disabled
          />
          <input
            type='number'
            min={0}
            step='.01'
            name='price'
            ref={priceRef}
            id='product-price-input'
            defaultValue={getCurrentProduct.price}
          />
          <textarea
            name='description'
            ref={descriptionRef}
            id='product-description-input'
            cols={44}
            rows={5}
            defaultValue={getCurrentProduct.description}
          ></textarea>

          <fieldset>
            <legend>Image URL</legend>
            <input
              type='text'
              name='image'
              ref={imageRef}
              id='products-img-upload'
              defaultValue={getCurrentProduct.img}
            />
          </fieldset>
          <fieldset>
            <legend>Tags</legend>
            <select multiple ref={tagsRef}>
              <option
                value='hot'
                selected={getCurrentProduct.tags.includes('hot')}
              >
                Hot
              </option>
              <option
                value='budget'
                selected={getCurrentProduct.tags.includes('budget')}
              >
                Budget
              </option>
              <option
                value='electronics'
                selected={getCurrentProduct.tags.includes('electronics')}
              >
                Electronics
              </option>
              <option
                value='clothes'
                selected={getCurrentProduct.tags.includes('clothes')}
              >
                Clothes
              </option>
              <option
                value='outdoor'
                selected={getCurrentProduct.tags.includes('outdoor')}
              >
                Outdoor
              </option>
              <option
                value='books'
                selected={getCurrentProduct.tags.includes('books')}
              >
                Books
              </option>
              <option
                value='music'
                selected={getCurrentProduct.tags.includes('music')}
              >
                Music
              </option>
            </select>
          </fieldset>
          <div className='form-btn-area'>
            <button type='submit'>Save Changes</button>
            <button onClick={() => setAdminPage('main')}>Cancel</button>
          </div>
        </form>
      ) : (
        <p>Select a product from above</p>
      )}
    </>
  );
};

export default AdminModifyProductsPage;
