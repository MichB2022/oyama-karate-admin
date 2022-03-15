import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../../../components/Button/Button';
import InfoModalPopup from '../../../../components/InfoModalPopup/InfoModalPopup';
import Input from '../../../../components/Input/Input';
import Loader from '../../../../components/Loader/Loader';
import ModalPopup from '../../../../components/ModalPopup/ModalPopup';
import TextEditor from '../../../../components/TextEditor/TextEditor';
import MasterTemplate from '../../../../templates/MasterTemplate/MasterTemplate';
import { httpRequest, redirect } from '../../../../utils/requests';
import './NewInfoPage.scss';

const NewInfoPage = () => {
  const { id } = useParams();
  const [loader, setLoader] = useState(true);
  const [currentInfoPage, setCurrentInfoPage] = useState([]);
  const [content, setContent] = useState('');

  useEffect(async () => {
    try {
      const status = await httpRequest('GET', '/auth/authorize');
    } catch (e) {
      redirect('/');
    }
  }, []);

  useEffect(async () => {
    const data = await httpRequest('GET', `/infopages/${id}`);
    setCurrentInfoPage(data.data.data);
    setContent(data.data.data.content);
    setLoader(false);
  }, []);

  const handleRemoveClick = async () => {
    await httpRequest('DELETE', `/infopages/${id}`);
    redirect('/admin/strony-informacyjne');
  };

  const handleSaveBtn = async () => {
    const title = document.getElementById('title');

    const data = new FormData();
    data.append('title', title?.value);
    data.append('content', content);

    if (id) {
      await httpRequest('POST', `/infopages/${id}`, data);
    } else {
      await httpRequest('POST', '/infopages', data);
    }

    redirect('/admin/strony-informacyjne');
  };

  return (
    <MasterTemplate>
      {loader && <Loader />}
      {!loader && (
        <main>
          <div className='new-article-container'>
            <h2 className='header-container header-container-margin'>
              <p>Nowa strona informacyjna</p>
              <Link to='/admin/strony-informacyjne'>
                <Button text={'POWRÓT (bez zapisu)'} className='back-btn' />
              </Link>
            </h2>
            <Input
              label={'Tytuł:'}
              className={''}
              value={currentInfoPage?.title}
              id='title'
            />

            <TextEditor
              text={content || null}
              setText={setContent}
              placeholder={'Podaj treść na stronie...'}
              label={'Tekst strony: '}
              imageUpload={true}
            />

            <div className='buttons'>
              {
                <InfoModalPopup
                  trigger={
                    <div className='green-btns'>
                      <Button text={'ZAPISZ ZMIANY'} onclick={handleSaveBtn} />
                      <Link to='/admin/strony-informacyjne'>
                        <Button text={'POWRÓT (bez zapisu)'} />
                      </Link>
                    </div>
                  }
                  text='Zmiany zostały zapisane'
                />
              }
              <div className='green-btns'>
                <Button text={'ZAPISZ ZMIANY'} onclick={handleSaveBtn} />
                <Link to='/admin/strony-informacyjne'>
                  <Button text={'POWRÓT (bez zapisu)'} />
                </Link>
              </div>
              {id && (
                <ModalPopup
                  trigger={
                    <div>
                      <Button text={'USUŃ STRONĘ'} />
                    </div>
                  }
                  text='Czy na pewno chcesz usunąć tę stronę informacyją?'
                  onYesClick={handleRemoveClick}
                />
              )}
            </div>
          </div>
        </main>
      )}
    </MasterTemplate>
  );
};

export default NewInfoPage;
