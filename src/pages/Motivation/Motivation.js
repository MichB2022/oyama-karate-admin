import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import ImageTile from '../../components/ImageTile/ImageTile';
import InputFile from '../../components/InputFile/InputFile';
import Loader from '../../components/Loader/Loader';
import { API_UPLOADS_URL } from '../../configs/api';
import MasterTemplate from '../../templates/MasterTemplate/MasterTemplate';
import { httpRequest, redirect } from '../../utils/requests';
import './Motivation.scss';

const Motivation = () => {
  const [louder, setlouder] = useState(true);
  const [galeryData, setGaleryData] = useState({});
  const [img, setImg] = useState([{ file: { path: '' }, alt: '' }]);

  useEffect(async () => {
    try {
      const status = await httpRequest('GET', '/auth/authorize');
    } catch (e) {
      redirect('/');
    }
  }, []);

  useEffect(async () => {
    const galery = await httpRequest('GET', `/motivation`);
    setGaleryData(galery.data.data);
    setlouder(false);
  }, []);

  useEffect(async () => {
    const data = new FormData();
    data.append('img', img[0].img);

    await httpRequest('POST', `/motivation/image`, data);
    const galery = await httpRequest('GET', `/motivation`);
    setGaleryData(galery.data.data);
  }, [img]);

  return (
    <MasterTemplate>
      {louder && <Loader />}
      {!louder && (
        <main>
          <div className='new-article-container'>
            <h2 className='header-container header-container-margin'>
              <p>Galeria motywacyjna (Facebook)</p>
            </h2>

            <InputFile
              label={'Dodaj zdjęcie:'}
              className={''}
              id='img'
              value={''}
              setImgState={setImg}
              imgState={img}
              filesRootFolder={''}
              withoutThumbs={true}
            />

            <div className='images-section'>
              {galeryData.length > 0 &&
                galeryData.map((el) => (
                  <ImageTile
                    key={el.id}
                    url={`${API_UPLOADS_URL}/motivation/${el.url}`}
                    alt={el.alt}
                    deletePath={`/motivation/image/${el.id}`}
                  />
                ))}
            </div>
          </div>
        </main>
      )}
    </MasterTemplate>
  );
};

export default Motivation;
