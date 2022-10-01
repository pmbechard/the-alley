import React, { useEffect, useRef, useState } from 'react';
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
  setConfirmMsg: React.Dispatch<React.SetStateAction<string>>;
  setConfirmCallback: React.Dispatch<() => Promise<void>>;
}

const AdminModifyProductsPage: React.FC<Props> = ({
  setAdminPage,
  getProducts,
  getProductByName,
  updateProduct,
  setConfirmMsg,
  setConfirmCallback,
}) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const [getCurrentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [img, setImg] = useState<string>('');
  const tagsRef = useRef<HTMLSelectElement | null>(null);

  const compareProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tagsElements = tagsRef.current?.selectedOptions;
    let tags = [];
    for (let i = 0; i < (tagsRef.current?.selectedOptions.length || 0); i++) {
      tagsElements && tags.push(`${tagsElements[i].value}`);
    }

    let changes: ModifiedProduct = {};

    if (price !== getCurrentProduct?.price) changes['price'] = price;
    if (description !== getCurrentProduct?.description)
      changes['description'] = description;
    if (img !== getCurrentProduct?.img) changes['img'] = img;
    if (tags !== getCurrentProduct?.tags) changes['tags'] = tags;

    setConfirmMsg(`Are you sure you want to makes changes to ${name}?`);
    setConfirmCallback(async function () {
      updateProduct(changes, name || '');
    });
    setAdminPage('confirmation');
  };

  useEffect(() => {
    setName(getCurrentProduct?.name || '');
    setPrice(getCurrentProduct?.price || 0);
    setDescription(getCurrentProduct?.description || '');
    setImg(getCurrentProduct?.img || '');
  }, [getCurrentProduct]);

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
        <>
          <h2>Add changes ONLY to the desired fields.</h2>
          <form
            className='admin-panel-form'
            onSubmit={(e) => compareProduct(e)}
          >
            <input
              type='text'
              name='name'
              id='product-name-input'
              value={name}
              disabled
            />
            <input
              type='number'
              min={0}
              step='.01'
              name='price'
              id='product-price-input'
              placeholder={`${price}`}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
            <textarea
              name='description'
              id='product-description-input'
              cols={44}
              rows={5}
              placeholder={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <fieldset>
              <legend>Image URL</legend>
              <input
                type='text'
                name='image'
                id='products-img-upload'
                placeholder={img}
                onChange={(e) => setImg(e.target.value)}
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
        </>
      ) : (
        <p>Select a product from above</p>
      )}
    </>
  );
};

export default AdminModifyProductsPage;
