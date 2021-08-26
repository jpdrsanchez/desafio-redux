import styles from './Input.module.css';

const Input = ({ name, id, type = 'text', value, setValue }) => {
  return (
    <div>
      <label htmlFor={id} className={styles.label}>
        {name}
      </label>
      <input
        type={type}
        id={id}
        className={styles.input}
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />
    </div>
  );
};

export default Input;
