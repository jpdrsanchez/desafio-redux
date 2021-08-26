import styles from './ListSkeleton.module.css';

const ListSkeleton = () => {
  return (
    <div className={styles.list}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default ListSkeleton;
