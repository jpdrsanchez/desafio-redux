import PhotoItem from './PhotoItem';
import styles from './Photo.module.css';

const PhotoList = ({ data }) => {
  return (
    <ul className={styles.list}>
      {data.map((photo) => (
        <PhotoItem key={photo.id} data={photo} />
      ))}
    </ul>
  );
};

export default PhotoList;
