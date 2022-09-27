import React, { useRef } from 'react';
import backIcon from '../../img/back.png';
import { Product } from '../Interfaces/ProductInterface';

interface Props {
  setAdminPage: React.Dispatch<React.SetStateAction<string>>;
  addProductToFirebase: (product: Product) => void;
  getProducts: Product[] | undefined;
}

const AdminAddProductsPage: React.FC<Props> = ({
  setAdminPage,
  addProductToFirebase,
  getProducts,
}) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const tagsRef = useRef<HTMLSelectElement>(null);

  const processProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tagsElements = tagsRef.current?.selectedOptions;
    let tags = [];
    for (let i = 0; i < (tagsRef.current?.selectedOptions.length || 0); i++) {
      tagsElements && tags.push(`${tagsElements[i].value}`);
    }

    if (
      !nameRef.current?.value ||
      !priceRef.current?.value ||
      !descriptionRef.current?.value ||
      !imageRef.current?.value ||
      tags.length === 0
    ) {
      // FIXME: find a more elegant way to deal with form validation
      alert('Please fill in the entire form to continue.');
    } else {
      const newProduct: Product = {
        name: `${nameRef.current?.value}`,
        price: parseFloat(`${priceRef.current?.value}`),
        description: `${descriptionRef.current?.value}`,
        img: `${imageRef.current?.value}`,
        tags: tags,
      };

      addProductToFirebase(newProduct);
      setAdminPage('main');
    }
  };

  return (
    <>
      <img
        className='back-btn panel-btn'
        src={backIcon}
        alt='back'
        onClick={() => setAdminPage('main')}
      />
      <h1>Add Products</h1>
      <form className='admin-panel-form' onSubmit={(e) => processProduct(e)}>
        <input
          type='text'
          name='name'
          ref={nameRef}
          id='product-name-input'
          placeholder='Product Name'
        />
        <input
          type='number'
          min={0}
          step='.01'
          name='price'
          ref={priceRef}
          id='product-price-input'
          placeholder='Price'
        />
        <textarea
          name='description'
          ref={descriptionRef}
          id='product-description-input'
          cols={44}
          rows={5}
          placeholder='Description'
        ></textarea>

        <fieldset>
          <legend>Image URL</legend>
          <input
            type='text'
            name='image'
            ref={imageRef}
            id='products-img-upload'
          />
          {/* FIXME: Add image upload capability */}
          {/* <legend>Image Upload</legend>
          <input
            type='file'
            name='image'
            ref={imageRef}
            id='product-img-upload'
            accept='image/png, image/gif, image/jpeg'
          /> */}
        </fieldset>
        <fieldset>
          <legend>Tags</legend>
          <select multiple ref={tagsRef}>
            <option value='hot'>Hot</option>
            <option value='budget'>Budget</option>
            <option value='electronics'>Electronics</option>
            <option value='clothes'>Clothes</option>
            <option value='outdoor'>Outdoor</option>
            <option value='books'>Books</option>
            <option value='music'>Music</option>
          </select>
        </fieldset>
        <div className='form-btn-area'>
          <button type='submit'>Save</button>
          <button onClick={() => setAdminPage('main')}>Cancel</button>
        </div>
      </form>
    </>
  );
};

export default AdminAddProductsPage;
