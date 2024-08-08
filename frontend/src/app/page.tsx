"use client";

import { useEffect, useState } from 'react';
import { getPhotos } from '../utils/api';
import styles from './page.module.css';
import FilterBar from './components/FilterBar';
import Pagination from './components/pagination';
import PhotoList from './components/PhotoList';
import Spinner from './components/Spinner';

/**
 * Renders the Home component which displays a list of photos.
 *
 * @return {JSX.Element} The rendered Home component.
 */
export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inputs, setInputs] = useState({ title: '', albumTitle: '', userEmail: '' });
  const [filters, setFilters] = useState({ title: '', albumTitle: '', userEmail: '' });
  const [limit, setLimit] = useState(25);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    /**
 * Fetches photos from the API based on the provided filters, limit, and offset.
 *
 * @return {Promise<void>} A promise that resolves when the photos have been fetched and set.
 */
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const data = await getPhotos({ ...filters, limit, offset });
        setPhotos(data);
      } catch (err) {
        setError('Error fetching photos');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [filters, limit, offset]);

    /**
   * Updates the state of the inputs object with the new value of the input element.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event object representing the change in the input element.
   * @return {void} This function does not return anything.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
/**
 * Updates the filters state with the current input values and resets the offset to 0.
 *
 * @return {void} This function does not return anything.
 */
  const handleFilterClick = () => {
    setFilters(inputs);
    setOffset(0);
  };
/**
 * Updates the offset state based on the direction of the page change.
 *
 * @param {string} direction - The direction of the page change ('prev' or 'next').
 * @return {void} This function does not return anything.
 */
  const handlePageChange = (direction: string) => {
    if (direction === 'prev' && offset > 0) {
      setOffset(offset - limit);
    } else if (direction === 'next') {
      setOffset(offset + limit);
    }
  };
  /**
   * Updates the limit state with the new value from the input element.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event object representing the change in the input element.
   * @return {void} This function does not return anything.
   */
  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLimit(Number(e.target.value));
  };

  if (loading) return <Spinner />;
  
  if (error) return <p>{error}</p>;

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.heading}>MetaPhoto</h1>
        <FilterBar
          inputs={inputs}
          handleInputChange={handleInputChange}
          handleFilterClick={handleFilterClick}
        />
        <Pagination
          limit={limit}
          offset={offset}
          handlePageChange={handlePageChange}
          handleLimitChange={handleLimitChange}
        />
        <PhotoList photos={photos} />
      </div>
    </main>
  );
}
