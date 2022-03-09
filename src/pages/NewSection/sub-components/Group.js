import { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import AddDay from './AddDay';
import Day from './Day';
import NewDay from './NewDay';

const Group = ({
  groupName,
  schedule,
  groups,
  id,
  grName,
  oldGrName,
  setOldGrName,
  ReloadVar,
  setReloadVar,
  groupId,
  sectionGroupId,
  deletVar,
  setDeleteVar,
  handleDelete
}) => {
  const [isNewDayVisible, setIsNewDayVisible] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [louder, setLouder] = useState(false);

  if (isDeleted) {
    return null;
  }

  return (
    <div className='group'>
      <h3 className='group-name'>{groupName}</h3>
      <div
        className='cross-container'
        onClick={() => {
          handleDelete(groupId);
          setDeleteVar(!deletVar);
          setIsDeleted(true);
        }}
      >
        <IoMdClose />
      </div>
      <div className='days-container'>
        {schedule.map((el) => (
          <Day
            scheduleEl={el}
            schedule={schedule}
            setReloadVar={setReloadVar}
            ReloadVar={ReloadVar}
            setIsNewDayVisible={setIsNewDayVisible}
            isNewDayVisible={isNewDayVisible}
            dayId={el.id}
            groupId={groupId}
            id={id}
            sectionGroupId={sectionGroupId}
            key={el.id}
          />
        ))}
        {isNewDayVisible && (
          <NewDay
            schedule={schedule}
            setIsNewDayVisible={setIsNewDayVisible}
            defaultDay={''}
            defaultHours={''}
            groupId={groupId}
            id={id}
            sectionGroupId={sectionGroupId}
            setReloadVar={setReloadVar}
            ReloadVar={ReloadVar}
          />
        )}
        <div
          className='new-day-container'
          onClick={() => {
            setIsNewDayVisible(true);
          }}
        >
          <AddDay />
        </div>
      </div>
    </div>
  );
};

export default Group;
