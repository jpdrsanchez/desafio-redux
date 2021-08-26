import styles from './Button.module.css';

const Button = ({ text, type = 'submit' }) => {
  return (
    <button type={type} className={styles.button}>
      {text}
    </button>
  );
};

export default Button;
