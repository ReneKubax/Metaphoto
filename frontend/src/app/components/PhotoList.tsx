import React from 'react';
import styles from '../page.module.css';

interface Photo {
  id: number;
  title: string;
  thumbnailUrl: string;
  album: { title: string; user: { name: string; email: string } };
}

interface PhotoListProps {
  photos: Photo[];
}

/**
 * Renders a list of photos with their details.
 *
 * @param {PhotoListProps} props - The props object containing the photos to render.
 * @param {Photo[]} props.photos - An array of photo objects to render.
 * @return {JSX.Element} A JSX element representing the photo list.
 */
const PhotoList: React.FC<PhotoListProps> = ({ photos }) => {
  return (
    <ul className={styles.photoList}>
      {photos.map((photo) => (
        <li key={photo.id} className={styles.photoItem}>
          <img src={photo.thumbnailUrl} alt={photo.title} />
          <div className={styles.photoDetails}>
            <p><strong>Title:</strong> {photo.title}</p>
            <p><strong>Album:</strong> {photo.album.title}</p>
            <p><strong>User:</strong> {photo.album.user.name}</p>
            <p><strong>Email:</strong> {photo.album.user.email}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PhotoList;
