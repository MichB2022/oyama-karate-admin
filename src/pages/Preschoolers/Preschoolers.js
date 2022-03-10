import React from 'react';
import { useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import InputFile from '../../components/InputFile/InputFile';
import Loader from '../../components/Loader/Loader';
import TextEditor from '../../components/TextEditor/TextEditor';
import { httpRequest } from '../../utils/requests';
import './Preschoolers.scss';

const Preschoolers = () => {
  const [preschoolersData, setPreschoolersData] = useState({});
  const [louder, setLouder] = useState(true);
  const [firstImg, setFirstImg] = useState([{ file: { path: '' }, alt: '' }]);
  const [secondImg, setSecondImg] = useState([{ file: { path: '' }, alt: '' }]);
  const [thirdImg, setThirdImg] = useState([{ file: { path: '' }, alt: '' }]);
  const [preschoolerText, setPreschoolerText] = useState('');

  useEffect(async () => {
    const preschoolerData = await httpRequest('GET', '/preschooler');
    setPreschoolersData(preschoolerData.data.data);
    setPreschoolerText(preschoolerData.data.data.content);
    setFirstImg([
      {
        imgUrl: preschoolerData.data.data.firstImgUrl,
        alt: preschoolerData.data.data.firstImgAlt
      }
    ]);
    setSecondImg([
      {
        imgUrl: preschoolerData.data.data.secondImgUrl,
        alt: preschoolerData.data.data.secondImgAlt
      }
    ]);
    setThirdImg([
      {
        imgUrl: preschoolerData.data.data.thirdImgUrl,
        alt: preschoolerData.data.data.thirdImgAlt
      }
    ]);
    setLouder(false);
  }, []);

  useEffect(() => {
    const firstImgAlt = document.getElementById('firstImgAlt');
    if (firstImgAlt) {
      firstImgAlt.value = firstImg[0].alt;
    }
  }, [firstImg]);

  useEffect(() => {
    const secondImgAlt = document.getElementById('secondImgAlt');
    if (secondImgAlt) {
      secondImgAlt.value = secondImg[0].alt;
    }
  }, [secondImg]);

  useEffect(() => {
    const thirdImgAlt = document.getElementById('thirdImgAlt');
    if (thirdImgAlt) {
      thirdImgAlt.value = thirdImg[0].alt;
    }
  }, [thirdImg]);

  const handleSaveBtn = async () => {
    const title = document.getElementById('title');
    const firstImgAlt = document.getElementById('firstImgAlt');
    const secondImgAlt = document.getElementById('secondImgAlt');
    const thirdImgAlt = document.getElementById('thirdImgAlt');

    const data = new FormData();

    data.append('title', title ? title.value : '');
    data.append('content', preschoolerText ? preschoolerText : '');

    if (firstImg[0].imgUrl) {
      data.append('firstImg', firstImg[0].imgUrl);
    } else if (firstImg[0].img) {
      data.append('firstImg', firstImg[0].img);
    } else {
      data.append('firstImg', '');
    }
    if (secondImg[0].imgUrl) {
      data.append('secondImg', secondImg[0].imgUrl);
    } else if (secondImg[0].img) {
      data.append('secondImg', secondImg[0].img);
    } else {
      data.append('secondImg', '');
    }
    if (thirdImg[0].imgUrl) {
      data.append('thirdImg', thirdImg[0].imgUrl);
    } else if (thirdImg[0].img) {
      data.append('thirdImg', thirdImg[0].img);
    } else {
      data.append('thirdImg', '');
    }

    data.append('firstImgAlt', firstImgAlt ? firstImgAlt.value : '');
    data.append('secondImgAlt', secondImgAlt ? secondImgAlt.value : '');
    data.append('thirdImgAlt', thirdImgAlt ? thirdImgAlt.value : '');

    await httpRequest('POST', `/preschooler/${preschoolersData.id}`, data);
  };

  return (
    <>
      {louder && <Loader />}
      {!louder && (
        <main>
          <div className='preschoolers-container'>
            <h2 className='header-container header-container-margin'>
              <p>Przedszkolaki</p>
            </h2>

            <Input
              label={'Tytuł'}
              className={''}
              value={preschoolersData.title}
              id='title'
            />

            <InputFile
              label={'Pierwsze zdjęcie: '}
              className={''}
              id='firstImg'
              value={firstImg[0].img}
              setImgState={setFirstImg}
              imgState={firstImg}
              filesRootFolder={'preschooler'}
            />
            <Input
              label={'alt do pierwszego zdjęcia:'}
              className={''}
              value={preschoolersData.firstImgAlt}
              id='firstImgAlt'
            />

            <InputFile
              label={'Drugie zdjęcie: '}
              className={''}
              id='secondImg'
              value={secondImg[0].img}
              setImgState={setSecondImg}
              imgState={secondImg}
              filesRootFolder={'preschooler'}
            />
            <Input
              label={'alt do drugiego zdjęcia:'}
              className={''}
              value={preschoolersData.secondImgAlt}
              id='secondImgAlt'
            />

            <InputFile
              label={'Trzecie zdjęcie: '}
              className={''}
              id='thirdImg'
              value={thirdImg[0].img}
              setImgState={setThirdImg}
              imgState={thirdImg}
              filesRootFolder={'preschooler'}
            />
            <Input
              label={'alt do trzeciego zdjęcia:'}
              className={''}
              value={preschoolersData.thirdImgAlt}
              id='thirdImgAlt'
            />

            <TextEditor
              text={preschoolerText || null}
              setText={setPreschoolerText}
              placeholder={'Podaj treść strony...'}
              label={'Treść Strony: '}
            />

            <div className='buttons'>
              <div className='green-btns'>
                <Button text={'ZAPISZ ZMIANY'} onclick={handleSaveBtn} />
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default Preschoolers;
