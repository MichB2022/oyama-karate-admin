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
  const [homePageData, setHomePageData] = useState({
    text: 'strona glowna lol',
    imgUrl: 'olol',
    imgAlt: 'altlol dolol zdjlol'
  });
  const [louder, setLouder] = useState(false);

  // useEffect(async () => {
  //   const data = await httpRequest('GET', '/homepage');
  //   setHomePageData(data.data.data);
  //   setLouder(false);
  // }, []);

  const getElById = (id) => {
    return document.getElementById(`${id}`);
  };

  // const handleSaveBtn = () => {
  //   const text = getElById('text');
  //   const imgUrl = getElById('imgUrl');
  //   const imgAlt = getElById('imgAlt');
  //   // axios.post(`${API_URL}/homepage`, {
  //   //   text: text,
  //   //   imgUrl: imgUrl,
  //   //   imgAlt: imgAlt
  //   // });
  // };

  useEffect(async () => {
    const data = await httpRequest('GET', '/homepage');
    setHomePageData(data.data.data);
    setImg([
      {
        imgUrl: homePageData.imgUrl,
        alt: homePageData.imgAlt
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
    const imgUrl = getElById('imgUrl');
    const imgAlt = getElById('imgAlt');

    if (text?.value !== '' && imgUrl?.value !== '' && imgAlt?.value !== '') {
      const data = new FormData();
      data.append('text', text ? text.value : '');
      data.append('imgUrl', imgUrl ? imgUrl.value : '');
      data.append('imgAlt', imgAlt ? imgAlt.value : '');
      if (imgUrl) {
        data.append('imgUrl', imgUrl);
      } else {
        data.append('imgUrl', '');
      }
      data.append('imgAlt', imgAlt ? imgAlt.value : '');
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
                      <Button
                        text={'ZAPISZ ZMIANY'}
                        onclick={handleSaveBtn()}
                      />
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
