import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../../../components/Button/Button';
import InfoModalPopup from '../../../../components/InfoModalPopup/InfoModalPopup';
import Input from '../../../../components/Input/Input';
import Loader from '../../../../components/Loader/Loader';
import TextEditor from '../../../../components/TextEditor/TextEditor';
import MasterTemplate from '../../../../templates/MasterTemplate/MasterTemplate';
import { httpRequest, redirect } from '../../../../utils/requests';

import './NewScheduleRow.scss';

const NewScheduleRow = ({ isNewRow }) => {
  const { id, groupId } = useParams();
  const [louder, setLouder] = useState(true);
  const [currentGroup, setCurrentGroup] = useState({});
  const [scheduleText, setScheduleText] = useState('');
  const [instructorText, setInstructorText] = useState('');
  const [helpersText, setHelpersText] = useState('');

  useEffect(async () => {
    try {
      const status = await httpRequest('GET', '/auth/authorize');
    } catch (e) {
      redirect('/');
    }
  }, []);

  useEffect(async () => {
    if (id) {
      const group = await httpRequest('GET', `/schedule/row/single/${id}`);
      setCurrentGroup(group.data.data);
      setScheduleText(group.data.data.schedule);
      setInstructorText(group.data.data.instructor);
      setHelpersText(group.data.data.helpers);
    }
    setLouder(false);
  }, []);

  const handleSaveBtn = async () => {
    const place = document.getElementById('place');
    const address = document.getElementById('address');

    const url = id ? `/schedule/row/${id}` : `/schedule/row/add`;

    const data = {
      scheduleId: groupId,
      place: place?.value,
      schedule: scheduleText || '',
      instructor: instructorText || '',
      helpers: helpersText || '',
      address: address?.value
    };

    await httpRequest('POST', url, data);
    redirect(`/admin/harmonogram/dodaj/${groupId}`);
  };

  return (
    <MasterTemplate>
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
              label={'Adres:'}
              className={''}
              value={isNewRow ? '' : currentGroup?.address}
              id='address'
            />

            <TextEditor
              text={scheduleText || ''}
              setText={setScheduleText}
              placeholder={'Podaj grafik...'}
              label={'Grafik: '}
              toolbarId={'schedule'}
            />
            <TextEditor
              text={instructorText || ''}
              setText={setInstructorText}
              placeholder={'Podaj informacje o instruktorze...'}
              label={'Instruktor: '}
              toolbarId={'instructor'}
            />
            <TextEditor
              text={helpersText || ''}
              setText={setHelpersText}
              placeholder={'Podaj informacje o pomocnikach...'}
              label={'Pomocnicy: '}
              toolbarId={'helpers'}
            />

            <div className='buttons'>
              {
                <InfoModalPopup
                  trigger={
                    <div className='green-btns'>
                      <Button text={'ZAPISZ ZMIANY'} onclick={handleSaveBtn} />
                      <Link to={`/admin/harmonogram/dodaj/${groupId}`}>
                        <Button text={'POWRÓT (bez zapisu)'} />
                      </Link>
                    </div>
                  }
                  text='Zmiany zostały zapisane'
                />
              }
            </div>
          </div>
        </main>
      )}
    </MasterTemplate>
  );
};

export default NewScheduleRow;
