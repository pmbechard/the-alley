import React from 'react';

interface Props {
  getSortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
}

const SortByBar: React.FC<Props> = ({ getSortBy, setSortBy }) => {
  return (
    <div className='sort-by-bar-container'>
      <select
        name='sort-by-bar'
        id='sort-by-bar'
        onChange={(e) => {
          setSortBy(e.currentTarget.value);
        }}
        defaultValue={getSortBy}
      >
        <option value='a-z'>A-Z</option>
        <option value='z-a'>Z-A</option>
        <option value='price-l-h'>Price (low-high)</option>
        <option value='price-h-l'>Price (high-low)</option>
      </select>
    </div>
  );
};

export default SortByBar;
