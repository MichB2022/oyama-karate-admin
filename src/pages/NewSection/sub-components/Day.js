import { useState } from 'react';
import EditIcon from '../../../components/Icons/EditIcon';
import RemoveIcon from '../../../components/Icons/RemoveIcon';
import { httpRequest } from '../../../utils/requests';
import NewDay from './NewDay';

const Day = ({
  scheduleEl,
  schedule,
  ReloadVar,
  setReloadVar,
  setIsNewDayVisible,
  groupId,
  id,
  dayId
}) => {
  const [oldDay, setOldDay] = useState('');
  const [oldHours, setOldHours] = useState('');
  const [isNewDayShown, setIsNewDayShown] = useState(false);
  const [ifEdit, setIfEdit] = useState(false);

  return (
    <>
      {isNewDayShown && (
        <NewDay
          schedule={schedule}
          setIsNewDayVisible={setIsNewDayVisible}
          defaultDay={oldDay}
          defaultHours={oldHours}
          setIsNewDayVisible={setIsNewDayVisible}
          setIsNewDayShown={setIsNewDayShown}
          groupId={groupId}
          id={id}
          ReloadVar={ReloadVar}
          setReloadVar={setReloadVar}
          ifEdit={ifEdit}
          setIfEdit={setIfEdit}
          dayId={dayId}
        />
      )}
      {!isNewDayShown && (
        <div className='day'>
          <div className='day-info'>
            <div className='week-day'>{`Dzień: ${scheduleEl.day}`}</div>
            <div className='hours'>{`Godziny: ${scheduleEl.hours}`}</div>
          </div>
          <div className='buttons-container'>
            <div
              className='edit'
              onClick={async () => {
                setIfEdit(true);
                setIsNewDayShown(true);
                setOldDay(scheduleEl.day);
                setOldHours(scheduleEl.hours);
              }}
            >
              <p>Edytuj</p>
              <EditIcon className='day-icon' />
            </div>
            <div
              className='remove'
              onClick={async () => {
                await httpRequest('DELETE', `/sectionsgroup/schedule/${dayId}`);
                setReloadVar(!ReloadVar);
                console.log(`usunięto ${dayId} dzień`);
              }}
            >
              <p>Usuń</p>
              <RemoveIcon className='day-icon' />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Day;
