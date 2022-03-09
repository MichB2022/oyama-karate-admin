import { useRef } from 'react';
import { httpRequest } from '../../../utils/requests';

const NewDay = ({
  setIsNewDayVisible,
  defaultDay,
  defaultHours,
  setIsNewDayShown,
  groupId,
  id,
  ReloadVar,
  setReloadVar,
  ifEdit,
  setIfEdit,
  dayId
}) => {
  const dayRef = useRef();
  const hoursRef = useRef();

  const showNewDay = () => {
    setIsNewDayVisible(false);
  };

  const showDay = () => {
    setIsNewDayShown(false);
  };

  return (
    <div className='day'>
      <div className='add-day-info day-info'>
        <div className='week-day-container'>
          <label className='new-week-day' htmlFor='week-day'>
            Dzień:{' '}
          </label>
          <input
            type='text'
            name='week-day'
            ref={dayRef}
            defaultValue={defaultDay}
          />
        </div>
        <div className='hours-container'>
          <label className='new-hours' htmlFor='hours'>
            Godziny:{' '}
          </label>
          <input
            type='text'
            name='hours'
            ref={hoursRef}
            defaultValue={defaultHours}
          />
        </div>
      </div>
      <button
        className='save-btn'
        onClick={async () => {
          if (ifEdit) {
            await httpRequest('POST', `/sectionsgroup/schedule/${dayId}`, {
              day: dayRef.current.value,
              hours: hoursRef.current.value
            });
            setIfEdit(false);
          } else {
            await httpRequest('POST', `/sectionsgroup/schedule/add`, {
              sectionId: id,
              sectionsGroupId: groupId,
              day: dayRef.current.value,
              hours: hoursRef.current.value
            });
          }

          setReloadVar(!ReloadVar);
          if (setIsNewDayShown !== undefined) {
            showDay();
          } else {
            showNewDay();
          }
        }}
      >
        Zapisz
      </button>
    </div>
  );
};

export default NewDay;
