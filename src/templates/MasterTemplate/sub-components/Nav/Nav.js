import React from 'react';
import './Nav.scss';
import { FiSettings, FiLogOut } from 'react-icons/fi';
import { httpRequest, redirect } from '../../../../utils/requests';

const Nav = () => {
  const handleLogoutClick = async () => {
    await httpRequest('GET', '/auth/logout');
    redirect('/');
  };

  return (
    <>
      <nav className='nav'>
        <div className='creator'>Stworzone przez Gancle Studio</div>
        <div className='nav-btns'>
          <div className='user'>Zalogowano jako: Michał Bodziony</div>
          <div className='settings'>
            ustawienia
            <FiSettings className='margin' />
          </div>
          <div className='log-out' onClick={handleLogoutClick}>
            wyloguj się
            <FiLogOut className='margin' />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
