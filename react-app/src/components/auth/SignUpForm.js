import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = ({ setShowSignUp }) => {
  const [errors, setErrors] = useState([]);
  const [ name, setName ] = useState('')
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    setErrors([])
    if (password === repeatPassword) {
      const data = await dispatch(signUp(name, username, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['Passwords do not match'])
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/home' />;
  }

  const handleChangeToLogin = () => {
    setShowSignUp(false)
  }

  return (
    <>
      <form className='signup-form' onSubmit={onSignUp}>
        <div className='signup-all-fields-required'>
          All fields are required.
        </div>
        <div className='errors-signup'>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label className='custom'>
            <input
              type='text'
              name='name'
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <span className='placeholder'>Name</span>
          </label>
        </div>
        <div>
          <label className='custom'>
            <input
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
            />
            <span className='placeholder'>Username</span>
          </label>
        </div>
        <div>
          <label className='custom'>
            <input
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
            />
            <span className='placeholder'>Email</span>
          </label>
        </div>
        <div>
          <label className='custom'>
            <input
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
            />
            <span className='placeholder'>Password</span>
          </label>
        </div>
        <div>
          <label className='custom'>
            <input
              type='password'
              name='repeat_password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              // required={true}
            />
            <span className='placeholder'>Repeat Password</span>
          </label>
        </div>
        <button className='login-button' type='submit'>Sign Up</button>
      </form>
      <div className='change-to-login-container'>
        Already have an account?
        <button className='change-to-login' onClick={handleChangeToLogin}> Log In</button>
      </div>
    </>
  );
};

export default SignUpForm;
