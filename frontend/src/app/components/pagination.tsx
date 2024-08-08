import React from 'react';
import styles from '../page.module.css';

interface PaginationProps {
  limit: number;
  offset: number;
  handlePageChange: (direction: string) => void;
  handleLimitChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

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
