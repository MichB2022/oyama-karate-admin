import React, { useState } from 'react';
import './EventRow.scss';
import { BiEdit } from 'react-icons/bi';
import { CgFileRemove } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import { httpRequest } from '../../../../utils/requests';
import ModalPopup from '../../../../components/ModalPopup/ModalPopup';
import { API_UPLOADS_URL, API_URL } from '../../../../configs/api';

const EventRow = ({ event }) => {
  const { id, title, startDate, endDate, imgUrl } = event;
  const [deleted, setDeleted] = useState(false);

  const handleRemoveClick = async () => {
    await httpRequest('DELETE', `/calendar/${id}`);

    setDeleted(true);
  };

  if (deleted) {
    return null;
  }

  return (
    <div className='article'>
      <div className='title'>{title}</div>
      <div className='img'>
        <a href={`${API_UPLOADS_URL}/calendar/${imgUrl}`} target={'_blank'}>
          LINK
        </a>
      </div>
      <div className='date'>{startDate.slice(0, 10)}</div>
      <div className='date'>{endDate.slice(0, 10)}</div>
      <div className='edit-or-remove'>
        <Link to={`/admin/kalendarz/nowe-wydarzenie/${id}`}>
          <div>
            <p>edytuj</p>
            <BiEdit />
          </div>
        </Link>
        <ModalPopup
          trigger={
            <div className='hover'>
              <p>usuń</p>
              <CgFileRemove />
            </div>
          }
          text='Czy na pewno chcesz usunąć to wydarzenie?'
          onYesClick={handleRemoveClick}
        />
      </div>
    </div>
  );
};

export default EventRow;
