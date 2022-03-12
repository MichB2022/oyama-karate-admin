import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './NewEvent.scss';
import { httpRequest, redirect } from '../../../../utils/requests';
import Loader from '../../../../components/Loader/Loader';
import Button from '../../../../components/Button/Button';
import InputFile from '../../../../components/InputFile/InputFile';
import Input from '../../../../components/Input/Input';
import TextEditor from '../../../../components/TextEditor/TextEditor';
import InfoModalPopup from '../../../../components/InfoModalPopup/InfoModalPopup';

const NewEvent = () => {
  const { id } = useParams();
  const [newEvent, setNewEvent] = useState([]);
  const [loader, setLoader] = useState(true);
  const [eventCategories, setEventCategories] = useState([]);
  const [description, setDescription] = useState('');
  const [img, setImg] = useState([{ file: { path: '' }, alt: '' }]);

  useEffect(async () => {
    const categories = await httpRequest('GET', '/eventcategories');
    setEventCategories(categories.data.data);

    if (id) {
      const eventData = await httpRequest('GET', `/calendar/${id}`);
      setNewEvent(eventData.data.data);

      setDescription(eventData.data.data.description);
      setImg([
        {
          imgUrl: eventData.data.data.imgUrl,
          alt: eventData.data.data.imgAlt
        }
      ]);
    }
    setLoader(false);
  }, []);

  useEffect(() => {
    const imgAlt = document.getElementById('imgAlt');
    if (imgAlt) {
      imgAlt.value = img[0].alt;
    }
  }, [img]);

  const handleSaveBtn = async () => {
    const title = document.getElementById('title');
    const address = document.getElementById('address');
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');
    const imgAlt = document.getElementById('imgAlt');
    const category = document.getElementById('category');

    const data = new FormData();
    data.append('title', title ? title.value : '');
    data.append('description', description ? description : '');
    data.append('startDate', startDate ? startDate.value : '');
    data.append('endDate', endDate ? endDate.value : '');
    data.append('eventCategoryId', category?.value);
    data.append('address', address?.value);

    if (img[0].imgUrl) {
      data.append('imgUrl', img[0].imgUrl);
    } else if (img[0].img) {
      data.append('img', img[0].img);
    } else {
      data.append('imgUrl', '');
    }

    data.append('imgAlt', imgAlt ? imgAlt.value : '');

    if (id) {
      await httpRequest('POST', `/calendar/${id}`, data);
    } else {
      await httpRequest('POST', `/calendar`, data);
    }

    redirect('/admin/kalendarz');
  };

  return (
    <>
      {loader && <Loader />}
      {!loader && (
        <main>
          <div className='new-article-container'>
            <h2 className='header-container header-container-margin'>
              <p>Nowe wydarzenie</p>
              <Link to='/admin/kalendarz'>
                <Button text={'POWRÓT (bez zapisu)'} className='back-btn' />
              </Link>
            </h2>
            <Input
              label={'Tytuł:'}
              className={''}
              value={newEvent?.title}
              id='title'
            />
            <Input
              label={'Adres:'}
              className={''}
              value={newEvent?.address}
              id='address'
            />
            <Input
              label={'Data rozpoczęcia (YYYY-MM-DD):'}
              className={''}
              value={newEvent?.startDate?.slice(0, 10) || ''}
              id='startDate'
            />
            <Input
              label={'Data zakończenia (YYYY-MM-DD):'}
              className={''}
              value={newEvent?.endDate?.slice(0, 10) || ''}
              id='endDate'
            />

            <TextEditor
              text={description || null}
              setText={setDescription}
              placeholder={'Podaj opis wydarzenia...'}
              label={'Opis wydarzenia: '}
            />

            <form className='input-container'>
              <label htmlFor='sort'>wybierz kategorie wydarzenia: </label>
              <select
                name='sorting'
                className='select'
                id='category'
                defaultValue={newEvent.eventCategoryId}
              >
                {eventCategories.map((el) => (
                  <option value={el.id} key={el.id}>
                    {el.name}
                  </option>
                ))}
              </select>
            </form>

            <InputFile
              label={'Zdjęcie:'}
              className={''}
              id='img'
              value={img[0].img}
              setImgState={setImg}
              imgState={img}
              filesRootFolder={'calendar'}
            />

            <Input
              label={'alt do zdjęcia:'}
              className={''}
              value={newEvent?.imgAlt}
              id='imgAlt'
            />

            <div className='buttons'>
              {
                <InfoModalPopup
                  trigger={
                    <div className='green-btns'>
                      <Button text={'ZAPISZ ZMIANY'} onclick={handleSaveBtn} />
                      <Link to='/admin/kalendarz'>
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
    </>
  );
};

export default NewEvent;
