import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../store/login';
import styles from './Title.module.css';

const Title = () => {
  const { login } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleDispatch = (e) => {
    e.preventDefault();
    if (login.user.data) dispatch(userLogout());
  };

  return (
    <div className={styles.flex}>
      <h1 className="title">Dogs</h1>
      <button
        type="button"
        className={`${styles.button} ${
          login.user.loading || login.token.loading ? styles.loading : ''
        }
        ${login.user.data ? styles.loggedin : ''}`}
        onClick={handleDispatch}
      >
        Logout
      </button>
    </div>
  );
};

export default Title;
