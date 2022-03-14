import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../../../components/Button/Button';
import ImageTile from '../../../../components/ImageTile/ImageTile';
import InfoModalPopup from '../../../../components/InfoModalPopup/InfoModalPopup';
import Input from '../../../../components/Input/Input';
import InputFile from '../../../../components/InputFile/InputFile';
import Loader from '../../../../components/Loader/Loader';
import ModalPopup from '../../../../components/ModalPopup/ModalPopup';
import { API_UPLOADS_URL } from '../../../../configs/api';
import { httpRequest, redirect } from '../../../../utils/requests';
import './NewGalery.scss';

const NewGalery = () => {
  const { id } = useParams();
  const [louder, setlouder] = useState(true);
  const [galeryData, setGaleryData] = useState({});
  const [img, setImg] = useState([{ file: { path: '' }, alt: '' }]);

  useEffect(async () => {
    const galery = await httpRequest('GET', `/galery/${id}`);
    setGaleryData(galery.data.data);
    setlouder(false);
  }, []);

  useEffect(async () => {
    if (galeryData.id) {
      const data = new FormData();
      data.append('img', img[0].img);

      await httpRequest('POST', `/galery/image/${galeryData.id}`, data);
      const galery = await httpRequest('GET', `/galery/${id}`);
      setGaleryData(galery.data.data);
    }
  }, [img]);

  const handleRemoveClick = async () => {
    await httpRequest('DELETE', `/galery/${id}`);
    redirect('/admin/galerie');
  };

  const handleSaveBtn = async () => {
    const name = document.getElementById('name');
    const data = { name: name.value || '' };
    await httpRequest('POST', `/galery/${id}`, data);
  };

  return (
    <>
      {louder && <Loader />}
      {!louder && (
        <main>
          <div className='new-article-container'>
            <h2 className='header-container header-container-margin'>
              <p>Galeria: {galeryData.name}</p>
              <Link to='/admin/galerie'>
                <Button text={'POWRÓT (bez zapisu)'} className='back-btn' />
              </Link>
            </h2>

            <Input
              label={'Nazwa:'}
              className={''}
              value={galeryData.name || ''}
              id='name'
            />
            <div className='buttons special-btn'>
              {
                <InfoModalPopup
                  trigger={
                    <div className='green-btns'>
                      <Button
                        text={'AKTUALIZUJ NAZWĘ'}
                        onclick={() => handleSaveBtn()}
                      />
                    </div>
                  }
                  text='Zmiany zostały zapisane'
                />
              }
            </div>

            <h2 className='header-container header-container-margin'>
              ZDJĘCIA:
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
              {galeryData.images.length > 0 &&
                galeryData.images.map((el) => (
                  <ImageTile
                    key={el.id}
                    url={`${API_UPLOADS_URL}/galeryimages/${el.url}`}
                    alt={el.alt}
                    deletePath={`/galery/image/${el.id}`}
                  />
                ))}
            </div>

            <div className='buttons'>
              <ModalPopup
                trigger={
                  <div>
                    <Button text={'USUŃ GALERIĘ'} />
                  </div>
                }
                text='Czy na pewno chcesz usunąć tę galerię?'
                onYesClick={handleRemoveClick}
              />
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default NewGalery;
