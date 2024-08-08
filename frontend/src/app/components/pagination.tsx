import React from 'react';
import styles from '../page.module.css';

interface PaginationProps {
  limit: number;
  offset: number;
  handlePageChange: (direction: string) => void;
  handleLimitChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Renders a pagination component with input fields and buttons for navigation.
 *
 * @param {number} limit - The current limit of items per page
 * @param {number} offset - The current offset for pagination
 * @param {(direction: string) => void} handlePageChange - Function to handle page navigation
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} handleLimitChange - Function to handle changing the limit of items per page
 * @return {JSX.Element} The pagination component JSX
 */
const Pagination: React.FC<PaginationProps> = ({ limit, offset, handlePageChange, handleLimitChange }) => {
  return (
    <div className={styles.pagination}>
      <label>
        Page Size:
        <input
          type="number"
          value={limit}
          onChange={handleLimitChange}
        />
      </label>
      <button onClick={() => handlePageChange('prev')} disabled={offset === 0}>Previous</button>
      <button onClick={() => handlePageChange('next')}>Next</button>
    </div>
  );
};

export default Pagination;
