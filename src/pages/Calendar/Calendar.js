import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Calendar.scss';
import { httpRequest, redirect } from '../../utils/requests';
import Button from '../../components/Button/Button';
import MasterTemplate from '../../templates/MasterTemplate/MasterTemplate';
import Input from '../../components/Input/Input';
import TextEditor from '../../components/TextEditor/TextEditor';
import InfoModalPopup from '../../components/InfoModalPopup/InfoModalPopup';
import EventsTable from './subCoponents/EventsTable';

const Calendar = () => {
  const [calendarData, setCalendarData] = useState({
    data: {},
    description: '',
    secondDescription: ''
  });
  // const [description, setDescription] = useState('');
  // const [secondDescription, setSecondDescription] = useState('');
  const setSecondDescription = (val) => {
    setCalendarData({ ...calendarData, secondDescription: val });
  };
  const setDescription = (val) => {
    setCalendarData({ ...calendarData, description: val });
  };

  useEffect(async () => {
    try {
      const status = await httpRequest('GET', '/auth/authorize');
    } catch (e) {
      redirect('/');
    }
    const calendar = await httpRequest('GET', '/calendarpage');
    setCalendarData({
      data: calendar.data.data,
      description: calendar.data.data.description,
      secondDescription: calendar.data.data.secondDescription
    });
  }, []);

  const handleSaveBtn = async () => {
    const title = document.getElementById('title');
    const pageDescription = document.getElementById('pageDescription');

    const data = new FormData();
    data.append('title', title ? title.value : '');
    data.append(
      'pageDescription',
      pageDescription ? pageDescription.value : ''
    );
    data.append('description', calendarData.description);
    data.append('secondDescription', calendarData.secondDescription);

    await httpRequest('POST', `/calendarpage/${calendarData.data.id}`, data);
  };

  return (
    <MasterTemplate>
      {calendarData.data.id && (
        <main>
          <div className='admin-calendar-container'>
            <h2 className='header-container header-container-margin'>
              <p>Kalendarz</p>
              <Link to='/admin/aktualnosci'>
                <Button text={'POWRÓT (bez zapisu)'} className='back-btn' />
              </Link>
            </h2>

            <Input
              label={'Tytuł Kalendarza:'}
              className={''}
              value={calendarData?.data?.title || ''}
              id='title'
            />

            <Input
              label={'Opis strony:'}
              className={''}
              value={calendarData?.data?.pageDescription || ''}
              id='pageDescription'
            />
            <TextEditor
              text={calendarData?.description || ''}
              setText={setDescription}
              placeholder={'Podaj opis nad kalendarzem...'}
              label={'Opis nad kalendarzem: '}
              toolbarId={'description'}
            />

            <TextEditor
              text={calendarData?.secondDescription || ''}
              setText={setSecondDescription}
              placeholder={'Podaj opis pod kalendarzem...'}
              label={'Opis pod kalendarzem: '}
              toolbarId={'second'}
            />

            <div className='buttons special-btn-update'>
              {
                <InfoModalPopup
                  trigger={
                    <div className='green-btns'>
                      <Button
                        text={'AKTUALIZUJ'}
                        onclick={() => handleSaveBtn()}
                      />
                    </div>
                  }
                  text='Zmiany zostały zapisane'
                />
              }
            </div>

            <EventsTable />
          </div>
        </main>
      )}
    </MasterTemplate>
  );
};

export default Calendar;
