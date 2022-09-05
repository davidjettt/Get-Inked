import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import '../SplashPage/SplashPage.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    setErrors([])
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  const handleDemo = () => {
    setEmail('demo@aa.io')
    setPassword('password')
  }

  return (
    <>
      <form className='login-form' onSubmit={onLogin}>
        {/* <div className='login-header-container'>
          <h1>GET INKED</h1>
        </div> */}
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label className='custom' htmlFor='email'>
            <input
              // required
              name='email'
              type='text'
              // placeholder='Email'
              value={email}
              onChange={updateEmail}
            />
            <span className='placeholder'>Email</span>
          </label>
        </div>
        <div>
          <label className='custom' htmlFor='password'>
            <input
              name='password'
              type='password'
              // placeholder='Password'
              value={password}
              onChange={updatePassword}
            />
            <span className='placeholder'>Password</span>
          </label>
        </div>
        <div>
          <button className='login-button' type='submit'>Login</button>
        </div>
        <div className='demo-user-button-container'>
            <button className='demo-user-button' onClick={handleDemo}>Demo User</button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
