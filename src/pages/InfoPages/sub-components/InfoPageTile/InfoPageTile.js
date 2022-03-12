import React from 'react';
import { Link } from 'react-router-dom';
import './InfoPageTile.scss';

const InfoPageTile = ({ title, id }) => {
  return (
    <div className='section-tile'>
      <div className='place'>{title}</div>
      <Link to={`/admin/strony-informacyjne/dodaj/${id}`}>
        <div className='more-info'>
          Kliknij, aby zobaczyć informacje o stronie informacyjnej
        </div>
      </Link>
    </div>
  );
};

export default InfoPageTile;
