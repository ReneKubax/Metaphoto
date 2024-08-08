import React from 'react';
import styles from '../page.module.css';

interface FilterBarProps {
  inputs: { title: string; albumTitle: string; userEmail: string };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFilterClick: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ inputs, handleInputChange, handleFilterClick }) => {
  return (
    <div className={styles.filters}>
      <input
        name="title"
        placeholder="Photo Title"
        value={inputs.title}
        onChange={handleInputChange}
      />
      <input
        name="albumTitle"
        placeholder="Album Title"
        value={inputs.albumTitle}
        onChange={handleInputChange}
      />
      <input
        name="userEmail"
        placeholder="User Email"
        value={inputs.userEmail}
        onChange={handleInputChange}
      />
      <button onClick={handleFilterClick}>Filter</button>
    </div>
  );
};

export default FilterBar;
