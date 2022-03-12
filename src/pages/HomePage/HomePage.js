import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import InfoModalPopup from '../../components/InfoModalPopup/InfoModalPopup';
import Input from '../../components/Input/Input';
import InputFile from '../../components/InputFile/InputFile';
import Loader from '../../components/Loader/Loader';
import { API_URL } from '../../configs/api';
import { httpRequest } from '../../utils/requests';
import './HomePage.scss';

const HomePage = () => {
  const [img, setImg] = useState([{ file: { path: '' }, alt: '' }]);
  const [isAnyFieldEmpty, setIsAnyFieldEmpty] = useState(false);
  const [homePageData, setHomePageData] = useState({});
  const [louder, setLouder] = useState(false);

  const getElById = (id) => {
    return document.getElementById(`${id}`);
  };

  useEffect(async () => {
    const data = await httpRequest('GET', '/homepage');
    setHomePageData(data.data.data);
    setImg([
      {
        imgUrl: data.data.data.imgUrl,
        alt: data.data.data.imgAlt
      }
    ]);
    setLouder(false);
  }, []);

  useEffect(() => {
    const imgEl = getElById('imgAlt');
    if (img) {
      imgEl.value = img[0].alt;
    }
  }, [img]);

  const handleSaveBtn = async () => {
    const text = getElById('text');
    const imgAlt = getElById('imgAlt');

    if (text?.value !== '' && imgAlt?.value !== '') {
      const data = new FormData();
      data.append('text', text ? text.value : '');
      data.append('imgAlt', imgAlt ? imgAlt.value : '');
      if (img[0].imgUrl) {
        data.append('imgUrl', img[0].imgUrl);
      } else if (img[0].img) {
        data.append('img', img[0].img);
      } else {
        data.append('imgUrl', '');
      }

      await httpRequest('POST', `/homepage/${homePageData.id}`, data);
    } else {
      setIsAnyFieldEmpty(true);
    }
  };

  return (
    <>
      {louder && <Loader />}
      {!louder && (
        <main>
          <div className='home-page-container'>
            <h2 className='header-container header-container-margin'>
              <p>Strona główna</p>
            </h2>

            <Input
              label={'Napis na zdjęciu'}
              className={''}
              value={homePageData.text}
              id='text'
            />

            <InputFile
              label={'Zdjęcie: '}
              className={''}
              id='imgUrl'
              value={homePageData.imgUrl}
              filesRootFolder={'homepage'}
              setImgState={setImg}
              imgState={img}
            />

            <Input
              label={'alt do zdjęcia:'}
              className={''}
              value={img.alt}
              id='imgAlt'
            />

            {isAnyFieldEmpty && (
              <div className='empty-field-warning'>
                Wszystkie pola muszą być uzupełnione!
              </div>
            )}

            <div className='buttons'>
              {
                <InfoModalPopup
                  trigger={
                    <div className='green-btns'>
                      <Button text={'ZAPISZ ZMIANY'} onclick={handleSaveBtn} />
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

export default HomePage;
