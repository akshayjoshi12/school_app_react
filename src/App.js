import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './App.css';
import Login from './components/User/Login';
import Dashboard from './components/User/Dashboard';
import TopHeader from './components/User/TopHeader';
import { authActions } from './store/auth';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [email, setEmail] = useState('');

    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.auth.isAuthenticated);

    const history = useHistory();

    useEffect(() => {
      setEmail(email);
    }, [email])

    const loginHandler = (email) => {
      dispatch({type: 'login'});
      setEmail(email);
      history.push("/dashboard");
    };

    const logoutHandler = () => {
      dispatch({type: 'logout'});
      dispatch(authActions.isAdmin({isAdmin: false}));
      setEmail('');
      history.push("/");
    };

  return (
    <div className="App">
      <TopHeader isAuthenticated={isAuth} email={email} onLogout={logoutHandler} />
      <Switch>
            <Route path='/' exact>{!isAuth && <Login onLogin={loginHandler} isAuthenticated={isAuth} />}</Route>
            <Route path='/dashboard' exact>{isAuth && <Dashboard isAuthenticated={isAuth} />}</Route>
      </Switch>
    </div>
  );
}

export default App;
