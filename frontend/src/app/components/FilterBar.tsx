import React from 'react';
import styles from '../page.module.css';

interface FilterBarProps {
  inputs: { title: string; albumTitle: string; userEmail: string };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFilterClick: () => void;
}

/**
 * A functional component that renders a filter bar with input fields and a filter button.
 *
 * @param {FilterBarProps} inputs - An object containing the input values for the filter bar.
 * @param {function} handleInputChange - A callback function to handle changes to the input fields.
 * @param {function} handleFilterClick - A callback function to handle clicks on the filter button.
 * @return {JSX.Element} The JSX element representing the filter bar.
 */
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
