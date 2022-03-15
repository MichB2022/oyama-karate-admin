import React from 'react';
import Nav from './sub-components/Nav/Nav';
import Aside from './sub-components/Aside/Aside';
import './MasterTemplate.scss';

const MasterTemplate = ({ children }) => {
  return (
    <>
      <>
        <Nav />
        <div className='page-content'>
          <Aside />

          {children}
        </div>
      </>
    </>
  );
};

export default MasterTemplate;
