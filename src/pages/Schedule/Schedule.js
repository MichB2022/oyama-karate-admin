import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../Input/Input';
import PlusIcon from '../Sections/icons/PlusIcon';
import SectionTile from '../Sections/SectionTile/SectionTile';
import './Schedule.scss';
import ScheduleTile from './ScheduleTile';
import axios from 'axios';
import Loader from '../Loader/Loader';

const API_URL = 'http://api.gancle-studio.pl/api/v1';

const Schedule = () => {
  const [louder, setlouder] = useState(true);
  const [scheduleData, setscheduleData] = useState({});

  useEffect(async () => {
    const scheduleResponse = await axios.get(`${API_URL}/schedule/names`);
    setscheduleData({ schedule: scheduleResponse.data.data });
    setlouder(false);
  }, []);

  const handleAddBtn = async () => {
    const groupName = document.getElementById('new-group');
    const group = await axios.post(`${API_URL}/schedule/add`, {
      name: groupName?.value
    });
    window.location.href = `/admin/harmonogram/dodaj/${group.data.data.id}`;
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
