import React from 'react';
import { Link } from 'react-router-dom';
import './GaleryTile.scss';

const GaleryTile = ({ name, id }) => {
  return (
    <div className='section-tile'>
      <div className='place'>{name}</div>
      <Link to={`/admin/galerie/dodaj/${id}`}>
        <div className='more-info'>
          Kliknij, aby zobaczyć informacje o osobie
        </div>
      </Link>
    </div>
  );
};

export default GaleryTile;
