import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import UploadPicture from './components/UploadPicture';
import { loadStudiosThunk } from './store/studios';
import Studios from './components/Studios/Studios';
import StudioDetails from './components/Studios/StudioDetails';
import StudioForm from './components/Studios/StudioForm';
import UpdateStudioForm from './components/Studios/UpdateStudioForm';
import HomePage from './components/HomePage/HomePage';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadStudiosThunk())
  }, [dispatch])

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute exact path='/studios'>
          <Studios />
        </ProtectedRoute>
        <ProtectedRoute exact path='/studios/new'>
          <StudioForm />
        </ProtectedRoute>
        <ProtectedRoute exact path='/studios/:studioId'>
          <StudioDetails />
        </ProtectedRoute>
        <ProtectedRoute path='/studios/:studioId/edit'>
          <UpdateStudioForm />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <HomePage />
          {/* <h1>My Home Page</h1> */}
          {/* <UploadPicture /> */}
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
