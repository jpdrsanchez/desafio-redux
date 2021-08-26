import { useEffect } from 'react';
import { useState } from 'react';
import ListSkeleton from './ListSkeleton';
import styles from './Photo.module.css';
import PhotoList from './PhotoList';

const Photos = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [canContinue, setCanContinue] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPhotos = async (page) => {
      setLoading(true);
      const response = await fetch(
        `https://dogsapi.origamid.dev/json/api/photo/?_page=${page}&_total=3&_user=0`,
        {
          method: 'GET',
          cache: 'no-store',
        },
      );
      const data = await response.json();
      if (data.length < 3) setCanContinue(false);
      setLoading(false);
      setPhotos((localPhotos) => [...localPhotos, data]);
    };

    if (canContinue) getPhotos(currentPage);
  }, [currentPage, canContinue]);

  return (
    <div className={styles.photosWrapper}>
      {photos?.map((photo, index) => (
        <PhotoList key={index} data={photo} />
      ))}
      {loading && <ListSkeleton />}
      <button
        className={styles.button}
        onClick={(e) => {
          e.preventDefault();
          setCurrentPage(currentPage + 1);
        }}
      >
        +
      </button>
    </div>
  );
};

export default Photos;
