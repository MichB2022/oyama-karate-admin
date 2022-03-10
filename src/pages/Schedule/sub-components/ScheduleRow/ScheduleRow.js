import React, { useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { CgFileRemove } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import ModalPopup from '../../ModalPopup/ModalPopup';
import './ScheduleRow.scss';
import axios from 'axios';

const API_URL = 'http://api.gancle-studio.pl/api/v1';

const ScheduleRow = ({ group, groupId }) => {
  const { place, address, schedule, instructor, helpers, id } = group;
  const [deleted, setDeleted] = useState(false);

  const handleRemoveClick = async () => {
    await axios.delete(`${API_URL}/schedule/row/${id}`);
    setDeleted(true);
  };

  if (deleted) {
    return null;
  }

  return (
    <div className='article'>
      <div className='date'>{place}</div>
      <div className='date'>{address}</div>
      <div className='date'>{schedule}</div>
      <div className='date'>{instructor}</div>
      <div className='date'>{helpers}</div>
      <div className='edit-or-remove'>
        <Link to={`/admin/harmonogram/dodaj/wiersz/${groupId}/${id}`}>
          <div>
            <p>edytuj</p>
            <BiEdit />
          </div>
        </Link>
        {id !== undefined && (
          <ModalPopup
            trigger={
              <div>
                <p>usuń</p>
                <CgFileRemove />
              </div>
            }
            text='Czy na pewno chcesz usunąć ten wiersz?'
            onYesClick={handleRemoveClick}
          />
        )}
      </div>
    </div>
  );
};

export default ScheduleRow;
