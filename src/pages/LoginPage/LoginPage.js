import React from 'react';
import { httpRequest, redirect } from '../../utils/requests';
import './LoginPage.scss';

const LoginPage = () => {
  const handleLogin = async (e) => {
    e.preventDefault();
    const login = document.getElementById('login');
    const password = document.getElementById('password');
    const data = {
      login: login.value || '',
      password: password.value || ''
    };
    const status = await httpRequest('POST', '/auth/login', data);
    if (status.data.success) {
      document.cookie = `oyamaKarateEuToken=${status.data.token}`;
      redirect('/admin/glowna');
    }
  };
  return (
    <div className='landing-page'>
      <div className='login-container'>
        <h1>Zaloguj się, aby kontynuować</h1>
        <form className='login'>
          <div className='container'>
            <div className='login-input-container'>
              <label htmlFor='login'>Login</label>
              <input
                id='login'
                type='text'
                name='login'
                placeholder='Podaj swój login'
              />
            </div>

            <div className='login-input-container'>
              <label htmlFor='password'>Hasło</label>
              <input
                id='password'
                type='password'
                name='password'
                placeholder='Podaj swoje hasło'
              />
            </div>

            <button onClick={handleLogin}>Zaloguj się</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
