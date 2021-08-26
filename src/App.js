import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Loading from './components/Loading';
import Login from './components/Login';
import Photos from './components/Photos/Photos';
import Title from './components/Title';
import { autoLogin } from './store/login';

function App() {
  const { login } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(autoLogin());
  }, [dispatch]);

  return (
    <div className="App">
      <main className="AppBody">
        <Title />
        {(login.user.loading || login.token.loading) && <Loading />}
        {!login.user.data && !login.user.loading && !login.token.loading && (
          <Login />
        )}
        {login.user.data && <Photos />}
      </main>
    </div>
  );
}

export default App;
