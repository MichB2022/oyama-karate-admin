import React from 'react';
import { Link } from 'react-router-dom';
import NavLogo from '../NavLogo/NavLogo';
import oyamaLogo from '../../../../assets/logo.png';
import CalendarIcon from '../../../../components/Icons/CalendarIcon';
import DashboardIcon from '../../../../components/Icons/DashboardIcon';
import GaleriesIcon from '../../../../components/Icons/GaleriesIcon';
import InfoPagesIcon from '../../../../components/Icons/InfoPagesIcon';
import InstructorsIcon from '../../../../components/Icons/InstructorsIcon';
import NewsIcon from '../../../../components/Icons/NewsIcon';
import PreschoolersIcon from '../../../../components/Icons/PreschoolersIcon';
import ScheduleIcon from '../../../../components/Icons/ScheduleIcon';
import SectionsIcon from '../../../../components/Icons/SectionsIcon';
import './Aside.scss';

const Aside = () => {
  const logo = {
    src: oyamaLogo,
    title: '',
    titleHTML: (
      <>
        <span className='special-text'>oyama-</span>karate
        <span className='special-text'>.</span>eu
      </>
    )
  };
  return (
    <aside>
      <div className='container'>
        <div className='logo'>
          <NavLogo logo={logo} />
        </div>
        <div className='admin-panel'>
          <h2>PANEL ADMINISTRACYJNY</h2>
          <div className='belt'></div>

          <Link to='/admin'>
            <div className='dashboard aside-btn'>
              <DashboardIcon className='aside-btn-icon' />
              Strona główna
            </div>
          </Link>

          <Link to='/admin/aktualnosci'>
            <div className='news aside-btn'>
              <NewsIcon className='aside-btn-icon' />
              Aktualności
            </div>
          </Link>

          <Link to='/admin/sekcje'>
            <div className='sections aside-btn'>
              <SectionsIcon className='aside-btn-icon' />
              Nasze sekcje
            </div>
          </Link>

          <Link to='/admin/przedszkolaki'>
            <div className='preschoolers aside-btn'>
              <PreschoolersIcon className='aside-btn-icon' />
              Przedszkolaki
            </div>
          </Link>

          <Link to='/admin/kalendarz'>
            <div className='calendar aside-btn'>
              <CalendarIcon className='aside-btn-icon' />
              Kalendarz
            </div>
          </Link>

          <Link to='/admin/strony-informacyjne'>
            <div className='info-pages aside-btn'>
              <InfoPagesIcon className='aside-btn-icon' />
              Strony Informacyjne
            </div>
          </Link>

          <Link to='/admin/harmonogram'>
            <div className='schedule aside-btn'>
              <ScheduleIcon className='aside-btn-icon' />
              Harmonogram zajęć
            </div>
          </Link>

          <Link to='/admin/instruktorzy-i-pomocnicy'>
            <div className='instructors aside-btn'>
              <InstructorsIcon className='aside-btn-icon' />
              Instruktorzy i pomocnicy
            </div>
          </Link>

          <div className='galeries aside-btn'>
            <GaleriesIcon className='aside-btn-icon' />
            Galerie
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
