import styles from './Photo.module.css';

const PhotoItem = ({ data }) => {
  return (
    <li className={styles.photoItem}>
      <img src={data.src} alt={data.title} />
      <div>
        <p>{data.title}</p>
        <p>{data.acessos}</p>
      </div>
    </li>
  );
};

export default PhotoItem;
