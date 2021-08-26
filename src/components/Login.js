import { useState } from 'react';
import Input from './Input';
import Button from './Button';
import styles from './Login.module.css';
import { useDispatch } from 'react-redux';
import { userLogin } from '../store/login';

const Login = () => {
  const [username, setUsername] = useState('dog');
  const [password, setPassword] = useState('dog');

  const dispatch = useDispatch();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        dispatch(userLogin({ username, password }));
      }}
      className={styles.form}
      autoComplete="off"
    >
      <Input
        id="nome"
        name="Usuário"
        type="text"
        value={username}
        setValue={setUsername}
      />
      <Input
        id="password"
        name="Senha"
        type="password"
        value={password}
        setValue={setPassword}
      />
      <Button text="Entrar" type="submit" />
    </form>
  );
};

export default Login;
