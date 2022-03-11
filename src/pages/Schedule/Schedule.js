import React, { useEffect, useState } from 'react';
import './Schedule.scss';
import { httpRequest, redirect } from '../../utils/requests';
import Loader from '../../components/Loader/Loader';
import ScheduleTile from './sub-components/ScheduleTile/ScheduleTile';
import PlusIcon from '../../components/Icons/PlusIcon';

const Schedule = () => {
  const [louder, setlouder] = useState(true);
  const [scheduleData, setscheduleData] = useState({});

  useEffect(async () => {
    const scheduleResponse = await httpRequest('GET', '/schedule/names');
    setscheduleData({ schedule: scheduleResponse.data.data });
    setlouder(false);
  }, []);

  const handleAddBtn = async () => {
    const groupName = document.getElementById('new-group');
    const group = await httpRequest('POST', '/schedule/add', {
      name: groupName?.value
    });
    redirect(`/admin/harmonogram/dodaj/${group.data.data.id}`);
  };

  return (
    <>
      {louder && <Loader />}
      {!louder && (
        <main>
          <div className='container'>
            <h1>Harmonogram</h1>
            <div className='section-tiles'>
              {scheduleData.schedule.map((el) => (
                <ScheduleTile key={el.id} title={el.name} id={el.id} />
              ))}

              <div className='add-group-tile'>
                <h2>DODAJ NOWĄ GRUPĘ O NAZWIE:</h2>
                <input id='new-group' />
                <div onClick={handleAddBtn}>
                  <PlusIcon className='plus' />
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Schedule;
