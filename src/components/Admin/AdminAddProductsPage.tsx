import React from 'react';
import backIcon from '../../img/back.png';

interface Props {
  setAdminPage: React.Dispatch<React.SetStateAction<string>>;
}

const AdminAddProductsPage: React.FC<Props> = ({ setAdminPage }) => {
  return (
    <>
      <img
        className='back-btn panel-btn'
        src={backIcon}
        alt='back'
        onClick={() => setAdminPage('main')}
      />
      <h1>Add Products</h1>
      <form className='admin-panel-form' onSubmit={(e) => e.preventDefault()}>
        <fieldset>
          <legend>Product Info</legend>
          <input
            type='text'
            name='name'
            id='product-name-input'
            placeholder='Product Name'
          />
          <input
            type='number'
            min={0}
            name='price'
            id='product-price-input'
            placeholder='Price'
          />
          <textarea
            name='description'
            id='product-description-input'
            cols={44}
            rows={5}
            placeholder='Description'
          ></textarea>
        </fieldset>

        <fieldset>
          <legend>Image Upload</legend>
          <input
            type='file'
            name='image'
            id='product-img-upload'
            accept='image/png, image/gif, image/jpeg'
          />
        </fieldset>
        <fieldset>
          <legend>Tags</legend>
          <select multiple>
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
          <button>Save</button>
          <button>Cancel</button>
        </div>
      </form>
    </>
  );
};

export default AdminAddProductsPage;
