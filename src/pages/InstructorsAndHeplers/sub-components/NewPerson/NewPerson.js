import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../../../components/Button/Button';
import Input from '../../../../components/Input/Input';
import InputFile from '../../../../components/InputFile/InputFile';
import InputTextArea from '../../../../components/InputTextArea/InputTextArea';
import Loader from '../../../../components/Loader/Loader';
import ModalPopup from '../../../../components/ModalPopup/ModalPopup';
import TextEditor from '../../../../components/TextEditor/TextEditor';
import { httpRequest, redirect } from '../../../../utils/requests';
import './NewPerson.scss';

const NewPerson = () => {
  const { id } = useParams();
  const [deleted, setDeleted] = useState(false);
  const [loader, setLoader] = useState(true);
  const [content, setContent] = useState('');
  const [img, setImg] = useState([{ file: { path: '' }, alt: '' }]);
  const [currentPerson, setCurrentPerson] = useState({});
  const [files, setFiles] = useState([]);

  useEffect(async () => {
    if (id) {
      const data = await httpRequest('GET', `/instructors/${id}`);
      setCurrentPerson(data.data.data);
      setContent(data.data.data.content);
      setImg([
        {
          imgUrl: data.data.data.imgUrl,
          alt: data.data.data.imgAlt
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

  const handleRemoveClick = async () => {
    await httpRequest('DELETE', `/instructors/${id}`);
    redirect('/admin/instruktorzy-i-pomocnicy');
    setDeleted(true);
  };

  const handleSaveBtn = async () => {
    console.log(files);
    const name = document.getElementById('name');
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const degree = document.getElementById('degree');
    const imgAlt = document.getElementById('imgAlt');

    const data = new FormData();
    data.append('content', content);
    data.append('name', name?.value || '');
    data.append('title', title?.value || '');
    data.append('description', description?.value || '');
    data.append('degree', degree?.value || '');
    if (img[0].imgUrl) {
      data.append('imgUrl', img[0].imgUrl);
    } else if (img[0].img) {
      data.append('img', img[0].img);
    } else {
      data.append('imgUrl', '');
    }

    data.append('imgAlt', imgAlt ? imgAlt.value : '');

    if (id) {
      await httpRequest('POST', `/instructors/${id}`, data);
    } else {
      await httpRequest('POST', `/instructors`, data);
    }

    // redirect('/admin/instruktorzy-i-pomocnicy');
  };

  if (deleted) {
    return null;
  }

  return (
    <>
      {loader && <Loader />}
      {!loader && (
        <main>
          <div className='new-article-container'>
            <h2 className='header-container header-container-margin'>
              <p>Nowy Instruktor lub pomocnik</p>
              <Link to='/admin/instruktorzy-i-pomocnicy'>
                <Button text={'POWRÓT (bez zapisu)'} className='back-btn' />
              </Link>
            </h2>

            <Input
              label={'Imię i Nazwisko: '}
              value={currentPerson?.name}
              id='name'
            />

            <Input label={'Tytuł: '} value={currentPerson?.title} id='title' />

            <Input
              label={'Stopień: '}
              value={currentPerson?.degree}
              id='degree'
            />

            <InputFile
              label={'Zdjęcie:'}
              className={''}
              id='img'
              value={img[0].img}
              setImgState={setImg}
              imgState={img}
              filesRootFolder={'instructors'}
            />

            <Input
              label={'alt do zdjęcia:'}
              className={''}
              value={currentPerson?.imgAlt}
              id='imgAlt'
            />

            <InputTextArea
              label={'Krótki Opis:'}
              className={''}
              value={currentPerson?.description}
              id='description'
            />

            <TextEditor
              text={content || null}
              setText={setContent}
              placeholder={'Podaj treść opisu...'}
              label={'Długi Opis (na stronę): '}
              imageUpload={true}
            />

            <div className='buttons'>
              <div className='green-btns'>
                <Button text={'ZAPISZ ZMIANY'} onclick={handleSaveBtn} />
                <Link to='/admin/instruktorzy-i-pomocnicy'>
                  <Button text={'POWRÓT (bez zapisu)'} />
                </Link>
              </div>
              {id && (
                <ModalPopup
                  trigger={
                    <div>
                      <Button text={'USUŃ OSOBĘ'} />
                    </div>
                  }
                  text='Czy na pewno chcesz usunąć tę osobę?'
                  onYesClick={handleRemoveClick}
                />
              )}
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default NewPerson;
