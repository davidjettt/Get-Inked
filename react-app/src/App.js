import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import { loadStudiosThunk } from './store/studios';
import Studios from './components/Studios/Studios';
import StudioDetails from './components/Studios/StudioDetails';
import UpdateStudioForm from './components/Studios/UpdateStudioForm';
import HomePage from './components/HomePage/HomePage';
import SplashPage from './components/SplashPage/SplashPage';
import StudioFormPage from './components/Studios/StudioFormPage';
import { loadTattoosThunk } from './store/tattoos';
import Tattoos from './components/Tattoos/Tattoos';
import { loadAllReviewsThunk } from './store/reviews';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './components/NotFound/NotFound';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user)

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      await dispatch(loadStudiosThunk())
      await dispatch(loadTattoosThunk())
      await dispatch(loadAllReviewsThunk())
      setLoaded(true);
    })();
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(loadStudiosThunk())
  // }, [dispatch])

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <ScrollToTop>
        {sessionUser && <NavBar />}
        <Switch>
          <Route path='/' exact={true}>
            <SplashPage />
          </Route>
          {/* <ProtectedRoute path='/users' exact={true} >
            <UsersList/>
          </ProtectedRoute>
          <ProtectedRoute path='/users/:userId' exact={true} >
            <User />
          </ProtectedRoute> */}
          <ProtectedRoute exact path='/studios'>
            <Studios />
          </ProtectedRoute>
          <ProtectedRoute exact path='/studios/new'>
            <StudioFormPage />
          </ProtectedRoute>
          <ProtectedRoute exact path='/studios/:studioId'>
            <StudioDetails />
          </ProtectedRoute>
          <ProtectedRoute exact path='/studios/:studioId/edit'>
            <UpdateStudioForm />
          </ProtectedRoute>
          <ProtectedRoute exact path='/tattoos'>
            <Tattoos />
          </ProtectedRoute>
          <ProtectedRoute path='/home' exact={true} >
            <HomePage />
          </ProtectedRoute>
          <ProtectedRoute path='/not-found'>
            <NotFound />
          </ProtectedRoute>
          <ProtectedRoute>
            <NotFound />
          </ProtectedRoute>
        </Switch>
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
