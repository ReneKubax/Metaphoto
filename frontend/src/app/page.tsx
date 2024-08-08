"use client";

import { useEffect, useState } from 'react';
import { getPhotos } from '../utils/api';
import styles from './page.module.css';
import FilterBar from './components/FilterBar';
import Pagination from './components/pagination';
import PhotoList from './components/PhotoList';
import Spinner from './components/Spinner';

export default function Home() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inputs, setInputs] = useState({ title: '', albumTitle: '', userEmail: '' });
  const [filters, setFilters] = useState({ title: '', albumTitle: '', userEmail: '' });
  const [limit, setLimit] = useState(25);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleFilterClick = () => {
    setFilters(inputs);
    setOffset(0);
  };

  const handlePageChange = (direction: string) => {
    if (direction === 'prev' && offset > 0) {
      setOffset(offset - limit);
    } else if (direction === 'next') {
      setOffset(offset + limit);
    }
  };

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
