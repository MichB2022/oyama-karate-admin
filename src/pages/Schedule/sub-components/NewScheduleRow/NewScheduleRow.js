import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../Button/Button';
import Input from '../../Input/Input';
import InputTextArea from '../../InputTextArea/InputTextArea';
import './NewScheduleRow.scss';
import Loader from '../../Loader/Loader';
import axios from 'axios';

const API_URL = 'http://api.gancle-studio.pl/api/v1';

const NewScheduleRow = ({ isNewRow }) => {
  const { id, groupId } = useParams();
  const [louder, setLouder] = useState(true);
  const [currentGroup, setCurrentGroup] = useState({});

  useEffect(async () => {
    if (id) {
      const group = await axios.get(`${API_URL}/schedule/row/single/${id}`);
      setCurrentGroup(group.data.data);
    }
    setLouder(false);
  }, []);

  return (
    <>
      {louder && <Loader />}
      {!louder && (
        <main>
          <div className='new-article-container'>
            <h2 className='header-container header-container-margin'>
              <p>Nowy wiersz</p>
              <Link to={`/admin/harmonogram/dodaj/${groupId}`}>
                <Button text={'POWRÓT (bez zapisu)'} className='back-btn' />
              </Link>
            </h2>
            <Input
              label={'Miejsce:'}
              className={''}
              value={isNewRow ? '' : currentGroup?.place}
              id='place'
            />
            <Input
              label={'Dzień:'}
              className={''}
              value={isNewRow ? '' : currentGroup?.schedule}
              id='day'
            />
            <Input
              label={'Adres:'}
              className={''}
              value={isNewRow ? '' : currentGroup?.address}
              id='address'
            />
            <InputTextArea
              label={'Instruktor:'}
              className={''}
              value={isNewRow ? '' : currentGroup?.instructor}
              id='instructors'
            />
            <InputTextArea
              label={'Pomocnicy:'}
              className={''}
              value={isNewRow ? '' : currentGroup?.helpers}
              id='helpers'
            />

            <div className='buttons'>
              <div className='green-btns'>
                <Button
                  text={'ZAPISZ ZMIANY'}
                  onclick={async () => {
                    const place = document.getElementById('place');
                    const day = document.getElementById('day');
                    const address = document.getElementById('address');
                    const instructors = document.getElementById('instructors');
                    const helpers = document.getElementById('helpers');

                    const url = id
                      ? `${API_URL}/schedule/row/${id}`
                      : `${API_URL}/schedule/row/add`;

                    await axios.post(url, {
                      scheduleId: groupId,
                      place: place?.value,
                      schedule: day?.value,
                      instructor: instructors?.value,
                      helpers: helpers?.value,
                      address: address?.value
                    });
                    window.location.href = `/admin/harmonogram/dodaj/${groupId}`;

                    // console.log(groupId, id, {
                    //   sheduleId: groupId,
                    //   place: place?.value,
                    //   day: day?.value,
                    //   instructor: instructors?.value,
                    //   helpers: helpers?.value,
                    //   address: address?.value
                    // });
                  }}
                />
                <Link to={`/admin/harmonogram/dodaj/${groupId}`}>
                  <Button text={'POWRÓT (bez zapisu)'} />
                </Link>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default NewScheduleRow;
