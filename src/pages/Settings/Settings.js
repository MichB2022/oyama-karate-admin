import React, { useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import InfoModalPopup from '../../components/InfoModalPopup/InfoModalPopup';
import MasterTemplate from '../../templates/MasterTemplate/MasterTemplate';
import { httpRequest, redirect } from '../../utils/requests';
import './Settings.scss';

const Settings = () => {
  const [passwordEqual, setPasswordEqual] = useState(true);
  const [correctPassword, setCorrectPassword] = useState(true);
  useEffect(async () => {
    try {
      const status = await httpRequest('GET', '/auth/authorize');
    } catch (e) {
      redirect('/');
    }
  }, []);

  const handleSaveBtn = async () => {
    const currentPassword = document.getElementById('currentPassword');
    const password = document.getElementById('password');
    const repPassword = document.getElementById('repPassword');

    if (password?.value !== repPassword?.value) {
      setPasswordEqual(false);
      return;
    } else if (!passwordEqual) {
      setPasswordEqual(true);
    }

    const data = {
      password: password?.value,
      currentPassword: currentPassword?.value
    };

    const res = await httpRequest('POST', '/auth/updatepassword', data);
    if (!res.data.success) {
      setCorrectPassword(false);
    } else {
      setCorrectPassword(true);
    }
  };

  return (
    <MasterTemplate>
      <main>
        <div className='news-container'>
          <h1>Ustawienia konta</h1>

          <p
            style={{
              width: '100%',
              textAlign: 'left',
              marginBottom: '25px',
              marginTop: '50px',
              fontSize: '20px'
            }}
          >
            Zmiana hasła:
          </p>
          <form className='inputs-container'>
            <div className='input-container'>
              <label htmlFor='currentPassword'>Obecne hasło: </label>
              <input
                type='password'
                name='currentPassword'
                id='currentPassword'
                placeholder='Obecne hasło'
              />
            </div>
            <div className='input-container'>
              <label htmlFor='password'>Nowe hasło: </label>
              <input
                type='password'
                name='password'
                id='password'
                placeholder='Nowe hasło'
              />
            </div>
            <div className='input-container'>
              <label htmlFor='repPassword'>Powtórz nowe hasło: </label>
              <input
                type='password'
                name='repPassword'
                id='repPassword'
                placeholder='Powtórz nowe hasło'
              />
            </div>
          </form>

          {!passwordEqual && (
            <p style={{ color: 'red' }}> Hasła nie są zgodne! </p>
          )}
          {!correctPassword && (
            <p style={{ color: 'red' }}> Podano błędne hasło! </p>
          )}

          <div className='buttons'>
            {
              <InfoModalPopup
                trigger={
                  <div className='green-btns'>
                    <Button text={'ZAPISZ'} onclick={handleSaveBtn} />
                  </div>
                }
                text='Zmiany zostały zapisane'
              />
            }
          </div>
        </div>
      </main>
    </MasterTemplate>
  );
};

export default Settings;
