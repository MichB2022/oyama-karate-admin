import React from 'react';
import { Link } from 'react-router-dom';
import './SectionTile.scss';

const SectionTile = ({ place, id }) => {
  return (
    <div className='section-tile'>
      <div className='place'>{place}</div>
      <Link to={`/admin/sekcje/dodaj/${id}`}>
        <div className='more-info'>
          Kliknij, aby zobaczyć informacje o sekcji
        </div>
      </Link>
    </div>
  );
};

export default SectionTile;
