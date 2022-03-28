import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import InfoModalPopup from '../../components/InfoModalPopup/InfoModalPopup';
import Input from '../../components/Input/Input';
import InputFile from '../../components/InputFile/InputFile';
import Loader from '../../components/Loader/Loader';
import { API_URL } from '../../configs/api';
import MasterTemplate from '../../templates/MasterTemplate/MasterTemplate';
import { httpRequest, redirect } from '../../utils/requests';
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
    try {
      const status = await httpRequest('GET', '/auth/authorize');
    } catch (e) {
      redirect('/');
    }
  }, []);

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
    const pageDescription = getElById('pageDescription');
    const defaultPageDescription = getElById('defaultPageDescription');
    const phone = getElById('phone');
    const email = getElById('email');

    if (text?.value !== '' && imgAlt?.value !== '') {
      const data = new FormData();
      data.append('text', text ? text.value : '');
      data.append('phone', phone ? phone.value : '');
      data.append('email', email ? email.value : '');
      data.append(
        'pageDescription',
        pageDescription ? pageDescription.value : ''
      );
      data.append(
        'defaultPageDescription',
        defaultPageDescription ? defaultPageDescription.value : ''
      );
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
    <MasterTemplate>
      {louder && <Loader />}
      {!louder && (
        <main>
          <div className='home-page-container'>
            <h2 className='header-container header-container-margin'>
              <p>Strona główna</p>
            </h2>

            <Input
              label={'Opis strony:'}
              className={''}
              value={homePageData.pageDescription}
              id='pageDescription'
            />

            <Input
              label={
                'Domyślny opis strony (Nasze sekcje, Harmonogram, Instruktorzy, Motywatory, Galerie):'
              }
              className={''}
              value={homePageData.defaultPageDescription}
              id='defaultPageDescription'
            />

            <Input
              label={'Telefon:'}
              className={''}
              value={homePageData.phone}
              id='phone'
            />

            <Input
              label={'E-mail:'}
              className={''}
              value={homePageData.email}
              id='email'
            />

            <Input
              label={'Napis na zdjęciu:'}
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
    </MasterTemplate>
  );
};

export default HomePage;
