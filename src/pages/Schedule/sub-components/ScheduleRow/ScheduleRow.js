import React, { useState } from 'react';
import { BiEdit } from 'react-icons/bi';
import { CgFileRemove } from 'react-icons/cg';
import { Link } from 'react-router-dom';
import ModalPopup from '../../../../components/ModalPopup/ModalPopup';
import { httpRequest } from '../../../../utils/requests';
import './ScheduleRow.scss';

const ScheduleRow = ({ group, groupId }) => {
  const { place, address, schedule, instructor, helpers, id } = group;
  const [deleted, setDeleted] = useState(false);

  const handleRemoveClick = async () => {
    await httpRequest('DELETE', `/schedule/row/${id}`);
    setDeleted(true);
  };

  if (deleted) {
    return null;
  }

  return (
    <div className='article'>
      <div className='date'>{place}</div>
      <div className='date'>{address}</div>
      <div className='date' dangerouslySetInnerHTML={{ __html: schedule }} />
      <div className='date' dangerouslySetInnerHTML={{ __html: instructor }} />
      <div className='date' dangerouslySetInnerHTML={{ __html: helpers }} />
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
