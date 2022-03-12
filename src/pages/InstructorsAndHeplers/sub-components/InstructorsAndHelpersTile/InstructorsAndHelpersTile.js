import React from 'react';
import { Link } from 'react-router-dom';
import './InstructorsAndHelpersTile.scss';

const InstructorsAndHelpersTile = ({ name, id }) => {
  return (
    <div className='section-tile'>
      <div className='place'>{name}</div>
      <Link to={`/admin/instruktorzy-i-pomocnicy/dodaj/${id}`}>
        <div className='more-info'>
          Kliknij, aby zobaczyć informacje o osobie
        </div>
      </Link>
    </div>
  );
};

export default InstructorsAndHelpersTile;
